"use strict";

import express from "express";
import fs from "fs";

import {
  getAllusers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "./routes/users.js";
import {
  getAllItems,
  getItemById,
  addItem,
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

app.put("/api/items/:id", async (req, res) => {
  const result = await updateItem(req.params.id, req.body);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
