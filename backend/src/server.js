const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./api');
const { errorHandler } = require('./middleware/error');
const { init } = require('./models');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.use(errorHandler);

const port = process.env.PORT || 4000;

async function start() {
  try {
    await init({ sync: true });
    // eslint-disable-next-line no-console
    console.log('Database connected and models synced');
    // Attempt to seed dev data (idempotent)
    try {
      const { seedProductsIfEmpty, seedAdminIfEmpty } = require('./services/seed');
      const res = await seedProductsIfEmpty();
      if (res.seeded) {
        // eslint-disable-next-line no-console
        console.log(`Seeded ${res.count} products for development.`);
      }
      const adminRes = await seedAdminIfEmpty();
      if (adminRes.seeded) {
        // eslint-disable-next-line no-console
        console.log(`Seeded admin user: ${adminRes.admin.email} / ${adminRes.admin.password}`);
      }
    } catch (seedErr) {
      // eslint-disable-next-line no-console
      console.warn('Seeding skipped:', seedErr.message);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database unavailable, starting API without DB. Error:', err.message);
  }
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;
