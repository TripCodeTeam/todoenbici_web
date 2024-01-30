import PostService from "@/classes/Posts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  const post = await PostService.get(id);
  return NextResponse.json(post);
}
