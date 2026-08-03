export function isAdmin(role: string): boolean {
  return ['ADMIN', 'SUPER_ADMIN'].includes(role);
}
