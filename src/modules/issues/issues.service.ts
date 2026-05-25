// import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IIssues } from "./issues.interface";

const createIssueIntoDB = async (payload: IIssues) => {
  // console.log("FULL PAYLOAD:", payload);

  const { title, description, reporter_id, type } = payload;

  // console.log("REPORTER ID:", reporter_id);

  const user = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [reporter_id],
  );

  console.log("USER QUERY RESULT:", user.rows);

  if (user.rows.length === 0) {
    throw new Error("User not exists!");
  }

  const result = await pool.query(
    `
    INSERT INTO issues(
      title,
      description,
      reporter_id,
      type
    )
    VALUES($1,$2,$3,$4)
    RETURNING *
    `,
    [title, description, reporter_id, type],
  );
  console.log(result);
  return result;
};
const getAllIssuesFromDB = async (sort?: string) => {
  let query = `
    SELECT * FROM issues
  `;

  if (sort === "newest") {
    query += ` ORDER BY created_at DESC`;
  }

  if (sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  }

  const result = await pool.query(query);
  return result;
};

// const getSingleIssueFromDB = async (id: string) => {
//   const result = await pool.query(
//     `
//       SELECT * FROM users
//       WHERE id = $1;
//       `,
//     [id],
//   );
//   return result;
// };

// const updateAnIssueInDB = async (payLoad: IIssues, id: string) => {
//   const { name, password, age, is_active } = payLoad;
//   const result = await pool.query(
//     `
//     UPDATE users
//     SET
//     name= COALESCE ($1, name),
//     password=COALESCE ($2, password),
//     age=COALESCE ($3, age),
//     is_active=COALESCE ($4, is_active)
//     WHERE id = $5 RETURNING *
//      `,
//     [name, password, age, is_active, id],
//   );
//   return result;
// };

// const deleteAnIssueFromDB = async (id: string) => {
//   const result = await pool.query(
//     `
//       DELETE FROM users WHERE id=$1
//       `,
//     [id],
//   );
//   return result;
// };

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  // getSingleIssueFromDB,
  // updateAnIssueInDB,
  // deleteAnIssueFromDB,
};
