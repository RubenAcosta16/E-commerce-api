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

// const transformImage = async (
//   id: string,
//   transformations: TransformImageType,
//   userId: string
// ): Promise<ImageType> => {
//   if (!id) throw new ImageError("Id is required");

//   const imageRecord = await Image.findOne({ _id: id, userId });

//   if (!imageRecord) {
//     throw new ImageError("Image not found");
//   }

//   const { url } = imageRecord;

//   const transformationString = buildTransformationString(transformations);

//   const { url: urlTransformed } = await cloudinary.uploader.upload(url, {
//     transformation: transformationString,
//   });

//   const updatedImage = await imageUpdateObject(
//     id,
//     imageRecord.toObject(),
//     urlTransformed
//   );

//   return updatedImage; // Asegúrate de que "updatedImage" tenga la propiedad "url"
// };

// const imageUpdateObject = async (
//   id: string,
//   data: Omit<ImageType, "_id">,
//   newUrl: string
// ): Promise<ImageType> => {
//   if (!id) throw new Error("Image ID is required");

//   const updatedImage = await Image.findByIdAndUpdate(
//     id,
//     { ...data, url: newUrl },
//     { new: true, runValidators: true }
//   );

//   if (!updatedImage) {
//     throw new Error("Image not found");
//   }

//   return { id: updatedImage._id.toString(), ...updatedImage.toObject() };
// };

// const buildTransformationString = (
//   transformations: TransformImageType
// ): TransformationType[] => {
//   const transformationArray: TransformationType[] = [];

//   if (transformations.resize) {
//     const { width, height } = transformations.resize;
//     if (width > 0 && height > 0) {
//       transformationArray.push({
//         width: width,
//         height: height,
//         crop: "scale",
//       });
//     } else {
//       console.warn("Invalid resize dimensions:", width, height);
//     }
//   }

//   if (transformations.crop) {
//     const { width, height, x, y } = transformations.crop;
//     if (width > 0 && height > 0) {
//       transformationArray.push({
//         width: width,
//         height: height,
//         x: x,
//         y: y,
//         crop: "crop",
//       });
//     } else {
//       console.warn("Invalid crop dimensions:", width, height);
//     }
//   }

//   if (transformations.rotate) {
//     transformationArray.push({ angle: transformations.rotate });
//   }

//   if (transformations.filters) {
//     if (transformations.filters.grayscale) {
//       transformationArray.push({ effect: "grayscale" });
//     }
//     if (transformations.filters.sepia) {
//       transformationArray.push({ effect: "sepia" });
//     }
//   }

//   if (transformations.format) {
//     transformationArray.push({ fetch_format: transformations.format });
//   }

//   return transformationArray;
// };

const getOneImage = async (id: string): Promise<IImage> => {
  if (!id) throw new ImageError("All props are required");

  const imageFound = await Image.findOne({ _id: id });

  if (!imageFound) throw new ImageError("Image not found");

  return imageFound;
};

// const getAllImages = async (
//   productId: string,
//   page: number,
//   limit: number
// ): Promise<IImage[]> => {
//   if (!productId || !page || !limit) {
//     throw new ImageError("All props are required");
//   }

//   const skip = (page - 1) * limit;

//   const images = await Image.find({ productId }).skip(skip).limit(limit);

//   // const totalImages = await Image.countDocuments({ userId }); // Cuenta total de imágenes para el userId

//   // res.json({
//   //   page,
//   //   limit,
//   //   totalImages,
//   //   totalPages: Math.ceil(totalImages / limit),
//   //   images,
//   // });

//   return images;
// };

const imageService = {
  imageUpload,
  imageCreateObject,
  getOneImage,
};

export default imageService;
