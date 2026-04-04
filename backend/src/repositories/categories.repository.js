import pool from "../db/pool.js";

const findAll = async () => {
    const result = await pool.query(`
      select id, name, created_at, updated_at
      from  categories
      order by created_at desc
    `);
    return result.rows;
};
const findById = async (id) => {
    const result = await pool.query(
        `
      select id, name, created_at, updated_at
      from  categories
      where id = $1
    `,
        [id],
    );
    return result.rows[0] || null;
};

const create = async ({ name }) => {
    const result = await pool.query(
        `
      insert into  categories (name)
      values($1)
      returning id, name, created_at, updated_at
    `,
        [name],
    );
    return result.rows[0];
};

const update = async (id, { name}) => {
    const result = await pool.query(
        `
      update  categories
      set
        name = COALESCE($2, name),
        updated_at = NOW()
      where id = $1
      returning id, name, created_at, updated_at
    `,
        [id, name],
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        `
      delete from  categories
      
      where id = $1
      returning id, name, created_at, updated_at
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
