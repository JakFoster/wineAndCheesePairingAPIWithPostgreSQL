import express from "express";
import {CustomError, errorHandler} from "./errorHandling/errorHandling.js";
import {
  getWines,
  getWineById,
  createWine,
  updateWineById,
  deleteWineById,
} from "./models/wines.js";

import {
  getCheeses,
  getCheeseById,
  createCheese,
  updateCheeseById,
  deleteCheeseById,
} from "./models/cheeses.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Wine Route Handlers
app.get("/wines/", async function (req, res) {
  try {
    const wines = await getWines();
    if (wines.length === 0) {
      throw new CustomError("No wines found", 500);
    }
    res.status(200).json({ success: true, payload: wines });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.get("/wines/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const wine = await getWineById(id);
    if (!wine) {
      throw new CustomError("Wine not found", 404);
    }
    res.status(200).json({ success: true, payload: wine });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.post("/wines/", async function (req, res) {
  const {name, country, colour, description} = req.body;
  try {
    if (
      !name ||
      name.trim() === "" ||
      !country ||
      country.trim() === "" ||
      !colour ||
      colour.trim() === "" ||
      !description ||
      description.trim() === ""
    ) {
      throw new CustomError("Missing required fields", 400);
    }
    const wine = await createWine(req.body);
    if (!wine) {
      throw new CustomError("Error creating wine", 500);
    }
    res.status(201).json({ success: true, payload: wine });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.put("/wines/:id", async function (req, res) {
  const id = req.params.id;
  const {name, country, colour, description} = req.body;
  try {
    if (
      !name ||
      name.trim() === "" ||
      !country ||
      country.trim() === "" ||
      !colour ||
      colour.trim() === "" ||
      !description ||
      description.trim() === ""
    ) {
      throw new CustomError("Missing required fields", 400);
    }
    const checkId = await getWineById(id);
    if (!checkId) {
      throw new CustomError("Wine not found", 404);
    }
    const updatedWine = await updateWineById(id, req.body);
    if (!updatedWine) {
      throw new CustomError("Error updating wine", 500);
    }
    res.status(201).json({ success: true, payload: updatedWine });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.delete("/wines/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const checkId = await getWineById(id);
    if (!checkId) {
      throw new CustomError("Wine not found", 404);
    }
    const wine = await deleteWineById(id);
    if (!wine) {
      throw new CustomError("Error deleting wine", 500);
    }
  res.status(200).json({ success: true, payload: wine });
  } catch (error) {
    errorHandler(error, res);
  }
});

// Cheese Route Handlers

app.get("/cheeses/", async function (req, res) {
  try {
    const cheeses = await getCheeses();
    if (cheeses.length === 0) {
      throw new CustomError("No cheeses found", 500);
    }
    res.status(200).json({ success: true, payload: cheeses });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.get("/cheeses/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const cheese = await getCheeseById(id);
    if (!cheese) {
      throw new CustomError("Cheese not found", 404);
    }
    res.status(200).json({ success: true, payload: cheese });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.post("/cheeses/", async function (req, res) {
  const {name, country, milk_type, wine_id} = req.body;
  try {
    if (
      !name ||
      name.trim() === "" ||
      !country ||
      country.trim() === "" ||
      !milk_type ||
      milk_type.trim() === "" ||
      !wine_id 
    ) {
      throw new CustomError("Missing required fields", 400);
    }
    const cheese = await createCheese(req.body);
    if (!cheese) {
      throw new CustomError("Error creating cheese", 500);
    }
    res.status(201).json({ success: true, payload: cheese });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.put("/cheeses/:id", async function (req, res) {
  const id = req.params.id;
  const {name, country, milk_type, wine_id} = req.body;
  try {
    if (
      !name ||
      name.trim() === "" ||
      !country ||
      country.trim() === "" ||
      !milk_type ||
      milk_type.trim() === "" ||
      !wine_id 
    ) {
      throw new CustomError("Missing required fields", 400);
    }
    const checkId = await getCheeseById(id);
    if (!checkId) {
      throw new CustomError("Cheese not found", 404);
    }
    const updatedCheese = await updateCheeseById(id, req.body);
    if (!updatedCheese) {
      throw new CustomError("Error updating cheese", 500);
    }
    res.status(201).json({ success: true, payload: updatedCheese });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.delete("/cheeses/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const checkId = await getCheeseById(id);
    if (!checkId) {
      throw new CustomError("Wine not found", 404);
    }
    const cheese = await deleteCheeseById(id);
    if (!cheese) {
      throw new CustomError("Error deleting cheese", 500);
    }
  res.status(200).json({ success: true, payload: cheese });
  } catch (error) {
    errorHandler(error, res);
  }
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
