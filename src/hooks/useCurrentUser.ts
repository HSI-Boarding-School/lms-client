import authService, { UserData } from "@/services/authService"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
  return useQuery<UserData>({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: !!localStorage.getItem("token"),
    staleTime: 1000 * 60 * 30,
    retry: false
  })
}