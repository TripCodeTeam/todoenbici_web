import { NextResponse } from "next/server";
import dataMusic from "@/components/jsons/music.json"

export function GET() {
    return NextResponse.json(dataMusic)
}