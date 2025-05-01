import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllusers() {
  const db = await readDataBase();
  return db.users.map((user) => ({
    ...user,
    items: user.items.map((id) => db.items.find((item) => item.id === id)),
  }));
}

export async function getUserById(id) {}

export async function addUser(newUser) {}

export async function updateUser(id, update) {}

export async function deleteUser(id) {}
