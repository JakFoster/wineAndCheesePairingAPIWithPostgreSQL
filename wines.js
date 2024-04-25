import { pool } from "./db/index.js";

export async function getWines() {
  const queryText = "SELECT * FROM wines;";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getWineById(id) {
  const queryText = "SELECT * FROM wines WHERE id = $1;";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createWine(body) {
  const { name, description, country, colour } = body;
  const queryText =
    "INSERT INTO wines (name, description, country, colour) VALUES ($1, $2, $3, $4) RETURNING *;";
  const result = await pool.query(queryText, [
    name,
    description,
    country,
    colour,
  ]);
  return result.rows[0] || null;
}

export async function updateWineById(id, body) {
  const { name, description, country, colour } = body;
  const queryText =
    "UPDATE wines SET name = $1, description = $2, country = $3, colour = $4 WHERE id = $5 RETURNING *;";
  const result = await pool.query(queryText, [
    name,
    description,
    country,
    colour,
    id,
  ]);
  return result.rows[0] || null;
}

export async function deleteWineById(id) {}

