import cors from "cors";
import { FRONTEND_URL } from "../config";

const corsOptions = cors({
  origin: FRONTEND_URL,
  credentials: true, // Permitir cookies en las peticiones
});

export default corsOptions;
