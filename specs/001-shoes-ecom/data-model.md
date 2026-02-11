# Data Model: Shoes E‑Commerce Web App

## Entities

- Product
  - id (PK)
  - modelName (string, required)
  - description (string, 1-line for card; long optional)
  - price (decimal, required)
  - rating (float 1–5, required)
  - status (enum: active, archived)
  - createdAt, updatedAt

- ProductImage
  - id (PK)
  - productId (FK → Product.id)
  - url (string, required)
  - altText (string)
  - order (int)

- Review
  - id (PK)
  - productId (FK → Product.id)
  - rating (int 1–5, required)
  - title (string)
  - body (string)
  - author (string)
  - date (datetime)

- User
  - id (PK)
  - name (string)
  - email (string, unique)
  - passwordHash (string)
  - role (enum: user, admin)
  - createdAt

- Cart
  - id (PK)
  - userId (FK → User.id) or sessionId (string)
  - subtotal (decimal)
  - total (decimal)
  - createdAt, updatedAt

- CartItem
  - id (PK)
  - cartId (FK → Cart.id)
  - productId (FK → Product.id)
  - quantity (int ≥ 1)
  - unitPrice (decimal)
  - lineTotal (decimal)

- ContactRequest
  - id (PK)
  - name (string)
  - email (string)
  - message (text)
  - createdAt (datetime)
  - status (enum: new, reviewed, archived)

## Relationships

- Product 1—N ProductImage
- Product 1—N Review
- Cart 1—N CartItem
- User 1—N Cart (or session-based for guests)

## Validation Rules

- Product.modelName: non-empty; unique suggested
- Product.price: ≥ 0; currency formatted for display
- Product.rating: 1–5, half-star display optional
- ProductImage.url: valid URL; altText recommended for a11y
- Review.rating: 1–5; body ≤ 2,000 chars
- User.email: valid, unique; passwordHash present for registered users
- CartItem.quantity: integer ≥ 1

## State Transitions

- Product.status: active → archived (hidden from user pages)
- ContactRequest.status: new → reviewed → archived
