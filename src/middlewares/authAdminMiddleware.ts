import { Request, Response, NextFunction } from "express";
import { UserError } from "../utils/errorFactory";
import { ADMIN_ID } from "../config";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UserError("User not authenticated");
    }

    if (req.user._id !== ADMIN_ID) {
      throw new UserError("Access denied: Only admin can access this route");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyAdmin;
