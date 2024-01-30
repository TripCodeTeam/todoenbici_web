import TempPlaybackIdService from "@/classes/TempPlaybackIdService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // console.log("Request body:", req.body);

    const { playbackId } = await req.json();

    // console.log("Received playbackId:", playbackId);

    const tempPlaybackId = await TempPlaybackIdService.createTempPlaybackId(
      playbackId
    );

    // console.log("Created TempPlaybackId:", tempPlaybackId);

    return NextResponse.json(tempPlaybackId);
  } catch (error) {
    console.error("Error al crear TempPlaybackId:", error);
    return NextResponse.json({
      message: "Error inesperado al crear TempPlaybackId",
    });
  }
}
