import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
    User, Bell, Shield, Palette, Globe, Database, Mail, Smartphone,
} from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your account and application preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Profile Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Arpit Patel</p>
                                <p className="text-xs text-muted-foreground">Project Manager</p>
                                <Badge variant="outline" className="mt-1 text-[10px]">Admin</Badge>
                            </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                                <Input defaultValue="Arpit Patel" className="h-9" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Email</label>
                                <Input defaultValue="arpit@infratwin.ai" className="h-9" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                                <Input defaultValue="+91 98765 43210" className="h-9" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Role</label>
                                <Input defaultValue="Project Manager" className="h-9" disabled />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button size="sm">Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
                        <CardDescription>Common settings at a glance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { icon: Bell, label: 'Push Notifications', desc: 'Get alerts on your device', defaultChecked: true },
                            { icon: Mail, label: 'Email Digests', desc: 'Daily summary via email', defaultChecked: true },
                            { icon: Smartphone, label: 'SMS Alerts', desc: 'Critical alerts via SMS', defaultChecked: false },
                            { icon: Shield, label: 'Two-Factor Auth', desc: 'Extra security layer', defaultChecked: true },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <item.icon className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{item.label}</p>
                                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                                <Switch defaultChecked={item.defaultChecked} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
                        <CardDescription>Customize the look and feel</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { icon: Palette, label: 'Theme', value: 'Light' },
                            { icon: Globe, label: 'Language', value: 'English' },
                            { icon: Database, label: 'Data Refresh', value: 'Every 30s' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">{item.value}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
                        <CardDescription>Control what alerts you receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: 'Critical Alerts', desc: 'Immediate notification for critical issues', defaultChecked: true },
                            { label: 'Maintenance Reminders', desc: 'Upcoming maintenance schedule alerts', defaultChecked: true },
                            { label: 'Budget Warnings', desc: 'Alerts when budget exceeds thresholds', defaultChecked: true },
                            { label: 'Weekly Reports', desc: 'Automated weekly summary reports', defaultChecked: false },
                            { label: 'System Updates', desc: 'Platform maintenance and updates', defaultChecked: false },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">{item.label}</p>
                                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                                </div>
                                <Switch defaultChecked={item.defaultChecked} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Danger Zone */}
            <Card className="border-red-200">
                <CardHeader>
                    <CardTitle className="text-sm font-semibold text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Delete Account</p>
                            <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive" size="sm">Delete Account</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
