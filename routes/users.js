import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllusers() {}

export async function getUserById(id) {}

export async function addUser(newUser) {}

export async function updateUser(id, update) {}

export async function deleteUser(id) {
  const db = await readDataBase();
  const index = db.users.findIndex((user) => user.id === id);
  if (index === -1) return { error: "User not found." };

  db.users.splice(index, 1);
  await writeDataBase(db);
  return { message: "User deleted successfully!" };
}
