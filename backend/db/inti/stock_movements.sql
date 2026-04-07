CREATE TABLE IF NOT EXISTS  stock_movements (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  type varchar (20) not null check (
    type in ('import', 'export', 'adjust')
  ),
  quantity int not null check (quantity > 0),
  note TEXT,
  creat_at TIMESTAMP not null default now(),

  constraint fk_stock_movements_product 
    foreign key (product_id)
    references products(id)
    on update cascade
    on delete cascade
)