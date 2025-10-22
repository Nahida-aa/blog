// import path from "path"
// import fs from "fs"
// import { constants } from "@/app/config/constants"
// import matter from 'gray-matter';

// export const getFile = (file_path: string) => {
//   // console.log(`getFile: ${file_path}`)
//   const filePath = path.join(constants.APP_DIR, `${file_path}`)
//   let rawContent = '';

//   if (!fs.existsSync(filePath)) {
//     console.error(`File not found: ${filePath}`);
//     return { metadata: null, content: null };
//   }

//   try {
//     rawContent = fs.readFileSync(filePath, 'utf8');
//   } catch (err) {
//     console.error(`Failed to read file: ${filePath}`, err);
//     return { metadata: null, content: null };
//   }

//   const { data: metadata, content } = matter(rawContent);
//   return { metadata, content, rawContent }
// };