import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import {
    AlertTriangle, CheckCircle2, Eye, Thermometer, Gauge, ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function DigitalTwin() {
    const { assets } = useApp();
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? assets : assets.filter((a) => {
        if (filter === 'critical') return a.riskLevel === 'critical' || a.riskLevel === 'high';
        if (filter === 'warning') return a.riskLevel === 'medium';
        return a.status === 'operational';
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'operational': return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Operational</Badge>;
            case 'warning': return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
            case 'critical': return <Badge variant="destructive">Critical</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Digital Twin</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Interactive infrastructure asset overview
                </p>
            </div>

            {/* Filter Tabs */}
            <Tabs value={filter} onValueChange={setFilter}>
                <TabsList>
                    <TabsTrigger value="all">All ({assets.length})</TabsTrigger>
                    <TabsTrigger value="critical">Critical ({assets.filter(a => a.riskLevel === 'critical' || a.riskLevel === 'high').length})</TabsTrigger>
                    <TabsTrigger value="warning">Warning ({assets.filter(a => a.riskLevel === 'medium').length})</TabsTrigger>
                    <TabsTrigger value="operational">Operational ({assets.filter(a => a.status === 'operational').length})</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((asset) => (
                    <Card key={asset.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-sm font-semibold">{asset.name}</CardTitle>
                                    <CardDescription className="text-xs mt-0.5">{asset.id} · {asset.type}</CardDescription>
                                </div>
                                {getStatusBadge(asset.status)}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Health Score */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Health Score</span>
                                    <span className="font-semibold">{asset.healthScore}/100</span>
                                </div>
                                <Progress
                                    value={asset.healthScore}
                                    className={cn('h-2',
                                        asset.healthScore > 80 ? '[&>div]:bg-emerald-500' :
                                            asset.healthScore > 60 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'
                                    )}
                                />
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                    <AlertTriangle className={cn('w-3.5 h-3.5', asset.failureProbability > 50 ? 'text-red-500' : 'text-amber-500')} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Failure Prob.</p>
                                        <p className="text-sm font-semibold">{asset.failureProbability}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                    <Thermometer className="w-3.5 h-3.5 text-blue-500" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Temp</p>
                                        <p className="text-sm font-semibold">{asset.sensorReadings?.temperature ?? 'N/A'}°C</p>
                                    </div>
                                </div>
                            </div>

                            {/* View Details */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full gap-2 text-xs" size="sm">
                                        <Eye className="w-3.5 h-3.5" /> View Details
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>{asset.name}</DialogTitle>
                                        <DialogDescription>{asset.id} · {asset.type} · Last inspected: {asset.lastInspection}</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-6 mt-4">
                                        {/* Sensor Readings */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { label: 'Vibration', value: `${asset.sensorReadings.vibration} mm/s`, icon: Gauge, color: 'text-blue-600' },
                                                { label: 'Temperature', value: `${asset.sensorReadings.temperature}°C`, icon: Thermometer, color: 'text-red-500' },
                                                { label: 'Strain', value: `${asset.sensorReadings.strain} με`, icon: ArrowUpRight, color: 'text-purple-600' },
                                            ].map((s) => (
                                                <div key={s.label} className="p-3 rounded-lg border text-center">
                                                    <s.icon className={cn('w-4 h-4 mx-auto', s.color)} />
                                                    <p className="text-lg font-bold mt-1">{s.value}</p>
                                                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Sensor History Chart */}
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-semibold">30-Day Sensor History</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ResponsiveContainer width="100%" height={220}>
                                                    <LineChart data={asset.sensorHistory}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                        <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                                        <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                                        <Line type="monotone" dataKey="vibration" name="Vibration" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                                        <Line type="monotone" dataKey="temperature" name="Temperature" stroke="#ef4444" strokeWidth={2} dot={false} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>

                                        {/* Maintenance History */}
                                        <div>
                                            <h3 className="text-sm font-semibold mb-2">Maintenance History</h3>
                                            <div className="space-y-2">
                                                {asset.maintenanceHistory.map((m, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium">{m.type}</p>
                                                            <p className="text-[10px] text-muted-foreground">{m.description}</p>
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <p className="text-[10px] font-medium">{m.date}</p>
                                                            <p className="text-[10px] text-muted-foreground">₹{(m.cost / 1000).toFixed(0)}K</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* AI Suggestion */}
                                        {asset.failureProbability > 40 && (
                                            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                                                <p className="text-xs font-semibold text-amber-800 mb-1">🤖 AI Maintenance Suggestion</p>
                                                <p className="text-xs text-amber-700">
                                                    Based on sensor trends, this asset has a {asset.failureProbability}% probability of failure within {asset.daysToFailure} days.
                                                    Recommend scheduling preventive maintenance to avoid estimated ₹{(asset.estimatedRepairCost / 100000).toFixed(1)}L in repair costs.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
