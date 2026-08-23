# CivicPulse AI

**Smarter Cities. Faster Action.**

CivicPulse AI is a full-stack civic complaint reporting and resolution demo. It lets citizens capture/upload civic evidence, detect their location, generate an AI-style problem classification, detect nearby duplicates, support existing complaints, track status, and lets authorities prioritize and resolve reports.

## Fastest way to run on Windows CMD

1. Extract the ZIP.
2. Open the `CivicPulse-AI` folder.
3. Double-click `RUN-CIVICPULSE.cmd`.
4. On the first run it automatically installs the root, backend and frontend npm packages.
5. Open `http://localhost:5173` if the browser does not open automatically.

You can also run from CMD:

```cmd
cd path\to\CivicPulse-AI
npm install
npm run install:all
npm run dev
```

Frontend: `http://localhost:5173`
Backend API: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

## Demo accounts

- Citizen: `citizen@civicpulse.demo` / `citizen123`
- Authority: `authority@civicpulse.demo` / `authority123`

You may also register a new account.


## Community Civic Feed

The citizen sidebar now includes **Civic Feed**. It supports:

- **Near Me**: complaints within 5 km of the citizen (with a HITEC City demo fallback when location permission is unavailable).
- **All Areas**: browse complaints from Balanagar, Madhapur, HITEC City, Ameerpet, Kukatpally, Secunderabad and other areas.
- Search and filters for area, category, status and severity.
- Sort by nearby distance, priority, community support or newest.
- **I also face this** community support, which increases the affected count and raises priority.
- Seeded duplicate complaints, including two pothole reports roughly a few dozen metres apart near Balanagar Metro, for duplicate-detection demonstrations.
- Possible-duplicate badges in the community feed.

## Database

The application works immediately in demo memory mode. MongoDB is optional. To use MongoDB Atlas, edit `backend/.env` and set `MONGO_URI`.

## AI

The app supports **real image understanding through Google Gemini Vision**. When `GEMINI_API_KEY` is configured, CivicPulse sends the uploaded image bytes to the backend vision service and generates a photo description, category, severity, priority, department and complaint summary from the image itself. Without a key, the app falls back only to citizen-provided text and never treats the image filename as visual analysis.

## Report flow

1. Capture a live camera image or upload a photo.
2. Verify GPS, drag the map pin, or enter a landmark.
3. AI creates category, severity, priority, department and complaint summary.
4. If the image is unclear, the user enters a description and AI analyzes the text.
5. The user confirms/edits the AI result.
6. Nearby duplicate reports are checked.
7. The user can support an existing complaint or submit a new one.
8. Authorities process status: Reported → Verified → Assigned → In Progress → Resolved.

## Demo data + Complaint Progress update

The citizen dashboard now automatically displays populated demo complaint cards when a newly-created citizen account has not submitted a real complaint yet. The sample set covers potholes, garbage, water leakage, broken streetlights, drainage issues, open manholes, damaged roads, loose electric wires, multiple statuses, and an intentional Balanagar duplicate pair. Once the citizen submits a real complaint, My Complaints switches back to that citizen's actual reports.

A new **Complaint Progress** page is available from the citizen sidebar. It shows the five-stage workflow (Reported → Verified → Assigned → In Progress → Resolved), the administrative office that has acknowledged the complaint, the assigned department/team, the current administrative note, and what happens next. New accounts receive demo progress records until they have their own reports.


## Reference-style Overview update

The citizen landing dashboard now includes an Overview page styled after the supplied CivicVerify reference: dark navy sidebar, hero case summary, evidence confidence, issue statistics, live case intelligence, smart-routing workflow, and quick links. The sidebar includes Overview, Report Issue, Civic Feed, Issue Map, My Complaints, Complaint Progress, Authority Dashboard, Contractors, and Trust & Security.

## Gen-Z light + dark dashboard update

The citizen experience now uses a cleaner Gen-Z visual system inspired by the approved CivicPulse mockup. Purple is the main brand accent, while green/red/amber/blue are reserved for meaningful status blocks instead of decorating every element. The Overview dashboard includes live case tracking, AI confidence, trending local issues, quick actions and a simplified civic workflow. A persistent sun/moon toggle in the sidebar switches between light and dark mode, and the preference is saved in the browser.


## Neon Block UI Update

The Overview dashboard now uses the approved CivicPulse AI Gen-Z visual system:
- Light and dark modes
- Neutral page backgrounds and typography
- Neon color restricted to block/card borders, icons, status indicators, active navigation and quick actions
- Stronger neon glow in dark mode; softer neon edge in light mode
- Purple remains the primary CivicPulse brand accent
- Status colors remain semantic: green verified, pink/red high priority, cyan resolved, amber overdue
- Theme preference is preserved in the browser
## Latest UI update
- Replaced the sidebar “Small reports. Big change.” promo block with the provided “Make your city better, together.” illustrated card.


## Real AI image understanding
CivicPulse AI can analyze the actual pixels of an uploaded civic photo using Google Gemini. Add your key to `backend/.env`:

```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.7-flash
```

Then restart the backend. The Report Issue flow sends the uploaded image to the backend, which asks the vision model to generate a factual photo description, category, severity, priority, department and complaint summary. If the key is not configured, the app clearly falls back to manual/text analysis instead of pretending to understand the image.

## Demo civic photos
The bundled demo feed uses civic issue photos from Wikimedia Commons (potholes, garbage overflow, water leakage, damaged streetlight, open drainage, open manhole, damaged road, and downed electric lines). Their respective file pages contain the original authors and Creative Commons/public-domain licensing details. These images are included only as hackathon demo content.

## Authority-only ML Hotspot Prediction

CivicPulse AI now includes **CivicPulse Predict**, an authority-only hotspot intelligence page powered by DBSCAN-style spatial clustering. Officials can click a risk zone to see every complaint in that area, category breakdown, days pending, unverified/unassigned/overdue counts, administrative status and a recommended action.

Demo authority login:
- Email: `authority@civicpulse.demo`
- Password: `authority123`

After login, open **Hotspot Prediction** from the left sidebar.

## Latest Authority Operations Update

### Hotspot Prediction → Dedicated Area Detail
- Authority-only ML risk map using DBSCAN-style spatial clustering.
- Clicking a hotspot now opens a dedicated hotspot detail page for that exact area.
- The detail page shows category breakdown, total/open complaints, duplicate groups, pending verification, unassigned cases, overdue cases, critical unresolved cases, citizen support, reported dates, pending days, and administrative state.
- 15 additional demo duplicate reports are distributed across Balanagar, Kukatpally, Madhapur, Ameerpet, Secunderabad, HITEC City and Moosapet.
- Purple complaint points on the hotspot map represent likely duplicate reports.

### Contractor Operations Center
- Authority contractor statistics, availability, performance, coverage and specialization cards.
- Current workload and overdue work-order sections.
- Verified complaints can be assigned directly to a suitable contractor.
- Assignment updates the complaint to `assigned` and stores the contractor name in `assigned_to`.
- Contractor-role users still get their personal work queue.

## Authority Duplicate Consolidation Update

The Authority Dashboard now defaults to **Grouped Issues**. Active complaints with the same civic category within **100 metres** are consolidated into one authority case while preserving every citizen report underneath it.

- Existing `duplicate_of` links are honored first.
- New reports are automatically linked to the nearest active complaint of the same category within 100 m.
- Group priority increases using severity, number of matching reports, community support and complaint age.
- Authorities can switch between **Grouped Issues** and **Individual Reports**.
- Opening a group shows every report, distance from the main complaint, support count and status.
- Citizens still retain their individual complaint records; grouping only reduces administrative dashboard noise.
