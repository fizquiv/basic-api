import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllItems() {}

export async function getItemById(id) {}

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

export async function updateItem(id) {}

export async function deleteItem(id) {}
