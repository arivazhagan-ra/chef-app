import { HfInference } from "@huggingface/inference";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }


    const body = req.body ? req.body : await req.json();
    const { ingredient } = body;

    const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI chef who creates simple recipes using the user's ingredients.",
        },
        {
          role: "user",
          content: `I have: ${ingredient} — Give me a recipe.`,
        },
      ],
      max_tokens: 500,
    });

    res.status(200).json({
      recipe: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
