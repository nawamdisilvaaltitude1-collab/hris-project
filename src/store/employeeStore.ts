import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Employee } from '../types';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployee: (id: string) => Employee | undefined;
  getEmployeesByDepartment: (department: string) => Employee[];
  searchEmployees: (query: string) => Employee[];
}

// Mock employee data
const mockEmployees: Employee[] = [
  {
    id: '3',
    employeeId: 'EMP001',
    email: 'employee@hris.com',
    name: 'John Smith',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    joiningDate: '2021-06-15',
    phone: '+1234567892',
    age: 28,
    status: 'active',
    salary: 75000,
    university: 'MIT',
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    manager: '2',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: '4',
    employeeId: 'EMP002',
    email: 'jane.doe@hris.com',
    name: 'Jane Doe',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    joiningDate: '2022-01-10',
    phone: '+1234567893',
    age: 26,
    status: 'active',
    salary: 65000,
    university: 'Stanford',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    manager: '2',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: '5',
    employeeId: 'EMP003',
    email: 'mike.johnson@hris.com',
    name: 'Mike Johnson',
    role: 'employee',
    department: 'Sales',
    position: 'Sales Representative',
    joiningDate: '2021-11-20',
    phone: '+1234567894',
    age: 30,
    status: 'active',
    salary: 55000,
    university: 'UCLA',
    skills: ['Sales', 'CRM', 'Lead Generation', 'Negotiation'],
    manager: '2',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: '6',
    employeeId: 'EMP004',
    email: 'sarah.wilson@hris.com',
    name: 'Sarah Wilson',
    role: 'employee',
    department: 'Design',
    position: 'UI/UX Designer',
    joiningDate: '2022-03-05',
    phone: '+1234567895',
    age: 25,
    status: 'active',
    salary: 70000,
    university: 'RISD',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    manager: '2',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=200&h=200&fit=crop&crop=face'
  }
];

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: mockEmployees,
      loading: false,
      addEmployee: (employee) => {
        const newEmployee = {
          ...employee,
          id: Date.now().toString(),
          employeeId: `EMP${String(get().employees.length + 1).padStart(3, '0')}`
        };
        set(state => ({
          employees: [...state.employees, newEmployee]
        }));
      },
      updateEmployee: (id, updates) => {
        set(state => ({
          employees: state.employees.map(emp => 
            emp.id === id ? { ...emp, ...updates } : emp
          )
        }));
      },
      deleteEmployee: (id) => {
        set(state => ({
          employees: state.employees.filter(emp => emp.id !== id)
        }));
      },
      getEmployee: (id) => {
        return get().employees.find(emp => emp.id === id);
      },
      getEmployeesByDepartment: (department) => {
        return get().employees.filter(emp => emp.department === department);
      },
      searchEmployees: (query) => {
        const employees = get().employees;
        if (!query) return employees;
        
        const lowercaseQuery = query.toLowerCase();
        return employees.filter(emp => 
          emp.name.toLowerCase().includes(lowercaseQuery) ||
          emp.department.toLowerCase().includes(lowercaseQuery) ||
          emp.position.toLowerCase().includes(lowercaseQuery) ||
          emp.employeeId.toLowerCase().includes(lowercaseQuery)
        );
      }
    }),
    {
      name: 'employee-storage'
    }
  )
);