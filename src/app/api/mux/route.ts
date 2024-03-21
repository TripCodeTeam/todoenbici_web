import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto";

const prisma = new PrismaClient();
const muxSigningSecret = process.env.MUX_SIGNING_SECRET; // Tu secret de Mux

export async function POST(req: Request) {
  const body = await req.json();
  const { type, data } = body;

  // Obtener la firma del encabezado de la solicitud
  const signature = req.headers.get("mux-signature");

  // Verificar la firma
  if (muxSigningSecret !== undefined) {
    const expectedSignature = crypto
      .createHmac("sha256", muxSigningSecret)
      .update(JSON.stringify(body))
      .digest("hex");

    if (signature !== expectedSignature) {
      // La firma no coincide, por lo que la solicitud puede no ser de Mux
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    // Crear un nuevo StreamEvent en la base de datos
    await prisma.streamEvent.create({
      data: {
        eventType: type,
        eventData: data,
      },
    });
  }

  return NextResponse.json({ message: "ok" });
}
