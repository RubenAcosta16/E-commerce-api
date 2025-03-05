import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserError } from "../utils/errorFactory";
import { SECRET_JWT_KEY } from "../config";
import { UserType } from "../types";

declare module "express" {
  interface Request {
    user?: Omit<UserType, "password" | "favorites">;
  }
}

const verifyToken = (token: string): JwtPayload => {
  try {
    if (!SECRET_JWT_KEY) {
      throw new UserError("Secret JWT key is not defined");
    }
    return jwt.verify(token, SECRET_JWT_KEY) as JwtPayload;
  } catch {
    throw new UserError("Invalid token");
  }
};

const extractUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.access_token;

  try {
    if (!token) {
      throw new UserError("Access denied: No token provided");
    }

    const decoded = verifyToken(token);
    const { id, username, email } = decoded;

    req.user = { _id: id, username, email };

    next();
  } catch (error) {
    next(error);
  }
};

export default extractUserMiddleware;
