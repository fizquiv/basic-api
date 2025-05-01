import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllusers() {}

export async function getUserById(id) {}

export async function addUser(newUser) {
  const db = await readDataBase();

  if (db.users.find((user) => user.id === newUser.id)) {
    return { error: "User already exists." };
  }
  if (
    newUser.items &&
    !newUser.items.every((id) => db.items.some((item) => item.id === id))
  )
    return { error: "Invalid item IDs provided." };
  db.users.push({ ...newUser, items: newUser.items || [] });
  await writeDataBase(db);
  return { message: "User added successfully!" };
}

export async function updateUser(id, update) {}

export async function deleteUser(id) {}
