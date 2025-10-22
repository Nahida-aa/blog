import {FileCssIcon, FileHtmlIcon, FileJavascriptIcon, FileJsonIcon, FileMarkdownIcon, FileMdxIcon, FilePythonIcon, FileReact_tsIcon, FileReactIcon, FileTypescript_defIcon, FileTypescriptIcon, FolderAdminIcon, FolderAdminOpenIcon, FolderApiIcon, FolderApiOpenIcon, FolderConfigIcon, FolderConfigOpenIcon, FolderExamplesIcon, FolderExamplesOpenIcon, FolderGithubIcon, FolderGithubOpenIcon, FolderIcon, FolderJavaIcon, FolderJavaOpenIcon, FolderLogIcon, FolderLogOpenIcon, FolderMessagesIcon, FolderMessagesOpenIcon, FolderNextIcon, FolderNextOpenIcon, FolderNuxtIcon, FolderNuxtOpenIcon, FolderOpenIcon, FolderOtherIcon, FolderOtherOpenIcon, FolderPublicIcon, FolderPublicOpenIcon, FolderPythonIcon, FolderPythonOpenIcon, FolderTempIcon, FolderTempOpenIcon, FolderToolsIcon, FolderToolsOpenIcon, FolderTypescriptIcon, FolderTypescriptOpenIcon, FolderVscodeIcon, FolderVscodeOpenIcon} from '@/app/aa/web/svg'
import { MenuItemType } from '@/components/layout/sidebar/tree/TreeMenuNode'
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
  'admin': { default: FolderAdminIcon, open: FolderAdminOpenIcon },
  'api': { default: FolderApiIcon, open: FolderApiOpenIcon },
  'Blog': { default: FolderTree, open: ChevronDown },
  'config': { default: FolderConfigIcon, open: FolderConfigOpenIcon },
  'chat': { default: FolderMessagesIcon, open: FolderMessagesOpenIcon },
  'Comments': { default: MessageSquareText, open: MessageSquareText },
  'decode': { default: SquareAsterisk, open: SquareAsterisk },
  'demo': { default: FolderExamplesIcon, open: FolderExamplesOpenIcon },
  'Friends': { default: FriendLink, open: FriendLink },
  'github': { default: FolderGithubIcon, open: FolderGithubOpenIcon },
  'java': { default: FolderJavaIcon, open: FolderJavaOpenIcon },
  'math': { default: InfinityIcon, open: ChevronDown },
  'MC': { default: Boxes, open: Boxes },
  "next": { default: FolderNextIcon, open: FolderNextOpenIcon },
  "nuxt": { default: FolderNuxtIcon, open: FolderNuxtOpenIcon },
  "other": { default: FolderOtherIcon, open: FolderOtherOpenIcon },
  'py': { default: FolderPythonIcon, open: FolderPythonOpenIcon },
  'log': { default: FolderLogIcon, open: FolderLogOpenIcon },
  'Tags': { default: Tags, open: Tags },
  'temp': { default: FolderTempIcon, open: FolderTempOpenIcon },
  'tools': { default: FolderToolsIcon, open: FolderToolsOpenIcon },
  'ts': { default: FolderTypescriptIcon, open: FolderTypescriptOpenIcon },
  'vscode': { default: FolderVscodeIcon, open: FolderVscodeOpenIcon },
  'web': { default: FolderPublicIcon, open: FolderPublicOpenIcon },
}
// 特殊文件 先 通过文件名映射
const iconFileMap: Record<string, React.ElementType> = {
  // 'index.tsx': FileCode,
}
// 文件后缀名映射
const iconFileExtensionMap: Record<string, React.ElementType> = {
  '.js': FileJavascriptIcon,
  '.json': FileJsonIcon,
  '.jsx': FileReactIcon,
  '.mdx': FileMdxIcon,
  '.md': FileMarkdownIcon,
  '.tsx': FileReact_tsIcon,
  '.d.ts': FileTypescript_defIcon,
  '.ts': FileTypescriptIcon,
  '.py': FilePythonIcon,
  '.html': FileHtmlIcon,
  '.css': FileCssIcon,
}

const getDirIconByNameAndStat = (name: string, open: boolean): React.ElementType => {
  const icon = dirIconMap[name] || { default: FolderIcon, open: FolderOpenIcon }
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
