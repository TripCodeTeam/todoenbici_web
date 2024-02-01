// Endpoint.ts
import { NextResponse } from "next/server";
import CoordinatesService from "@/classes/CordinatesServices"; // Asegúrate de tener la ruta correcta
import { GetUbication } from "@/components/handlers/Geo";
import TokenService from "@/classes/Token";

interface ReqProps {
  longitude: number;
  latitude: number;
}

interface cordenatesProps {
  city: string;
  country: string;
}

export async function GET(req: Request) {
  try {
    // Verificar la autenticación JWT
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: "Token de autorización no proporcionado" },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split(" ")[1];

    const decodedToken = TokenService.verifyToken(
      token,
      process.env.JWT_SECRET as string
    ); // Reemplaza "tu-clave-secreta" con tu clave secreta

    if (!decodedToken) {
      return NextResponse.json({ message: "Token no válido" }, { status: 401 });
    }

    // Utilizamos CoordinatesService para obtener las últimas coordenadas
    const latestCoordinates = await CoordinatesService.getLatestCoordinates();

    // Devolvemos las coordenadas obtenidas desde Prisma
    return NextResponse.json(latestCoordinates);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return NextResponse.json("Error al obtener datos");
  }
}

export async function POST(req: Request) {
  try {
    const { longitude, latitude }: ReqProps = await req.json();

    const locationData: cordenatesProps = await GetUbication(
      latitude,
      longitude
    );

    // Crear nuevas coordenadas utilizando CoordinatesService
    const newCoordinates = await CoordinatesService.createCoordinates(
      latitude,
      longitude,
      locationData.city,
      locationData.country,
      "Sample State"
    );

    return NextResponse.json({
      message: "Coordenadas guardadas exitosamente",
      newCoordinates,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.json("Error al procesar la solicitud POST");
  }
}
