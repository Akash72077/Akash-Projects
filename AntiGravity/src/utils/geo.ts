import type { LocationConfidence, LocationMethod } from '../types';

/**
 * Calculates great-circle distance between two GPS points using the Haversine formula.
 * @returns distance in meters
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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
export function deriveLocationConfidence(
  method: LocationMethod,
  accuracyMeters?: number
): LocationConfidence {
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
 * Formats coordinates for clean UI display.
 */
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E`;
}

/**
 * Mock Ward & Zone detector based on GPS bounds
 */
export function detectWardAndZone(lat: number, lng: number): { ward: string; zone: string; defaultAddress: string } {
  // Approximate wards in Hyderabad / Cyberabad region
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
 * Calculates Hamming distance between two 16-hex/64-bit perceptual hashes.
 */
export function calculatePHashHammingDistance(hash1?: string, hash2?: string): number {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) return 64;
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    const val1 = parseInt(hash1[i], 16);
    const val2 = parseInt(hash2[i], 16);
    let xor = val1 ^ val2;
    while (xor > 0) {
      distance += xor & 1;
      xor >>= 1;
    }
  }
  return distance;
}

/**
 * Generates simulated perceptual hash for image based on seed or category
 */
export function generatePHash(seedString: string): string {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(16, 'a');
  return hex.slice(0, 16);
}
