import { LayoutDashboard, Users, BookMarked, Settings, Circle } from 'lucide-react'
export const routes = [
  {
    href: '/admin',
    icon: LayoutDashboard,
    title: 'Dashboard',
    subRoutes: [
      { href: '/admin/overview', title: 'Overview', icon: Circle },
      { href: '/admin/analytics', title: 'Analytics', icon: Circle },
    ],
  },
  {
    href: '/admin/analytics',
    icon: LayoutDashboard,
    title: 'Products',
    subRoutes: [
      { href: '/admin/products/list', title: 'Product List', icon: Circle },
      { href: '/admin/products/categories', title: 'Product Categories', icon: Circle },
      { href: '/admin/products/tags', title: 'Product Tags', icon: Circle },
    ],
  },
  {
    href: '/admin/users',
    icon: Users,
    title: 'Users',
    subRoutes: [
      { href: '/admin/users/list', title: 'User List', icon: Circle },
      { href: '/admin/users/roles', title: 'User Roles', icon: Circle },
      { href: '/admin/users/permissions', title: 'User Permissions', icon: Circle },
    ],
  },
  {
    href: '/admin/blog',
    icon: BookMarked,
    title: 'Blog',
    subRoutes: [
      { href: '/admin/blog/posts', title: 'Posts', icon: Circle },
      { href: '/admin/blog/comments', title: 'Comments', icon: Circle },
      { href: '/admin/blog/tags', title: 'Categories', icon: Circle },
      { href: '/admin/blog/friends', title: 'Authors', icon: Circle },
    ],
  },
  {
    href: '/admin/settings',
    icon: Settings,
    title: 'Settings',
    subRoutes: [
      { href: '/admin/settings/general', title: 'General', icon: Circle },
      { href: '/admin/settings/security', title: 'Security', icon: Circle },
    ],
  },
]
