import Interaction from "@/classes/InteractionServices";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { likeId } = await req.json();
    const deletedLike = await Interaction.deleteLike(likeId);
    return NextResponse.json(deletedLike);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
