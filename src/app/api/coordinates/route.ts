import { NextResponse } from "next/server";
import CoordinatesService from "@/classes/CordinatesServices";
import { GetUbication } from "@/components/handlers/Geo";
import TokenService from "@/classes/Token";

interface ReqProps {
  longitude: string;
  latitude: string;
  state: string;
}

interface cordenatesProps {
  city: string;
  country: string;
}

export async function GET() {
  try {
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
    );

    if (!decodedToken) {
      return NextResponse.json({ message: "Token no válido" }, { status: 401 });
    }

    const { longitude, latitude, state }: ReqProps = await req.json();

    console.log(longitude, latitude, state);

    const NumberLongitude = Number(longitude);
    const NumberLatitude = Number(latitude);

    const locationData: cordenatesProps = await GetUbication(
      NumberLatitude,
      NumberLongitude
    );

    console.log(locationData);

    // Crear nuevas coordenadas utilizando CoordinatesService
    const newCoordinates = await CoordinatesService.createCoordinates(
      latitude as string,
      longitude as string,
      locationData.city,
      locationData.country,
      state
    );

    console.log(newCoordinates);

    return NextResponse.json({
      message: "Coordenadas guardadas exitosamente",
      newCoordinates,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
