import { NextResponse } from "next/server";

const promptTemplates = {
  tweet:
    "Transform the following content into a concise, engaging tweet (or thread of 2-3 tweets if needed). Use hashtags appropriately and make it attention-grabbing while maintaining the core message:",
  meme: "Create a witty, humorous caption for a meme based on the following content. Make it short, punchy, and shareable:",
  linkedin:
    "Rewrite the following content as a professional LinkedIn post. Include a hook at the beginning, break down the content into easily digestible paragraphs, and end with a thoughtful question or call to action to encourage engagement:",
  youtube:
    "Transform the following content into a YouTube video script outline. Include an engaging intro, 3-5 main talking points with brief explanations, and a strong conclusion with a call to action:",
  faq: "Based on the following content, create a FAQ section with 5 questions and answers that would be most relevant to someone interested in this topic:",
};

const retryRequest = async (
  url: string,
  options: RequestInit,
  retries: number = 3,
  delay: number = 1000
) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("OpenRouter API error:", errorData);
        } else {
          const textError = await response.text();
          console.error("OpenRouter API error (non-JSON):", textError);
        }
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      attempt += 1;
      console.error(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(
          "Maximum retries reached. Could not get a valid response."
        );
      }
    }
  }
};

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTERAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OpenRouter API key is missing. Please add OPENROUTERAI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const { content, format } = await req.json();

    if (!content || !format) {
      return NextResponse.json(
        { error: "Content and format are required" },
        { status: 400 }
      );
    }

    const prompt =
      promptTemplates[format as keyof typeof promptTemplates] ||
      promptTemplates.tweet;

    const requestBody = {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert content creator who specializes in transforming content into different formats while maintaining the original message and adding appropriate style for the target platform.",
        },
        {
          role: "user",
          content: `${prompt}\n\n${content}`,
        },
      ],
      max_tokens: 1000,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTERAI_API_KEY}`,
        "HTTP-Referer": "https://content-remix-tool.vercel.app",
        "X-Title": "Content Remix Tool",
      },
      body: JSON.stringify(requestBody),
    };

    const data = await retryRequest(
      "https://openrouter.ai/api/v1/chat/completions",
      fetchOptions
    );

    const result = data.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error remixing content:", error);
    return NextResponse.json(
      { error: "Failed to remix content. Please try again later." },
      { status: 500 }
    );
  }
}
