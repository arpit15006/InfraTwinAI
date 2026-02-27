import { Outlet } from 'react-router-dom';
import { AppSidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AIChatbot } from '@/components/AIChatbot';

export function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </SidebarInset>
            <AIChatbot />
        </SidebarProvider>
    );
}
