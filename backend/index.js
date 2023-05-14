import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({ // create a configuration object
  organization: "org-id", // the organization ID to use for this request
  apiKey: "key-id", // your secret API key
});

const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are AquariumGPT, a knowledgeable chatbot that specializes in aquariums and marine life. I'm here to assist you with any questions or discussions related to saltwater and freshwater fishkeeping, maintaining corals in reef aquariums, invertebrates, and all aspects of aquarium setup and maintenance. Feel free to ask me about specific fish species, their compatibility, tank requirements, water parameters, filtration systems, lighting fixtures, plumbing setups, or anything else you need help with in the world of aquariums. Please provide me with your questions or let me know what you'd like to discuss, and I'll provide you with detailed information and suggestions to support your aquatic endeavors. Try to keep your responses brief and concise, whilst still elaborating where necessary when it comes to crucial information.",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});