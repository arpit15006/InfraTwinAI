import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { timelinePhases } from '@/lib/mockData';
import {
    CheckCircle2,
    Circle,
    Clock,
    AlertTriangle,
    CalendarDays,
    ArrowRight,
} from 'lucide-react';

const statusIcons: Record<string, typeof CheckCircle2> = {
    completed: CheckCircle2,
    'in-progress': Clock,
    upcoming: Circle,
    delayed: AlertTriangle,
};

const statusStyles: Record<string, { text: string; bg: string; border: string }> = {
    completed: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    'in-progress': { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    upcoming: { text: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' },
    delayed: { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
};

export default function Timeline() {
    const totalCompletion = Math.round(
        timelinePhases.reduce((acc, p) => acc + p.completion, 0) / timelinePhases.length
    );
    const delayedPhases = timelinePhases.filter(p => p.status === 'delayed');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Project Timeline</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Track milestones, phases, and progress
                </p>
            </div>

            {/* Overall Progress */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-sm font-semibold">Overall Project Progress</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Mumbai Metro Line 4</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-blue-600">{totalCompletion}%</p>
                            <p className="text-xs text-muted-foreground">Target: Jun 2027</p>
                        </div>
                    </div>
                    <Progress value={totalCompletion} className="h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-emerald-500" />
                    <div className="flex gap-4 mt-3">
                        {[
                            { label: 'Completed', count: timelinePhases.filter(p => p.status === 'completed').length, color: 'text-emerald-600' },
                            { label: 'In Progress', count: timelinePhases.filter(p => p.status === 'in-progress').length, color: 'text-blue-600' },
                            { label: 'Upcoming', count: timelinePhases.filter(p => p.status === 'upcoming').length, color: 'text-gray-500' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-1.5">
                                <span className={cn('text-lg font-bold', item.color)}>{item.count}</span>
                                <span className="text-xs text-muted-foreground">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Delay Alert */}
            {delayedPhases.length > 0 && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Delay detected:</strong> {delayedPhases.length} phase(s) are behind schedule. Immediate attention required.
                    </AlertDescription>
                </Alert>
            )}

            {/* Timeline Phases */}
            <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                <div className="space-y-4">
                    {timelinePhases.map((phase) => {
                        const StatusIcon = statusIcons[phase.status];
                        const style = statusStyles[phase.status];
                        return (
                            <div key={phase.id} className="relative flex gap-4 md:gap-6">
                                <div className={cn(
                                    'hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 shrink-0 z-10 bg-background',
                                    style.text, style.border
                                )}>
                                    <StatusIcon className="w-5 h-5" />
                                </div>

                                <Card className={cn(
                                    'flex-1 transition-shadow',
                                    phase.status === 'in-progress' && 'border-blue-200 shadow-sm'
                                )}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="md:hidden">
                                                        <StatusIcon className={cn('w-4 h-4', style.text)} />
                                                    </span>
                                                    <CardTitle className="text-base font-semibold">{phase.name}</CardTitle>
                                                </div>
                                                <CardDescription className="mt-1 flex items-center gap-2">
                                                    <CalendarDays className="w-3 h-3" />
                                                    {phase.startDate} <ArrowRight className="w-3 h-3" /> {phase.endDate}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={cn('text-[10px] capitalize', style.text, style.bg, style.border)}>
                                                    {phase.status}
                                                </Badge>
                                                <span className="text-sm font-bold">{phase.completion}%</span>
                                            </div>
                                        </div>
                                        <Progress
                                            value={phase.completion}
                                            className={cn('h-1.5 mt-2',
                                                phase.status === 'completed' ? '[&>div]:bg-emerald-500' :
                                                    phase.status === 'in-progress' ? '[&>div]:bg-blue-500' :
                                                        phase.status === 'delayed' ? '[&>div]:bg-red-500' : '[&>div]:bg-gray-300'
                                            )}
                                        />
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="text-xs font-medium text-muted-foreground mb-2">Milestones</p>
                                        <div className="space-y-2">
                                            {phase.milestones.map((milestone, mIndex) => (
                                                <div key={mIndex} className="flex items-center gap-3">
                                                    {milestone.completed ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                                                    )}
                                                    <span className={cn(
                                                        'text-xs flex-1',
                                                        milestone.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                                                    )}>
                                                        {milestone.name}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground">{milestone.date}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
