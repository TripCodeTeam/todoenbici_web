import PostService from "@/classes/Posts";
import { NextResponse } from "next/server";

// Endpoint para obtener todos los posts
export async function GET() {
  const posts = await PostService.getAll();
  return NextResponse.json(posts);
}
