import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";
import config from "../../config";

const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, role } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);
  // console.log(hashPassword);

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

const loginUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = payLoad;
  // 1.  check if the user exists -> Done
  // 2.  compare the password -> Done
  // 3.  generate token
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
  
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials");
  }
  const user = userData.rows[0];
  console.log(user);

  const matchPassword = await bcrypt.compare(password, user.password);
  console.log(matchPassword);
  if (!matchPassword) {
    throw new Error("Invalid credentials");
  }

  //   Generate Token

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  // console.log(accessToken);

  return { accessToken };
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
