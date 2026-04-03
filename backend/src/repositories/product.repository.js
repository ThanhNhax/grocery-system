import pool from "../db/pool.js";

const findAll = async () => {
    const result = await pool.query(`
      select *
      from products
      order by created_at desc
    `);
    return result.rows;
};
const findById = async (id) => {
    const result = await pool.query(
        `
      select *
      from products
      where id = $1
    `,
        [id],
    );
    return result.rows[0] || null;
};

const create = async ({ name, price, stock, category_id  }) => {
    const result = await pool.query(
        `
      insert into products (name, price, stock, category_id)
      values($1,$2,$3,$4)
      returning id, name, price, stock, created_at, updated_at, category_id
    `,
        [name, price, stock, category_id],
    );
    return result.rows[0];
};

const update = async (id, { name, price, stock, category_id }) => {
    const result = await pool.query(
        `
      update products
      set
        name = COALESCE($2, name),
        price = COALESCE($3, price),
        stock = COALESCE($4, stock),
        category_id = COALESCE($5, category_id),
        updated_at = NOW()
      where id = $1
      returning id, name, price, stock, created_at, updated_at, category_id
    `,
        [id, name, price, stock, category_id],
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        `
      delete from products
      
      where id = $1
      returning id, name, price, stock, created_at, updated_at, category_id
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
