import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, CheckCircle2, Search } from 'lucide-react';
import type { Coordinates, LocationConfidence, LocationMethod } from '../../types';
import { deriveLocationConfidence, detectWardAndZone, formatCoordinates } from '../../utils/geo';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Leaflet default marker icon fix
const customPinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationPickerProps {
  initialCoordinates?: Coordinates | null;
  onLocationChange: (locationData: {
    latitude: number;
    longitude: number;
    address: string;
    ward: string;
    zone: string;
    locationConfidence: LocationConfidence;
    locationMethod: LocationMethod;
  }) => void;
}

// Map Click Listener to move pin
function LocationMarker({ position, onPositionChange }: { position: [number, number]; onPositionChange: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} icon={customPinIcon} draggable={true} eventHandlers={{
    dragend(e) {
      const marker = e.target;
      const pos = marker.getLatLng();
      onPositionChange([pos.lat, pos.lng]);
    }
  }} />;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  initialCoordinates,
  onLocationChange,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<LocationMethod>('GPS_HARDWARE');
  const [lat, setLat] = useState<number>(initialCoordinates?.latitude || 17.4485);
  const [lng, setLng] = useState<number>(initialCoordinates?.longitude || 78.3742);
  const [accuracy, setAccuracy] = useState<number | undefined>(initialCoordinates?.accuracy || 8);
  const [address, setAddress] = useState<string>('Near Hitec City Road, Serilingampally');
  const [ward, setWard] = useState<string>('Ward 104 - Kondapur / Madhapur');
  const [zone, setZone] = useState<string>('Serilingampally West Zone');
  const [landmarkSearch, setLandmarkSearch] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const confidence = deriveLocationConfidence(selectedMethod, accuracy);

  // Sync ward & notify parent when coordinates change
  const updateLocation = (newLat: number, newLng: number, method: LocationMethod, customAddress?: string, customAccuracy?: number) => {
    setLat(newLat);
    setLng(newLng);
    setSelectedMethod(method);
    if (customAccuracy !== undefined) setAccuracy(customAccuracy);

    const geoData = detectWardAndZone(newLat, newLng);
    const finalAddress = customAddress || geoData.defaultAddress;
    setWard(geoData.ward);
    setZone(geoData.zone);
    setAddress(finalAddress);

    const conf = deriveLocationConfidence(method, customAccuracy !== undefined ? customAccuracy : accuracy);
    onLocationChange({
      latitude: newLat,
      longitude: newLng,
      address: finalAddress,
      ward: geoData.ward,
      zone: geoData.zone,
      locationConfidence: conf,
      locationMethod: method,
    });
  };

  // Acquire High Accuracy Hardware GPS (Tier 1)
  const triggerGpsAcquisition = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          updateLocation(pos.coords.latitude, pos.coords.longitude, 'GPS_HARDWARE', undefined, pos.coords.accuracy);
        },
        (err) => {
          setIsLocating(false);
          console.warn('GPS error, switching to Tier 2 network approximation', err);
          updateLocation(17.4485, 78.3742, 'NETWORK_APPROX', 'Approximate Area: Kondapur Metro Corridor', 150);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      updateLocation(17.4485, 78.3742, 'NETWORK_APPROX', 'Approximate Area: Kondapur Metro Corridor', 150);
    }
  };

  // Landmark search (Tier 4)
  const handleLandmarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landmarkSearch.trim()) return;

    // Simple heuristic parser for demo landmarks
    let targetLat = 17.4485;
    let targetLng = 78.3742;
    const query = landmarkSearch.toLowerCase();

    if (query.includes('jubilee') || query.includes('checkpost')) {
      targetLat = 17.4321;
      targetLng = 78.4112;
    } else if (query.includes('secunderabad') || query.includes('railway')) {
      targetLat = 17.4418;
      targetLng = 78.5021;
    } else if (query.includes('kondapur') || query.includes('rto')) {
      targetLat = 17.4623;
      targetLng = 78.3562;
    } else if (query.includes('malla') || query.includes('university')) {
      targetLat = 17.5450;
      targetLng = 78.4890;
    }

    updateLocation(targetLat, targetLng, 'LANDMARK', `Near ${landmarkSearch.trim()}`, 500);
  };

  useEffect(() => {
    if (initialCoordinates) {
      updateLocation(initialCoordinates.latitude, initialCoordinates.longitude, 'GPS_HARDWARE', undefined, initialCoordinates.accuracy);
    }
  }, [initialCoordinates]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Fallback Hierarchy Tier Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '0.35rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
      }}>
        <button
          type="button"
          onClick={triggerGpsAcquisition}
          className="btn btn-sm"
          style={{
            background: selectedMethod === 'GPS_HARDWARE' ? 'var(--accent-blue)' : 'transparent',
            color: selectedMethod === 'GPS_HARDWARE' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.75rem',
          }}
        >
          <Navigation size={13} />
          <span>{isLocating ? 'Acquiring...' : 'Tier 1: Device GPS'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedMethod('MANUAL_PIN')}
          className="btn btn-sm"
          style={{
            background: selectedMethod === 'MANUAL_PIN' ? 'var(--accent-blue)' : 'transparent',
            color: selectedMethod === 'MANUAL_PIN' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.75rem',
          }}
        >
          <MapPin size={13} />
          <span>Tier 3: Pin on Map</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedMethod('LANDMARK')}
          className="btn btn-sm"
          style={{
            background: selectedMethod === 'LANDMARK' ? 'var(--accent-blue)' : 'transparent',
            color: selectedMethod === 'LANDMARK' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.75rem',
          }}
        >
          <Compass size={13} />
          <span>Tier 4: Landmark</span>
        </button>
      </div>

      {/* Confidence Indicator Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className={`badge badge-${confidence === 'HIGH' ? 'low' : confidence === 'MEDIUM' ? 'medium' : 'high'}`}>
            Location Confidence: {confidence}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {formatCoordinates(lat, lng)}
          </span>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {selectedMethod === 'GPS_HARDWARE' ? '±' + (accuracy || 5) + 'm precision' : selectedMethod === 'MANUAL_PIN' ? 'User-placed pin' : 'Landmark estimated'}
        </div>
      </div>

      {/* Interactive Leaflet Mini Map (Tier 3 Pinpoint Adjustment) */}
      <div style={{
        height: '200px',
        width: '100%',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        position: 'relative',
      }}>
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={[lat, lng]}
            onPositionChange={([newLat, newLng]) => updateLocation(newLat, newLng, 'MANUAL_PIN')}
          />
        </MapContainer>
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          zIndex: 400,
          background: 'rgba(0, 0, 0, 0.75)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.7rem',
          color: '#fff',
        }}>
          💡 Click or drag pin to adjust exact pothole location
        </div>
      </div>

      {/* Tier 4 Landmark Input Form */}
      {selectedMethod === 'LANDMARK' && (
        <form onSubmit={handleLandmarkSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.4rem 0.75rem',
            gap: '0.5rem',
          }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="e.g. Near Malla Reddy University Main Gate or Metro Pillar 1042"
              value={landmarkSearch}
              onChange={(e) => setLandmarkSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                width: '100%',
                outline: 'none',
                fontSize: '0.85rem',
              }}
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">
            Lookup
          </button>
        </form>
      )}

      {/* Detected Ward & Address Confirmation */}
      <div style={{
        background: 'rgba(59, 130, 246, 0.05)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem',
        fontSize: '0.85rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '0.25rem' }}>
          <CheckCircle2 size={15} />
          <span>Auto-Assigned Municipal Jurisdiction:</span>
        </div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
          {ward} ({zone})
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
          📍 {address}
        </div>
      </div>
    </div>
  );
};
