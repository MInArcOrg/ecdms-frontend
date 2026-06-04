import { Box, CircularProgress } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L, { DivIcon, DivIconOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationAnalticsApiService from 'src/services/analytics/location-service';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

interface MarkerData {
  p: [number, number];
  icon: DivIcon;
  id?: string | number;
}

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

const ETHIOPIA_ANCHORS: Array<[number, number]> = [
  [9.005401, 38.763611],
  [9.6009, 41.8501],
  [13.4967, 39.4753],
  [11.5936, 37.3908],
  [8.541, 39.2699],
  [7.0504, 38.4571],
  [9.35, 42.8],
  [10.0667, 34.5333],
  [11.79, 41.0],
  [9.3124, 42.1218],
  [7.678, 36.834],
  [6.86, 37.76],
  [9.083, 36.546],
  [4.18, 34.35]
];

const isInEthiopia = (lat: number, lng: number) => lat >= 3.0 && lat <= 15.5 && lng >= 33.0 && lng <= 48.5;

interface MapViewProps {
  position?: [number, number];
  width?: string | number;
  height?: string | number;
  colors: string[];
  categories?: any[];
  baseUrl?: string;
  loading?: boolean;
  catLoading?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  position = [9.005401, 38.763611],
  width = '100%',
  height = 600,
  colors = [],
  categories = [],
  baseUrl,
  loading = false,
  catLoading = false
}) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  useEffect(() => {
    if (colors.length > 0 && categories.length > 0) {
      if (dummyEnabled) {
        const allMarkers: MarkerData[] = [];

        categories.forEach((category, index) => {
          const seed = hashString(`${category?.id || index}:${category?.title || ''}:${index}`);
          const rand = mulberry32(seed);
          const count = 5 + Math.floor(rand() * 3);
          const iconHtml = `
                  <div>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 1000 1000" width="35px" height="35px">
                      viewBox="0 0 1000 1000" width="35px" height="35px">
                      <g fill="${colors[index % colors.length]}" 
                        transform="translate(0,512) scale(0.1,-0.1)">
                        <path d="M4645.1,5000.6c-473.8-61.4-916.9-220.6-1289-464.2C2656,4081.8,2193.8,3402.8,2015.4,2566.5c-38.4-170.7-44.1-259-44.1-585c0-326.1,5.8-414.3,44.1-585c63.3-293.5,147.7-537.1,276.2-786.4c63.3-120.8,694.4-1383,1406-2804.3C4407.3-3617.6,4994.2-4780,5000-4780c5.8,0,592.7,1162.4,1302.4,2583.7C7014-773,7645.1,489.2,7708.4,610c128.6,249.4,212.9,493,276.2,786.4c38.4,172.6,44.1,257,44.1,585c0,324.2-7.7,414.3-44.1,585c-130.4,613.8-408.6,1133.6-838.2,1561.4c-577.4,579.3-1363.8,901.5-2175.2,891.9C4860,5017.9,4714.2,5010.2,4645.1,5000.6z M5209.1,3410.5c596.6-86.3,1089.5-525.6,1250.6-1114.4c24.9-86.3,34.5-195.7,34.5-372.1c1.9-295.4-26.9-418.2-149.6-671.3C6089.5,734.7,5579.3,418.2,5000,418.2s-1089.5,316.5-1344.6,834.4c-103.6,211-140,351-155.4,575.4c-26.9,437.3,124.7,834.4,443.1,1152.8C4286.4,3324.2,4739.1,3477.6,5209.1,3410.5z"/>
                      </g>
                    </svg>
                  </div>
                `;

          const myIcon = L.divIcon({
            className: 'my-custom-pin-svg',
            iconAnchor: [0, 24],
            popupAnchor: [0, -36],
            html: iconHtml
          } as DivIconOptions);

          for (let i = 0; i < count; i++) {
            const [baseLat, baseLng] = ETHIOPIA_ANCHORS[(seed + i) % ETHIOPIA_ANCHORS.length];
            const jitterLat = (rand() - 0.5) * 1.2;
            const jitterLng = (rand() - 0.5) * 1.4;
            const lat = Math.max(3.0, Math.min(15.5, baseLat + jitterLat));
            const lng = Math.max(33.0, Math.min(48.5, baseLng + jitterLng));

            allMarkers.push({
              p: [lat, lng],
              icon: myIcon,
              id: `${category.id || index}-${i}`
            });
          }
        });

        setMarkers(allMarkers);
        return;
      }

      const fetchMarkers = async () => {
        const allMarkers: MarkerData[] = [];

        await Promise.all(
          categories.map(async (category, index) => {
            try {
              const response = await locationAnalticsApiService.getLocationCordinates(baseUrl || '', category.id || '', {});

              const coordinates = response?.payload || [];
              console.log('allMarkers', coordinates);

              coordinates.forEach((cor: [number, number, string | number]) => {
                const [lng, lat, id] = cor;
                if (!isInEthiopia(lat, lng)) return;

                const iconHtml = `
                  <div>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 1000 1000" width="35px" height="35px">
                      <g fill="${colors[index % colors.length]}" 
                        transform="translate(0,512) scale(0.1,-0.1)">
                        <path d="M4645.1,5000.6c-473.8-61.4-916.9-220.6-1289-464.2C2656,4081.8,2193.8,3402.8,2015.4,2566.5c-38.4-170.7-44.1-259-44.1-585c0-326.1,5.8-414.3,44.1-585c63.3-293.5,147.7-537.1,276.2-786.4c63.3-120.8,694.4-1383,1406-2804.3C4407.3-3617.6,4994.2-4780,5000-4780c5.8,0,592.7,1162.4,1302.4,2583.7C7014-773,7645.1,489.2,7708.4,610c128.6,249.4,212.9,493,276.2,786.4c38.4,172.6,44.1,257,44.1,585c0,324.2-7.7,414.3-44.1,585c-130.4,613.8-408.6,1133.6-838.2,1561.4c-577.4,579.3-1363.8,901.5-2175.2,891.9C4860,5017.9,4714.2,5010.2,4645.1,5000.6z M5209.1,3410.5c596.6-86.3,1089.5-525.6,1250.6-1114.4c24.9-86.3,34.5-195.7,34.5-372.1c1.9-295.4-26.9-418.2-149.6-671.3C6089.5,734.7,5579.3,418.2,5000,418.2s-1089.5,316.5-1344.6,834.4c-103.6,211-140,351-155.4,575.4c-26.9,437.3,124.7,834.4,443.1,1152.8C4286.4,3324.2,4739.1,3477.6,5209.1,3410.5z"/>
                      </g>
                    </svg>
                  </div>
                `;

                const myIcon = L.divIcon({
                  className: 'my-custom-pin-svg',
                  iconAnchor: [0, 24],
                  popupAnchor: [0, -36],
                  html: iconHtml
                } as DivIconOptions);

                allMarkers.push({
                  p: [lat, lng],
                  icon: myIcon,
                  id
                });
              });
            } catch (err) {
              console.error(`Error fetching coordinates for ${category.title}:`, err);
            }
          })
        );

        setMarkers(allMarkers);
      };

      fetchMarkers();
    } else {
      setMarkers([]);
    }
  }, [colors, categories, baseUrl, dummyEnabled]);
  return (
    <Fragment>
      {loading || catLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={height}>
          <CircularProgress />
        </Box>
      ) : (
        <MapContainer center={position} zoom={6} scrollWheelZoom style={{ height, width }}>
          <TileLayer url={process.env.NEXT_PUBLIC_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
          {markers.map((marker, index) => (
            <Marker key={marker.id || index} position={marker.p} icon={marker.icon} />
          ))}
        </MapContainer>
      )}
    </Fragment>
  );
};

export default MapView;
