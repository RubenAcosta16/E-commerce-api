import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { UserType } from "../types";
import { SALTROUNDS, SECRET_JWT_KEY } from "../config";

import { UserError } from "../utils/errorFactory";
// import { NewUserType } from "../types";
import Validations from "../validations/userValidations";
import jwt, { JwtPayload } from "jsonwebtoken";
import productService from "./productService";

type IUserWithoutPassword = Omit<UserType, "password" | "favorites">;
type NewUserType = Omit<UserType, "_id">;

const register = async ({
  username,
  password,
  email,
}: Omit<NewUserType, "favorites">): Promise<IUserWithoutPassword> => {
  Validations.username(username);
  Validations.password(password);
  Validations.email(email);

  const existingUser = await User.findOne({ username });

  if (existingUser) throw new UserError("Username already exists");

  const hashedPassword = await bcrypt.hash(password, Number(SALTROUNDS));

  const newUser = new User({
    username,
    email,
    password: hashedPassword, 
    favorites: [],
  });

  await newUser.save();

  const userWithoutPassword: IUserWithoutPassword = {
    _id: newUser._id.toString(),
    username: newUser.username,
    email: newUser.email,
  };

  return userWithoutPassword;
};

const login = async ({
  email,
  password,
}: Omit<
  NewUserType,
  "username" | "favorites"
>): Promise<IUserWithoutPassword> => {
  Validations.email(email);
  Validations.password(password);

  const user = await User.findOne({ email });
  if (!user) {
    throw new UserError("Email no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UserError("Contraseña incorrecta");
  }

  const userWithoutPassword: IUserWithoutPassword = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
  };

  return userWithoutPassword;
};

const protectedRoute = (token: string): JwtPayload => {
  try {
    if (!SECRET_JWT_KEY) {
      throw new UserError("Secret JWT key is not defined");
    }
    return jwt.verify(token, SECRET_JWT_KEY) as JwtPayload;
  } catch {
    throw new UserError("Invalid token");
  }
};

const addFavorite = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}): Promise<void> => {
  if (!productId) throw new UserError("Product id is required");
  await productService.getOneProduct({ idProduct: productId });

  if (!userId) throw new UserError("User id is required");

  const user = await User.findOne({ _id: userId });
  if (!user) throw new UserError("User not found");

  const existingUser = user.favorites.findIndex(
    (p) => p.productId.toString() === productId
  );

  if (existingUser > -1) {
    throw new UserError("Product already in favorites");
  } else {
    user.favorites.push({
      productId,
    });
  }

  await user.save();
};

const getFavorites = async ({
  userId,
}: {
  userId: string;
}): Promise<string[]> => {
  if (!userId) throw new UserError("User id is required");

  const user = await User.findOne({ _id: userId });
  if (!user) throw new UserError("User not found");

  return user.favorites.map((p) => p.productId);
};

const removeFromFavorites = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}): Promise<void> => {
  if (!productId || !userId) {
    throw new UserError("Invalid props");
  }

  await productService.getOneProduct({ idProduct: productId });

  const user = await User.findOne({ _id: userId });

  if (!user) throw new UserError("User not found");

  const existingUser = user.favorites.findIndex(
    (p) => p.productId.toString() === productId
  );

  if (existingUser > -1) {
    user.favorites.splice(existingUser, 1);
  } else {
    throw new UserError("Product not found in user's favorites");
  }

  await user.save();
};

const userService = {
  register,
  login,
  protectedRoute,
  addFavorite,
  getFavorites,
  removeFromFavorites,
};
export default userService;
