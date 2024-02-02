import Interaction from "@/classes/InteractionServices";
import { ScalarUser } from "@/types/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      postId,
      user,
      commentId,
    }: { postId: string; user: ScalarUser; commentId: string } =
      await req.json();
    const newLike = await Interaction.addLike(postId, user, commentId);
    return NextResponse.json(newLike);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
