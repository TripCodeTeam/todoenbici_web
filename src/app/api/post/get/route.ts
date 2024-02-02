import PostService from "@/classes/Posts";
import { NextResponse } from "next/server";
import TokenService from "@/classes/Token"; // Reemplaza con la ruta correcta

// Endpoint para obtener todos los posts
export async function GET(req: Request) {
  try {
    // Obtener todos los posts si la autenticación es exitosa
    const posts = await PostService.getAll();
    return NextResponse.json(posts);
  } catch (error) {
    // Manejar errores
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
