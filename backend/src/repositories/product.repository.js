import pool from "../db/pool.js";

const findAll = async () => {
    const result = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.price,
            p.stock,
            p.created_at,
            p.updated_at,
            p.category_id,
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
    `);

    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            p.id,
            p.name,
            p.stock,
            p.created_at,
            p.updated_at,
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1
        `,
        [id]
    );

    return result.rows[0] || null;
};

const create = async ({ name, price, stock, category_id }) => {
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
