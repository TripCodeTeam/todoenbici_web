import Interaction from "@/classes/InteractionServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, data } = await req.json();
    const newComment = await Interaction.addComment(postId, data);
    return NextResponse.json(newComment);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
