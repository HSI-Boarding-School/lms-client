import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle2, Lock, Check } from "lucide-react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Password reset for:", password);
    setIsSubmitted(true);
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6)
      return { strength: 33, text: "Weak", color: "bg-red-500" };
    if (password.length < 10)
      return { strength: 66, text: "Medium", color: "bg-yellow-500" };
    return { strength: 100, text: "Strong", color: "bg-green-500" };
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /[0-9]/.test(password) },
  ];

  const strength = passwordStrength(password);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500">

      {/* Reset Password Card */}
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        {!isSubmitted ? (
          <>
            <CardHeader className="space-y-1 pb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Set New Password 🔑
              </CardTitle>
              <CardDescription className="text-center">
                Your new password must be different from previous passwords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">
                          Password strength:
                        </span>
                        <span
                          className={`font-medium ${
                            strength.text === "Weak"
                              ? "text-red-600"
                              : strength.text === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {strength.text}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${strength.color}`}
                          style={{ width: `${strength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-medium text-gray-700">
                      Password must contain:
                    </p>
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            req.met ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {req.met && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span
                          className={`text-xs ${
                            req.met
                              ? "text-green-700 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password === confirmPassword && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Passwords match</span>
                    </div>
                  )}
                  {confirmPassword && password !== confirmPassword && (
                    <div className="flex items-center gap-1 text-xs text-red-600">
                      <span>Passwords do not match</span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-1 pb-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Password Reset! 🎉
              </CardTitle>
              <CardDescription className="text-center">
                Your password has been successfully reset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 text-center">
                    You can now sign in with your new password
                  </p>
                </div>

                <Button
                  onClick={() => console.log("Navigate to login")}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg"
                >
                  Continue to Sign In
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    You will be redirected to the login page in 5 seconds...
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-white text-sm text-center">
        <p>© 2025 HSI BS LMS. All rights reserved.</p>
      </div>
    </div>
  );
}
