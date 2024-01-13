import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

export async function POST() {
  const { Video } = new Mux(
    process.env.MUX_TOKEN_ID as string,
    process.env.MUX_TOKEN_SECRET as string
  );

  const response = await Video.Assets.list({});

  const assets = response.map((asset) => ({
    asset_id: asset.id,
    playbackId: asset.playback_ids ? asset.playback_ids[0].id : null,
    duration: asset.duration,
    fecha: asset.created_at
  }));

  return NextResponse.json(assets);
}
