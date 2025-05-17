import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-control-geocoder"
import L from "leaflet";

const GeoSearch = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      provider,
    });

    map.addControl(searchControl);


    // Cleanup on unmount
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};
export default GeoSearch;