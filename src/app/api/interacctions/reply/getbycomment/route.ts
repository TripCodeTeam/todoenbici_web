import Interaction from "@/classes/InteractionServices";
import { NextResponse } from "next/server";

// Endpoint para obtener todos los replies de un comentario
export async function POST(req: Request) {
  try {
    const { commentId } = await req.json();
    const replies = await Interaction.getReplies(commentId);
    return NextResponse.json(replies);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
