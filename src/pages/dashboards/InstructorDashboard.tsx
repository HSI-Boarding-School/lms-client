import React from "react";
import { Card } from "../../components/ui/CardPrimary";
import { StatCard } from "../../components/ui/StatCard";
import { Button } from "../../components/ui/Button";
import { useCourses, useAnalytics } from "../../hooks/useData";
import {
  BookOpen,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit3,
  MoreHorizontal,
} from "lucide-react";

export const InstructorDashboard: React.FC = () => {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { isLoading: analyticsLoading } = useAnalytics();

  if (coursesLoading || analyticsLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const totalStudents =
    courses?.reduce((acc, course) => acc + course.students, 0) || 0;
  const pendingSubmissions = 23; // Mock data

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpolygon points=%2220 0 40 20 20 40 0 20%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Instructor Dashboard 👨‍🏫</h1>
          <p className="text-xl opacity-90 mb-6">
            Manage your courses and track student progress
          </p>
          <Button
            variant="secondary"
            className="bg-white/20 flex items-center justify-center text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Courses"
          value={courses?.length || 0}
          change={12}
          icon={<BookOpen className="h-8 w-8" />}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          change={8}
          icon={<Users className="h-8 w-8" />}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800"
        />
        <StatCard
          title="Pending Submissions"
          value={pendingSubmissions}
          change={-5}
          icon={<TrendingUp className="h-8 w-8" />}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Courses Table */}
        <div className="xl:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Courses
                </h3>
                <Button variant="primary" size="sm" className="flex items-center justify-center text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {courses?.map((course, index) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "slideUp 0.6s ease-out forwards",
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-12 w-16 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {course.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {course.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 dark:text-white font-medium">
                          {course.students.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Student Activity */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Recent Student Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Sarah Chen",
                  action: "completed assignment",
                  course: "React Development",
                  time: "2 hours ago",
                  avatar:
                    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                },
                {
                  name: "Mike Johnson",
                  action: "started quiz",
                  course: "UI/UX Design",
                  time: "4 hours ago",
                  avatar:
                    "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                },
                {
                  name: "Emily Davis",
                  action: "submitted project",
                  course: "Data Science",
                  time: "1 day ago",
                  avatar:
                    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                },
                {
                  name: "Alex Wilson",
                  action: "completed course",
                  course: "Digital Marketing",
                  time: "2 days ago",
                  avatar:
                    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeIn 0.6s ease-out forwards",
                  }}
                >
                  <img
                    src={activity.avatar}
                    alt={activity.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.action} in {activity.course}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card glassmorphic className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="neumorphic" className="w-full justify-start">
                <Plus className="h-5 w-5 mr-3" />
                Create Assignment
              </Button>
              <Button variant="neumorphic" className="w-full justify-start">
                <BookOpen className="h-5 w-5 mr-3" />
                Grade Submissions
              </Button>
              <Button variant="neumorphic" className="w-full justify-start">
                <TrendingUp className="h-5 w-5 mr-3" />
                View Analytics
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
