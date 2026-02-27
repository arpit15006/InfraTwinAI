import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    AreaChart, Area, BarChart, Bar, Line,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import { esgMetrics, carbonTrendData } from '@/lib/mockData';
import {
    Leaf, Zap, Droplets, Recycle, TrendingDown, TrendingUp, Target, Award,
} from 'lucide-react';

const energyData = [
    { name: 'Jan', value: 420 }, { name: 'Feb', value: 395 }, { name: 'Mar', value: 410 },
    { name: 'Apr', value: 380 }, { name: 'May', value: 365 }, { name: 'Jun', value: 340 },
    { name: 'Jul', value: 325 }, { name: 'Aug', value: 310 }, { name: 'Sep', value: 295 },
    { name: 'Oct', value: 285 }, { name: 'Nov', value: 270 }, { name: 'Dec', value: 260 },
];

const waterData = [
    { name: 'Jan', value: 850, target: 900 }, { name: 'Feb', value: 820, target: 880 },
    { name: 'Mar', value: 880, target: 860 }, { name: 'Apr', value: 760, target: 840 },
    { name: 'May', value: 710, target: 820 }, { name: 'Jun', value: 680, target: 800 },
    { name: 'Jul', value: 650, target: 780 }, { name: 'Aug', value: 620, target: 760 },
    { name: 'Sep', value: 590, target: 740 }, { name: 'Oct', value: 560, target: 720 },
    { name: 'Nov', value: 540, target: 700 }, { name: 'Dec', value: 520, target: 680 },
];

export default function Sustainability() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sustainability & ESG</h1>
                    <p className="text-muted-foreground text-sm mt-1">Environmental, Social, and Governance metrics</p>
                </div>
                <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 border-emerald-200 bg-emerald-50">
                    <Award className="w-3.5 h-3.5" />
                    ESG Score: {esgMetrics.sustainabilityScore}/100
                </Badge>
            </div>

            {/* ESG KPI Cards */}
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        label: 'Carbon Emissions', value: `${esgMetrics.carbonEmissions} tCO₂`, icon: Leaf,
                        trend: `${Math.round(((esgMetrics.carbonTarget - esgMetrics.carbonEmissions) / esgMetrics.carbonTarget) * 100)}% below target`, trendUp: true,
                        footer: 'Emissions trending down', footerSub: `Target: ${esgMetrics.carbonTarget} tCO₂`,
                        pctValue: Math.round((esgMetrics.carbonEmissions / esgMetrics.carbonTarget) * 100), barColor: '[&>div]:bg-emerald-500'
                    },
                    {
                        label: 'Energy Efficiency', value: `${esgMetrics.energyEfficiency}%`, icon: Zap,
                        trend: '+5.3%', trendUp: true,
                        footer: 'Efficiency improving', footerSub: `Consumption: ${esgMetrics.energyConsumption} MWh`,
                        pctValue: esgMetrics.energyEfficiency, barColor: '[&>div]:bg-amber-500'
                    },
                    {
                        label: 'Water Usage', value: `${esgMetrics.waterUsage} KL`, icon: Droplets,
                        trend: `${Math.round(((esgMetrics.waterTarget - esgMetrics.waterUsage) / esgMetrics.waterTarget) * 100)}% below target`, trendUp: true,
                        footer: 'Water conservation on track', footerSub: `Target: ${esgMetrics.waterTarget} KL`,
                        pctValue: Math.round((esgMetrics.waterUsage / esgMetrics.waterTarget) * 100), barColor: '[&>div]:bg-blue-500'
                    },
                    {
                        label: 'Waste Recycled', value: `${esgMetrics.wasteRecycled}%`, icon: Recycle,
                        trend: '7% to target', trendUp: false,
                        footer: 'Approaching recycling goal', footerSub: 'Target: 80%',
                        pctValue: esgMetrics.wasteRecycled, barColor: '[&>div]:bg-purple-500'
                    },
                ].map((card) => (
                    <Card key={card.label} className="@container/card py-3 gap-1.5">
                        <CardHeader className="px-4 gap-1">
                            <CardDescription className="text-xs">{card.label}</CardDescription>
                            <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
                                {card.value}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    {card.trendUp ? <TrendingUp className="size-2.5" /> : <Target className="size-2.5" />}
                                    {card.trend}
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1 text-xs px-4">
                            <Progress value={card.pctValue} className={cn('h-1 w-full', card.barColor)} />
                            <div className="line-clamp-1 flex gap-1.5 font-medium">
                                {card.footer} {card.trendUp ? <TrendingDown className="size-3 text-emerald-500" /> : <Target className="size-3 text-amber-500" />}
                            </div>
                            <div className="text-muted-foreground text-[11px]">
                                {card.footerSub}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Sustainability Score Gauge */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative w-48 h-48 shrink-0">
                            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                                <circle
                                    cx="100" cy="100" r="80" fill="none"
                                    stroke="url(#scoreGrad)" strokeWidth="12"
                                    strokeDasharray={`${2 * Math.PI * 80 * esgMetrics.sustainabilityScore / 100} ${2 * Math.PI * 80}`}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#22c55e" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-4xl font-bold">{esgMetrics.sustainabilityScore}</p>
                                <p className="text-xs text-muted-foreground">out of 100</p>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">Sustainability Performance</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your project is performing above industry average. Carbon emissions are 17% below target,
                                    and energy efficiency has improved by 5.3% this quarter.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Above Industry Avg', value: '+12%', color: 'text-emerald-600' },
                                    { label: 'YoY Improvement', value: '+8.5%', color: 'text-blue-600' },
                                    { label: 'Green Certifications', value: '3', color: 'text-purple-600' },
                                    { label: 'Compliance Score', value: '96%', color: 'text-amber-600' },
                                ].map((item) => (
                                    <div key={item.label} className="p-3 rounded-lg border">
                                        <p className={cn('text-lg font-bold', item.color)}>{item.value}</p>
                                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Carbon Emissions Trend</CardTitle>
                        <CardDescription>Actual vs target (tCO₂ per month)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={carbonTrendData}>
                                <defs>
                                    <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                <Legend wrapperStyle={{ fontSize: '11px' }} />
                                <Area type="monotone" dataKey="value" name="Actual" stroke="#22c55e" fill="url(#carbonGrad)" strokeWidth={2} />
                                <Line type="monotone" dataKey="value2" name="Target" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Energy Consumption</CardTitle>
                        <CardDescription>Monthly energy usage (MWh)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={energyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                <Bar dataKey="value" name="Energy (MWh)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Water Usage */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Water Usage vs Target</CardTitle>
                    <CardDescription>Monthly water consumption (Kiloliters)</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={waterData}>
                            <defs>
                                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Area type="monotone" dataKey="value" name="Actual" stroke="#3b82f6" fill="url(#waterGrad)" strokeWidth={2} />
                            <Line type="monotone" dataKey="target" name="Target" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
