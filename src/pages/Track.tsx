// Import the new MapControlButtons component
import MapControlButtons from '@/components/map/MapControlButtons';
import { useRef, useState, useEffect } from 'react';
import { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const Track = () => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(-73.9857);
  const [lat, setLat] = useState(40.7589);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);
  
  // Add zoom control handlers
  const handleZoomIn = () => {
    const map = mapRef.current;
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    if (map) {
      map.zoomOut();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Track Your Delivery</h1>
        <p className="text-gray-500">Real-time updates on your fuel delivery.</p>
      </div>
      
      <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
        <div ref={mapContainerRef} className="map-container h-full" />
        
        <MapControlButtons onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        
      </div>
      
    </div>
  );
};

export default Track;
