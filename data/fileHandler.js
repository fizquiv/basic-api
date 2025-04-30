import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const dbPath = path.join(__dirname, "../data/db.json");

export async function readDataBase() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading database file:", err);
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseErr) {
          console.error("Error parsing JSON data:", parseErr);
          reject(parseErr);
        }
      }
    });
  });
}

export async function writeDataBase(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing to database file:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
