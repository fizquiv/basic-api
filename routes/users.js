import { readDataBase, writeDataBase } from "../data/fileHandler.js";

export async function getAllusers() {
  const db = await readDataBase();
  return db.users.map((user) => ({
    ...user,
    items: user.items.map((id) => db.items.find((item) => item.id === id)),
  }));
}

export async function getUserById(id) {
  const db = await readDataBase();
  const user = db.users.find((user) => user.id === id);
  if (!user) return null;
  return {
    ...user,
    items: user.items.map((id) => db.items.find((item) => item.id === id)),
  };
}

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
