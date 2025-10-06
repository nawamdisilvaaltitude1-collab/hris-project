import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { LeaveManagement } from './pages/LeaveManagement';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/employees" element={
            <ProtectedRoute requiredPermission="view_employees">
              <Layout>
                <Employees />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/leaves" element={
            <ProtectedRoute requiredPermission="view_leaves">
              <Layout>
                <LeaveManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/attendance" element={
            <ProtectedRoute requiredPermission="view_attendance">
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Time & Attendance
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is coming soon...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/kpi" element={
            <ProtectedRoute requiredPermission="view_kpi">
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    KPI & Performance Management
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is coming soon...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/documents" element={
            <ProtectedRoute requiredPermission="view_documents">
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Document Management
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is coming soon...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/recruitment" element={
            <ProtectedRoute requiredPermission="view_recruitment">
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Recruitment Management
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is coming soon...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute requiredPermission="view_analytics">
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Analytics & Insights
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is coming soon...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/roles" element={
            <ProtectedRoute requiredPermission="manage_roles">
              <Layout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Role Management
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This feature is coming soon...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;