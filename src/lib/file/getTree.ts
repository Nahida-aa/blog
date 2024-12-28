type FileTreeNode = {
  name: string
  path: string
  type: "file" | "dir"
  items?: FileTreeNode[]
}
type FileTree = FileTreeNode[]
import fs from 'fs'
import path from 'path'

// 定义需要过滤的特殊节点
const specialNodes = ['[user]', '[...slug]', '(blog)', '(auth)']

export const getFileTree = (dir: string, basePath: string = ''): FileTree => {
  const result: FileTree = []
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    const relativePath = path.join(basePath, file).replace(/\\/g, '/') // windows path fix
    // console.log(`getFileTree: ${relativePath}`)

    // 过滤特殊节点
    if (specialNodes.includes(file)) {
      return
    }

    if (stat.isDirectory()) {
      result.push({
        name: file,
        path: `${relativePath}`,
        type: 'dir',
        items: getFileTree(filePath, relativePath),
      })
    } else {
      result.push({
        name: file,
        path: `${relativePath}`,
        type: 'file',
      })
    }
  })

  return result
}