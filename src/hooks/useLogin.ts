import authService, { LoginCredentials, LoginResponse } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (creds: LoginCredentials) => authService.login(creds) as Promise<LoginResponse>,
    onMutate: async (creds) => {
      return { username: creds.email }
    },
    onError: (error, _variables) => {
      console.error("Login failed", error)
      toast.error(error.message || "Invalid email or password")
    },
    onSuccess: (data) => {
      const token = data.data.token
      localStorage.setItem('token', token)

      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      toast.success("Login sucessfully!")
    },
    onSettled: () => {
      
    }
  })
}