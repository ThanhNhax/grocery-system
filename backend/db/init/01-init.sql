CREATE TABLE
  IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTERGER NOT NULL CHECK (price >= 0),
    stock INTERGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW (),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
  )

ALTER TABLE products
ADD COLUMN category_id INT;

ALTER TABLE products 
ADD CONSTRAINT fk_products_category
  FOREIGN KEY (category_id)
  REFERENCES categories(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL;