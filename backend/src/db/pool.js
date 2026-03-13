import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: "localhost",
    port: 5431,
    user: "postgres",
    password: "postgres",
    database: "grocery_db",
});

export default pool;
