import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Check, X, Filter } from 'lucide-react';
import { useLeaveStore } from '../store/leaveStore';
import { useEmployeeStore } from '../store/employeeStore';
import { useAuthStore } from '../store/authStore';
import { usePermissions } from '../hooks/usePermissions';
import { LeaveRequest } from '../types';

export const LeaveManagement: React.FC = () => {
  const { leaves, approveLeave, rejectLeave } = useLeaveStore();
  const { employees } = useEmployeeStore();
  const user = useAuthStore(state => state.user);
  const { hasPermission } = usePermissions();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.name || 'Unknown Employee';
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesStatus = !statusFilter || leave.status === statusFilter;
    const matchesUser = hasPermission('manage_leaves') || leave.employeeId === user?.id;
    return matchesStatus && matchesUser;
  });

  const handleApprove = (leaveId: string) => {
    if (user) {
      approveLeave(leaveId, user.id);
    }
  };

  const handleReject = (leaveId: string) => {
    if (user) {
      const reason = prompt('Please provide a reason for rejection:');
      rejectLeave(leaveId, user.id, reason || undefined);
    }
  };

  const getStatusColor = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getLeaveTypeColor = (type: LeaveRequest['type']) => {
    switch (type) {
      case 'vacation':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sick':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'personal':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'maternity':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'paternity':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Leave Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {hasPermission('manage_leaves') 
              ? 'Manage leave requests and approve/reject applications'
              : 'View your leave requests and balances'
            }
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Request Leave</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {leaves.length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {leaves.filter(l => l.status === 'pending').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-3xl font-bold text-green-600">
                {leaves.filter(l => l.status === 'approved').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
              <p className="text-3xl font-bold text-red-600">
                {leaves.filter(l => l.status === 'rejected').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredLeaves.length} of {leaves.length} requests
          </div>
        </div>
      </motion.div>

      {/* Leave Requests */}
      <div className="space-y-4">
        {filteredLeaves.map((leave, index) => (
          <motion.div
            key={leave.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getEmployeeName(leave.employeeId)}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(leave.type)}`}>
                    {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Days</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {leave.days} day{leave.days !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Applied</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(leave.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reason</p>
                  <p className="text-sm text-gray-900 dark:text-white">{leave.reason}</p>
                </div>

                {leave.comments && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
                    <p className="text-sm text-gray-900 dark:text-white">{leave.comments}</p>
                  </div>
                )}
              </div>

              {hasPermission('manage_leaves') && leave.status === 'pending' && (
                <div className="flex space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(leave.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-1 text-sm transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReject(leave.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center space-x-1 text-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredLeaves.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No leave requests found.
          </p>
        </motion.div>
      )}
    </div>
  );
};