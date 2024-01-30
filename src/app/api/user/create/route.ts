import UserService from "@/classes/User";
import { ScalarUser } from "@/types/User";
import { NextResponse } from "next/server";

/**
 * Función para manejar las solicitudes POST para crear un nuevo usuario.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos { email, password, firstName y lastName }
 *
 * @returns - Si la creación del usuario es exitosa, la respuesta será un objeto JSON que representa al nuevo usuario. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
export async function POST(req: Request) {
  try {
    // Desestructuramos los campos necesarios del cuerpo de la solicitud
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      avatar,
      rol,
    }: ScalarUser = await req.json();

    // Creamos un nuevo usuario utilizando el servicio de usuario
    const newUser = await UserService.create({
      email,
      username,
      firstName,
      lastName,
      password,
      avatar,
      rol,
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
