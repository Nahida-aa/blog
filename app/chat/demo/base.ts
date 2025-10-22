// import OpenAI from "openai";

// const token = process.env["GITHUB_TOKEN"];
// const endpoint = "https://models.inference.ai.azure.com";
// const modelName = "gpt-4o";

// export async function main() {

//   const client = new OpenAI({ baseURL: endpoint, apiKey: token });

//   const response = await client.chat.completions.create({
//     messages: [
//         { role:"system", content: "你是一个乐于助人的助手。" },
//         { role:"user", content: "开发一个qq机器人,要求调用 ai 模型，需要完整的项目结构及其代码" }
//       ],
//       temperature: 1.0,
//       top_p: 1.0,
//       max_tokens: 1000,
//       model: modelName
//     });

//   console.log(response.choices[0].message.content);
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err)
// })