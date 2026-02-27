import { useState } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Activity,
    Shield,
    DollarSign,
    Zap,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sensorTrendData, budgetChartData, riskTrendData, healthDistribution } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function Dashboard() {
    const { selectedProject: project, alerts: alertsList, dismissAlert, clearAlerts: clearAll } = useApp();
    const [alertFilter, setAlertFilter] = useState('all');

    const filteredAlerts = alertFilter === 'all' ? alertsList : alertsList.filter(a => a.severity === alertFilter);

    const kpis = [
        { label: 'Project Completion', value: `${project.completion}%`, trend: '+2.4%', trendUp: true, icon: CheckCircle2, footer: 'Trending up this month', footerSub: 'Progress for the last 6 months' },
        { label: 'Budget Utilization', value: `${Math.round((project.budgetUsed / project.budget) * 100)}%`, trend: '-1.2%', trendUp: false, icon: DollarSign, footer: 'Down 1.2% this period', footerSub: 'Spending needs attention' },
        { label: 'Structural Health', value: '87/100', trend: '+0.5%', trendUp: true, icon: Shield, footer: 'Strong structural integrity', footerSub: 'Health score across all assets' },
        { label: 'Active Alerts', value: `${alertsList.length}`, trend: alertsList.length < 5 ? `${5 - alertsList.length} dismissed` : 'Monitor', trendUp: false, icon: AlertTriangle, footer: `${alertsList.filter(a => a.severity === 'critical').length} critical`, footerSub: 'Alert resolution improving' },
        { label: 'Predicted Failures', value: '3', trend: '+1', trendUp: true, icon: Activity, footer: 'Needs monitoring', footerSub: 'AI predictions for next 30 days' },
        { label: 'ESG Score', value: '82/100', trend: '+5.3%', trendUp: true, icon: Zap, footer: 'Steady performance increase', footerSub: 'Meets sustainability targets' },
    ];

    const criticalAlerts = alertsList.filter((a) => a.severity === 'critical');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Real-time overview of {project.name}
                </p>
            </div>

            {/* Critical Alert Banner */}
            {criticalAlerts.length > 0 && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>{criticalAlerts.length} critical alert(s):</strong> {criticalAlerts[0].title} — {criticalAlerts[0].description}
                    </AlertDescription>
                </Alert>
            )}

            {/* KPI Cards */}
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-3">
                {kpis.map((kpi) => (
                    <Card key={kpi.label} className="@container/card py-3 gap-1.5">
                        <CardHeader className="px-4 gap-1">
                            <CardDescription className="text-xs">{kpi.label}</CardDescription>
                            <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
                                {kpi.value}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    {kpi.trendUp ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
                                    {kpi.trend}
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-0.5 text-xs px-4">
                            <div className="line-clamp-1 flex gap-1.5 font-medium">
                                {kpi.footer} {kpi.trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                            </div>
                            <div className="text-muted-foreground text-[11px]">
                                {kpi.footerSub}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sensors">Sensors</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                    <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-semibold">Project Timeline</CardTitle>
                                <CardDescription>Sensor trends over the past 30 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={sensorTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                        <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                                        <Line type="monotone" dataKey="value" name="Vibration" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                                        <Line type="monotone" dataKey="value2" name="Temperature" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-semibold">Health Distribution</CardTitle>
                                <CardDescription>Asset health breakdown by category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={healthDistribution}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, value }) => `${name}: ${value}`}
                                            labelLine={false}
                                            fontSize={11}
                                        >
                                            {healthDistribution.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="sensors">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold">Sensor Readings</CardTitle>
                            <CardDescription>30-day vibration and temperature trend</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={360}>
                                <LineChart data={sensorTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                    <Line type="monotone" dataKey="value" name="Vibration" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="value2" name="Temperature" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="budget">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold">Budget vs Actual</CardTitle>
                            <CardDescription>Quarterly budget comparison (₹ Lakhs)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={360}>
                                <BarChart data={budgetChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="value" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="value2" name="Spent" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="risk">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold">Risk Trend Analysis</CardTitle>
                            <CardDescription>Monthly risk score over the past year</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={360}>
                                <AreaChart data={riskTrendData}>
                                    <defs>
                                        <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                    <Area type="monotone" dataKey="value" name="Risk Score" stroke="#f59e0b" fill="url(#riskGrad)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Alerts Section with Management */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-semibold">Alerts & Notifications</CardTitle>
                            <CardDescription>{alertsList.length} active alerts</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tabs value={alertFilter} onValueChange={setAlertFilter}>
                                <TabsList className="h-7">
                                    <TabsTrigger value="all" className="text-[10px] h-5 px-2">All</TabsTrigger>
                                    <TabsTrigger value="critical" className="text-[10px] h-5 px-2">Critical</TabsTrigger>
                                    <TabsTrigger value="warning" className="text-[10px] h-5 px-2">Warning</TabsTrigger>
                                    <TabsTrigger value="info" className="text-[10px] h-5 px-2">Info</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            {alertsList.length > 0 && (
                                <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground" onClick={clearAll}>
                                    Clear all
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredAlerts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                            No alerts to show
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredAlerts.map((alert) => (
                                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group">
                                    <span
                                        className={cn(
                                            'mt-1.5 w-2 h-2 rounded-full shrink-0',
                                            alert.severity === 'critical' ? 'bg-red-500' :
                                                alert.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                        )}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium">{alert.title}</p>
                                            <Badge variant={alert.severity === 'critical' ? 'destructive' : 'outline'} className="text-[10px]">
                                                {alert.severity}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
                                        <p className="text-[10px] text-muted-foreground mt-1">{alert.assetName} · {alert.timestamp}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                        onClick={() => dismissAlert(alert.id)}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
