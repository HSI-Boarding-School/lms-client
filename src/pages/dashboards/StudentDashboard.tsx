import React from "react";
import { Card } from "../../components/ui/CardPrimary";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { useCourses, useActivities } from "../../hooks/useData";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Trophy,
  Target,
} from "lucide-react";

export const StudentDashboard: React.FC = () => {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: activities, isLoading: activitiesLoading } = useActivities();

  if (coursesLoading || activitiesLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const totalProgress = courses
    ? Math.round(
        courses.reduce((acc, course) => acc + course.progress, 0) /
          courses.length
      )
    : 0;
  const completedCourses =
    courses?.filter((course) => course.progress === 100).length || 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome back, Student! 🎓</h1>
          <p className="text-xl opacity-90 mb-6">
            Continue your learning journey and achieve your goals
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">
                  {courses?.length || 0} Active Courses
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">
                  {completedCourses} Completed
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">
                  {totalProgress}% Overall Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Courses
            </h2>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses?.map((course, index) => (
              <Card
                key={course.id}
                className="overflow-hidden group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white mb-2">
                      <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <ProgressBar progress={course.progress} className="mb-4" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <Button variant="primary" size="sm">
                      Continue
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card glassmorphic className="p-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="neumorphic"
                className="w-full justify-start text-left"
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Browse Courses
              </Button>
              <Button
                variant="neumorphic"
                className="w-full justify-start text-left"
              >
                <Trophy className="h-5 w-5 mr-3" />
                View Certificates
              </Button>
              <Button
                variant="neumorphic"
                className="w-full justify-start text-left"
              >
                <Target className="h-5 w-5 mr-3" />
                Set Goals
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activities?.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeIn 0.6s ease-out forwards",
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    {activity.type === "course_completed" && (
                      <Trophy className="h-4 w-4 text-white" />
                    )}
                    {activity.type === "assignment_submitted" && (
                      <BookOpen className="h-4 w-4 text-white" />
                    )}
                    {activity.type === "certificate_earned" && (
                      <Trophy className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {activity.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {activity.description}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
