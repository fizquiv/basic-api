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

app.get("/api/items", async (req, res) => {
  try {
    const items = await getAllItems();
    if (!items.length)
      return res.status(404).json({ message: "No items found." });
    res.json(items);
  } catch (err) {
    console.error("Error getting items:", err);
    res.status(500).json({ message: "Server error while fetching items." });
  }
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

app.post("/api/items", async (req, res) => {
  const result = await addItem(req.body);
  if (result.error) return res.status(409).json(result);
  res.status(201).json(result);
});

app.put("/api/items/:id", async (req, res) => {
  const result = await updateItem(req.params.id, req.body);
  if (result.error) return res.status(404).json(result);
});

app.delete("/api/items/:id", async (req, res) => {
  const result = await deleteItem(req.params.id);
  if (res.error) return res.status(404).json(result);
  res.json(result);
});

app.get("/api/users", async (req, res) => {
  const users = await getAllusers();
  if (!users.length)
    return res.status(404).json({ message: "No users found." });
  res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json(user);
});

app.post("/api/users", async (req, res) => {
  const result = await addUser(req.body);
  if (result.error) return res.status(404).json(result);
  res.status(201).json(result);
});

app.put("/api/users/:id", async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

app.delete("/api/users/:id", async (req, res) => {
  const result = await deleteUser(req.params.id);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
