import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { uploadImage } from "./image.utils";

export const uploadImageController: RequestHandler = async (req, res, next) => {
  const imageUrl = req.file?.path;
  console.log(imageUrl, "image url");
  const publicId = req.file?.originalname;
  try {
    const uploadResult = await uploadImage(imageUrl, publicId);
    console.log(uploadResult);
    // return uploadResult;
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Image uploaded successfully",
      data: uploadResult.secure_url,
    });
  } catch (err) {
    next(err);
  }
};
