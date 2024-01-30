import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log(prompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json(chatCompletion.choices[0].message.content);
}
