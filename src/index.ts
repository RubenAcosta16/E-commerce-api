import express, { Request, Response, NextFunction } from "express";
import connectDB from "./database/database";
import cookieParser from "cookie-parser";

import { PORT } from "./config";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";

import v1UserRoutes from "./v1/routes/userRoutes";
import v1ImagesRoutes from "./v1/routes/imagesRoutes";
import v1CartRoutes from "./v1/routes/cartRoutes";
import v1CategoryRoutes from "./v1/routes/categoryRoutes";
import v1PaymentRoutes from "./v1/routes/paymentRoutes";
import v1ProductRoutes from "./v1/routes/productRoutes";

import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

declare module "express" {
  interface Request {
    session?: { user: null | { id: string; username: string } };
  }
}

app.use(sessionMiddleware);

app.use("/api/v1/user", v1UserRoutes);
app.use("/api/v1/image", v1ImagesRoutes);
app.use("/api/v1/cart", v1CartRoutes);
app.use("/api/v1/category", v1CategoryRoutes);
app.use("/api/v1/payment", v1PaymentRoutes);
app.use("/api/v1/product", v1ProductRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
