"use strict";

import express from "express";

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
  res.sendFile("index.html", { root: "./public/html" });
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
    res.status(500).json({ message: "Server error while fetching item" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const result = await addItem(req.body);
    if (result.error) return res.status(409).json(result);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ message: "Server error while creating item." });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const result = await updateItem(req.params.id, req.body);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ message: "Server error while updating item." });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const result = await deleteItem(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Server error while deleting item." });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await getAllusers();
    if (!users.length)
      return res.status(404).json({ message: "No users found." });
    res.json(users);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Server error while fetching users." });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ message: "Server error while fetching user." });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const result = await addUser(req.body);
    if (result.error) return res.status(404).json(result);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error while creating user." });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error while updating user." });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error while deleting user." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
