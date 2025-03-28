import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import ApiResponse from "../utilities/apiResponse";
import userModel from "../model/user.model";
import ApiError from "../utilities/apiError";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if(!result.isEmpty()){
      throw new ApiError(result.array({onlyFirstError: true})[0].msg, 400)
    }

    const { email, password } = req.body;

    const user: any = await userModel.findOne({ email }).select('-__v');

    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new ApiError("Email Id or Password is incorrect", 400));
    }

    const { password: _, ...updatedUser } = user.toObject();

    res.status(200).json(new ApiResponse(updatedUser));
  }
);

const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if(!result.isEmpty()){
      throw new ApiError(result.array({onlyFirstError: true})[0].msg, 400)
    }

    const { name, email, password } = req.body;

    const user: any = new userModel({ email, name, password }).save();

    if(user){
      res.sendStatus(201);
    }
  }
);

export { login, register };
