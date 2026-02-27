import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import { budgetData, budgetChartData, laborProductivityData, equipmentUtilizationData, projects } from '@/lib/mockData';
import {
    DollarSign, TrendingUp, TrendingDown, Wallet, Users, Fuel, ArrowUpRight,
} from 'lucide-react';

const fuelData = [
    { name: 'Jan', value: 45 }, { name: 'Feb', value: 52 }, { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 }, { name: 'May', value: 55 }, { name: 'Jun', value: 67 },
    { name: 'Jul', value: 72 }, { name: 'Aug', value: 65 }, { name: 'Sep', value: 58 },
    { name: 'Oct', value: 53 }, { name: 'Nov', value: 49 }, { name: 'Dec', value: 44 },
];

export default function Budget() {
    const project = projects[0];
    const budgetPct = Math.round((project.budgetUsed / project.budget) * 100);

    const summaryCards = [
        { label: 'Total Budget', value: `₹${(project.budget / 100).toFixed(0)} Cr`, icon: Wallet, trend: `${budgetPct}% utilized`, trendUp: budgetPct < 85, footer: 'Budget allocation for project', footerSub: 'Fiscal year 2025-26' },
        { label: 'Spent', value: `₹${(project.budgetUsed / 100).toFixed(0)} Cr`, icon: DollarSign, trend: `Under budget by ₹${((project.budget - project.budgetUsed) / 100).toFixed(1)} Cr`, trendUp: true, footer: 'Spending within target', footerSub: 'Cost efficiency maintained' },
        { label: 'Labor Productivity', value: '87%', icon: Users, trend: '+3.2%', trendUp: true, footer: 'Trending up this month', footerSub: '+3.2% from last month' },
        { label: 'Fuel Cost (Monthly)', value: '₹49L', icon: Fuel, trend: '-8.7%', trendUp: true, footer: 'Cost reduction achieved', footerSub: '-8.7% from last month' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Budget & Resources</h1>
                <p className="text-muted-foreground text-sm mt-1">Financial analytics and resource utilization</p>
            </div>

            {/* Summary Cards */}
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <Card key={card.label} className="@container/card py-3 gap-1.5">
                        <CardHeader className="px-4 gap-1">
                            <CardDescription className="text-xs">{card.label}</CardDescription>
                            <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
                                {card.value}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    {card.trendUp ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
                                    {card.trend}
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-0.5 text-xs px-4">
                            <div className="line-clamp-1 flex gap-1.5 font-medium">
                                {card.footer} {card.trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                            </div>
                            <div className="text-muted-foreground text-[11px]">
                                {card.footerSub}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Budget Allocation vs Spent</CardTitle>
                        <CardDescription>Comparison by category (₹ Lakhs)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
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

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Category Breakdown</CardTitle>
                        <CardDescription>Budget distribution by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {budgetData.map((item) => {
                                const pct = Math.round((item.used / item.allocated) * 100);
                                return (
                                    <div key={item.category} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-medium">{item.category}</span>
                                            <span className="text-muted-foreground">₹{item.used}L / ₹{item.allocated}L ({pct}%)</span>
                                        </div>
                                        <Progress
                                            value={pct}
                                            className={cn('h-1.5',
                                                pct > 90 ? '[&>div]:bg-red-500' : pct > 75 ? '[&>div]:bg-amber-500' : '[&>div]:bg-blue-500'
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-semibold">Labor Productivity</CardTitle>
                                <CardDescription>Monthly efficiency trend (%)</CardDescription>
                            </div>
                            <Badge variant="secondary" className="text-[10px]">
                                <ArrowUpRight className="w-3 h-3 mr-1" />12 months
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={laborProductivityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                <Line type="monotone" dataKey="value" name="Productivity %" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Equipment Utilization</CardTitle>
                        <CardDescription>Current utilization rate by equipment type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={equipmentUtilizationData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" width={100} />
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                <Bar dataKey="value" name="Utilization %" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Fuel Cost Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-semibold">Fuel Cost Trend</CardTitle>
                    <CardDescription>Monthly fuel expenditure (₹ Lakhs)</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={fuelData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                            <Line type="monotone" dataKey="value" name="Fuel Cost (₹L)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
