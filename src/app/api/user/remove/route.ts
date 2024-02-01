import UserService from "@/classes/User";
import { NextResponse } from "next/server";
import TokenService from "@/classes/Token";

export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();

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

    await UserService.delete(id);
    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error al eliminar usuario" });
    }
  }
}
