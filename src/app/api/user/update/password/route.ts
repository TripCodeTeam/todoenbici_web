import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/**
 * Función para manejar las solicitudes PUT para actualizar la contraseña de un usuario existente.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos { id, password }
 *
 * @returns - Si la actualización de la contraseña es exitosa, la respuesta será un objeto JSON que representa al usuario actualizado. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
export async function PUT(req: Request) {
  try {
    // Desestructuramos los campos necesarios del cuerpo de la solicitud
    const { id, password }: { id: string; password: string } = await req.json();

    if (!id || !password) {
      throw new Error(
        "El ID del usuario y la nueva contraseña deben proporcionarse"
      );
    }

    // Hasheamos la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizamos la contraseña del usuario utilizando Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    // Si todo va bien, devolvemos una respuesta con el usuario actualizado en formato JSON
    return NextResponse.json(updatedUser);
  } catch (error) {
    // Si algo sale mal, devolvemos una respuesta con un mensaje de error en formato JSON
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
