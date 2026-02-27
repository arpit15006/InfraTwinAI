import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Box,
    Warehouse,
    Wrench,
    CalendarClock,
    DollarSign,
    Leaf,
    FileText,
    Settings,
    Activity,
    User2,
    ChevronUp,
    LogOut,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mainNavItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/twin', icon: Box, label: 'Digital Twin' },
    { to: '/assets', icon: Warehouse, label: 'Assets' },
    { to: '/maintenance', icon: Wrench, label: 'Maintenance', badge: '3' },
    { to: '/timeline', icon: CalendarClock, label: 'Timeline' },
    { to: '/budget', icon: DollarSign, label: 'Budget & Resources' },
];

const secondaryNavItems = [
    { to: '/sustainability', icon: Leaf, label: 'Sustainability' },
    { to: '/reports', icon: FileText, label: 'Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon">
            {/* Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild tooltip="InfraTwin AI">
                            <NavLink to="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Activity className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold">InfraTwin AI</span>
                                    <span className="truncate text-[10px] text-muted-foreground">Digital Twin Platform</span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent>
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.to}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.to}
                                        tooltip={item.label}
                                    >
                                        <NavLink to={item.to}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                    {item.badge && (
                                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Secondary Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryNavItems.map((item) => (
                                <SidebarMenuItem key={item.to}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.to}
                                        tooltip={item.label}
                                    >
                                        <NavLink to={item.to}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                                            AM
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Arjun Mehta</span>
                                        <span className="truncate text-xs text-muted-foreground">Project Manager</span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="top"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <User2 className="mr-2 h-4 w-4" />
                                    My Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Account Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
