CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, stock, category, description)
VALUES
  ('Laptop', 24999.00, 15, 'Electronics', 'Portable computing device'),
  ('Smartphone', 12999.00, 30, 'Electronics', 'Mobile communication device'),
  ('Headphones', 2999.00, 50, 'Accessories', 'Wireless audio device');
