import multer from "multer";

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const uploadImage = upload.single("img"); 

export default uploadImage;