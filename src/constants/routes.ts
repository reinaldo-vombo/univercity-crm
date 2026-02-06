export const ROUTES = {
  DASHBOARD: '/crm',
  ADMIN_DASHBORD: '/crm/admin',
  UNAUTHORIZED: '/unauthorized',
  LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
  RECOVER_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/recover-password`,
  RESET_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/apanel/reset-password`,
  CALENDAR: `${process.env.NEXT_PUBLIC_BASE_URL}/crm/management/calendar`,
  ACCOUNT: `${process.env.NEXT_PUBLIC_BASE_URL}/crm/profile`,
  SETTINGS: `${process.env.NEXT_PUBLIC_BASE_URL}/crm/settings`,
};
