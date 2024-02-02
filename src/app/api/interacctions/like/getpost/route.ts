import Interaction from "@/classes/InteractionServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    const likes = await Interaction.getLikes(postId);
    return NextResponse.json(likes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
