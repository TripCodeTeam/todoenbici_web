import PostService from "@/classes/Posts";
import { NextResponse } from "next/server";

// Endpoint para obtener todos los posts de un usuario específico
export async function POST(req: Request) {
  const { userId } = await req.json();
  const posts = await PostService.getAllByUserId(userId);
  return NextResponse.json(posts);
}
