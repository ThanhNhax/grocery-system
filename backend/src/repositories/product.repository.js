import pool from "../db/pool.js";

const findAll = async () => {
    const result = await pool.query(`
      select id, name, price, stock, created_at, updated_at
      from products
      order by created_at desc
    `);
    return result.rows;
};
const findById = async (id) => {
    const result = await pool.query(
        `
      select id, name, price, stock, created_at, updated_at
      from products
      where id = $1
    `,
        [id],
    );
    return result.rows[0] || null;
};

const create = async ({ name, price, stock }) => {
    const result = await pool.query(
        `
      insert into products (name, price, stock)
      values($1,$2,$3)
      returning id, name, price, stock, created_at, updated_at
    `,
        [name, price, stock],
    );
    return result.rows[0];
};

const update = async (id, { name, price, stock }) => {
    const result = await pool.query(
        `
      update products
      set
        name = COALESCE($2, name),
        price = COALESCE($3, price),
        stock = COALESCE($4, stock),
        updated_at = NOW()
      where id = $1
      returning id, name, price, stock, created_at, updated_at
    `,
        [id, name, price, stock],
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        `
      delete from products
      
      where id = $1
      returning id, name, price, stock, created_at, updated_at
    `,
        [id],
    );
    return result.rows[0] || null;
};
export default {
    findAll,
    findById,
    create,
    update,
    remove,
};
