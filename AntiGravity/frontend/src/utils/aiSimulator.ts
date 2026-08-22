import type { ComplaintCategory, Priority } from '../types';

export interface AICivilClassificationResult {
  detectedCategory: ComplaintCategory;
  confidence: number; // 0 to 1
  isCategoryMatch: boolean;
  priorityRecommendation: Priority;
  suggestedDepartmentId: string;
  suggestedDepartmentName: string;
  slaHours: number;
  fraudRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  verificationNotes: string;
  detectedFeatures: string[];
}

export const CATEGORY_DEPARTMENT_MAP: Record<ComplaintCategory, {
  departmentId: string;
  departmentName: string;
  slaHours: number;
  defaultPriority: Priority;
  keywords: string[];
  displayName: string;
  icon: string;
}> = {
  POTHOLE: {
    departmentId: 'dept-roads',
    departmentName: 'Roads & Infrastructure Engineering',
    slaHours: 48,
    defaultPriority: 'HIGH',
    keywords: ['road', 'asphalt', 'crater', 'pothole', 'bitumen', 'surface damage'],
    displayName: 'Road Pothole / Crater',
    icon: 'Hammer',
  },
  ROAD_DEFECT: {
    departmentId: 'dept-roads',
    departmentName: 'Roads & Infrastructure Engineering',
    slaHours: 72,
    defaultPriority: 'MEDIUM',
    keywords: ['cracks', 'uneven surface', 'speed breaker defect', 'divider broken'],
    displayName: 'Road Structural Defect',
    icon: 'Construction',
  },
  WATER_LEAK: {
    departmentId: 'dept-water',
    departmentName: 'Water Supply & Sewerage Board',
    slaHours: 24,
    defaultPriority: 'HIGH',
    keywords: ['water', 'pipe burst', 'gushing water', 'puddle', 'pipeline leakage'],
    displayName: 'Water Pipeline Leakage',
    icon: 'Droplets',
  },
  GARBAGE: {
    departmentId: 'dept-sanitation',
    departmentName: 'Solid Waste Management (SWM)',
    slaHours: 24,
    defaultPriority: 'MEDIUM',
    keywords: ['trash', 'garbage dump', 'waste pile', 'plastic litter', 'debris'],
    displayName: 'Garbage & Waste Dumping',
    icon: 'Trash2',
  },
  OPEN_MANHOLE: {
    departmentId: 'dept-drainage',
    departmentName: 'Underground Drainage & Sewerage',
    slaHours: 12,
    defaultPriority: 'CRITICAL',
    keywords: ['open manhole', 'missing cover', 'storm drain opening', 'chasm'],
    displayName: 'Open / Broken Manhole Hazard',
    icon: 'AlertTriangle',
  },
  SEWAGE_OVERFLOW: {
    departmentId: 'dept-drainage',
    departmentName: 'Underground Drainage & Sewerage',
    slaHours: 24,
    defaultPriority: 'HIGH',
    keywords: ['sewage', 'drain water', 'foul smell', 'overflowing drain', 'sludge'],
    displayName: 'Sewage Overflow on Street',
    icon: 'Waves',
  },
  DRAINAGE_BLOCK: {
    departmentId: 'dept-drainage',
    departmentName: 'Underground Drainage & Sewerage',
    slaHours: 36,
    defaultPriority: 'MEDIUM',
    keywords: ['clogged drain', 'monsoon flooding', 'stormwater block'],
    displayName: 'Clogged Stormwater Drain',
    icon: 'Filter',
  },
  BROKEN_STREETLIGHT: {
    departmentId: 'dept-electricity',
    departmentName: 'Electrical & Public Lighting Dept',
    slaHours: 48,
    defaultPriority: 'LOW',
    keywords: ['streetlight', 'dark pole', 'broken bulb', 'light fixture broken'],
    displayName: 'Broken / Dark Streetlight',
    icon: 'LightbulbOff',
  },
  ELECTRICAL_HAZARD: {
    departmentId: 'dept-electricity',
    departmentName: 'State Electricity Distribution Corp',
    slaHours: 4,
    defaultPriority: 'CRITICAL',
    keywords: ['hanging wire', 'snapped live cable', 'sparking transformer', 'exposed electricals'],
    displayName: 'Live / Dangling Electrical Wire',
    icon: 'Zap',
  },
};

/**
 * Simulates real-time Computer Vision analysis on camera evidence.
 */
export async function simulateAIVerification(
  selectedCategory: ComplaintCategory,
  _imageDescription?: string,
  _imageUri?: string
): Promise<AICivilClassificationResult> {
  // Realistic processing latency for AI vision inference
  await new Promise((res) => setTimeout(res, 900));

  const deptMeta = CATEGORY_DEPARTMENT_MAP[selectedCategory];
  
  // High accuracy detection for matching category
  const confidence = Number((0.88 + Math.random() * 0.10).toFixed(2)); // 88% - 98%
  
  const detectedFeatures = [
    ...deptMeta.keywords.slice(0, 3),
    'Edge anomaly detected',
    'High localized surface contrast',
    'Real-time environment lighting signature'
  ];

  return {
    detectedCategory: selectedCategory,
    confidence,
    isCategoryMatch: true,
    priorityRecommendation: deptMeta.defaultPriority,
    suggestedDepartmentId: deptMeta.departmentId,
    suggestedDepartmentName: deptMeta.departmentName,
    slaHours: deptMeta.slaHours,
    fraudRisk: 'LOW',
    verificationNotes: `AI Computer Vision verified ${deptMeta.displayName} with ${(confidence * 100).toFixed(0)}% confidence. Visual features match municipal defect signatures.`,
    detectedFeatures,
  };
}
