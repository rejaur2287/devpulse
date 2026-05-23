import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body);

  try {
    const result = await authService.createUserIntoDB(req.body);
    console.log(result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully.",
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

const loginUser = async (req: Request, res: Response) => {
  //   console.log(req.body);

  try {
    const result = await authService.loginUserIntoDB(req.body);
    console.log(result);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successful.",
      data: result,
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

export const authController = {
  createUser,
  loginUser,
};
