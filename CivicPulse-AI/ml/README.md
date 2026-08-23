# CivicPulse Predict — Hotspot ML

CivicPulse Predict is the authority-only ML layer of CivicPulse AI.

## Model used
The running application uses a DBSCAN-style unsupervised spatial clustering model in:

`backend/src/services/hotspotPredictionService.js`

It groups complaint coordinates into dense civic-problem clusters without requiring the number of clusters in advance. Each cluster is then scored using complaint density, unresolved ratio, severity, overdue cases, citizen support and recent growth.

## Authority workflow
1. Open **Hotspot Prediction** from the Authority sidebar.
2. Choose a 7, 30 or 90 day analysis window.
3. Click a risk zone on the map.
4. Review problem categories, risk score, pending-verification count, unassigned cases and overdue cases.
5. Inspect the full complaint list and pending days.
6. Verify a reported complaint directly or open it for full administrative action.

The hotspot API is protected by the `authority` role at `/api/analytics/hotspots`.
