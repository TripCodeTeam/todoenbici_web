import TempPlaybackIdService from "@/classes/TempPlaybackIdService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tempPlaybackId = await TempPlaybackIdService.getLatestTempPlaybackId();
    return NextResponse.json(tempPlaybackId);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear TempPlaybackId:", error);
      return NextResponse.json({
        message: "Error inesperado al crear TempPlaybackId",
      });
    }
  }
}
