import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { UserType } from "../types";
import { SALTROUNDS, SECRET_JWT_KEY } from "../config";

import { UserError } from "../utils/errorFactory";
// import { NewUserType } from "../types";
import Validations from "../validations/userValidations";
import jwt, { JwtPayload } from "jsonwebtoken";

type IUserWithoutPassword = Omit<UserType, "password">;
type NewUserType = Omit<UserType, "_id">;

const register = async ({
  username,
  password,
  email,
}: NewUserType): Promise<IUserWithoutPassword> => {
  // Validaciones

  Validations.username(username);
  Validations.password(password);
  Validations.email(email);

  const existingUser = await User.findOne({ username });

  if (existingUser) throw new UserError("Username already exists");

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(password, Number(SALTROUNDS));

  // Crear un nuevo usuario
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  // Guardar el usuario en la base de datos
  await newUser.save();

  // Crear un nuevo objeto que cumpla con la interfaz IUserWithoutPassword
  const userWithoutPassword: IUserWithoutPassword = {
    _id: newUser._id.toString(), // Asegúrate de convertir a string si es necesario
    username: newUser.username,
    email: newUser.email,
    // Agrega otros campos que necesites según tu interfaz IUserWithoutPassword
  };

  return userWithoutPassword; // Retorna el usuario sin la contraseña
};

const login = async ({
  email,
  password,
}: Omit<NewUserType,"username">): Promise<IUserWithoutPassword> => {
  // Validaciones básicas
  Validations.email(email);
  Validations.password(password);

  // Buscar el usuario en la base de datos
  const user = await User.findOne({ email });
  if (!user) {
    throw new UserError("Email no encontrado");
  }

  // Comparar la contraseña proporcionada con la almacenada
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UserError("Contraseña incorrecta");
  }

  const userWithoutPassword: IUserWithoutPassword = {
    _id: user._id.toString(), // Asegúrate de convertir a string si es necesario
    username: user.username,
    email: user.email,

    // Agrega otros campos que necesites según tu interfaz IUserWithoutPassword
  };

  return userWithoutPassword; // Retorna el usuario sin la contraseña
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

const userService = {
  register,
  login,
  protectedRoute,
};
export default userService;
