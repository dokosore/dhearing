"use client";

import { updateVersion } from "@/repository/version";
import { Box, Button, Center, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ClaudeApiRequest, ClaudeApiResponse } from "../api/claude/route";
import ReactMarkdown from "react-markdown";

export default function TestPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<ClaudeApiResponse | null>(null);

  const handleClaudeTest = async () => {
    const req: ClaudeApiRequest = {
      question: prompt,
    };

    const res = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const data: ClaudeApiResponse = await res.json();
    setResponse(data);
  };

  return (
    <Center>
      <Button
        onClick={async () => {
          await updateVersion({
            id: "1",
            createdAt: 1,
            updatedAt: 1,
          });
        }}
      >
        firebaseテスト
      </Button>
      <Box>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="プロンプトを入力"
        />
        <Button onClick={handleClaudeTest}>claudeテスト</Button>
        {response && (
          <Box mt={4}>
            {response.content.map((message, index) => (
              <ReactMarkdown key={index}>
                {message.text as string}
              </ReactMarkdown>
            ))}
          </Box>
        )}
      </Box>
    </Center>
  );
}
