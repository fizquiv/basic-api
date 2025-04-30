"use strict";

import express from "express";
import fs from "fs";

import {
  getAllusers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./routes/users.js";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "./routes/items.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  fs.readFile("./public/html/index.html", (err, html) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    console.log("Sending page");
    res.send(html);
    console.log("Page sent!");
  });
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "item not found" });
    return res.json(item);
  } catch (err) {
    console.log("Error getting item:", err);
    res.status(500).json({ message: "Server error while fetching items" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
