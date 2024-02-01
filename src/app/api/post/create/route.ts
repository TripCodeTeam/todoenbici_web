import PostService from "@/classes/Posts";
import { ScalarPost } from "@/types/User";
import { NextResponse } from "next/server";
import TokenService from "@/classes/Token"; // Reemplaza con la ruta correcta

/**
 * Función para manejar las solicitudes POST para crear un nuevo usuario.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos { content, image, video, location, userId }
 *
 * @returns - Si la creación del usuario es exitosa, la respuesta será un objeto JSON que representa al nuevo usuario. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
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

    // Desestructuramos los campos necesarios del cuerpo de la solicitud
    const { content, images, video, location, userId }: ScalarPost =
      await req.json();

    // Creamos un nuevo usuario utilizando el servicio de usuario
    const newUser = await PostService.create({
      content,
      images: images || undefined,
      video: video || undefined,
      location,
      userId,
    });

    // Si todo va bien, devolvemos una respuesta con el nuevo usuario en formato JSON
    return NextResponse.json(newUser);
  } catch (error) {
    // Si algo sale mal, devolvemos una respuesta con un mensaje de error en formato JSON
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
