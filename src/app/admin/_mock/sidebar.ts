import { Calendar, ChevronDown, ChevronsUpDown, ChevronUp, Home, Inbox, Search, Settings, User2, Link as FriendLink, MessageSquareText, BookMarked, Tags, ChartSpline, UserCog, WandSparkles, PanelsTopLeft, FileCog, Palette, Command, Server, Sparkles,Telescope, LayoutDashboard } from "lucide-react"
// Menu Group and items.
import { MenuGroup } from "@/components/layout/sidebar"
export const admin_MenuGroups: MenuGroup[] = [
  {
    name: 'Statistic',
    items: [
      {
        name: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
        items: []
      },
      {
        name: "Analytics",
        url: "/admin/analytics",
        icon: ChartSpline,
        items: []
      },
      {
        name: "Resource",
        url: "/admin/resource",
        icon: Sparkles,
        items: []
      },
    ],
  },
  {
    name: 'Blog',
    items: [
      {
        name: "Posts",
        url: "/admin/blog",
        icon: BookMarked,
        items: []
      },
      {
        name: "Comments",
        url: "/admin/blog/comments",
        icon: MessageSquareText,
        items: []
      },
      {
        name: "Tags",
        url: "/admin/blog/tags",
        icon: Tags,
      },
      {
        name: "Friends",
        url: "/admin/blog/friends",
        icon: FriendLink,
      },
    ],
  },
  {
    name: 'Users',
    items: [
      {
        name: "UserCog",
        url: "/admin/users",
        icon: UserCog,
        items: []
      },
    ],
  },
  {
    name: "",
    items: [
      {
        name: "Settings",
        url: "/admin/settings",
        icon: Settings,
        items: [
          {
            name: "Setting File",
            url: "/admin/settings/settings.json",
            icon: FileCog,
          },
          {
            name: "Keyboard",
            url: "/admin/settings/keyboard",
            icon: Command,
          },
          {
            name: "theme",
            url: "/admin/settings/theme",
            icon: Palette,
            items: [
              {
                name: "layout",
                url: "/admin/settings/theme/layout",
                icon: PanelsTopLeft,
                items: []
              },
              {
                name: "Color",
                url: "/admin/settings/theme/color",
                icon: WandSparkles,
                items: []
              },
            ]
          }
        ]
      },
      {
        name: "Inbox",
        url: "/admin/Inbox",
        icon: Inbox,
        items: []
      }

    ],
  }
]