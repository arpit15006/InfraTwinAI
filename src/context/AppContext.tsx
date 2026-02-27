import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { projects as initialProjects, assets as initialAssets, alerts as initialAlerts } from '@/lib/mockData';
import type { Project, Asset, AlertItem } from '@/types';

interface AppContextType {
    projects: Project[];
    assets: Asset[];
    alerts: AlertItem[];
    selectedProject: Project;
    addProject: (project: Project) => void;
    setSelectedProject: (project: Project) => void;
    addAsset: (asset: Asset) => void;
    updateAsset: (id: string, updates: Partial<Asset>) => void;
    scheduleMaintenance: (assetId: string, date: string) => void;
    dismissAlert: (id: string) => void;
    clearAlerts: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
    const [selectedProject, setSelectedProject] = useState<Project>(initialProjects[0]);

    const addProject = (project: Project) => {
        setProjects(prev => [...prev, project]);
        setSelectedProject(project);
    };

    const addAsset = (asset: Asset) => {
        setAssets(prev => [asset, ...prev]);
    };

    const updateAsset = (id: string, updates: Partial<Asset>) => {
        setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const scheduleMaintenance = (assetId: string, date: string) => {
        updateAsset(assetId, {
            nextMaintenance: date,
            status: 'warning' // Indicate it's scheduled for work
        });
    };

    const dismissAlert = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    const clearAlerts = () => {
        setAlerts([]);
    };

    return (
        <AppContext.Provider value={{
            projects,
            assets,
            alerts,
            selectedProject,
            addProject,
            setSelectedProject,
            addAsset,
            updateAsset,
            scheduleMaintenance,
            dismissAlert,
            clearAlerts,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
