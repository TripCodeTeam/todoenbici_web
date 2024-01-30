// CoordinatesService.ts
import { prisma } from "@/prisma/db";
import { Coordinates } from "@prisma/client";

class CoordinatesService {
  static async getLatestCoordinates(): Promise<Coordinates | null> {
    try {
      return await prisma.coordinates.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error al obtener las últimas coordenadas:", error);
      throw new Error(
        "Error inesperado al obtener las últimas coordenadas. Por favor, inténtalo de nuevo."
      );
    }
  }

  static async createCoordinates(
    latitude: number,
    longitude: number,
    city: string,
    country: string,
    state: string
  ): Promise<Coordinates> {
    try {
      return await prisma.coordinates.create({
        data: {
          latitude,
          longitude,
          city,
          country,
          state,
        },
      });
    } catch (error) {
      console.error("Error al crear nuevas coordenadas:", error);
      throw new Error(
        "Error inesperado al crear nuevas coordenadas. Por favor, inténtalo de nuevo."
      );
    }
  }
}

export default CoordinatesService;
