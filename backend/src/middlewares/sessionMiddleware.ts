import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SECRET_JWT_KEY } from "../config";

const session = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  req.session = { user: null };

  if (token) {
    if (!SECRET_JWT_KEY) {
      throw new Error("SECRET_JWT_KEY is not defined");
    }

    try {
      const data = jwt.verify(token, SECRET_JWT_KEY) as JwtPayload;
      req.session.user = { id: data.id, username: data.username };
    } catch {
      req.session.user = null;
    }
  }

  next();
};

export default session;
