/**
 * Location Service for Geospatial Computations & Geofencing
 */

/**
 * Calculates great-circle distance between two GPS points using the Haversine formula.
 * @returns distance in meters
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Derives location confidence rating based on source and accuracy in meters.
 */
export function deriveLocationConfidence(method, accuracyMeters) {
  if (method === 'GPS_HARDWARE') {
    if (!accuracyMeters || accuracyMeters <= 30) return 'HIGH';
    if (accuracyMeters <= 100) return 'MEDIUM';
    return 'LOW';
  }
  if (method === 'NETWORK_APPROX') return 'MEDIUM';
  if (method === 'MANUAL_PIN') return 'MEDIUM';
  if (method === 'LANDMARK') return 'LOW';
  return 'UNVERIFIED';
}

/**
 * Ward & Zone reverse geocoding heuristic
 */
export function detectWardAndZone(lat, lng) {
  if (lat >= 17.44 && lat <= 17.52 && lng >= 78.34 && lng <= 78.42) {
    return {
      ward: 'Ward 104 - Kondapur / Madhapur',
      zone: 'Serilingampally West Zone',
      defaultAddress: 'Near Hitec City Road, Serilingampally',
    };
  }
  if (lat >= 17.40 && lat <= 17.44 && lng >= 78.40 && lng <= 78.48) {
    return {
      ward: 'Ward 98 - Jubilee Hills',
      zone: 'Khairatabad Central Zone',
      defaultAddress: 'Road No. 36, Jubilee Hills',
    };
  }
  if (lat >= 17.42 && lat <= 17.48 && lng >= 78.48 && lng <= 78.56) {
    return {
      ward: 'Ward 142 - Secunderabad Cantt',
      zone: 'Secunderabad North Zone',
      defaultAddress: 'MG Road, Secunderabad',
    };
  }

  return {
    ward: 'Ward 23 - Tech Zone & Central Suburbs',
    zone: 'Greater Municipal Zone 4',
    defaultAddress: 'Main Arterial Sector Highway',
  };
}

/**
 * Generates simulated perceptual hash for image based on seed
 */
export function generatePHash(seedString) {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(16, 'a');
  return hex.slice(0, 16);
}
