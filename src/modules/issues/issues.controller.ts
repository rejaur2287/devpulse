import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issues.service";

// import { userService } from "./user.service";

const createIssue = async (req: Request, res: Response) => {
  // console.log(req.body);
  //   const { name, email, password, age } = req.body;

  try {
    const payload = {
      ...req.body,
      reporter_id: req.user!.id,
    };
    const result = await issueService.createIssueIntoDB(payload);
    console.log(result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  //   console.log("Controller:", req.user);
  try {
    const result = await issueService.getAllIssuesFromDB(
      req.query.sort as string,
    );
    res.status(200).json({
      success: true,
      message: "Issues retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Issue not found in DB.",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `Issue ${id} retrieved successfully.`,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateAnIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { name, password, age, is_active } = req.body;

  try {
    const result = await issueService.updateAnIssueInDB(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Issue not found in DB.",
      });
    }
    res.status(200).json({
      success: true,
      message: `Issue ${id} updated successfully.`,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
  // console.log(result);
  // console.log(id);
  // console.log({ name, password, age, is_active });
};

// const deleteIssue = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const result = await issueService.deleteAnIssueFromDB(id as string);
//     // console.log(result);
//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "User not found in DB.",
//         data: {},
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: `User ${id} deleted successfully.`,
//       data: {},
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       error: error,
//     });
//   }
// };
export const issuesController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateAnIssue,
  // deleteIssue,
};
