import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export interface ClaudeApiRequest {
  question: string;
}

export interface ClaudeApiResponse {
  content: Anthropic.Messages.ContentBlock[];
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ClaudeApiResponse>> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_SECRET,
  });

  const { question }: ClaudeApiRequest = await req.json();

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000,
    temperature: 0,
    system: "短い詩でのみ答えてください。",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: question,
          },
        ],
      },
    ],
  });

  return NextResponse.json({ content: msg.content });
}
