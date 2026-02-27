import { useState } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
    Search, ChevronLeft, ChevronRight, Warehouse, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Asset } from '@/types';
import { useApp } from '@/context/AppContext';

function generateId(list: Asset[]) {
    return `AST-${String(list.length + 1).padStart(3, '0')}`;
}

function riskFromHealth(score: number): Asset['riskLevel'] {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'high';
    return 'critical';
}

function statusFromHealth(score: number): Asset['status'] {
    if (score >= 80) return 'operational';
    if (score >= 50) return 'warning';
    return 'critical';
}

export default function Assets() {
    const { assets: assetsList, addAsset } = useApp();
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const perPage = 8;

    // Add Asset form state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState<string>('');
    const [newLocation, setNewLocation] = useState('');
    const [newHealthScore, setNewHealthScore] = useState('85');

    const handleAddAsset = () => {
        if (!newName || !newType) return;
        const healthScore = parseInt(newHealthScore) || 85;
        const newAsset: Asset = {
            id: generateId(assetsList),
            name: newName,
            type: newType as Asset['type'],
            healthScore,
            vibration: +(Math.random() * 5 + 1).toFixed(1),
            temperature: +(Math.random() * 20 + 25).toFixed(1),
            loadStress: Math.round(Math.random() * 50 + 30),
            corrosionLevel: +(Math.random() * 0.5).toFixed(2),
            crackProbability: Math.round(Math.random() * 30),
            failureProbability: Math.round(100 - healthScore + Math.random() * 10),
            riskLevel: riskFromHealth(healthScore),
            lastInspection: new Date().toISOString().split('T')[0],
            maintenanceDueDate: '2026-06-01',
            location: newLocation || 'Section A',
            status: statusFromHealth(healthScore),
            installDate: new Date().toISOString().split('T')[0],
            sensorHistory: [],
            maintenanceHistory: [],
            sensorReadings: {
                vibration: +(Math.random() * 5 + 1).toFixed(1),
                temperature: +(Math.random() * 20 + 25).toFixed(1),
                strain: Math.round(Math.random() * 50 + 30),
            },
            daysToFailure: Math.round(healthScore * 2),
            estimatedRepairCost: Math.round((100 - healthScore) * 5000),
            nextMaintenance: '2026-06-15',
        };
        addAsset(newAsset);
        setDialogOpen(false);
        setNewName(''); setNewType(''); setNewLocation(''); setNewHealthScore('85');
        setPage(1);
    };

    const filtered = assetsList.filter((a) => {
        if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
        if (typeFilter !== 'all' && a.type !== typeFilter) return false;
        if (statusFilter !== 'all' && a.status !== statusFilter) return false;
        return true;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);
    const types = [...new Set(assetsList.map((a) => a.type))];

    const summaryCards = [
        { label: 'Total Assets', value: assetsList.length, icon: Warehouse, footer: 'All registered infrastructure assets', trend: `${assetsList.length} tracked`, trendUp: true },
        { label: 'Operational', value: assetsList.filter(a => a.status === 'operational').length, icon: CheckCircle2, footer: 'Assets running normally', trend: 'Healthy status', trendUp: true },
        { label: 'Warning', value: assetsList.filter(a => a.status === 'warning').length, icon: AlertTriangle, footer: 'Require monitoring', trend: 'Needs attention', trendUp: false },
        { label: 'Critical', value: assetsList.filter(a => a.status === 'critical').length, icon: XCircle, footer: 'Immediate action required', trend: 'High priority', trendUp: false },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Assets</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Monitor and manage all infrastructure assets
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Asset
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[480px]">
                        <DialogHeader>
                            <DialogTitle>Register New Asset</DialogTitle>
                            <DialogDescription>Add a new infrastructure asset to monitor</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-xs">Name</Label>
                                <Input className="col-span-3 h-9" placeholder="e.g. Bridge Pillar P-15" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-xs">Type</Label>
                                <Select value={newType} onValueChange={setNewType}>
                                    <SelectTrigger className="col-span-3 h-9">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bridge">Bridge</SelectItem>
                                        <SelectItem value="road">Road</SelectItem>
                                        <SelectItem value="pillar">Pillar</SelectItem>
                                        <SelectItem value="beam">Beam</SelectItem>
                                        <SelectItem value="tunnel">Tunnel</SelectItem>
                                        <SelectItem value="metro">Metro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-xs">Location</Label>
                                <Input className="col-span-3 h-9" placeholder="e.g. Section B, KM 14.5" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-xs">Health Score</Label>
                                <div className="col-span-3 space-y-1.5">
                                    <Input className="h-9" type="number" min="0" max="100" value={newHealthScore} onChange={(e) => setNewHealthScore(e.target.value)} />
                                    <div className="flex items-center gap-2">
                                        <Progress value={parseInt(newHealthScore) || 0} className={cn('h-1.5 flex-1',
                                            (parseInt(newHealthScore) || 0) > 80 ? '[&>div]:bg-emerald-500' :
                                                (parseInt(newHealthScore) || 0) > 60 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'
                                        )} />
                                        <Badge variant="outline" className="text-[10px]">{riskFromHealth(parseInt(newHealthScore) || 0)}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddAsset} disabled={!newName || !newType}>
                                <Plus className="w-4 h-4 mr-1" />
                                Add Asset
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
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
                                    {card.trendUp ? <TrendingUp className="size-2.5" /> : <AlertTriangle className="size-2.5" />}
                                    {card.trend}
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-0.5 text-[11px] px-4">
                            <div className="text-muted-foreground">
                                {card.footer}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search assets..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="pl-9"
                            />
                        </div>
                        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Asset Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {types.map((t) => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="operational">Operational</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Assets Table */}
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-xs">ID</TableHead>
                                <TableHead className="text-xs">Name</TableHead>
                                <TableHead className="text-xs">Type</TableHead>
                                <TableHead className="text-xs">Health</TableHead>
                                <TableHead className="text-xs">Risk</TableHead>
                                <TableHead className="text-xs">Status</TableHead>
                                <TableHead className="text-xs">Failure %</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paged.map((asset) => (
                                <TableRow key={asset.id}>
                                    <TableCell className="font-mono text-xs">{asset.id}</TableCell>
                                    <TableCell className="font-medium text-xs">{asset.name}</TableCell>
                                    <TableCell className="capitalize text-xs">{asset.type}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress
                                                value={asset.healthScore}
                                                className={cn('h-1.5 w-16',
                                                    asset.healthScore > 80 ? '[&>div]:bg-emerald-500' :
                                                        asset.healthScore > 60 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'
                                                )}
                                            />
                                            <span className="text-xs font-medium">{asset.healthScore}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn('text-[10px] capitalize',
                                            asset.riskLevel === 'low' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' :
                                                asset.riskLevel === 'medium' ? 'text-amber-700 border-amber-200 bg-amber-50' :
                                                    asset.riskLevel === 'high' ? 'text-orange-700 border-orange-200 bg-orange-50' :
                                                        'text-red-700 border-red-200 bg-red-50'
                                        )}>{asset.riskLevel}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn('text-[10px] capitalize',
                                            asset.status === 'operational' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' :
                                                asset.status === 'warning' ? 'text-amber-700 border-amber-200 bg-amber-50' :
                                                    'text-red-700 border-red-200 bg-red-50'
                                        )}>{asset.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs font-medium">{asset.failureProbability}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-muted-foreground">
                            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
                        </p>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </Button>
                            <span className="text-xs px-2">{page} / {totalPages}</span>
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
