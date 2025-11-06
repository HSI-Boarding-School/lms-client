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
import { useAuthStore } from "@/store/authStore";

function AppContent() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const setUserRole = useUserRoleStore((state) => state.setUserRole);
  const { data: user } = useUser();
  const { getRole } = useAuthStore.getState();

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user, setUserRole]);

  const role = getRole();
  const renderDashboard = () => {
    switch (role) {
      case "TEACHER":
        return <InstructorDashboard />;
      case "ADMIN":
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  console.log("decoded roles:", role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        role={role}
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
