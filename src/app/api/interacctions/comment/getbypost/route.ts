import Interaction from "@/classes/InteractionServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    const response = await Interaction.getComments(postId);
    console.log(response)
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
