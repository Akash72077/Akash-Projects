/**
 * Notification Service for Civic Broadcast Alerts
 */
import { AwarenessAlert } from '../models/AwarenessAlert.js';

export async function createBroadcastAlert({ title, message, type = 'INFO', ward = 'All Municipal Wards', issuedBy = 'Municipal Zonal Authority', relatedCategory }) {
  const alert = await AwarenessAlert.create({
    title,
    message,
    type,
    ward,
    issuedBy,
    relatedCategory,
  });

  return alert;
}

export async function getActiveAlerts(ward = 'ALL') {
  const query = { isActive: true };
  if (ward !== 'ALL') {
    query.$or = [{ ward }, { ward: 'All Municipal Wards' }];
  }

  return await AwarenessAlert.find(query).sort({ createdAt: -1 }).limit(10);
}
