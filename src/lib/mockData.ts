import type { Asset, AlertItem, TimelinePhase, BudgetData, ESGMetrics, Project, ChartDataPoint } from '@/types';

// ─── Projects ──────────────────────────────────────────────────────────
export const projects: Project[] = [
    {
        id: 'proj-001',
        name: 'Mumbai Metro Line 4',
        type: 'Metro System',
        completion: 67,
        budget: 32000,
        budgetUsed: 24500,
        startDate: '2024-01-15',
        endDate: '2027-06-30',
        status: 'on-track',
        manager: 'Arjun Mehta',
    },
    {
        id: 'proj-002',
        name: 'Bengaluru Elevated Corridor',
        type: 'Highway',
        completion: 43,
        budget: 18000,
        budgetUsed: 9800,
        startDate: '2024-06-01',
        endDate: '2028-12-31',
        status: 'delayed',
        manager: 'Priya Sharma',
    },
    {
        id: 'proj-003',
        name: 'Chennai Coastal Bridge',
        type: 'Bridge',
        completion: 82,
        budget: 8500,
        budgetUsed: 7200,
        startDate: '2023-03-01',
        endDate: '2026-09-30',
        status: 'on-track',
        manager: 'Ravi Kumar',
    },
];

// ─── Sensor History Generator ──────────────────────────────────────────
function generateSensorHistory(baseVib: number, baseTemp: number, baseLoad: number, baseCorr: number) {
    const history = [];
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        history.push({
            timestamp: date.toISOString().split('T')[0],
            vibration: +(baseVib + (Math.random() - 0.5) * 2).toFixed(1),
            temperature: +(baseTemp + (Math.random() - 0.5) * 8).toFixed(1),
            loadStress: +(baseLoad + (Math.random() - 0.5) * 10).toFixed(1),
            corrosionLevel: +(baseCorr + Math.random() * 0.5).toFixed(2),
        });
    }
    return history;
}

// ─── Assets ────────────────────────────────────────────────────────────
export const assets: Asset[] = [
    {
        id: 'AST-001', name: 'Main Span Bridge Deck', type: 'bridge', healthScore: 92,
        vibration: 2.3, temperature: 34.5, loadStress: 45, corrosionLevel: 0.12,
        crackProbability: 5, failureProbability: 3, riskLevel: 'low',
        lastInspection: '2026-02-15', maintenanceDueDate: '2026-05-20',
        location: 'Section A1 - North', status: 'operational', installDate: '2023-06-15',
        sensorHistory: generateSensorHistory(2.3, 34.5, 45, 0.12),
        maintenanceHistory: [
            { id: 'MH-001', date: '2026-02-15', type: 'inspection', description: 'Routine structural inspection', cost: 15000, status: 'completed' },
            { id: 'MH-002', date: '2026-05-20', type: 'preventive', description: 'Deck resurfacing scheduled', cost: 85000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 2.3, temperature: 34.5, strain: 45 },
        daysToFailure: 180,
        estimatedRepairCost: 85000,
        nextMaintenance: '2026-05-20',
    },
    {
        id: 'AST-002', name: 'Pillar P-14 Foundation', type: 'pillar', healthScore: 67,
        vibration: 4.8, temperature: 38.2, loadStress: 72, corrosionLevel: 0.34,
        crackProbability: 28, failureProbability: 18, riskLevel: 'medium',
        lastInspection: '2026-02-10', maintenanceDueDate: '2026-03-15',
        location: 'Section B2 - Central', status: 'warning', installDate: '2023-04-22',
        sensorHistory: generateSensorHistory(4.8, 38.2, 72, 0.34),
        maintenanceHistory: [
            { id: 'MH-003', date: '2026-02-10', type: 'inspection', description: 'Foundation stress analysis', cost: 22000, status: 'completed' },
            { id: 'MH-004', date: '2026-03-15', type: 'corrective', description: 'Crack sealing and reinforcement', cost: 120000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 4.8, temperature: 38.2, strain: 72 },
        daysToFailure: 45,
        estimatedRepairCost: 120000,
        nextMaintenance: '2026-03-15',
    },
    {
        id: 'AST-003', name: 'Beam B-22 Structural', type: 'beam', healthScore: 41,
        vibration: 7.2, temperature: 42.1, loadStress: 89, corrosionLevel: 0.58,
        crackProbability: 52, failureProbability: 38, riskLevel: 'high',
        lastInspection: '2026-02-20', maintenanceDueDate: '2026-03-05',
        location: 'Section C3 - South', status: 'critical', installDate: '2023-03-10',
        sensorHistory: generateSensorHistory(7.2, 42.1, 89, 0.58),
        maintenanceHistory: [
            { id: 'MH-005', date: '2026-02-20', type: 'inspection', description: 'Emergency structural assessment', cost: 35000, status: 'completed' },
            { id: 'MH-006', date: '2026-03-05', type: 'corrective', description: 'Full beam replacement', cost: 450000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 7.2, temperature: 42.1, strain: 89 },
        daysToFailure: 12,
        estimatedRepairCost: 450000,
        nextMaintenance: '2026-03-05',
    },
    {
        id: 'AST-004', name: 'Road Segment RS-7', type: 'road', healthScore: 78,
        vibration: 1.8, temperature: 52.3, loadStress: 55, corrosionLevel: 0.18,
        crackProbability: 12, failureProbability: 8, riskLevel: 'low',
        lastInspection: '2026-02-18', maintenanceDueDate: '2026-06-10',
        location: 'Highway NH-48, Km 34', status: 'operational', installDate: '2024-01-20',
        sensorHistory: generateSensorHistory(1.8, 52.3, 55, 0.18),
        maintenanceHistory: [
            { id: 'MH-007', date: '2026-02-18', type: 'inspection', description: 'Surface quality check', cost: 8000, status: 'completed' },
        ],
        sensorReadings: { vibration: 1.8, temperature: 52.3, strain: 55 },
        daysToFailure: 120,
        estimatedRepairCost: 65000,
        nextMaintenance: '2026-06-10',
    },
    {
        id: 'AST-005', name: 'Metro Tunnel Section MT-3', type: 'tunnel', healthScore: 85,
        vibration: 3.1, temperature: 28.7, loadStress: 62, corrosionLevel: 0.22,
        crackProbability: 8, failureProbability: 5, riskLevel: 'low',
        lastInspection: '2026-02-22', maintenanceDueDate: '2026-07-15',
        location: 'Underground Level -3', status: 'operational', installDate: '2024-03-15',
        sensorHistory: generateSensorHistory(3.1, 28.7, 62, 0.22),
        maintenanceHistory: [
            { id: 'MH-008', date: '2026-02-22', type: 'inspection', description: 'Tunnel wall integrity scan', cost: 28000, status: 'completed' },
        ],
        sensorReadings: { vibration: 3.1, temperature: 28.7, strain: 62 },
        daysToFailure: 150,
        estimatedRepairCost: 45000,
        nextMaintenance: '2026-07-15',
    },
    {
        id: 'AST-006', name: 'Pillar P-28 Support', type: 'pillar', healthScore: 53,
        vibration: 5.9, temperature: 39.8, loadStress: 78, corrosionLevel: 0.45,
        crackProbability: 35, failureProbability: 25, riskLevel: 'high',
        lastInspection: '2026-02-12', maintenanceDueDate: '2026-03-10',
        location: 'Section D4 - East', status: 'warning', installDate: '2023-05-08',
        sensorHistory: generateSensorHistory(5.9, 39.8, 78, 0.45),
        maintenanceHistory: [
            { id: 'MH-009', date: '2026-02-12', type: 'inspection', description: 'Load capacity test', cost: 18000, status: 'completed' },
            { id: 'MH-010', date: '2026-03-10', type: 'corrective', description: 'Structural reinforcement', cost: 200000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 5.9, temperature: 39.8, strain: 78 },
        daysToFailure: 22,
        estimatedRepairCost: 200000,
        nextMaintenance: '2026-03-10',
    },
    {
        id: 'AST-007', name: 'Bridge Cable BC-4', type: 'bridge', healthScore: 88,
        vibration: 2.7, temperature: 31.2, loadStress: 48, corrosionLevel: 0.15,
        crackProbability: 6, failureProbability: 4, riskLevel: 'low',
        lastInspection: '2026-02-25', maintenanceDueDate: '2026-08-01',
        location: 'Section A1 - Cable Array', status: 'operational', installDate: '2023-07-20',
        sensorHistory: generateSensorHistory(2.7, 31.2, 48, 0.15),
        maintenanceHistory: [
            { id: 'MH-011', date: '2026-02-25', type: 'inspection', description: 'Cable tension measurement', cost: 12000, status: 'completed' },
        ],
        sensorReadings: { vibration: 2.7, temperature: 31.2, strain: 48 },
        daysToFailure: 160,
        estimatedRepairCost: 55000,
        nextMaintenance: '2026-08-01',
    },
    {
        id: 'AST-008', name: 'Beam B-15 Crossbeam', type: 'beam', healthScore: 72,
        vibration: 4.1, temperature: 36.5, loadStress: 67, corrosionLevel: 0.28,
        crackProbability: 18, failureProbability: 12, riskLevel: 'medium',
        lastInspection: '2026-02-14', maintenanceDueDate: '2026-04-20',
        location: 'Section B3 - Midpoint', status: 'operational', installDate: '2023-08-12',
        sensorHistory: generateSensorHistory(4.1, 36.5, 67, 0.28),
        maintenanceHistory: [
            { id: 'MH-012', date: '2026-02-14', type: 'inspection', description: 'Weld joint inspection', cost: 10000, status: 'completed' },
            { id: 'MH-013', date: '2026-04-20', type: 'preventive', description: 'Anti-corrosion coating', cost: 55000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 4.1, temperature: 36.5, strain: 67 },
        daysToFailure: 60,
        estimatedRepairCost: 95000,
        nextMaintenance: '2026-04-20',
    },
    {
        id: 'AST-009', name: 'Road Segment RS-12', type: 'road', healthScore: 61,
        vibration: 3.5, temperature: 58.1, loadStress: 70, corrosionLevel: 0.31,
        crackProbability: 22, failureProbability: 15, riskLevel: 'medium',
        lastInspection: '2026-02-08', maintenanceDueDate: '2026-03-25',
        location: 'Highway NH-48, Km 67', status: 'warning', installDate: '2024-02-10',
        sensorHistory: generateSensorHistory(3.5, 58.1, 70, 0.31),
        maintenanceHistory: [
            { id: 'MH-014', date: '2026-02-08', type: 'inspection', description: 'Pothole and surface assessment', cost: 6000, status: 'completed' },
            { id: 'MH-015', date: '2026-03-25', type: 'corrective', description: 'Road resurfacing', cost: 180000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 3.5, temperature: 58.1, strain: 70 },
        daysToFailure: 35,
        estimatedRepairCost: 180000,
        nextMaintenance: '2026-03-25',
    },
    {
        id: 'AST-010', name: 'Metro Station Platform MS-2', type: 'metro', healthScore: 94,
        vibration: 1.5, temperature: 26.3, loadStress: 35, corrosionLevel: 0.08,
        crackProbability: 3, failureProbability: 2, riskLevel: 'low',
        lastInspection: '2026-02-24', maintenanceDueDate: '2026-09-01',
        location: 'Station Level -1', status: 'operational', installDate: '2024-06-01',
        sensorHistory: generateSensorHistory(1.5, 26.3, 35, 0.08),
        maintenanceHistory: [
            { id: 'MH-016', date: '2026-02-24', type: 'inspection', description: 'Platform edge inspection', cost: 5000, status: 'completed' },
        ],
        sensorReadings: { vibration: 1.5, temperature: 26.3, strain: 35 },
        daysToFailure: 200,
        estimatedRepairCost: 30000,
        nextMaintenance: '2026-09-01',
    },
    {
        id: 'AST-011', name: 'Pillar P-7 Elevated', type: 'pillar', healthScore: 34,
        vibration: 8.4, temperature: 44.6, loadStress: 92, corrosionLevel: 0.67,
        crackProbability: 62, failureProbability: 48, riskLevel: 'critical',
        lastInspection: '2026-02-26', maintenanceDueDate: '2026-03-01',
        location: 'Elevated Corridor Section E', status: 'critical', installDate: '2023-02-15',
        sensorHistory: generateSensorHistory(8.4, 44.6, 92, 0.67),
        maintenanceHistory: [
            { id: 'MH-017', date: '2026-02-26', type: 'inspection', description: 'Emergency assessment - severe cracking', cost: 45000, status: 'completed' },
            { id: 'MH-018', date: '2026-03-01', type: 'corrective', description: 'Emergency pillar reinforcement', cost: 650000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 8.4, temperature: 44.6, strain: 92 },
        daysToFailure: 5,
        estimatedRepairCost: 650000,
        nextMaintenance: '2026-03-01',
    },
    {
        id: 'AST-012', name: 'Tunnel Ventilation Shaft TV-1', type: 'tunnel', healthScore: 76,
        vibration: 3.8, temperature: 30.5, loadStress: 42, corrosionLevel: 0.25,
        crackProbability: 14, failureProbability: 9, riskLevel: 'low',
        lastInspection: '2026-02-19', maintenanceDueDate: '2026-05-15',
        location: 'Ventilation Level -2', status: 'operational', installDate: '2024-04-20',
        sensorHistory: generateSensorHistory(3.8, 30.5, 42, 0.25),
        maintenanceHistory: [
            { id: 'MH-019', date: '2026-02-19', type: 'preventive', description: 'Fan motor servicing', cost: 32000, status: 'completed' },
        ],
        sensorReadings: { vibration: 3.8, temperature: 30.5, strain: 42 },
        daysToFailure: 90,
        estimatedRepairCost: 72000,
        nextMaintenance: '2026-05-15',
    },
    {
        id: 'AST-013', name: 'Bridge Abutment BA-2', type: 'bridge', healthScore: 81,
        vibration: 2.9, temperature: 33.8, loadStress: 58, corrosionLevel: 0.19,
        crackProbability: 10, failureProbability: 6, riskLevel: 'low',
        lastInspection: '2026-02-21', maintenanceDueDate: '2026-06-25',
        location: 'Section A2 - South Abutment', status: 'operational', installDate: '2023-06-30',
        sensorHistory: generateSensorHistory(2.9, 33.8, 58, 0.19),
        maintenanceHistory: [
            { id: 'MH-020', date: '2026-02-21', type: 'inspection', description: 'Foundation settlement check', cost: 20000, status: 'completed' },
        ],
        sensorReadings: { vibration: 2.9, temperature: 33.8, strain: 58 },
        daysToFailure: 130,
        estimatedRepairCost: 48000,
        nextMaintenance: '2026-06-25',
    },
    {
        id: 'AST-014', name: 'Beam B-31 Girder', type: 'beam', healthScore: 45,
        vibration: 6.7, temperature: 41.3, loadStress: 85, corrosionLevel: 0.52,
        crackProbability: 45, failureProbability: 32, riskLevel: 'high',
        lastInspection: '2026-02-17', maintenanceDueDate: '2026-03-08',
        location: 'Section C4 - West', status: 'critical', installDate: '2023-04-05',
        sensorHistory: generateSensorHistory(6.7, 41.3, 85, 0.52),
        maintenanceHistory: [
            { id: 'MH-021', date: '2026-02-17', type: 'inspection', description: 'Fatigue crack detection', cost: 25000, status: 'completed' },
            { id: 'MH-022', date: '2026-03-08', type: 'corrective', description: 'Girder splice repair', cost: 320000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 6.7, temperature: 41.3, strain: 85 },
        daysToFailure: 15,
        estimatedRepairCost: 320000,
        nextMaintenance: '2026-03-08',
    },
    {
        id: 'AST-015', name: 'Road Overpass RO-3', type: 'road', healthScore: 89,
        vibration: 2.0, temperature: 48.7, loadStress: 40, corrosionLevel: 0.11,
        crackProbability: 4, failureProbability: 3, riskLevel: 'low',
        lastInspection: '2026-02-23', maintenanceDueDate: '2026-08-20',
        location: 'Overpass Junction NH-48/SH-12', status: 'operational', installDate: '2024-05-15',
        sensorHistory: generateSensorHistory(2.0, 48.7, 40, 0.11),
        maintenanceHistory: [
            { id: 'MH-023', date: '2026-02-23', type: 'inspection', description: 'Expansion joint inspection', cost: 9000, status: 'completed' },
        ],
        sensorReadings: { vibration: 2.0, temperature: 48.7, strain: 40 },
        daysToFailure: 175,
        estimatedRepairCost: 42000,
        nextMaintenance: '2026-08-20',
    },
    {
        id: 'AST-016', name: 'Metro Pillar MP-19', type: 'metro', healthScore: 58,
        vibration: 5.3, temperature: 37.4, loadStress: 74, corrosionLevel: 0.41,
        crackProbability: 30, failureProbability: 22, riskLevel: 'medium',
        lastInspection: '2026-02-13', maintenanceDueDate: '2026-03-18',
        location: 'Line 4 - Elevated Section', status: 'warning', installDate: '2023-09-01',
        sensorHistory: generateSensorHistory(5.3, 37.4, 74, 0.41),
        maintenanceHistory: [
            { id: 'MH-024', date: '2026-02-13', type: 'inspection', description: 'Vibration analysis', cost: 14000, status: 'completed' },
            { id: 'MH-025', date: '2026-03-18', type: 'preventive', description: 'Damper installation', cost: 95000, status: 'scheduled' },
        ],
        sensorReadings: { vibration: 5.3, temperature: 37.4, strain: 74 },
        daysToFailure: 28,
        estimatedRepairCost: 150000,
        nextMaintenance: '2026-03-18',
    },
];

// ─── Alerts ────────────────────────────────────────────────────────────
export const alerts: AlertItem[] = [
    { id: 'ALT-001', title: 'Critical Stress Detected', description: 'Beam B-22 load stress exceeds 85% threshold. Immediate inspection required.', severity: 'critical', assetId: 'AST-003', assetName: 'Beam B-22 Structural', timestamp: '2026-02-27T14:30:00', isRead: false },
    { id: 'ALT-002', title: 'Pillar Corrosion Warning', description: 'Pillar P-7 corrosion level at 67%. Exceeds safe operational limit.', severity: 'critical', assetId: 'AST-011', assetName: 'Pillar P-7 Elevated', timestamp: '2026-02-27T12:15:00', isRead: false },
    { id: 'ALT-003', title: 'Vibration Anomaly', description: 'Unusual vibration pattern detected on Pillar P-28. Monitor closely.', severity: 'warning', assetId: 'AST-006', assetName: 'Pillar P-28 Support', timestamp: '2026-02-27T10:45:00', isRead: false },
    { id: 'ALT-004', title: 'Temperature Spike', description: 'Road Segment RS-12 surface temperature exceeding design limits.', severity: 'warning', assetId: 'AST-009', assetName: 'Road Segment RS-12', timestamp: '2026-02-27T09:20:00', isRead: true },
    { id: 'ALT-005', title: 'Scheduled Maintenance Due', description: 'Beam B-31 Girder maintenance window approaching. 9 days remaining.', severity: 'warning', assetId: 'AST-014', assetName: 'Beam B-31 Girder', timestamp: '2026-02-27T08:00:00', isRead: true },
    { id: 'ALT-006', title: 'Sensor Calibration Complete', description: 'Metro Station MS-2 sensors recalibrated successfully.', severity: 'info', assetId: 'AST-010', assetName: 'Metro Station Platform MS-2', timestamp: '2026-02-26T16:30:00', isRead: true },
    { id: 'ALT-007', title: 'Inspection Report Ready', description: 'Bridge Cable BC-4 inspection report available for review.', severity: 'info', assetId: 'AST-007', assetName: 'Bridge Cable BC-4', timestamp: '2026-02-26T14:00:00', isRead: true },
    { id: 'ALT-008', title: 'Failure Prediction Update', description: 'Pillar P-14 failure probability increased from 14% to 18%.', severity: 'warning', assetId: 'AST-002', assetName: 'Pillar P-14 Foundation', timestamp: '2026-02-26T11:30:00', isRead: true },
];

// ─── Timeline Phases ───────────────────────────────────────────────────
export const timelinePhases: TimelinePhase[] = [
    {
        id: 'PH-01', name: 'Planning & Design', startDate: '2024-01-15', endDate: '2024-06-30',
        completion: 100, status: 'completed',
        milestones: [
            { name: 'Environmental Clearance', date: '2024-02-28', completed: true },
            { name: 'Design Finalization', date: '2024-04-15', completed: true },
            { name: 'Stakeholder Approval', date: '2024-06-15', completed: true },
        ],
    },
    {
        id: 'PH-02', name: 'Site Preparation', startDate: '2024-07-01', endDate: '2024-12-31',
        completion: 100, status: 'completed',
        milestones: [
            { name: 'Land Acquisition', date: '2024-08-15', completed: true },
            { name: 'Utility Relocation', date: '2024-10-30', completed: true },
            { name: 'Site Grading Complete', date: '2024-12-15', completed: true },
        ],
    },
    {
        id: 'PH-03', name: 'Foundation Work', startDate: '2025-01-01', endDate: '2025-08-31',
        completion: 100, status: 'completed',
        milestones: [
            { name: 'Piling Complete', date: '2025-03-30', completed: true },
            { name: 'Foundation Casting', date: '2025-06-15', completed: true },
            { name: 'Foundation QC Approved', date: '2025-08-20', completed: true },
        ],
    },
    {
        id: 'PH-04', name: 'Superstructure', startDate: '2025-09-01', endDate: '2026-08-31',
        completion: 62, status: 'in-progress',
        milestones: [
            { name: 'Steel Erection Start', date: '2025-09-15', completed: true },
            { name: 'Deck Slab Casting 50%', date: '2026-02-01', completed: true },
            { name: 'Deck Slab Casting 100%', date: '2026-06-15', completed: false },
            { name: 'Bearing Installation', date: '2026-08-15', completed: false },
        ],
    },
    {
        id: 'PH-05', name: 'Systems & MEP', startDate: '2026-06-01', endDate: '2027-02-28',
        completion: 0, status: 'upcoming',
        milestones: [
            { name: 'Electrical Installation', date: '2026-08-30', completed: false },
            { name: 'Signaling System', date: '2026-11-15', completed: false },
            { name: 'Communication Network', date: '2027-01-30', completed: false },
        ],
    },
    {
        id: 'PH-06', name: 'Testing & Commissioning', startDate: '2027-03-01', endDate: '2027-06-30',
        completion: 0, status: 'upcoming',
        milestones: [
            { name: 'Load Testing', date: '2027-03-30', completed: false },
            { name: 'Trial Runs', date: '2027-05-15', completed: false },
            { name: 'Final Handover', date: '2027-06-30', completed: false },
        ],
    },
];

// ─── Budget Data ───────────────────────────────────────────────────────
export const budgetData: BudgetData[] = [
    { category: 'Foundation', allocated: 6400, used: 6200, variance: -200 },
    { category: 'Superstructure', allocated: 9600, used: 7800, variance: -1800 },
    { category: 'Systems & MEP', allocated: 5200, used: 2100, variance: -3100 },
    { category: 'Labor', allocated: 4800, used: 4500, variance: -300 },
    { category: 'Equipment', allocated: 3200, used: 2800, variance: -400 },
    { category: 'Safety & Compliance', allocated: 1600, used: 1100, variance: -500 },
    { category: 'Contingency', allocated: 1200, used: 0, variance: -1200 },
];

// ─── ESG Metrics ───────────────────────────────────────────────────────
export const esgMetrics: ESGMetrics = {
    carbonEmissions: 1250,
    carbonTarget: 1500,
    energyConsumption: 4200,
    energyEfficiency: 78,
    waterUsage: 8500,
    waterTarget: 10000,
    sustainabilityScore: 82,
    wasteRecycled: 73,
};

// ─── Chart Data ────────────────────────────────────────────────────────
export const sensorTrendData: ChartDataPoint[] = [
    { name: 'Jan', value: 2.1, value2: 33, value3: 42 },
    { name: 'Feb', value: 2.4, value2: 34, value3: 44 },
    { name: 'Mar', value: 2.8, value2: 36, value3: 48 },
    { name: 'Apr', value: 3.2, value2: 38, value3: 52 },
    { name: 'May', value: 3.5, value2: 41, value3: 55 },
    { name: 'Jun', value: 4.1, value2: 43, value3: 60 },
    { name: 'Jul', value: 4.6, value2: 44, value3: 63 },
    { name: 'Aug', value: 5.0, value2: 42, value3: 65 },
    { name: 'Sep', value: 4.8, value2: 40, value3: 62 },
    { name: 'Oct', value: 4.3, value2: 37, value3: 58 },
    { name: 'Nov', value: 3.9, value2: 35, value3: 54 },
    { name: 'Dec', value: 3.5, value2: 34, value3: 50 },
];

export const budgetChartData: ChartDataPoint[] = [
    { name: 'Foundation', value: 6400, value2: 6200 },
    { name: 'Structure', value: 9600, value2: 7800 },
    { name: 'Systems', value: 5200, value2: 2100 },
    { name: 'Labor', value: 4800, value2: 4500 },
    { name: 'Equipment', value: 3200, value2: 2800 },
    { name: 'Safety', value: 1600, value2: 1100 },
];

export const riskTrendData: ChartDataPoint[] = [
    { name: 'Week 1', value: 12 },
    { name: 'Week 2', value: 15 },
    { name: 'Week 3', value: 18 },
    { name: 'Week 4', value: 14 },
    { name: 'Week 5', value: 22 },
    { name: 'Week 6', value: 28 },
    { name: 'Week 7', value: 25 },
    { name: 'Week 8', value: 32 },
    { name: 'Week 9', value: 29 },
    { name: 'Week 10', value: 35 },
    { name: 'Week 11', value: 31 },
    { name: 'Week 12', value: 38 },
];

export const healthDistribution: ChartDataPoint[] = [
    { name: 'Healthy', value: 8 },
    { name: 'Warning', value: 4 },
    { name: 'Critical', value: 3 },
    { name: 'Maintenance', value: 1 },
];

export const carbonTrendData: ChartDataPoint[] = [
    { name: 'Jan', value: 145, value2: 160 },
    { name: 'Feb', value: 138, value2: 155 },
    { name: 'Mar', value: 152, value2: 150 },
    { name: 'Apr', value: 128, value2: 145 },
    { name: 'May', value: 118, value2: 140 },
    { name: 'Jun', value: 105, value2: 135 },
    { name: 'Jul', value: 98, value2: 130 },
    { name: 'Aug', value: 92, value2: 125 },
    { name: 'Sep', value: 88, value2: 120 },
    { name: 'Oct', value: 82, value2: 115 },
    { name: 'Nov', value: 78, value2: 110 },
    { name: 'Dec', value: 75, value2: 105 },
];

export const laborProductivityData: ChartDataPoint[] = [
    { name: 'Jan', value: 82 },
    { name: 'Feb', value: 85 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 88 },
    { name: 'May', value: 91 },
    { name: 'Jun', value: 86 },
    { name: 'Jul', value: 84 },
    { name: 'Aug', value: 89 },
    { name: 'Sep', value: 92 },
    { name: 'Oct', value: 87 },
    { name: 'Nov', value: 90 },
    { name: 'Dec', value: 93 },
];

export const equipmentUtilizationData: ChartDataPoint[] = [
    { name: 'Cranes', value: 78 },
    { name: 'Excavators', value: 85 },
    { name: 'Concrete Mixers', value: 92 },
    { name: 'Pile Drivers', value: 45 },
    { name: 'Welding Units', value: 88 },
    { name: 'Transport', value: 71 },
];
