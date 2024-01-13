import { NextResponse } from "next/server";
import JsonLocation from "@/components/jsons/locations_bici.json";

interface reqProps {
  longitude: number;
  latitude: number;
}

export async function GET() {
  try {
    return NextResponse.json(JsonLocation);
  } catch (error) {
    return NextResponse.json("error when obtaining data");
  }
}

export async function POST(req: Request) {
  const { longitude, latitude }: reqProps = await req.json();

  
}
