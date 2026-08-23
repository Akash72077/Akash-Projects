const mappings = [
  ['loose_electric_wire', ['wire', 'electric', 'cable', 'shock', 'electrocution'], 'Electricity Department', 'critical'],
  ['open_manhole', ['manhole', 'open drain cover'], 'Drainage & Sewerage', 'critical'],
  ['pothole', ['pothole', 'pot hole'], 'Roads Department', 'high'],
  ['damaged_road', ['damaged road', 'road crack', 'broken road'], 'Roads Department', 'high'],
  ['garbage', ['garbage', 'trash', 'waste', 'rubbish'], 'Sanitation & Waste Management', 'medium'],
  ['water_leakage', ['water leak', 'leakage', 'pipe leak', 'burst pipe'], 'Water Works Department', 'high'],
  ['broken_streetlight', ['streetlight', 'street light', 'lamp'], 'Electricity Department', 'medium'],
  ['drainage', ['drainage', 'sewage', 'drain', 'waterlogging'], 'Drainage & Sewerage', 'high'],
  ['fallen_tree', ['fallen tree', 'tree fallen', 'branch'], 'Parks & Tree Authority', 'high']
];

export function classifyComplaint(text = '', filename = '') {
  const input = `${filename} ${text}`.toLowerCase();
  const match = mappings.find(([, words]) => words.some(w => input.includes(w)));
  if (!match) return null;
  const [category, , department, baseSeverity] = match;
  let severity = baseSeverity;
  if (/school|hospital|accident|injury|sparking|fire|children/.test(input)) severity = severity === 'medium' ? 'high' : 'critical';
  const base = { low: 30, medium: 55, high: 78, critical: 92 }[severity];
  const impact = /school|hospital|accident|injury|busy|main road/.test(input) ? 5 : 0;
  const priority_score = Math.min(100, base + impact);
  const labels = {
    loose_electric_wire: 'Loose electric wire', open_manhole: 'Open manhole', pothole: 'Pothole on road', damaged_road: 'Damaged road',
    garbage: 'Garbage accumulation', water_leakage: 'Water leakage', broken_streetlight: 'Broken streetlight', drainage: 'Drainage issue', fallen_tree: 'Fallen tree'
  };
  return {
    title: labels[category], category, severity, priority_score, suggested_department: department,
    ai_summary: `${labels[category]} detected/reported and requires attention from the ${department}.`,
    photo_description: `${labels[category]} is visible/reported in the submitted civic evidence.`
  };
}
