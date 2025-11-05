import React from "react";
import { Search, Bell, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";
import { useUser } from "../hooks/useData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router";
import authService from "@/services/authService";

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { data: user } = useUser();
  
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login')
  }

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, assignments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-colors duration-200"
            />
          </div>
        </div>
<div className="flex items-center space-x-4">
          {/* {userRole === "ADMIN" as UserRole && (
        <DropdownMenu>
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl py-2 px-3 shadow-xl border border-gray-200 dark:border-gray-700">
              <DropdownMenuTrigger className="text-sm font-medium text-gray-900 dark:text-white">
                Mode
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-2">
                <DropdownMenuItem
                  onClick={() => setUserRole("STUDENT")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    userRole === "STUDENT"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Student View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setUserRole("INSTRUCTOR")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    userRole === "INSTRUCTOR"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Instructor View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setUserRole("ADMIN")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    userRole === "ADMIN"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Admin View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        )} */}

        <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </Button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  Log out <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
      </div>
    </header>
  );
};
