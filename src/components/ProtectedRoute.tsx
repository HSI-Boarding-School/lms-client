import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated, isLoading, user, checkAuth} = useAuthStore();
    
    console.log("🟡 PROTECTED ROUTE - State:", { isAuthenticated, isLoading, hasUser: !!user });

    useEffect(() => {
        console.log("🟡 PROTECTED ROUTE - useEffect triggered");
        if (!isAuthenticated && !isLoading) {
            console.log("🟡 PROTECTED ROUTE - Calling checkAuth");
            checkAuth()
        }
    }, [isAuthenticated, isLoading, checkAuth])

    if (isLoading) {
        console.log("🟡 PROTECTED ROUTE - Showing loading...");
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        console.log("🔴 PROTECTED ROUTE - NOT authenticated, redirecting to /login");
        return <Navigate to={'/login'} replace/>
    }

    console.log("🟢 PROTECTED ROUTE - Authenticated, showing content");
    
    // ... rest of role checking code
    
    return <>{children}</>
}

export default ProtectedRoute;