import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { useEmployeeStore } from '../store/employeeStore';
import { usePermissions } from '../hooks/usePermissions';
import { Employee } from '../types';

export const Employees: React.FC = () => {
  const { employees, deleteEmployee } = useEmployeeStore();
  const { hasPermission } = usePermissions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
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
            Employee Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your team members and their information
          </p>
        </div>
        {hasPermission('manage_employees') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </motion.button>
        )}
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 self-center">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </div>
      </motion.div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={employee.avatar || `https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=60&h=60&fit=crop&crop=face`}
                alt={employee.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {employee.employeeId}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {employee.position}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {employee.department}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="w-3 h-3" />
                <span>{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="w-3 h-3" />
                  <span>{employee.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                employee.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {employee.status}
              </span>

              {hasPermission('manage_employees') && (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(employee.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>

            {employee.skills && employee.skills.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {employee.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {employee.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded">
                      +{employee.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No employees found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};