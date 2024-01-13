import { NextResponse } from "next/server";
import crypto from "crypto";

const webhookSecret = process.env.MUX_SIGNING_SECRET as string;

export async function POST(req: Request) {
  const signature = req.headers.get("mux-signature") as string;
  const [t, v1] = signature.split(",");

  const timestamp = t.split("=")[1];
  const receivedSignature = v1.split("=")[1];

  const payload = timestamp + "." + JSON.stringify(req.body);
  const hmac = crypto.createHmac("sha256", webhookSecret);
  const expectedSignature = hmac.update(payload).digest("hex");

  if (receivedSignature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" });
  }

  // Haz algo con el evento de webhook
  console.log("Received event: %s", req.body.type);

  return NextResponse.json({ received: true });
}
