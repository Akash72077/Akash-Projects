import MapView from '@/components/MapView';
export default function LocationPicker({ location, onSelect, height='250px' }: { location:{lat:number;lng:number}|null; onSelect:(lat:number,lng:number)=>void; height?:string }) {
  return <MapView complaints={[]} center={location?[location.lat,location.lng]:[17.4485,78.3742]} zoom={15} height={height} selectable selectedLocation={location} onLocationSelect={onSelect}/>;
}
