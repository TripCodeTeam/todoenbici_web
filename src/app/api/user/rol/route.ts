import { prisma } from "@/prisma/db";
import { Role } from "@/types/User";
import { NextResponse } from "next/server";
import UserService from "@/classes/User";
import TokenService from "@/classes/Token";

/**
 * Función para manejar las solicitudes PUT para cambiar el rol de un usuario existente.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos { id, role }
 *
 * @returns - Si el cambio de rol es exitoso, la respuesta será un objeto JSON que representa al usuario actualizado. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
export async function PUT(req: Request) {
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
    const { id, role }: { id: string; role: Role } = await req.json();

    if (!id) {
      throw new Error("El ID del usuario y el nuevo rol deben proporcionarse");
    }

    if (role != "viewer" && role != "streamer") {
      throw new Error("El tipo de rol no es valido");
    }

    // Actualizamos el rol del usuario utilizando Prisma
    const updatedUser = await UserService.changeRole(id, role);

    // Si todo va bien, devolvemos una respuesta con el usuario actualizado en formato JSON
    return NextResponse.json(updatedUser);
  } catch (error) {
    // Si algo sale mal, devolvemos una respuesta con un mensaje de error en formato JSON
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
