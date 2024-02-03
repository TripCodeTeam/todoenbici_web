import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
// import TokenService from "@/classes/Token";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY_CLOUDINARY as string,
  api_secret: process.env.API_SECRET_KEY_CLOUDINARY as string,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    console.log(file);

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json("No se ha subido ninguna imagen", {
        status: 400,
      });
    }

    // Convert Blob to Readable Stream
    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    const response = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error: any, result: UploadApiResponse) => {
          if (error) {
            console.log("Error al subir la imagen:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream);
    });

    const url = response.secure_url;

    return NextResponse.json(url);
  } catch (error) {
    console.error(`Error al subir la imagen a Cloudinary: ${error}`);
    return NextResponse.json("Error al subir la imagen a Cloudinary", {
      status: 500,
    });
  }
}
