import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS wines CASCADE;
        DROP TABLE IF EXISTS cheeses CASCADE;
    `);

    // Create the wines table
    await pool.query(`
        CREATE TABLE wines (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            colour VARCHAR(255) NOT NULL
        );
    `);

    // Create the cheeses table with a foreign key to the wines table
    await pool.query(`
        CREATE TABLE cheeses (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            milk_type VARCHAR(255) NOT NULL,
            wine_id INT REFERENCES wines(id)
        );
    `);

    // Seed the wines table
    await pool.query(`
        INSERT INTO wines (name, description, country, colour)
        VALUES 
            ('Pinot Grigio', 'great acidity, citrus flavour', 'Italy', 'white'),
            ('Merlot', 'notes of blackberry, woodsmoked aroma', 'France', 'red'),
            ('Malbec', 'rich and velvety', 'Argentina', 'red'),
            ('Riesling', 'crisp and sweet', 'Austria', 'white'),
            ('Zinfandel', 'smoky, berry flavoured', 'Germany', 'pink');
    `);

    // Seed the cheeses table
    await pool.query(`
        INSERT INTO cheeses (name, description, country, milk_type, wine_id)
        VALUES 
            ('Gruyere', 'hard and mild', 'Switzerland', 'cow', 5),
            ('Cornish Cheddar', 'strong', 'UK', 'cow', 4),
            ('Pecorino', 'mild and creamy', 'Italy', 'goat', 3),
            ('Harvarti', 'nutty and mild', 'Switzerland', 'cow', 2),
            ('Brie', 'rich and creamy', 'France', 'cow', 1);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
