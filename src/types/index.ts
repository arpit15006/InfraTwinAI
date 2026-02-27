export interface Asset {
    id: string;
    name: string;
    type: "bridge" | "road" | "pillar" | "beam" | "tunnel" | "metro";
    healthScore: number;
    vibration: number;
    temperature: number;
    loadStress: number;
    corrosionLevel: number;
    crackProbability: number;
    failureProbability: number;
    riskLevel: "low" | "medium" | "high" | "critical";
    lastInspection: string;
    maintenanceDueDate: string;
    location: string;
    status: "operational" | "warning" | "critical" | "maintenance";
    installDate: string;
    sensorHistory: SensorReading[];
    maintenanceHistory: MaintenanceRecord[];
    sensorReadings: {
        vibration: number;
        temperature: number;
        strain: number;
    };
    daysToFailure: number;
    estimatedRepairCost: number;
    nextMaintenance?: string;
}

export interface SensorReading {
    timestamp: string;
    vibration: number;
    temperature: number;
    loadStress: number;
    corrosionLevel: number;
}

export interface MaintenanceRecord {
    id: string;
    date: string;
    type: "preventive" | "corrective" | "inspection";
    description: string;
    cost: number;
    status: "completed" | "scheduled" | "overdue";
}

export interface Project {
    id: string;
    name: string;
    type: string;
    completion: number;
    budget: number;
    budgetUsed: number;
    startDate: string;
    endDate: string;
    status: "on-track" | "delayed" | "at-risk" | "completed";
    manager: string;
}

export interface AlertItem {
    id: string;
    title: string;
    description: string;
    severity: "info" | "warning" | "critical";
    assetId: string;
    assetName: string;
    timestamp: string;
    isRead: boolean;
}

export interface TimelinePhase {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    completion: number;
    status: "completed" | "in-progress" | "upcoming" | "delayed";
    milestones: Milestone[];
}

export interface Milestone {
    name: string;
    date: string;
    completed: boolean;
}

export interface BudgetData {
    category: string;
    allocated: number;
    used: number;
    variance: number;
}

export interface ESGMetrics {
    carbonEmissions: number;
    carbonTarget: number;
    energyConsumption: number;
    energyEfficiency: number;
    waterUsage: number;
    waterTarget: number;
    sustainabilityScore: number;
    wasteRecycled: number;
}

export interface ChartDataPoint {
    name: string;
    value: number;
    value2?: number;
    value3?: number;
}
