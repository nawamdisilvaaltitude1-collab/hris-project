import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, Target, TrendingUp, Award, UserCheck, FileText } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { DepartmentChart } from '../components/charts/DepartmentChart';
import { AttendanceChart } from '../components/charts/AttendanceChart';
import { useEmployeeStore } from '../store/employeeStore';
import { useLeaveStore } from '../store/leaveStore';

export const Dashboard: React.FC = () => {
  const employees = useEmployeeStore(state => state.employees);
  const leaves = useLeaveStore(state => state.leaves);

  const metrics = {
    totalEmployees: employees.length,
    activeLeaves: leaves.filter(l => l.status === 'approved').length,
    presentToday: Math.floor(employees.length * 0.92), // Mock data
    pendingRequests: leaves.filter(l => l.status === 'pending').length,
    topPerformers: employees.filter(() => Math.random() > 0.7).length, // Mock data
    avgKpiScore: 78, // Mock data
    newHires: employees.filter(e => 
      new Date(e.joiningDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
    pendingDocuments: 5 // Mock data
  };

  const departmentData = employees.reduce((acc, emp) => {
    const existing = acc.find(d => d.department === emp.department);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ department: emp.department, count: 1, percentage: 0 });
    }
    return acc;
  }, [] as { department: string; count: number; percentage: number }[])
  .map(d => ({
    ...d,
    percentage: Math.round((d.count / employees.length) * 100)
  }));

  const attendanceData = [
    { date: '2024-01-15', present: 48, absent: 2, late: 3 },
    { date: '2024-01-16', present: 50, absent: 1, late: 2 },
    { date: '2024-01-17', present: 49, absent: 3, late: 1 },
    { date: '2024-01-18', present: 51, absent: 1, late: 1 },
    { date: '2024-01-19', present: 47, absent: 4, late: 2 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your team today.
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Employees"
          value={metrics.totalEmployees}
          icon={Users}
          change="+2 this month"
          changeType="positive"
          color="blue"
        />
        <MetricCard
          title="Active Leaves"
          value={metrics.activeLeaves}
          icon={Calendar}
          change="+3 from last week"
          changeType="neutral"
          color="yellow"
        />
        <MetricCard
          title="Present Today"
          value={`${metrics.presentToday}/${metrics.totalEmployees}`}
          icon={UserCheck}
          change="92% attendance rate"
          changeType="positive"
          color="green"
        />
        <MetricCard
          title="Pending Requests"
          value={metrics.pendingRequests}
          icon={Clock}
          change="Needs attention"
          changeType="negative"
          color="red"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Top Performers"
          value={metrics.topPerformers}
          icon={Award}
          change="+5% from last month"
          changeType="positive"
          color="purple"
        />
        <MetricCard
          title="Avg KPI Score"
          value={`${metrics.avgKpiScore}%`}
          icon={Target}
          change="+2% improvement"
          changeType="positive"
          color="green"
        />
        <MetricCard
          title="New Hires"
          value={metrics.newHires}
          icon={TrendingUp}
          change="This month"
          changeType="neutral"
          color="blue"
        />
        <MetricCard
          title="Pending Documents"
          value={metrics.pendingDocuments}
          icon={FileText}
          change="Awaiting review"
          changeType="neutral"
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart data={departmentData} />
        <AttendanceChart data={attendanceData} />
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activities
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                New employee Sarah Wilson joined Design team
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-2">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Leave request approved for John Smith
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2">
              <Target className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Monthly KPI scores updated for Engineering team
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};