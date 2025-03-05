import cloudinary from "../config/cloudinaryConfig";
import {
  ImageType,
  // TransformImageType,
  // TransformationType,
  IImage,
} from "../types";
import { Image } from "../models/imageModel";
import { ImageError } from "../utils/errorFactory";

const imageUpload = async (img: Express.Multer.File): Promise<string> => {
  const buffer = img.buffer;

  const { secure_url } = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) return reject(err);
          resolve(result as { secure_url: string });
        })
        .end(buffer);
    }
  );

  return secure_url;
};

const imageCreateObject = async (
  data: Omit<ImageType, "_id">
): Promise<ImageType> => {
  const newImage = new Image(data);
  await newImage.save();

  return { _id: newImage._id.toString(), ...data };
};

const getOneImage = async (id: string): Promise<IImage> => {
  if (!id) throw new ImageError("All props are required");

  const imageFound = await Image.findOne({ _id: id });

  if (!imageFound) throw new ImageError("Image not found");

  return imageFound;
};

const imageService = {
  imageUpload,
  imageCreateObject,
  getOneImage,
};

export default imageService;
