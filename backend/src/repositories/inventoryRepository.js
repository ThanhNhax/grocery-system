import pool from "../db/pool.js";

const updateMovement = async ({ client, productId, delta }) => {
    const executor = client ?? pool;
    const result = await executor.query(
        `
    update products
    set
        stock = stock + $2,
        updated_at = now()
    where id = $1
    returning id, name, price, stock, category_id, created_at, updated_at
    `,
        [productId, delta],
    );
    return result.rows[0];
};

const createMovement = async ({client, product_id, type, quantity, note})=> {
    const executor = client ?? pool;

    const result = await executor.query(
        `
        insert into stock_movements (product_id, type, quantity, note)
        values ($1, $2, $3, $4)
        returning id, product_id, type, quantity, note, created_at
        `,
        [product_id, type, quantity,note]
    )
    return result.rows[0]
}

export default { updateMovement, createMovement };
