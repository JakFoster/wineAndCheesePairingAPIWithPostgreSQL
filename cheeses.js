import { pool } from "./db/index.js";

export async function getCheeses() {
  const queryText = "SELECT * FROM cheeses;";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getCheeseById(id) {
  const queryText = "SELECT * FROM cheeses WHERE id = $1;";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createCheese(body) {
  const { name, description, country, milk_type, wine_id } = body;
  const queryText =
    "INSERT INTO cheeses (name, description, country, milk_type, wine_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
  const result = await pool.query(queryText, [
    name,
    description,
    country,
    milk_type,
    wine_id,
  ]);
  return result.rows[0] || null;
}

export async function updateCheeseById(id, body) {
  const { name, description, country, milk_type, wine_id } = body;
  const queryText =
    "UPDATE cheeses SET name = $1, description = $2, country = $3, milk_type = $4, wine_id = $5 WHERE id = $6 RETURNING *;";
  const result = await pool.query(queryText, [
    name,
    description,
    country,
    milk_type,
    wine_id,
    id,
  ]);
  return result.rows[0] || null;
}

export async function deleteCheeseById(id) {
  const queryText = "DELETE FROM cheeses WHERE id = $1 RETURNING *;";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}
