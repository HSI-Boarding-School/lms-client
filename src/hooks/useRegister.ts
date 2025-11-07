import authService, { RegisterCredentials } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, RegisterCredentials>({
    mutationFn: (data) => authService.register(data),

    onSuccess: () => {
      toast.success("Account created successfully! 🎉 Please login.");
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Account created successfully! 🎉 Please login." },
        });
      }, 2000);
    },

    onError: (err) => {
      toast.error(err.message || "Registration failed, please try again")
    }
  });
};
