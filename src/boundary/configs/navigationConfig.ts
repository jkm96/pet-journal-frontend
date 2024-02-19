export const NAVIGATION_LINKS = {
    HOME: '/',
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_CONDITIONS: '/terms-conditions',
    CUSTOMER_FEEDBACK: '/customer-feedback',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',

    PAYMENTS: '/payments',
    CHECKOUT_RETURN: '/payments/checkout-return',
    USER_DASHBOARD: '/dashboard',
    PET_PROFILES: '/dashboard/pet-profiles',
    DIARY_ENTRIES: '/dashboard/diary-entries',
    MY_DIARY: '/dashboard/my-diary',
    MAGIC_STUDIO: '/dashboard/magic-studio',
    TIMELINE_VIEW: '/dashboard/timeline-view',
    SETTINGS: '/dashboard/settings',

    ADMIN_LOGIN: '/auth/admin/login',
    ADMIN_DASHBOARD: '/admin/dashboard',
    MANAGE_USERS: '/admin/dashboard/users',
    MANAGE_USER_SUBSCRIPTIONS: '/admin/dashboard/user-subscriptions',
};

export const protectedRoutes = [
  NAVIGATION_LINKS.PAYMENTS,
  NAVIGATION_LINKS.CHECKOUT_RETURN,
  NAVIGATION_LINKS.USER_DASHBOARD,
  NAVIGATION_LINKS.PET_PROFILES,
  NAVIGATION_LINKS.DIARY_ENTRIES,
  NAVIGATION_LINKS.MY_DIARY,
  NAVIGATION_LINKS.MAGIC_STUDIO,
  NAVIGATION_LINKS.TIMELINE_VIEW,
  NAVIGATION_LINKS.SETTINGS,

  NAVIGATION_LINKS.ADMIN_DASHBOARD,
];
export const authRoutes = [
    NAVIGATION_LINKS.LOGIN,
    NAVIGATION_LINKS.REGISTER,
    NAVIGATION_LINKS.ADMIN_LOGIN,
];

export const publicRoutes = [
    NAVIGATION_LINKS.HOME,
    NAVIGATION_LINKS.PRIVACY_POLICY,
    NAVIGATION_LINKS.TERMS_CONDITIONS,
    NAVIGATION_LINKS.CUSTOMER_FEEDBACK,
];