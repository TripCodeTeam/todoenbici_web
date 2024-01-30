import TempPlaybackIdService from "@/classes/TempPlaybackIdService";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { playbackId } = await req.json();

    const tempPlaybackId = await TempPlaybackIdService.deleteTempPlaybackId(
      playbackId
    );
    return NextResponse.json(tempPlaybackId);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al eliminar un TempPlaybackId:", error);
      return NextResponse.json({
        message: "Error inesperado al eliminar TempPlaybackId",
      });
    }
  }
}
