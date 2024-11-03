// "use client";
import { Calendar, ChevronDown, ChevronsUpDown, ChevronUp, Home, Inbox, Search, Settings, User2, Link as FriendLink, MessageSquareText, BookMarked, Tags, ChartSpline, UserCog, WandSparkles, PanelsTopLeft, FileCog, Palette, Command, Server, Sparkles,Telescope, LayoutDashboard,SquareTerminal, Boxes,Infinity as InfinityIcon,Sigma, FolderTree,Github, Box, BoxIcon, FileCode,Wrench, SquareAsterisk  } from "lucide-react"
// Menu Group and items.
import { MenuGroup, MenuItem } from "@/components/layout/sidebar/tree/TreeMenuNode"
import path from "path"
import { getFileTree } from "@/lib/file/getTree"


const dir = path.join(process.cwd(), 'src/app/(blog)/md/blog') // 假设你的文件在 app/content 目录下
const fileTree = getFileTree(dir,'/aa')
console.log(`fileTree`)


export const blog_ContentMenuItems: MenuItem[] = [
  {name: "Blog", path: "/aa", type: "button",
    items: fileTree
  },
  {name: "Comments", path: "/comment/test", },
  {name: "Tags", path: "/tags", },
  {name: "Friends", path: "/friends", },
  {name: "VSCode", path: "/vscode", },
  {name: "MC", path: "/mc", },
  {name: "tools", path: "/tools", type: "button",
    items: [
      { name: "api", path: "/tools/api", },
      { name: "mdx", path: "/tools/mdx",  },
      { name: "decode", path: "/tools/decode" },
    ]
  },
]