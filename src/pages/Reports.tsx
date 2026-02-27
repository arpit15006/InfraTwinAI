import { useState } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileText, Download, Eye, Calendar, Shield, DollarSign,
    AlertTriangle, CheckCircle2, Clock, BarChart3, TrendingDown, TrendingUp, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { assets, projects, esgMetrics } from '@/lib/mockData';

interface Report {
    id: string;
    title: string;
    description: string;
    type: 'health' | 'risk' | 'budget' | 'compliance' | 'esg';
    generatedDate: string;
    status: 'ready' | 'generating' | 'scheduled';
    icon: typeof FileText;
    color: string;
    bg: string;
}

const initialReports: Report[] = [
    { id: 'RPT-001', title: 'Monthly Health Report', description: 'Comprehensive structural health analysis of all monitored assets with trend data.', type: 'health', generatedDate: '2026-02-27', status: 'ready', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'RPT-002', title: 'Risk Analysis Summary', description: 'AI-powered risk assessment with failure predictions and preventive recommendations.', type: 'risk', generatedDate: '2026-02-27', status: 'ready', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'RPT-003', title: 'Budget Breakdown Report', description: 'Detailed financial analysis including variance, forecasts, and cost optimization insights.', type: 'budget', generatedDate: '2026-02-25', status: 'ready', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'RPT-004', title: 'Government Compliance Export', description: 'Regulatory compliance documentation for government authorities review.', type: 'compliance', generatedDate: '2026-02-20', status: 'ready', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'RPT-005', title: 'ESG Sustainability Report', description: 'Environmental, Social, and Governance metrics report with improvement recommendations.', type: 'esg', generatedDate: '2026-02-15', status: 'ready', icon: TrendingDown, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'RPT-006', title: 'Quarterly Performance Report', description: 'Q1 2026 comprehensive project performance and milestone tracking.', type: 'health', generatedDate: '2026-03-01', status: 'scheduled', icon: BarChart3, color: 'text-cyan-600', bg: 'bg-cyan-50' },
];

export default function Reports() {
    const [reportsList, setReportsList] = useState<Report[]>(initialReports);
    const [isGenerateOpen, setIsGenerateOpen] = useState(false);
    const [newReportTitle, setNewReportTitle] = useState('');
    const [newReportType, setNewReportType] = useState<Report['type']>('health');

    const handleGenerate = () => {
        if (!newReportTitle) return;
        const icons: Record<string, any> = { health: Shield, risk: AlertTriangle, budget: DollarSign, compliance: FileText, esg: TrendingDown };
        const colors: Record<string, string> = { health: 'text-blue-600', risk: 'text-amber-600', budget: 'text-emerald-600', compliance: 'text-purple-600', esg: 'text-green-600' };
        const bgs: Record<string, string> = { health: 'bg-blue-50', risk: 'bg-amber-50', budget: 'bg-emerald-50', compliance: 'bg-purple-50', esg: 'bg-green-50' };

        const newReport: Report = {
            id: `RPT-00${reportsList.length + 1}`,
            title: newReportTitle,
            description: `Custom ${newReportType} report generated on demand.`,
            type: newReportType,
            generatedDate: new Date().toISOString().split('T')[0],
            status: 'generating',
            icon: icons[newReportType] || FileText,
            color: colors[newReportType] || 'text-gray-600',
            bg: bgs[newReportType] || 'bg-gray-50',
        };

        setReportsList(prev => [newReport, ...prev]);
        setIsGenerateOpen(false);
        setNewReportTitle('');
        setNewReportType('health');

        // Simulate generation delay
        setTimeout(() => {
            setReportsList(prev => prev.map(r => r.id === newReport.id ? { ...r, status: 'ready' } : r));
        }, 2000);
    };

    const criticalAssets = assets.filter(a => a.riskLevel === 'critical' || a.riskLevel === 'high');
    const avgHealth = Math.round(assets.reduce((acc, a) => acc + a.healthScore, 0) / assets.length);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground text-sm mt-1">Generate and download comprehensive reports</p>
                </div>
                <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Generate Custom Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Generate Custom Report</DialogTitle>
                            <DialogDescription>
                                Create a new structural, risk, or budget report manually.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="report-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="report-name"
                                    value={newReportTitle}
                                    onChange={(e) => setNewReportTitle(e.target.value)}
                                    className="col-span-3"
                                    placeholder="e.g. Ad-hoc Risk Audit"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="report-type" className="text-right">
                                    Type
                                </Label>
                                <div className="col-span-3">
                                    <Select value={newReportType} onValueChange={(val: any) => setNewReportType(val)}>
                                        <SelectTrigger id="report-type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="health">Health & Structural</SelectItem>
                                            <SelectItem value="risk">Risk Analysis</SelectItem>
                                            <SelectItem value="budget">Budget & Cost</SelectItem>
                                            <SelectItem value="compliance">Compliance</SelectItem>
                                            <SelectItem value="esg">ESG & Sustainability</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleGenerate} disabled={!newReportTitle}>
                                Generate
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Quick Stats */}
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-2 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-4">
                {[
                    { label: 'Reports Ready', value: reportsList.filter(r => r.status === 'ready').length, trend: 'Available', trendUp: true },
                    { label: 'Scheduled', value: reportsList.filter(r => r.status === 'scheduled').length, trend: 'Pending', trendUp: false },
                    { label: 'Avg Health Score', value: avgHealth, trend: 'Across assets', trendUp: true },
                    { label: 'High Risk Assets', value: criticalAssets.length, trend: 'Need review', trendUp: false },
                ].map((stat) => (
                    <Card key={stat.label} className="@container/card py-3 gap-1.5">
                        <CardHeader className="px-4 gap-1">
                            <CardDescription className="text-xs">{stat.label}</CardDescription>
                            <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
                                {stat.value}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    {stat.trendUp ? <TrendingUp className="size-2.5" /> : <AlertTriangle className="size-2.5" />}
                                    {stat.trend}
                                </Badge>
                            </CardAction>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            {/* Reports Grid */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Reports</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                    <TabsTrigger value="risk">Risk</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>

                {['all', 'health', 'risk', 'budget', 'compliance'].map((tab) => (
                    <TabsContent key={tab} value={tab} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {reportsList
                                .filter(r => tab === 'all' || r.type === tab)
                                .map((report) => (
                                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-5 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className={cn('p-2.5 rounded-lg', report.bg)}>
                                                    <report.icon className={cn('w-5 h-5', report.color)} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold">{report.title}</p>
                                                    <p className="text-[10px] text-muted-foreground mt-0.5">{report.id}</p>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={cn('text-[10px] shrink-0',
                                                        report.status === 'ready' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' :
                                                            'text-amber-700 border-amber-200 bg-amber-50'
                                                    )}
                                                >
                                                    {report.status === 'ready' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                                    {report.status === 'generating' && <Clock className="w-3 h-3 mr-1 animate-spin" />}
                                                    {report.status === 'scheduled' && <Clock className="w-3 h-3 mr-1" />}
                                                    {report.status}
                                                </Badge>
                                            </div>

                                            <p className="text-xs text-muted-foreground line-clamp-2">{report.description}</p>

                                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                <span>{report.status === 'scheduled' ? 'Scheduled for' : report.status === 'generating' ? 'Started on' : 'Generated on'} {report.generatedDate}</span>
                                            </div>

                                            <Separator />

                                            <div className="flex gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs" disabled={report.status !== 'ready'}>
                                                            <Eye className="w-3.5 h-3.5" /> Preview
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>{report.title}</DialogTitle>
                                                            <DialogDescription>{report.description}</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-6 mt-4">
                                                            <div className="p-4 rounded-lg border bg-muted/30">
                                                                <h3 className="text-sm font-semibold mb-3">Executive Summary</h3>
                                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                                    Project: {projects[0].name} | Period: February 2026 | Overall health score averages {avgHealth}/100 across {assets.length} monitored assets.
                                                                    {criticalAssets.length} assets require immediate attention. Budget utilization is at {Math.round((projects[0].budgetUsed / projects[0].budget) * 100)}%
                                                                    with ₹{((projects[0].budget - projects[0].budgetUsed) / 100).toFixed(1)} Cr remaining. ESG sustainability score: {esgMetrics.sustainabilityScore}/100.
                                                                </p>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-3">
                                                                {[
                                                                    { label: 'Assets Monitored', value: assets.length, color: 'text-blue-600' },
                                                                    { label: 'Avg Health Score', value: avgHealth, color: 'text-emerald-600' },
                                                                    { label: 'High Risk Assets', value: criticalAssets.length, color: 'text-red-600' },
                                                                    { label: 'Project Completion', value: `${projects[0].completion}%`, color: 'text-amber-600' },
                                                                ].map((item) => (
                                                                    <div key={item.label} className="p-3 rounded-lg border text-center">
                                                                        <p className={cn('text-lg font-bold', item.color)}>{item.value}</p>
                                                                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div>
                                                                <h3 className="text-sm font-semibold mb-2">Critical Assets</h3>
                                                                <div className="space-y-2">
                                                                    {criticalAssets.map((asset) => (
                                                                        <div key={asset.id} className="flex items-center justify-between p-2.5 rounded-lg border border-red-200 bg-red-50">
                                                                            <div>
                                                                                <p className="text-xs font-medium">{asset.name}</p>
                                                                                <p className="text-[10px] text-muted-foreground">{asset.id}</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <p className="text-xs font-medium text-red-600">{asset.failureProbability}% failure risk</p>
                                                                                <p className="text-[10px] text-muted-foreground">Health: {asset.healthScore}/100</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button size="sm" className="flex-1 gap-1.5 text-xs" disabled={report.status !== 'ready'}>
                                                    <Download className="w-3.5 h-3.5" /> Download
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
