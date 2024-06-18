import multer from "multer";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dsfzoigrm",
  api_key: "749776834585247",
  api_secret: "gK_lFCjKpiLxjY5VszgAm-xcGEg",
});
export async function uploadImage(imageUrl: any, publicId: any) {
  try {
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId,
    });

    await fs.unlink(imageUrl);

    return uploadResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getOptimizedUrl(publicId: string) {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
}

export function getAutoCropUrl(
  publicId: string,
  width: number,
  height: number
) {
  return cloudinary.url(publicId, {
    crop: "auto",
    gravity: "auto",
    width,
    height,
  });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
