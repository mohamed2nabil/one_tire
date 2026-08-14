'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      // 1. Sign in with Firebase Client SDK
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2. Exchange for secure HTTP-only session cookie
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to create server session');
      }

      // 3. Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-sans text-foreground relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl opacity-50 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Branding header */}
        <div className="mb-10 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="size-6 text-primary" />
          </div>
          <h2 className="text-3xl font-display font-extrabold tracking-tight">
            ONE<span className="text-primary">TIRE</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-medium tracking-wide uppercase">
            Secure Admin Portal
          </p>
        </div>

        <Card className="border border-border/50 bg-card shadow-2xl shadow-black/5 dark:shadow-primary/5 backdrop-blur-xl rounded-xl">
          <CardHeader className="space-y-2 border-b border-border/50 pb-6 pt-8 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-xs font-medium">
              Enter your credentials to manage the platform.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 pt-6">
              {error && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3.5 text-sm text-destructive font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-2.5">
                <Label htmlFor="email" className="font-semibold text-xs uppercase tracking-wider">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@onetire.sa"
                    className="pl-10 h-12 bg-background/50 focus-visible:ring-primary focus-visible:ring-2 transition-all"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="password" className="font-semibold text-xs uppercase tracking-wider">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 bg-background/50 focus-visible:ring-primary focus-visible:ring-2 transition-all"
                    required
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 pb-8 px-6">
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-lg h-12" 
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
