import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  late: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Attendance Trends
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" />
            <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
            <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};