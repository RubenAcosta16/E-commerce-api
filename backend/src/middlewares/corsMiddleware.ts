import cors from "cors";
import {FRONTEND_URL} from '../config';

const corsOptions = cors({
  origin: FRONTEND_URL, // Cambia esto por el puerto de tu frontend
  credentials: true, // Permitir cookies en las peticiones
});

export default corsOptions;