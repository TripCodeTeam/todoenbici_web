import Interaction from "@/classes/InteractionServices";
import { NextResponse } from "next/server";

// obtener todos los likes de un reply
export async function POST(req: Request) {
  try {
    const { replyId } = await req.json();
    const likes = await Interaction.getReplyLikes(replyId);
    return NextResponse.json(likes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
