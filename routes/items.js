import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllItems() {
  const db = await readDataBase();
  return db.items;
}

export async function getItemById(id) {
  const db = await readDataBase();
  return db.items.find((item) => id === item.id);
}

export async function addItem(newItem) {
  const db = await readDataBase();

  const requiredFields = ["id", "name", "type", "effect"];
  const missingFields = requiredFields.filter((field) => !newItem[field]);
  if (missingFields.length > 0) return { error: "Missing fields" };
  if (db.items.find((item) => item.id === newItem.id)) {
    return { error: "item already exists" };
  }
  db.items.push(newItem);
  await writeDataBase(db);
  return { message: "Item added successfully!" };
}

export async function updateItem(id, updates) {
  const db = await readDataBase();
  const item = db.items.find((item) => item.id === id);
  if (!item) return { error: "Item not found." };
  if (updates.name) item.name = updates.name;
  if (updates.type) item.name = updates.type;
  if (updates.effect) item.name = updates.effect;

  await writeDataBase(db);
  return { message: "Item updated successfully!" };
}

export async function deleteItem(id) {}
