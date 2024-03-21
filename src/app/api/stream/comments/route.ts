import CommentService from "@/classes/CommentLive";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { streamId }: { streamId: string } = await req.json();
    const comments = await CommentService.getAllByStreamId(streamId as string);
    return NextResponse.json(comments);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
