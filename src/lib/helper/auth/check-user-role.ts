export function isAdmin(role: string): boolean {
  return ['manager', 'admin', 'super_admin', 'editor'].includes(role);
}
