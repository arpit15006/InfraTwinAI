import { useState } from 'react';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Activity,
    Eye,
    EyeOff,
    ArrowRight,
} from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.href = '/';
        }, 1500);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex flex-1 bg-primary flex-col justify-between p-10 text-primary-foreground">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">InfraTwin AI</p>
                        <p className="text-xs text-white/60 tracking-widest uppercase">Digital Twin Platform</p>
                    </div>
                </div>

                <div className="space-y-6 max-w-lg">
                    <h1 className="text-4xl font-extrabold leading-tight">
                        Infrastructure Intelligence,{' '}
                        <span className="text-emerald-300">Reimagined.</span>
                    </h1>
                    <p className="text-white/70 text-base leading-relaxed">
                        Monitor, predict, and optimize infrastructure health with AI-powered digital twins.
                        Reduce downtime by up to 50% and cut maintenance costs by 40%.
                    </p>
                    <div className="flex gap-6 pt-4">
                        {[
                            { value: '40%', label: 'Cost Reduction' },
                            { value: '50%', label: 'Downtime Cut' },
                            { value: '94%', label: 'Prediction Accuracy' },
                        ].map((stat) => (
                            <div key={stat.label} className="px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-center">
                                <p className="text-2xl font-bold text-emerald-300">{stat.value}</p>
                                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-white/30">
                    Trusted by 50+ infrastructure projects worldwide
                </p>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-background">
                <div className="w-full max-w-sm space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Welcome back</CardTitle>
                            <CardDescription>Sign in to your account to continue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@infratwin.ai"
                                        defaultValue="admin@infratwin.ai"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="text-xs text-primary hover:underline underline-offset-4">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            defaultValue="password123"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                                        </Button>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full gap-2" disabled={loading}>
                                    {loading ? 'Signing in...' : (
                                        <>Sign in <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-background text-muted-foreground">or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2 text-sm">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </Button>
                        <Button variant="outline" className="gap-2 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                        </Button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-primary font-medium hover:underline underline-offset-4">
                            Request access
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
