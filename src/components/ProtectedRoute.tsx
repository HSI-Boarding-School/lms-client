import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, allowedRoles}) => {
    const {isAuthenticated, isLoading, user, checkAuth} = useAuthStore();
    

    // check auth on mount 
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            checkAuth()
        }
    }, [isAuthenticated, isLoading, checkAuth])

    // loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
      </div>
        )
    }

    // not authenticated 
    if (!isAuthenticated) {
        return <Navigate to={'/login'}  replace/>
    }

    // check role if specified
    if (allowedRoles && allowedRoles.length > 0) {
        // extract role names from user.roles array
        const userRoleNames = user?.roles?.map((role) => role.name) || []

        console.log('🔐 Checking roles:', {
            userRoles: userRoleNames,
            allowedRoles: allowedRoles
        });

        // check if user has any of the allowed roles
        const hasRequiredRole = allowedRoles.some((allowedRole) => {
            userRoleNames.includes(allowedRole)
        })

        if (!hasRequiredRole) {
            console.warn("Acces denied!", {
                userRoles: userRoleNames,
                requiredRoles: allowedRoles
            })
            return <Navigate to="/login"/>
        }

        console.log("Acces granted!")
    }

    return <>{children}</>

}

export default ProtectedRoute;