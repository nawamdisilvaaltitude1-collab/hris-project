export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'hr' | 'admin';
  avatar?: string;
  department: string;
  position: string;
  joiningDate: string;
  phone?: string;
  address?: string;
}

export interface Employee extends User {
  employeeId: string;
  salary?: number;
  university?: string;
  age: number;
  status: 'active' | 'inactive';
  manager?: string;
  skills: string[];
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  hoursWorked: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface KPIRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  score: number;
  category: 'performer' | 'needs-improvement';
  goals: Goal[];
  feedback?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  achieved: number;
  status: 'in-progress' | 'completed' | 'overdue';
}

export interface Document {
  id: string;
  employeeId: string;
  name: string;
  type: 'contract' | 'id' | 'certificate' | 'resume' | 'other';
  url: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: number;
  skills: string[];
  resumeUrl?: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  publishedDate: string;
  publishedBy: string;
  isActive: boolean;
  targetRoles: string[];
}

export interface DashboardMetrics {
  totalEmployees: number;
  activeLeaves: number;
  pendingRequests: number;
  presentToday: number;
  topPerformers: number;
  avgKpiScore: number;
  newHires: number;
  pendingDocuments: number;
}