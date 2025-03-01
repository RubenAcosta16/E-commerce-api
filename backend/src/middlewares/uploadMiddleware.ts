import multer from "multer";

// Configuración de multer
const storage = multer.memoryStorage(); // Almacena archivos en memoria
const upload = multer({ storage });

// Middleware para cargar una sola imagen
const uploadImage = upload.single("img"); // 'img' es el nombre del campo en el formulario

export default uploadImage;