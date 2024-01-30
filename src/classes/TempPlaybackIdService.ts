import { prisma } from "@/prisma/db";
import { TempPlaybackId } from "@prisma/client";

class TempPlaybackIdService {
  static async createTempPlaybackId(
    playbackId: string
  ): Promise<TempPlaybackId> {
    return prisma.tempPlaybackId.create({
      data: {
        playbackId,
      },
    });
  }

  static async deleteTempPlaybackId(playbackId: string): Promise<void> {
    await prisma.tempPlaybackId.deleteMany({
      where: { playbackId },
    });
  }

  static async getLatestTempPlaybackId(): Promise<TempPlaybackId | null> {
    try {
      return await prisma.tempPlaybackId.findFirst({
        orderBy: {
          createAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error al obtener el último TempPlaybackId:", error);
      throw new Error(
        "Error inesperado al obtener el último TempPlaybackId. Por favor, inténtalo de nuevo."
      );
    }
  }
}

export default TempPlaybackIdService;
