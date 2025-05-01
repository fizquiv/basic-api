import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllusers() {}

export async function getUserById(id) {
  const db = await readDataBase();
  const user = db.users.find((user) => user.id === id);
  if (!user) return null;
  return {
    ...user,
    items: user.items.map((id) => db.items.find((item) => item.id === id)),
  };
}

export async function addUser(newUser) {}

export async function updateUser(id, update) {}

export async function deleteUser(id) {}
