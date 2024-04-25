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

export async function deleteWineById(id) {
  try {
    const checkQuery = "SELECT * FROM cheeses WHERE wine_id = $1;";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length > 0) {
      const removeReferenceQuery =
        "UPDATE cheeses SET wine_id = NULL WHERE wine_id = $1;";
      await pool.query(removeReferenceQuery, [id]);
    }

    const deleteQuery = "DELETE FROM wines WHERE id = $1 RETURNING *;";
    const result = await pool.query(deleteQuery, [id]);

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error deleting wine:", error);
    return null;
  }
}
