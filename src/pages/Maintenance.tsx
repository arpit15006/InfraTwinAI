import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
    AlertTriangle, Wrench, DollarSign, Calendar as CalendarIcon, TrendingDown, TrendingUp, Clock, CheckCircle2, Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function Maintenance() {
    const { assets, scheduleMaintenance: globalScheduleMaintenance } = useApp();
    const criticalAssets = assets.filter((a) => a.riskLevel === 'critical' || a.riskLevel === 'high');
    const urgentCount = assets.filter((a) => a.daysToFailure < 30).length;
    const potentialSavings = criticalAssets.reduce((acc, a) => acc + a.estimatedRepairCost * 0.3, 0);
    const scheduledCount = assets.filter((a) => a.nextMaintenance).length;

    const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState('');
    const [scheduleDate, setScheduleDate] = useState<Date>();
    const [scheduleType, setScheduleType] = useState('preventive');
    const [scheduleDesc, setScheduleDesc] = useState('');
    const openScheduleDialog = (assetId: string) => {
        setSelectedAssetId(assetId);
        setScheduleDate(undefined);
        setScheduleType('preventive');
        setScheduleDesc('');
        setScheduleDialogOpen(true);
    };

    const handleSchedule = () => {
        if (!scheduleDate) return;
        globalScheduleMaintenance(selectedAssetId, scheduleDate.toISOString().split('T')[0]);
        setScheduleDialogOpen(false);
    };

    const riskHeatmap = assets
        .sort((a, b) => b.failureProbability - a.failureProbability)
        .slice(0, 10)
        .map((a) => ({
            name: a.name.length > 20 ? a.name.slice(0, 20) + '...' : a.name,
            value: a.failureProbability,
        }));

    const summaryCards = [
        { label: 'Critical Risk', value: criticalAssets.length, icon: AlertTriangle, trend: 'High priority', trendUp: false, footer: 'Assets at risk need attention', footerSub: 'assets at risk' },
        { label: 'Urgent Maintenance', value: urgentCount, icon: Wrench, trend: 'Due soon', trendUp: false, footer: `Due within 30 days`, footerSub: 'Schedule maintenance now' },
        { label: 'Potential Savings', value: `₹${(potentialSavings / 100000).toFixed(0)}L`, icon: DollarSign, trend: 'Preventive', trendUp: true, footer: 'With preventive action', footerSub: 'Estimated cost reduction' },
        { label: 'Scheduled', value: scheduledCount, icon: CalendarIcon, trend: 'On track', trendUp: true, footer: 'Maintenance tasks planned', footerSub: 'All tasks scheduled' },
    ];

    const selectedAsset = assets.find(a => a.id === selectedAssetId);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Predictive Maintenance</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        AI-powered failure predictions and maintenance scheduling
                    </p>
                </div>
                <Button className="gap-2" onClick={() => { setSelectedAssetId(criticalAssets[0]?.id || ''); setScheduleDialogOpen(true); }}>
                    <Plus className="w-4 h-4" />
                    Schedule Maintenance
                </Button>
            </div>

            {/* Schedule Maintenance Dialog */}
            <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Schedule Maintenance</DialogTitle>
                        <DialogDescription>
                            {selectedAsset ? `Schedule maintenance for ${selectedAsset.name}` : 'Select an asset and schedule maintenance'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-xs">Asset</Label>
                            <Select value={selectedAssetId} onValueChange={setSelectedAssetId}>
                                <SelectTrigger className="col-span-3 h-9">
                                    <SelectValue placeholder="Select asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assets.map(a => (
                                        <SelectItem key={a.id} value={a.id}>{a.name} ({a.id})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-xs">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "col-span-3 h-9 justify-start text-left font-normal",
                                            !scheduleDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {scheduleDate ? format(scheduleDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={scheduleDate}
                                        onSelect={setScheduleDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-xs">Type</Label>
                            <Select value={scheduleType} onValueChange={setScheduleType}>
                                <SelectTrigger className="col-span-3 h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="preventive">Preventive</SelectItem>
                                    <SelectItem value="corrective">Corrective</SelectItem>
                                    <SelectItem value="inspection">Inspection</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-xs">Notes</Label>
                            <Input className="col-span-3 h-9" placeholder="Add description..." value={scheduleDesc} onChange={e => setScheduleDesc(e.target.value)} />
                        </div>
                        {selectedAsset && (
                            <div className="grid grid-cols-3 gap-2 ml-[calc(25%+1rem)]">
                                <div className="text-center p-2 rounded bg-red-50 border border-red-100">
                                    <p className="text-xs font-bold text-red-600">{selectedAsset.daysToFailure}d</p>
                                    <p className="text-[10px] text-muted-foreground">To Failure</p>
                                </div>
                                <div className="text-center p-2 rounded bg-muted border">
                                    <p className="text-xs font-bold">{selectedAsset.failureProbability}%</p>
                                    <p className="text-[10px] text-muted-foreground">Failure Risk</p>
                                </div>
                                <div className="text-center p-2 rounded bg-emerald-50 border border-emerald-100">
                                    <p className="text-xs font-bold text-emerald-600">₹{(selectedAsset.estimatedRepairCost * 0.3 / 100000).toFixed(1)}L</p>
                                    <p className="text-[10px] text-muted-foreground">Savings</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSchedule} disabled={!selectedAssetId || !scheduleDate}>
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            Schedule
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Summary */}
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-2 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-4">
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Risk Heatmap</CardTitle>
                        <CardDescription>Top 10 assets by failure probability (%)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={riskHeatmap} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" width={130} />
                                <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }} />
                                <Bar dataKey="value" name="Failure %" fill="#ef4444" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* AI Predictions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">AI Predictions</CardTitle>
                        <CardDescription>Assets with highest failure probability</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {criticalAssets.slice(0, 5).map((asset) => (
                                <div key={asset.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="text-sm font-medium">{asset.name}</p>
                                            <p className="text-[10px] text-muted-foreground">{asset.id}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={cn('text-[10px]',
                                                    asset.failureProbability > 70 ? 'text-red-600 border-red-200 bg-red-50' :
                                                        'text-amber-600 border-amber-200 bg-amber-50'
                                                )}
                                            >
                                                {asset.failureProbability}% risk
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-2">
                                        <div className="text-center p-1.5 rounded bg-muted/50">
                                            <p className="text-xs font-bold text-red-600">{asset.daysToFailure}d</p>
                                            <p className="text-[10px] text-muted-foreground">To Failure</p>
                                        </div>
                                        <div className="text-center p-1.5 rounded bg-muted/50">
                                            <p className="text-xs font-bold">₹{(asset.estimatedRepairCost / 100000).toFixed(1)}L</p>
                                            <p className="text-[10px] text-muted-foreground">Est. Cost</p>
                                        </div>
                                        <div className="text-center p-1.5 rounded bg-muted/50">
                                            <p className="text-xs font-bold text-emerald-600">₹{(asset.estimatedRepairCost * 0.3 / 100000).toFixed(1)}L</p>
                                            <p className="text-[10px] text-muted-foreground">Savings</p>
                                        </div>
                                    </div>
                                    {asset.status === 'warning' && asset.nextMaintenance ? (
                                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Maintenance Scheduled
                                        </div>
                                    ) : (
                                        <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => openScheduleDialog(asset.id)}>
                                            <CalendarIcon className="w-3 h-3 mr-1" />
                                            Schedule Maintenance
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Maintenance */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-semibold">Upcoming Maintenance Schedule</CardTitle>
                    <CardDescription>Tasks due in the next 60 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {assets
                            .filter((a) => a.nextMaintenance)
                            .sort((a, b) => new Date(a.nextMaintenance!).getTime() - new Date(b.nextMaintenance!).getTime())
                            .slice(0, 6)
                            .map((asset) => (
                                <div key={asset.id} className="flex items-center gap-4 p-3 rounded-lg border">
                                    <div className={cn(
                                        'p-2 rounded-lg',
                                        asset.daysToFailure < 15 ? 'bg-red-50' :
                                            asset.daysToFailure < 30 ? 'bg-amber-50' : 'bg-blue-50'
                                    )}>
                                        <Clock className={cn('w-4 h-4',
                                            asset.daysToFailure < 15 ? 'text-red-600' :
                                                asset.daysToFailure < 30 ? 'text-amber-600' : 'text-blue-600'
                                        )} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{asset.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Preventive maintenance · {asset.nextMaintenance}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium">{asset.daysToFailure} days left</p>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
                                            <TrendingDown className="w-3 h-3 text-emerald-500" />
                                            Save ₹{(asset.estimatedRepairCost * 0.3 / 100000).toFixed(1)}L
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

