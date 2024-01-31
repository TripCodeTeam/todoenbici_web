import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file");

  console.log(file)

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = path.join(process.cwd(), "public", file.name);

  try {
    await fs.promises.writeFile(filePath, buffer);
  } catch (error) {
    console.error(`Error al escribir el archivo: ${error}`);
    return NextResponse.json("Error al escribir el archivo", { status: 500 });
  }

  const response = await cloudinary.uploader.upload(filePath);
  const url = response.secure_url;

  return NextResponse.json(url);
}
