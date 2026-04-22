import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created",
          description: "The account was created. It still needs the admin role before it can manage site content.",
        });
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Welcome back", description: "You are now signed in to the maintenance dashboard." });
        navigate("/admin");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.22),transparent_38%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,0.96))] p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-red-200">NIMAK admin</p>
          <h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight">
            Manage homepage content from one maintenance dashboard.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Sign in to update services, hero copy, contact details, and navigation labels without touching the code.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Hero and messaging</p>
              <p className="mt-2 text-sm text-slate-400">Adjust first impressions and key CTAs fast.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Service cards</p>
              <p className="mt-2 text-sm text-slate-400">Keep offers aligned with operations and sales.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Contact info</p>
              <p className="mt-2 text-sm text-slate-400">Update phone numbers, email, and map link in one place.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white p-8 text-slate-950 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">{isSignUp ? "Create admin account" : "Sign in"}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {isSignUp
                ? "Create an account first, then assign the Supabase admin role before using the dashboard."
                : "Use your admin account credentials to access the content editor."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full bg-slate-950 text-white hover:bg-slate-800" disabled={loading}>
              {isSignUp ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
              {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-slate-500">
            {isSignUp ? "Already have an account?" : "Need a new account?"}{" "}
            <button type="button" onClick={() => setIsSignUp((current) => !current)} className="font-medium text-red-600 hover:text-red-500">
              {isSignUp ? "Switch to sign in" : "Create one"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
