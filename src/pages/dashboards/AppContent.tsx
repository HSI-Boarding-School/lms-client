import { useUser } from "@/hooks/useData";
import { useEffect, useState } from "react";
import { InstructorDashboard } from "./InstructorDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Navigate, Route, Routes } from "react-router";
import { Menu } from "lucide-react";
import { ProfilePage } from "@/pages/users/ProfilePage";
import { UsersPage } from "@/pages/users/UsersPage";
import { useUserRoleStore } from "@/store/userStore";

function AppContent() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userRole = useUserRoleStore((state) => state.userRole);
  const setUserRole = useUserRoleStore((state) => state.setUserRole);
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
    </div>
  );
}

export default AppContent;
