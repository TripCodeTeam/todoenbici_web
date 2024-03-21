import CommentService from "@/classes/CommentLive";
import { NextResponse } from "next/server";
import { ScalarStreamComments } from "@/types/User";

export async function POST(req: Request) {
  try {
    const { userId, comment, streamId }: ScalarStreamComments =
      await req.json();

    const data = { userId, comment, streamId };
    console.log(data);
    const newComment = await CommentService.create(data);
    console.log(newComment);
    return NextResponse.json(newComment);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
