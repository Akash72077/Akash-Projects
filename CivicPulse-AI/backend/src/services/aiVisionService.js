const ALLOWED_CATEGORIES = new Set([
  'pothole', 'garbage', 'water_leakage', 'broken_streetlight', 'drainage',
  'open_manhole', 'fallen_tree', 'damaged_road', 'loose_electric_wire', 'other'
]);

const ALLOWED_SEVERITIES = new Set(['low', 'medium', 'high', 'critical']);

const DEPARTMENT_MAP = {
  pothole: 'Roads Department',
  garbage: 'Sanitation & Waste Management',
  water_leakage: 'Water Works Department',
  broken_streetlight: 'Electricity Department',
  drainage: 'Drainage & Sewerage',
  open_manhole: 'Drainage & Sewerage',
  fallen_tree: 'Parks & Tree Authority',
  damaged_road: 'Roads Department',
  loose_electric_wire: 'Electricity Department',
  other: 'General Municipal Services'
};

function parseJson(text = '') {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try { return JSON.parse(cleaned); } catch {}
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
  throw new Error('AI returned an invalid JSON response.');
}

function normalizeResult(raw) {
  const category = ALLOWED_CATEGORIES.has(raw.category) ? raw.category : 'other';
  const severity = ALLOWED_SEVERITIES.has(raw.severity) ? raw.severity : 'medium';
  const priority = Number(raw.priority_score);
  const photoDescription = String(raw.photo_description || raw.description || '').trim();
  const summary = String(raw.ai_summary || raw.complaint_summary || photoDescription || 'Civic issue requires municipal attention.').trim();
  const title = String(raw.title || 'Civic issue reported').trim().slice(0, 120);
  const department = DEPARTMENT_MAP[category] || 'General Municipal Services';

  return {
    identifiable: raw.identifiable !== false && category !== 'other',
    result: {
      title,
      category,
      severity,
      priority_score: Number.isFinite(priority) ? Math.max(0, Math.min(100, Math.round(priority))) : 55,
      suggested_department: department,
      ai_summary: summary,
      photo_description: photoDescription || summary,
    }
  };
}

export async function analyzeCivicImage({ buffer, mimeType = 'image/jpeg', description = '' }) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return { configured: false, result: null };

  const model = process.env.GEMINI_MODEL?.trim() || 'gemini-3.7-flash';
  const prompt = `You are CivicPulse AI, a civic issue image analysis assistant for Indian cities.
Analyze the uploaded image itself. Do not rely on the filename. Identify the visible civic problem and create a concise complaint record.

Supported categories:
- pothole
- garbage
- water_leakage
- broken_streetlight
- drainage
- open_manhole
- fallen_tree
- damaged_road
- loose_electric_wire
- other

Severity must be one of: low, medium, high, critical.
Priority must be an integer from 0 to 100 based on safety risk, urgency, traffic/pedestrian danger, public-health impact, and sensitive locations such as schools/hospitals.

Return ONLY valid JSON in this exact shape:
{
  "identifiable": true,
  "photo_description": "A clear, factual 1-2 sentence description of what is visibly wrong in the photo.",
  "title": "Short complaint title",
  "category": "one supported category",
  "severity": "low|medium|high|critical",
  "priority_score": 0,
  "ai_summary": "Clear civic complaint summary explaining the issue and risk."
}

If the photo does not clearly show a civic issue, set identifiable to false, category to other, and explain what is visible in photo_description.
Citizen-provided extra context, if any: ${description.trim() || 'None provided.'}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inline_data: { mime_type: mimeType, data: buffer.toString('base64') } },
          { text: prompt }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json'
      }
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = payload?.error?.message || `Gemini request failed (${response.status}).`;
    throw new Error(msg);
  }

  const text = payload?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
  if (!text) throw new Error('Gemini returned no image analysis.');

  const normalized = normalizeResult(parseJson(text));
  return { configured: true, ...normalized };
}
