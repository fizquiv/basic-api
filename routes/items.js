import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllItems() {
  const db = await readDataBase();
  return db.items;
}

export async function getItemById(id) {}

export async function addItem() {}

export async function updateItem(id) {}

export async function deleteItem(id) {}
