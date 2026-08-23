import type { AIAnalysisResult, ComplaintCategory, Severity } from '@/types';

const CATEGORY_KEYWORDS: Record<ComplaintCategory, string[]> = {
  pothole: ['pothole', 'potholes', 'hole', 'crater', 'road damage', 'broken road', 'ditch', 'pothole road'],
  garbage: ['garbage', 'trash', 'waste', 'rubbish', 'dump', 'litter', 'garbage pile', 'waste pile', 'garbage bin'],
  water_leakage: ['water leak', 'leakage', 'pipe burst', 'water pipe', 'water logging', 'flooding water', 'water seepage', 'water flowing'],
  broken_streetlight: ['streetlight', 'street light', 'lamp', 'light broken', 'light not working', 'lamp post', 'light pole', 'street lamp'],
  drainage: ['drainage', 'drain', 'sewer', 'sewerage', 'blocked drain', 'clogged drain', 'overflow drain', 'drain blocked'],
  open_manhole: ['manhole', 'open manhole', 'missing cover', 'manhole cover', 'open pit', 'uncovered manhole'],
  fallen_tree: ['tree', 'fallen tree', 'branch', 'uprooted', 'tree fallen', 'fallen branch', 'tree blocking', 'fallen log'],
  damaged_road: ['road', 'damaged road', 'cracked road', 'road surface', 'broken asphalt', 'road crack', 'road repair', 'cracked road surface'],
  loose_electric_wire: ['wire', 'electric', 'electric wire', 'loose wire', 'hanging wire', 'power line', 'cable', 'exposed wire', 'hanging electric wire'],
  other: [],
};

const DEPARTMENT_MAP: Record<ComplaintCategory, string> = {
  pothole: 'Roads Department',
  garbage: 'Sanitation & Waste Management',
  water_leakage: 'Water Works Department',
  broken_streetlight: 'Electricity Department',
  drainage: 'Drainage & Sewerage',
  open_manhole: 'Drainage & Sewerage',
  fallen_tree: 'Parks & Tree Authority',
  damaged_road: 'Roads Department',
  loose_electric_wire: 'Electricity Department',
  other: 'General Municipal Services',
};

const SEVERITY_BASE: Record<ComplaintCategory, Severity> = {
  pothole: 'high',
  garbage: 'medium',
  water_leakage: 'high',
  broken_streetlight: 'medium',
  drainage: 'high',
  open_manhole: 'critical',
  fallen_tree: 'high',
  damaged_road: 'high',
  loose_electric_wire: 'critical',
  other: 'low',
};

const SEVERITY_PRIORITY: Record<Severity, number> = {
  low: 25,
  medium: 50,
  high: 75,
  critical: 95,
};

// Simulated image recognition hints based on filename keywords
const IMAGE_FILENAME_HINTS: Record<string, ComplaintCategory> = {
  pothole: 'pothole',
  hole: 'pothole',
  garbage: 'garbage',
  trash: 'garbage',
  waste: 'garbage',
  water: 'water_leakage',
  leak: 'water_leakage',
  pipe: 'water_leakage',
  streetlight: 'broken_streetlight',
  light: 'broken_streetlight',
  lamp: 'broken_streetlight',
  drainage: 'drainage',
  drain: 'drainage',
  sewer: 'drainage',
  manhole: 'open_manhole',
  tree: 'fallen_tree',
  branch: 'fallen_tree',
  road: 'damaged_road',
  wire: 'loose_electric_wire',
  electric: 'loose_electric_wire',
  cable: 'loose_electric_wire',
};

export interface AIAnalysisResponse {
  result: AIAnalysisResult | null;
  couldNotIdentify: boolean;
  message?: string;
}

function detectCategory(text: string): ComplaintCategory {
  const lower = text.toLowerCase();
  let bestCategory: ComplaintCategory = 'other';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.length > 5 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category as ComplaintCategory;
    }
  }
  return bestCategory;
}

function detectCategoryFromImage(photoName: string): ComplaintCategory | null {
  const lower = photoName.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  for (const [hint, category] of Object.entries(IMAGE_FILENAME_HINTS)) {
    if (lower.includes(hint)) return category;
  }
  return null;
}

function adjustSeverity(category: ComplaintCategory, text: string): Severity {
  let severity = SEVERITY_BASE[category];
  const lower = text.toLowerCase();
  const urgentWords = ['urgent', 'danger', 'dangerous', 'critical', 'emergency', 'immediately', 'serious', 'severe', 'accident', 'injury', 'hazard'];
  const lowWords = ['minor', 'small', 'slight', 'not urgent', 'whenever', 'low priority'];

  if (urgentWords.some((w) => lower.includes(w))) {
    if (severity === 'low') severity = 'medium';
    else if (severity === 'medium') severity = 'high';
    else if (severity === 'high') severity = 'critical';
  }
  if (lowWords.some((w) => lower.includes(w))) {
    if (severity === 'critical') severity = 'high';
    else if (severity === 'high') severity = 'medium';
    else if (severity === 'medium') severity = 'low';
  }
  return severity;
}

function computePriorityScore(severity: Severity, text: string): number {
  let base = SEVERITY_PRIORITY[severity];
  const lower = text.toLowerCase();

  if (lower.includes('school') || lower.includes('hospital') || lower.includes('main road') || lower.includes('highway')) {
    base = Math.min(100, base + 10);
  }
  if (lower.includes('children') || lower.includes('elderly') || lower.includes('blind') || lower.includes('disabled')) {
    base = Math.min(100, base + 8);
  }
  if (lower.includes('night') || lower.includes('dark') || lower.includes('no light')) {
    base = Math.min(100, base + 5);
  }
  const variance = Math.floor(Math.random() * 6) - 3;
  return Math.max(0, Math.min(100, base + variance));
}

function generateSummary(category: ComplaintCategory, text: string): string {
  const labelMap: Record<ComplaintCategory, string> = {
    pothole: 'Large pothole detected in the middle of the road, which may cause accidents.',
    garbage: 'Accumulated garbage or waste has been identified that requires prompt cleanup.',
    water_leakage: 'Water leakage detected, potentially causing waterlogging and infrastructure damage.',
    broken_streetlight: 'A non-functional streetlight has been reported, affecting nighttime visibility and safety.',
    drainage: 'A drainage issue has been identified that may lead to waterlogging or sanitation problems.',
    open_manhole: 'An open manhole has been detected, posing a severe safety hazard to pedestrians and vehicles.',
    fallen_tree: 'A fallen tree has been reported, potentially blocking roads or pathways.',
    damaged_road: 'Road surface damage has been detected that may affect traffic flow and safety.',
    loose_electric_wire: 'A loose or exposed electric wire has been reported, posing an electrocution hazard.',
    other: 'A civic issue has been reported that requires municipal attention.',
  };

  let summary = labelMap[category];
  const lower = text.toLowerCase();
  if (lower.includes('school') || lower.includes('hospital')) {
    summary += ' Located near a sensitive area (school/hospital), increasing urgency.';
  }
  if (lower.includes('accident') || lower.includes('injury')) {
    summary += ' Reports of accidents or injuries associated with this issue.';
  }
  return summary;
}

function generateTitle(category: ComplaintCategory, text: string): string {
  const labelMap: Record<ComplaintCategory, string> = {
    pothole: 'Pothole on road',
    garbage: 'Garbage accumulation',
    water_leakage: 'Water leakage',
    broken_streetlight: 'Broken streetlight',
    drainage: 'Drainage issue',
    open_manhole: 'Open manhole',
    fallen_tree: 'Fallen tree',
    damaged_road: 'Damaged road',
    loose_electric_wire: 'Loose electric wire',
    other: 'Civic issue reported',
  };

  let title = labelMap[category];
  const lower = text.toLowerCase();
  if (lower.includes('near') || lower.includes('opposite') || lower.includes('outside')) {
    const match = text.match(/(?:near|opposite|outside)\s+([^.!?\n]{3,40})/i);
    if (match) title += ` near ${match[1].trim()}`;
  }
  return title;
}

function buildResult(category: ComplaintCategory, text: string): AIAnalysisResult {
  const severity = adjustSeverity(category, text);
  const priority_score = computePriorityScore(severity, text);
  return {
    category,
    severity,
    priority_score,
    suggested_department: DEPARTMENT_MAP[category],
    ai_summary: generateSummary(category, text),
    photo_description: generateSummary(category, text),
    title: generateTitle(category, text),
  };
}

/**
 * Legacy no-cloud fallback. It deliberately does NOT infer image content from
 * filenames. Real photo understanding happens on the backend through Gemini.
 */
export function simulateImageAnalysis(_photoName: string, description: string = ''): AIAnalysisResponse {
  if (description.trim()) return analyzeText(description);
  return {
    result: null,
    couldNotIdentify: true,
    message: 'Real image analysis requires the configured vision backend. Please describe the issue if vision AI is unavailable.',
  };
}

/**
 * Analyzes a text description and returns AI results.
 */
export function analyzeText(description: string): AIAnalysisResponse {
  if (!description.trim()) {
    return { result: null, couldNotIdentify: true, message: 'Please describe the issue.' };
  }

  const category = detectCategory(description);
  if (category === 'other') {
    // Still produce a result but with low confidence
    return { result: buildResult('other', description), couldNotIdentify: false };
  }

  return { result: buildResult(category, description), couldNotIdentify: false };
}

export { DEPARTMENT_MAP, SEVERITY_BASE };
