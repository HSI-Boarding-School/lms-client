import { useQuery } from "@tanstack/react-query";
import { User, Course, Activity, Analytics } from "../types";

// Mock data
const mockUser: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "student",
  status: "active",
  joinDate: "2024-01-15",
  lastLogin: "2 hours ago",
  avatar:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  coursesEnrolled: 4,
};

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Development",
    description: "Master modern React patterns and state management",
    instructor: "Sarah Chen",
    thumbnail:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    progress: 68,
    totalLessons: 24,
    completedLessons: 16,
    category: "Development",
    difficulty: "Advanced",
    students: 1247,
    rating: 4.8,
    duration: "8 weeks",
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles and user experience best practices",
    instructor: "Marcus Rodriguez",
    thumbnail:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    progress: 42,
    totalLessons: 18,
    completedLessons: 8,
    category: "Design",
    difficulty: "Intermediate",
    students: 892,
    rating: 4.6,
    duration: "6 weeks",
  },
  {
    id: "3",
    title: "Data Science with Python",
    description:
      "Comprehensive introduction to data analysis and machine learning",
    instructor: "Dr. Emily Watson",
    thumbnail:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    progress: 15,
    totalLessons: 32,
    completedLessons: 5,
    category: "Data Science",
    difficulty: "Intermediate",
    students: 2156,
    rating: 4.9,
    duration: "12 weeks",
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    description: "Build effective marketing campaigns across digital channels",
    instructor: "James Wilson",
    thumbnail:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    progress: 89,
    totalLessons: 16,
    completedLessons: 14,
    category: "Marketing",
    difficulty: "Beginner",
    students: 3421,
    rating: 4.7,
    duration: "4 weeks",
  },
];

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "course_completed",
    title: "Course Completed",
    description: 'You completed "JavaScript Fundamentals"',
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "assignment_submitted",
    title: "Assignment Submitted",
    description: "React Components Project submitted for review",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "certificate_earned",
    title: "Certificate Earned",
    description: "Web Development Fundamentals Certificate",
    timestamp: "3 days ago",
  },
];

const mockAnalytics: Analytics = {
  totalUsers: 12847,
  activeCourses: 156,
  certificatesIssued: 8932,
  totalRevenue: 284750,
  monthlyGrowth: 12.5,
  userGrowth: [
    1200, 1890, 2380, 3490, 4200, 5100, 6200, 7100, 8200, 9500, 10800, 12847,
  ],
  courseCompletions: [45, 67, 89, 123, 156, 189, 234, 267, 301, 389, 445, 498],
  revenueData: [
    15000, 23000, 31000, 42000, 51000, 63000, 78000, 89000, 105000, 128000,
    156000, 184000,
  ],
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => Promise.resolve(mockUser),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => Promise.resolve(mockCourses),
    staleTime: 5 * 60 * 1000,
  });
};

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: () => Promise.resolve(mockActivities),
    staleTime: 2 * 60 * 1000,
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => Promise.resolve(mockAnalytics),
    staleTime: 10 * 60 * 1000,
  });
};
