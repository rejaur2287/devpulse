import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, role } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);
  // console.log(hashPassword);s

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password,role)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [name, email, hashPassword, role],
  );
  // console.log(result);
  delete result.rows[0].password;
  return result;
};

export const authService = {
  createUserIntoDB,
};
