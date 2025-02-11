import * as fs from 'fs';
import * as path from 'path';

const svgFilePath = path.join(__dirname, '../icons/folder-typescript.svg');
const svgContent = fs.readFileSync(svgFilePath, 'utf8');
const base64Svg = Buffer.from(svgContent).toString('base64');

console.log(`data:image/svg+xml;base64,${base64Svg}`);