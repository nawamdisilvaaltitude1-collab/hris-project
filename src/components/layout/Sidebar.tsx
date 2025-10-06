import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  Target,
  FileText,
  UserPlus,
  BarChart3,
  Shield
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  permission?: string;
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employees', icon: Users, label: 'Employees', permission: 'view_employees' },
  { to: '/leaves', icon: Calendar, label: 'Leave Management', permission: 'view_leaves' },
  { to: '/attendance', icon: Clock, label: 'Attendance', permission: 'view_attendance' },
  { to: '/kpi', icon: Target, label: 'Performance', permission: 'view_kpi' },
  { to: '/documents', icon: FileText, label: 'Documents', permission: 'view_documents' },
  { to: '/recruitment', icon: UserPlus, label: 'Recruitment', permission: 'view_recruitment' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', permission: 'view_analytics' },
  { to: '/roles', icon: Shield, label: 'Role Management', permission: 'manage_roles' }
];

export const Sidebar: React.FC = () => {
  const { hasPermission } = usePermissions();

  const filteredNavItems = navItems.filter(item => 
    !item.permission || hasPermission(item.permission as any)
  );

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 w-64 fixed h-full shadow-sm border-r border-gray-200 dark:border-gray-700 pt-20 z-20"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {filteredNavItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};