const { Product, ProductImage, User } = require('../models');
const { hashPassword } = require('../utils/auth');

async function seedProductsIfEmpty() {
  const count = await Product.count();
  if (count > 0) return { seeded: false, existing: count };

  const products = [
    {
      name: 'Nova Runner',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Aero Glide',
      images: [
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Urban Trek',
      images: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Peak Sprint',
      images: [
        'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465453869711-7e174808ace9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Shadow Flex',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Volt Racer',
      images: [
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Terra Trail',
      images: [
        'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1448387473223-5c37445527e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1561909114-f9c740de8faa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Zen Step',
      images: [
        'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Pulse Pro',
      images: [
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Sky Leap',
      images: [
        'https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1628413993904-94b930ba4b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Crimson Dash',
      images: [
        'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574494396881-d8e4c895244d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Azure Pace',
      images: [
        'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Titan Grip',
      images: [
        'https://images.unsplash.com/photo-1610464547719-6c2e4fea3ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595341595490-cdffc9a3ed9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Echo Swift',
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1634464513197-b90291de3e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Blaze Charge',
      images: [
        'https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      name: 'Frost Drift',
      images: [
        'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  const created = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const price = (79 + i).toFixed(2);
    const rating = Math.round(((3.5 + (i % 5) * 0.3) + Number.EPSILON) * 10) / 10;
    
    const p = await Product.create({
      modelName: product.name,
      description: 'Comfortable, stylish, and durable — crafted for bold steps.',
      price,
      rating,
      status: 'active',
    });
    
    // Create images for this product
    const imageData = product.images.map((url, index) => ({
      product_id: p.id,
      url,
      altText: `${product.name} image ${index + 1}`,
      order: index + 1
    }));
    
    await ProductImage.bulkCreate(imageData);
    created.push(p);
  }
  return { seeded: true, count: created.length };
}

async function seedAdminIfEmpty() {
  const adminExists = await User.findOne({ where: { role: 'admin' } });
  if (adminExists) return { seeded: false, existing: true };

  try {
    const passwordHash = await hashPassword('admin123');
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash,
      role: 'admin'
    });
    return { seeded: true, admin: { email: 'admin@example.com', password: 'admin123' } };
  } catch (err) {
    return { seeded: false, error: err.message };
  }
}

module.exports = { seedProductsIfEmpty, seedAdminIfEmpty };
