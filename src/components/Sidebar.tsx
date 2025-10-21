import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileText,
  Trophy,
  AlignCenterVertical as Certificate,
  User,
  Users,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";
import { NavLink } from "react-router";

interface SidebarProps {
  userRole: "student" | "instructor" | "admin";
  currentView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = {
  student: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "quizzes", label: "Quizzes", icon: ClipboardList },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "grades", label: "Grades", icon: Trophy },
    { id: "certificates", label: "Certificates", icon: Certificate },
    { id: "profile", label: "Profile", icon: User },
  ],
  instructor: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
  ],
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ],
};

export const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  isCollapsed,
  onToggle,
}) => {
  const items = menuItems[userRole];


  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50",
          isCollapsed ? "-translate-x-full lg:w-20" : "w-64",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HSI BS LMS
                </h1>
              )}
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {items.map((item) => (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) =>
                  cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive &&
                      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg",
                    isCollapsed ? "justify-center" : "justify-start"
                  )
                }
              >
                <item.icon
                  className={cn("h-5 w-5", isCollapsed ? "mx-0" : "mx-0")}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Welcome back!
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {userRole} Dashboard
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
