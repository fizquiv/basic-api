import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllItems() {}

export async function getItemById(id) {}

export async function addItem() {}

export async function updateItem(id) {}

export async function deleteItem(id) {
  const db = await readDataBase();
  const index = db.items.findIndex((item) => item.id === id);
  if (index === -1) return { error: "Item not found." };
  db.items.splice(index, 1);
  await writeDataBase(db);
  return { message: "Item deleted successfully!" };
}
