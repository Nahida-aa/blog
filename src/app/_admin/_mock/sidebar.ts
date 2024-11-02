import { Calendar, ChevronDown, ChevronsUpDown, ChevronUp, Home, Inbox, Search, Settings, User2, Link as FriendLink, MessageSquareText, BookMarked, Tags, ChartSpline, UserCog, WandSparkles, PanelsTopLeft, FileCog, Palette, Command, Server, Sparkles,Telescope, LayoutDashboard } from "lucide-react"
// Menu Group and items.
import { MenuGroup } from "@/components/layout/sidebar"
export const admin_MenuGroups: MenuGroup[] = [
  {
    name: 'Statistic',
    items: [
      {
        name: "Dashboard",
        path: "/admin",
        items: []
      },
      {
        name: "Analytics",
        path: "/admin/analytics",
        items: []
      },
      {
        name: "Resource",
        path: "/admin/resource",
        items: []
      },
    ],
  },
  {
    name: 'Blog',
    items: [
      {
        name: "Posts",
        path: "/admin/blog",
        items: []
      },
      {
        name: "Comments",
        path: "/admin/blog/comments",
        items: []
      },
      {
        name: "Tags",
        path: "/admin/blog/tags",
      },
      {
        name: "Friends",
        path: "/admin/blog/friends",
      },
    ],
  },
  {
    name: 'Users',
    items: [
      {
        name: "UserCog",
        path: "/admin/users",
        items: []
      },
    ],
  },
  {
    name: "",
    items: [
      {
        name: "Settings",
        path: "/admin/settings",
        items: [
          {
            name: "Setting File",
            path: "/admin/settings/settings.json",
          },
          {
            name: "Keyboard",
            path: "/admin/settings/keyboard",
          },
          {
            name: "theme",
            path: "/admin/settings/theme",
            items: [
              {
                name: "layout",
                path: "/admin/settings/theme/layout",
                items: []
              },
              {
                name: "Color",
                path: "/admin/settings/theme/color",
                items: []
              },
            ]
          }
        ]
      },
      {
        name: "Inbox",
        path: "/admin/Inbox",
        items: []
      }

    ],
  }
]