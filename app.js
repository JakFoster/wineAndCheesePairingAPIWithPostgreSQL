import express from "express";
import CustomError from "./customError/customError.js";
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
    if(wines.length === 0) {
      throw new CustomError('No wines found', 500);
    }
    res.status(200).json({ success: true, payload: wines });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode).json({ success: false, error: error });
  }
});

app.get("/wines/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const wine = await getWineById(id);
    if(!wine) {
      throw new CustomError('Wine not found', 404);
    }
    res.status(200).json({ success: true, payload: wine });
  }
  catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ success: false, error: error });
      return;
    } else {
      res.status(500).json({ success: false, error: error });
    }
    
  }
});

app.post("/wines/", async function (req, res) {
  const data = req.body;
  const wine = await createWine(data);
  res.status(201).json({ success: true, payload: wine });
});

app.put("/wines/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const updatedWine = await updateWineById(id, data);
  res.status(200).json({ success: true, payload: updatedWine });
});

app.delete("/wines/:id", async function (req, res) {
  const id = req.params.id;
  const wine = await deleteWineById(id);
  res.status(200).json({ success: true, payload: wine });
});

// Cheese Route Handlers

app.get("/cheeses/", async function (req, res) {
  const cheeses = await getCheeses();
  res.status(200).json({ status: "success", data: cheeses });
});

app.get("/cheeses/:id", async function (req, res) {
  const id = req.params.id;
  const cheese = await getCheeseById(id);
  res.status(200).json({ success: true, payload: cheese });
});

app.post("/cheeses/", async function (req, res) {
  const data = req.body;
  const cheese = await createCheese(data);
  res.status(201).json({ success: true, payload: cheese });
});

app.put("/cheeses/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const updatedCheese = await updateCheeseById(id, data);
  res.status(200).json({ success: true, payload: updatedCheese });
});

app.delete("/cheeses/:id", async function (req, res) {
  const id = req.params.id;
  const deletedCheese = await deleteCheeseById(id);
  res.status(200).json({ success: true, payload: deletedCheese });
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
