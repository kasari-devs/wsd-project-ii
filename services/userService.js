import { sql } from "../database/database.js";

const addUser = async (email, password) => {
  try {
    await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
    console.log("user added successfully! -->" ,email);
  } catch (error) {
    console.error("failed to add user!");
    throw error;
  }
};

const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows;
};

export { addUser , findUserByEmail};