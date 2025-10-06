import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@hris.com',
    name: 'Admin User',
    role: 'admin',
    department: 'Administration',
    position: 'System Administrator',
    joiningDate: '2020-01-15',
    phone: '+1234567890',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'hr@hris.com',
    name: 'HR Manager',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    joiningDate: '2020-03-10',
    phone: '+1234567891',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: '3',
    email: 'employee@hris.com',
    name: 'John Smith',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    joiningDate: '2021-06-15',
    phone: '+1234567892',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=200&h=200&fit=crop&crop=face'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string): Promise<boolean> => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (res.ok) {
            set({ user: data.user, isAuthenticated: true });
            return true;
          } else {
            throw new Error(data.error || 'Login failed');
          }
        } catch (err) {
          return false;
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);