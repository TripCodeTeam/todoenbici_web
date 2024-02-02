import { NextResponse } from "next/server";
import Interaction from "@/classes/InteractionServices"; // Reemplaza con la ruta correcta

// Endpoint para añadir un reply a un comentario
export async function POST(req: Request) {
  try {
    const { parentId, data, postId } = await req.json();
    const newReply = await Interaction.addReply(parentId, data, postId);
    return NextResponse.json(newReply);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
