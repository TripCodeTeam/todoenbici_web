import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import TokenService from "@/classes/Token";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function POST(req: Request) {
  try {
    // Verificar la autenticación JWT
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: "Token de autorización no proporcionado" },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split(" ")[1];

    const decodedToken = TokenService.verifyToken(
      token,
      process.env.JWT_SECRET as string
    ); // Reemplaza "tu-clave-secreta" con tu clave secreta

    if (!decodedToken) {
      return NextResponse.json({ message: "Token no válido" }, { status: 401 });
    }
    
    const data = await req.formData();
    const file = data.get("file");

    console.log(file);

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json("No se ha subido ninguna imagen", {
        status: 400,
      });
    }

    // Convert Blob to Readable Stream
    const stream = Readable.from([await file.arrayBuffer()]);

    const response = await new Promise<UploadApiResponse>((resolve, reject) => {
      // Use upload_stream to upload from a Readable stream
      cloudinary.uploader
        .upload_stream((error: any, result: UploadApiResponse) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(stream);
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
