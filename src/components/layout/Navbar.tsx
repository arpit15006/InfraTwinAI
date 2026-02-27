import { useState } from 'react';
import { format } from 'date-fns';
import { Bell, Search, ChevronDown, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { useApp } from '@/context/AppContext';

export function Navbar() {
    const { projects, selectedProject, alerts, addProject, setSelectedProject } = useApp();
    const unreadAlerts = alerts.filter((a) => !a.isRead).length;
    const [dialogOpen, setDialogOpen] = useState(false);

    // Form state
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState('');
    const [newBudget, setNewBudget] = useState('');
    const [newStartDate, setNewStartDate] = useState<Date>();
    const [newEndDate, setNewEndDate] = useState<Date>();
    const [newManager, setNewManager] = useState('');

    const handleCreateProject = () => {
        if (!newName || !newType) return;
        const newProject: Project = {
            id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
            name: newName,
            type: newType,
            completion: 0,
            budget: parseInt(newBudget) || 5000,
            budgetUsed: 0,
            startDate: newStartDate ? format(newStartDate, 'yyyy-MM-dd') : new Date().toISOString().split('T')[0],
            endDate: newEndDate ? format(newEndDate, 'yyyy-MM-dd') : '2028-12-31',
            status: 'on-track',
            manager: newManager || 'Unassigned',
        };
        addProject(newProject);
        setDialogOpen(false);
        // Reset form
        setNewName(''); setNewType(''); setNewBudget('');
        setNewStartDate(undefined); setNewEndDate(undefined); setNewManager('');
    };

    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 !h-4" />

            {/* Project Selector */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 font-medium text-sm h-8">
                        <span className={cn(
                            'w-2 h-2 rounded-full',
                            selectedProject.status === 'on-track' ? 'bg-emerald-500' :
                                selectedProject.status === 'delayed' ? 'bg-amber-500' : 'bg-red-500'
                        )} />
                        <span className="hidden sm:inline">{selectedProject.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[260px]">
                    <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {projects.map((p) => (
                        <DropdownMenuItem
                            key={p.id}
                            className={cn('gap-2 cursor-pointer', p.id === selectedProject.id && 'bg-accent')}
                            onClick={() => setSelectedProject(p)}
                        >
                            <span
                                className={cn(
                                    'w-2 h-2 rounded-full',
                                    p.status === 'on-track' ? 'bg-emerald-500' :
                                        p.status === 'delayed' ? 'bg-amber-500' : 'bg-red-500'
                                )}
                            />
                            <span className="truncate">{p.name}</span>
                            {p.id === selectedProject.id && (
                                <Badge variant="secondary" className="ml-auto text-[10px]">Active</Badge>
                            )}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 cursor-pointer text-primary font-medium">
                                <Plus className="w-4 h-4" />
                                New Project
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[480px]">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Add a new infrastructure project to monitor
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-xs">Name</Label>
                                    <Input
                                        className="col-span-3 h-9"
                                        placeholder="e.g. Delhi Metro Phase 5"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-xs">Type</Label>
                                    <Select value={newType} onValueChange={setNewType}>
                                        <SelectTrigger className="col-span-3 h-9">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Bridge">Bridge</SelectItem>
                                            <SelectItem value="Highway">Highway</SelectItem>
                                            <SelectItem value="Metro">Metro System</SelectItem>
                                            <SelectItem value="Building">Smart Building</SelectItem>
                                            <SelectItem value="Tunnel">Tunnel</SelectItem>
                                            <SelectItem value="Flyover">Flyover</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-xs">Budget (₹L)</Label>
                                    <Input
                                        className="col-span-3 h-9"
                                        type="number"
                                        placeholder="e.g. 5000"
                                        value={newBudget}
                                        onChange={(e) => setNewBudget(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-xs">Start Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "col-span-3 h-9 justify-start text-left font-normal",
                                                    !newStartDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {newStartDate ? format(newStartDate, "PPP") : <span>Pick a start date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={newStartDate}
                                                onSelect={setNewStartDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-xs">End Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "col-span-3 h-9 justify-start text-left font-normal",
                                                    !newEndDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {newEndDate ? format(newEndDate, "PPP") : <span>Pick an end date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={newEndDate}
                                                onSelect={setNewEndDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right text-xs">Manager</Label>
                                    <Input
                                        className="col-span-3 h-9"
                                        placeholder="Project manager name"
                                        value={newManager}
                                        onChange={(e) => setNewManager(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateProject} disabled={!newName || !newType}>
                                    <Plus className="w-4 h-4 mr-1" />
                                    Create Project
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search assets, reports..." className="pl-9 h-8" />
                </div>
            </div>

            <div className="flex-1" />

            {/* Notifications */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-8 w-8">
                        <Bell className="w-4 h-4" />
                        {unreadAlerts > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 min-w-[16px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-background">
                                {unreadAlerts}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[340px]">
                    <DropdownMenuLabel className="flex items-center justify-between">
                        Notifications
                        <Badge variant="secondary" className="text-[10px]">{unreadAlerts} new</Badge>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {alerts.slice(0, 5).map((alert) => (
                        <DropdownMenuItem key={alert.id} className="flex flex-col items-start gap-1 py-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        'w-1.5 h-1.5 rounded-full shrink-0',
                                        alert.severity === 'critical' ? 'bg-red-500' :
                                            alert.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                    )}
                                />
                                <span className="text-sm font-medium">{alert.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground pl-3.5 line-clamp-1">{alert.description}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
