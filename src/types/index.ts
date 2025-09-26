export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  rating: number;
  duration: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface Activity {
  id: string;
  type: 'course_completed' | 'assignment_submitted' | 'quiz_taken' | 'certificate_earned';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  course?: string;
}

export interface Analytics {
  totalUsers: number;
  activeCourses: number;
  certificatesIssued: number;
  totalRevenue: number;
  monthlyGrowth: number;
  userGrowth: number[];
  courseCompletions: number[];
  revenueData: number[];
}