import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log(prompt);

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/databricks/dbrx-instruct",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGS_API_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
  }
}
