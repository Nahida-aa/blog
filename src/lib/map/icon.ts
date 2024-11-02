import { MenuItemType } from '@/components/layout/sidebar'
import { FolderTree, Sigma, BookMarked, InfinityIcon, Github, BoxIcon, FileCode, MessageSquareText, Tags, Link as FriendLink, WandSparkles, Boxes, Wrench, SquareAsterisk, ChevronDown, Folder, FolderOpen, File as FileIcon, Sparkles } from 'lucide-react'


const iconMap: Record<string, React.ElementType> = {
  'algo':  Sigma,
  'math': InfinityIcon,
  'github': Github, 
  'api':  BoxIcon,
  'Blog': FolderTree,
  'Comments': MessageSquareText,
  'Tags': Tags,
  'Friends': FriendLink,
  'VSCode': WandSparkles,
  'MC': Boxes,
  'tools': Wrench,
  'decode': SquareAsterisk,
}
const dirIconMap: Record<string, { default: React.ElementType, open: React.ElementType }> = {
  'algo': { default: Sigma, open: ChevronDown },
  'math': { default: InfinityIcon, open: ChevronDown },
  'github': { default: Github, open: ChevronDown },
  'api': { default: BoxIcon, open: ChevronDown },
  'Blog': { default: FolderTree, open: ChevronDown },
  'Comments': { default: MessageSquareText, open: MessageSquareText },
  'Tags': { default: Tags, open: Tags },
  'Friends': { default: FriendLink, open: FriendLink },
  'VSCode': { default: WandSparkles, open: WandSparkles },
  'MC': { default: Boxes, open: Boxes },
  'tools': { default: Wrench, open: ChevronDown },
  'decode': { default: SquareAsterisk, open: SquareAsterisk },
}
// 特殊文件 先 通过文件名映射
const iconFileMap: Record<string, React.ElementType> = {
  'index.tsx': FileCode,
}
// 文件后缀名映射
const iconFileExtensionMap: Record<string, React.ElementType> = {
  '.mdx': BookMarked,
  '.tsx': FileCode,
  '.ts': FileCode,
  '.js': FileCode,
  '.jsx': FileCode,
  '.json': FileCode,
  // 其他映射...
}

const getDirIconByNameAndStat = (name: string, open: boolean): React.ElementType => {
  const icon = dirIconMap[name] || { default: Folder, open: FolderOpen }
  return open ? icon.open : icon.default
}
const getFileIconByName = (name: string): React.ElementType => {
  // 检查特殊文件名映射
  if (iconFileMap[name]) {
    return iconFileMap[name]
  }
  // 根据文件后缀名映射图标
  const extension = Object.keys(iconFileExtensionMap).find(ext => name.endsWith(ext))
  if (extension) {
    return iconFileExtensionMap[extension]
  }
  return FileIcon
}
export const getIconByNameAndTypeAndStat = (name: string, type?: MenuItemType, isOpen?: boolean): React.ElementType => {
  if (type === 'file') {
    return getFileIconByName(name)
  } else if (type === 'dir') {
    return getDirIconByNameAndStat(name, isOpen)
  } 
  return iconMap[name] || Sparkles
}
