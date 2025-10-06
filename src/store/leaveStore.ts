import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LeaveRequest } from '../types';

interface LeaveState {
  leaves: LeaveRequest[];
  loading: boolean;
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id' | 'appliedDate'>) => void;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => void;
  approveLeave: (id: string, approvedBy: string) => void;
  rejectLeave: (id: string, approvedBy: string, comments?: string) => void;
  getEmployeeLeaves: (employeeId: string) => LeaveRequest[];
  getPendingLeaves: () => LeaveRequest[];
}

// Mock leave data
const mockLeaves: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '3',
    type: 'vacation',
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    days: 5,
    reason: 'Family vacation',
    status: 'approved',
    appliedDate: '2024-01-01',
    approvedBy: '2',
    approvedDate: '2024-01-03'
  },
  {
    id: '2',
    employeeId: '4',
    type: 'sick',
    startDate: '2024-01-20',
    endDate: '2024-01-21',
    days: 2,
    reason: 'Flu symptoms',
    status: 'pending',
    appliedDate: '2024-01-18'
  },
  {
    id: '3',
    employeeId: '5',
    type: 'personal',
    startDate: '2024-02-01',
    endDate: '2024-02-02',
    days: 2,
    reason: 'Personal matters',
    status: 'pending',
    appliedDate: '2024-01-25'
  }
];

export const useLeaveStore = create<LeaveState>()(
  persist(
    (set, get) => ({
      leaves: mockLeaves,
      loading: false,
      addLeaveRequest: (leave) => {
        const newLeave = {
          ...leave,
          id: Date.now().toString(),
          appliedDate: new Date().toISOString().split('T')[0]
        };
        set(state => ({
          leaves: [...state.leaves, newLeave]
        }));
      },
      updateLeaveRequest: (id, updates) => {
        set(state => ({
          leaves: state.leaves.map(leave => 
            leave.id === id ? { ...leave, ...updates } : leave
          )
        }));
      },
      approveLeave: (id, approvedBy) => {
        set(state => ({
          leaves: state.leaves.map(leave => 
            leave.id === id ? {
              ...leave,
              status: 'approved' as const,
              approvedBy,
              approvedDate: new Date().toISOString().split('T')[0]
            } : leave
          )
        }));
      },
      rejectLeave: (id, approvedBy, comments) => {
        set(state => ({
          leaves: state.leaves.map(leave => 
            leave.id === id ? {
              ...leave,
              status: 'rejected' as const,
              approvedBy,
              approvedDate: new Date().toISOString().split('T')[0],
              comments
            } : leave
          )
        }));
      },
      getEmployeeLeaves: (employeeId) => {
        return get().leaves.filter(leave => leave.employeeId === employeeId);
      },
      getPendingLeaves: () => {
        return get().leaves.filter(leave => leave.status === 'pending');
      }
    }),
    {
      name: 'leave-storage'
    }
  )
);