import { NextResponse } from "next/server";
import crypto from "crypto";

const webhookSecret = process.env.MUX_SIGNING_SECRET as string;

export async function POST(req: Request) {
  const signature = req.headers.get("mux-signature") as string;
  const [t, v1] = signature.split(",");

  const body = await req.json();

  const timestamp = t.split("=")[1];
  const receivedSignature = v1.split("=")[1];

  const payload = timestamp + "." + JSON.stringify(req.body);
  const hmac = crypto.createHmac("sha256", webhookSecret);
  const expectedSignature = hmac.update(payload).digest("hex");

  if (receivedSignature === expectedSignature) {
    switch (body.type) {
      case "video.asset.created":
        console.log("Un activo de video fue creado");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.asset.ready":
        console.log("Un activo de video está listo para ser transmitido");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.asset.deleted":
        console.log("Un activo de video fue eliminado");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.created":
        console.log("Se creó una transmisión en vivo");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.connected":
        console.log("Se conectó una transmisión en vivo");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.disconnected":
        console.log("Se desconectó una transmisión en vivo");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.recording":
        console.log("Una transmisión en vivo está grabando");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.active":
        console.log("Una transmisión en vivo está activa");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.idle":
        console.log("Una transmisión en vivo está inactiva");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      case "video.live_stream.finished":
        console.log("Una transmisión en vivo ha terminado");
        // Aquí puedes agregar la lógica para manejar este evento
        break;
      default:
        console.log(`Recibido tipo de evento desconocido: ${body.type}`);
    }

    return NextResponse.json({ received: true });
  }

  if (receivedSignature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" });
  }

  return NextResponse.json({ received: true });
}
