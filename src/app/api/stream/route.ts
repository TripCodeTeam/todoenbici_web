import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

export async function POST() {
  
  const { Video } = new Mux(
    process.env.MUX_TOKEN_ID as string,
    process.env.MUX_TOKEN_SECRET as string
  );

  const response = await Video.LiveStreams.create({
    latency_mode: "low",
    reconnect_window: 60,
    playback_policy: "public",
    new_asset_settings: { playback_policy: "public" },
  });

  console.log(response);

  const datesStream = {
    live_stream_id: response.id,
    stream_key: response.stream_key,
    playbackId: response.playback_ids ? response.playback_ids[0].id : undefined,
  };

  return NextResponse.json(datesStream);
}
