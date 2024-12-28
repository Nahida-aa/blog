// import OpenAI from "openai";
// import fs from 'fs';

// const token = process.env["GITHUB_TOKEN"];
// const endpoint = "https://models.inference.ai.azure.com";
// const modelName = "gpt-4o";

// export async function main() {

//   const client = new OpenAI({ baseURL: endpoint, apiKey: token });

//   const response = await client.chat.completions.create({
//     messages: [
//         { role: "system", content: "You are a helpful assistant that describes images in details." },
//         { role: "user", content: [
//             { type: "text", text: "这张图片里有什么？"},
//             { type: "image_url", image_url: {
//                 url: getImageDataUrl("D:/github/outsource/blog/blog/public/avatar/star-256.webp", "webp"), 
//                 // details: "low"
//               }
//             }
//           ]
//         }
//       ],
//       model: modelName
//     });

//   console.log(response.choices[0].message.content);
// }

// /**
//  * Get the data URL of an image file.
//  * @param {string} imageFile - The path to the image file.
//  * @param {string} imageFormat - The format of the image file. For example: "jpeg", "png".
//  * @returns {string} The data URL of the image.
//  */
// function getImageDataUrl(imageFile, imageFormat) {
//   try {
//       const imageBuffer = fs.readFileSync(imageFile);
//       const imageBase64 = imageBuffer.toString('base64');
//       return `data:image/${imageFormat};base64,${imageBase64}`;
//   } catch (error) {
//       console.error(`Could not read '${imageFile}'.`);
//       console.error('Set the correct path to the image file before running this sample.');
//       process.exit(1);
//   }
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });