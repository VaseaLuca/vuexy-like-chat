import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

const fetchAIResponse = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": `${prompt}`},
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);

    return 'Error generating response. Please try again.';
  }
}

export { fetchAIResponse };