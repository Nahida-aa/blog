// permission
type PermissionLevel = 'read' | 'write' | 'admin'
export const ADMIN = 'admin'
export function hasPermission(userPermissions: string[], permission: string, level?: PermissionLevel): boolean {
  if (userPermissions.includes(ADMIN)) return true
  if (level) {
    if (userPermissions.includes(`${permission}.admin`)) return true
    if (level === 'read' && userPermissions.includes(`${permission}.write`)) return true
    return userPermissions.includes(`${permission}.${level}`)
  }
  return userPermissions.includes(permission)
}

export function addPermission(permissions: string[], permission: string): string[] {
  if (!permissions.includes(permission)) {
    permissions.push(permission);
  }
  return permissions;
}

export function removePermission(permissions: string[], permission: string): string[] {
  return permissions.filter(perm => perm !== permission);
}
/*
 * 切换权限
 * 如果用户拥有权限，则移除权限；否则，添加权限
 */
export function togglePermission(permissions: string[], permission: string): string[] {
  if (permissions.includes(permission)) {
    return permissions.filter(perm => perm !== permission);
  } else {
    permissions.push(permission);
  }
  return permissions;
}




