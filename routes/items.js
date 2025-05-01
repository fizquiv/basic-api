import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllItems() {}

export async function getItemById(id) {}

export async function addItem() {}

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
