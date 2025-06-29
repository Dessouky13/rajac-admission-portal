
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SharedNavigation from "@/components/SharedNavigation";

const Auth: React.FC = () => {
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"signup" | "login" | "show-credentials">("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard if form exists, otherwise to form
  React.useEffect(() => {
    if (user) {
      // Check if form exists
      supabase
        .from("admission_forms")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            navigate("/dashboard", {replace:true});
          } else {
            navigate("/form", {replace:true});
          }
        });
    }
  // eslint-disable-next-line
  }, [user, navigate, step]);

  // SIGNUP: collect father name, email, password
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { father_name: fatherName },
        emailRedirectTo: `${window.location.origin}/form`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setStep("show-credentials");
    }
  };

  // LOGIN: with email and password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // After successful login, check if form exists to redirect appropriately
      const { data } = await supabase
        .from("admission_forms")
        .select("id")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .maybeSingle();
      
      if (data) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/form", { replace: true });
      }
    }
  };

  const switchToLogin = () => {
    setStep("login");
    setError(null);
  };

  const switchToSignUp = () => {
    setStep("signup");
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-cairo">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-10">
        <SharedNavigation showBackButton={false} />
      </div>

      <form
        onSubmit={step === "signup" ? handleSignUp : step === "login" ? handleLogin : undefined}
        className="bg-[#f6fef9] shadow-lg rounded-xl p-6 w-full max-w-md border border-green-200 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          {step === "signup"
            ? "Sign up for Admission Portal"
            : step === "login"
            ? "Login"
            : "Account Created"}
        </h2>

        {step === "signup" && (
          <>
            <label className="text-left font-medium text-green-700 mb-2">
              Father's Name
            </label>
            <Input
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="Enter Father's Name"
              required
              autoFocus
            />

            <label className="text-left font-medium text-green-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />

            <label className="text-left font-medium text-green-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
              {loading ? "Creating..." : "Sign Up"}
            </Button>
            <div className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-green-700 underline font-medium"
              >
                Login
              </button>
            </div>
          </>
        )}

        {step === "login" && (
          <>
            <label className="text-left font-medium text-green-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
            />

            <label className="text-left font-medium text-green-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center">
              Need to sign up?{" "}
              <button
                type="button"
                onClick={switchToSignUp}
                className="text-green-700 underline font-medium"
              >
                Sign Up
              </button>
            </div>
          </>
        )}

        {step === "show-credentials" && (
          <div className="flex flex-col gap-3 items-center">
            <div className="text-green-900 font-semibold text-lg mb-2">
              Registration successful!
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-2 w-full text-center">
              <div className="mb-1 font-semibold">Your Login Details:</div>
              <div>
                <span className="font-medium">Email:</span>
                <span className="ml-2">{email}</span>
              </div>
              <div>
                <span className="font-medium">Password:</span>
                <span className="ml-2">{password}</span>
              </div>
              <div className="mt-2 text-sm text-yellow-800 font-medium">
                Please take a screenshot or photo of this screen.<br />
                You will need these credentials <span className="font-bold">when your son is approved</span>.
              </div>
            </div>
            <Button
              type="button"
              className="w-full bg-green-700 hover:bg-green-800"
              onClick={() => navigate("/form", { replace: true })}
            >
              Proceed to Admission Form
            </Button>
          </div>
        )}

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};
export default Auth;
