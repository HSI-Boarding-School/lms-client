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
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Password reset request for:", email);
    setIsSubmitted(true);
  };

  const handleResend = () => {
    console.log("Resending email to:", email);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500">

      {/* Forgot Password Card */}
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        {!isSubmitted ? (
          <>
            <CardHeader className="space-y-1 pb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Forgot Password? 🔒
              </CardTitle>
              <CardDescription className="text-center">
                No worries, we'll send you reset instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                  <p className="text-xs text-gray-500">
                    Enter the email address associated with your account
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg"
                >
                  Send Reset Link
                </Button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign in
                </button>
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
                Check Your Email 📧
              </CardTitle>
              <CardDescription className="text-center">
                We've sent a password reset link to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-900">{email}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 text-center">
                    <strong>Didn't receive the email?</strong> Check your spam
                    folder or click the button below to resend
                  </p>
                </div>

                <Button
                  onClick={handleResend}
                  variant="secondary"
                  className="w-full h-11 border-2"
                >
                  Resend Email
                </Button>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Forgot Password
                </button>
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
