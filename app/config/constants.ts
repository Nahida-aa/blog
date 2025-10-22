import path from 'path'

const BASE_DIR = process.cwd();
const APP_DIR = path.join(BASE_DIR, 'src/app')
// const BLOG_DIR = path.join(APP_DIR, '/(blog)/blog')
const BLOG_DIR = path.join(APP_DIR, '/aa')

export const constants = {
  BASE_DIR,
  APP_DIR,
  BLOG_DIR,
}