import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// import { NewUserType } from "../utils/types";
import userService from "../services/userService";
import { SECRET_JWT_KEY } from "../config";
import { AuthError } from "../utils/errorFactory";

if (!SECRET_JWT_KEY) {
  throw new AuthError("SECRET_JWT_KEY is not defined");
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password,email } = req.body;

  try {
    const newUser = await userService.register({ username, password,email });

    res.status(200).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;

  try {
    const user = await userService.login({ password,email });

    if (!SECRET_JWT_KEY) {
      throw new AuthError("SECRET_JWT_KEY is not defined");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY as string,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "User registered successfully",
        data: { user, token },
      });
  } catch (error) {
    next(error);
  }
};

const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    res.status(200).json({
      data: {
        _id: req.user._id,
        username: req.user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("access_token").json({ message: "Logout successful" });
};

const userController = {
  login,
  register,
  logout,
  protectedRoute,
};
export default userController;
