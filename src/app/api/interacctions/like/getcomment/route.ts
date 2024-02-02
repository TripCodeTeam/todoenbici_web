import { NextResponse } from "next/server";
import Interaction from "@/classes/InteractionServices"; // Reemplaza con la ruta correcta

// Endpoint para obtener todos los likes de un comentario
export async function POST(req: Request) {
  try {
    const { commentId } = await req.json();
    const likes = await Interaction.getLikes(commentId);
    return NextResponse.json(likes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
