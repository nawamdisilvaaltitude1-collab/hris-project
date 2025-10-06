import { useAuthStore } from '../store/authStore';

export type Permission = 
  | 'view_dashboard'
  | 'view_employees'
  | 'manage_employees'
  | 'view_leaves'
  | 'manage_leaves'
  | 'view_attendance'
  | 'manage_attendance'
  | 'view_kpi'
  | 'manage_kpi'
  | 'view_documents'
  | 'manage_documents'
  | 'view_recruitment'
  | 'manage_recruitment'
  | 'view_analytics'
  | 'manage_roles';

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    'view_dashboard',
    'view_employees',
    'manage_employees',
    'view_leaves',
    'manage_leaves',
    'view_attendance',
    'manage_attendance',
    'view_kpi',
    'manage_kpi',
    'view_documents',
    'manage_documents',
    'view_recruitment',
    'manage_recruitment',
    'view_analytics',
    'manage_roles'
  ],
  hr: [
    'view_dashboard',
    'view_employees',
    'manage_employees',
    'view_leaves',
    'manage_leaves',
    'view_attendance',
    'view_kpi',
    'manage_kpi',
    'view_documents',
    'manage_documents',
    'view_recruitment',
    'manage_recruitment',
    'view_analytics'
  ],
  employee: [
    'view_dashboard',
    'view_employees',
    'view_leaves',
    'view_attendance',
    'view_kpi',
    'view_documents'
  ]
};

export const usePermissions = () => {
  const user = useAuthStore(state => state.user);
  
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole: user?.role
  };
};