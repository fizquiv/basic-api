import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllusers() {}

export async function getUserById(id) {}

export async function addUser(newUser) {}

export async function updateUser(id, updates) {
  const db = await readDataBase();
  const user = db.users.find((user) => user.id === id);
  if (!user) return { error: "User not found." };

  if (updates.items) {
    const valid = updates.items.every((id) =>
      db.items.some((item) => item.id === id)
    );
    if (!valid) return { error: "Invalid item IDs provided." };
    user.items = updates.items;
  }

  if (updates.name) user.name = updates.name;
  if (updates.email) user.email = updates.email;

  await writeDataBase(db);
  return { message: "User updated successfully!" };
}

export async function deleteUser(id) {}
