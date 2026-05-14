import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const file = body.file;

    const uploadedImage = await cloudinary.uploader.upload(file, {
      folder: "campusconnect",
    });

    return NextResponse.json({
      success: true,
      imageUrl: uploadedImage.secure_url,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      {
        status: 500,
      }
    );

  }
}