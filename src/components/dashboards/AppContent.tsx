import { useUser } from "@/hooks/useData";
import { useEffect, useState } from "react";
import { InstructorDashboard } from "./InstructorDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { Navigate, Route, Routes } from "react-router";
import { Menu } from "lucide-react";
import { ProfilePage } from "@/pages/ProfilePage";
import { UsersPage } from "@/pages/UsersPage";

function AppContent() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<"student" | "instructor" | "admin">(
    "student"
  );
  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user]);

  const renderDashboard = () => {
    switch (userRole) {
      case "instructor":
        return <InstructorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        userRole={userRole}
        currentView={currentView}
        onViewChange={setCurrentView}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Header />

        <main className="p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={renderDashboard()} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
      </div>

      {/* Demo Controls */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Demo Mode
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setUserRole("student")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                userRole === "student"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => setUserRole("instructor")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                userRole === "instructor"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Instructor View
            </button>
            <button
              onClick={() => setUserRole("admin")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                userRole === "admin"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Admin View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppContent;
