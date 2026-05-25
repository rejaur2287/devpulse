// import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IIssues } from "./issues.interface";

// const createIssueIntoDB = async (payLoad: IIssues) => {
//   console.log(payLoad);
//   const { title, description, reporter_id, type, status, role } = payLoad;
//   console.log("Payload:", payLoad);
//   console.log("Reporter ID:", reporter_id);

//   const user = await pool.query(
//     `
//     SELECT * FROM users WHERE id=$1
//     `,
//     [reporter_id],
//   );
//   console.log(user);
//   if (user.rows.length === 0) {
//     throw new Error("User not exists!");
//   }

//   const result = await pool.query(
//     `
//     INSERT INTO issues(title, description, reporter_id, type, status)
//     VALUES($1,$2,$3,$4,$5) RETURNING *
//     `,
//     [title, description, reporter_id, type, status],
//   );
//   return result;
// };

const createIssueIntoDB = async (payload: any) => {
  console.log("FULL PAYLOAD:", payload);

  const { title, description, reporter_id, type, status } = payload;

  console.log("REPORTER ID:", reporter_id);

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
      type,
      status
    )
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [title, description, reporter_id, type, status],
  );

  return result;
};
// const getAllIssuesFromDB = async () => {
//   const result = await pool.query(`
//       SELECT * FROM USERS
//       `);
//   return result;
// };

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
  // getAllIssuesFromDB,
  // getSingleIssueFromDB,
  // updateAnIssueInDB,
  // deleteAnIssueFromDB,
};
