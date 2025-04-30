import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllItems() {}

export async function getItemById(id) {
  const db = await readDataBase();
  return db.items.find((item) => id === item.id);
}

export async function createItem() {}

export async function updateItem(id) {}

export async function deleteItem(id) {}
