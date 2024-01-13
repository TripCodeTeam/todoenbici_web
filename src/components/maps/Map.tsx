"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LAST_CORDENATES } from "@/graphql/mutations";

interface Coordinates {
  lat: number;
  lng: number;
}

interface cordenatesProps {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  state: string;
}

interface Data {
  lastCordenate: cordenatesProps;
}

function MapComponent() {
  const { data } = useSuspenseQuery<Data>(LAST_CORDENATES);
  const location: cordenatesProps = data.lastCordenate;
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [{ visibility: "on" }, { color: "#fce8b2" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [{ color: "#f3f4f4" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#c8d7d4" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#f5f1f6" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#f5f1f6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [{ color: "black" }],
    },
    {
      featureType: "transit.station.airport",
      elementType: "geometry.fill",
      stylers: [{ color: "#cfb2db" }],
    },
    {
      featureType: "transit.station.rail",
      elementType: "geometry.fill",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "transit.station.bus",
      elementType: "geometry.fill",
      stylers: [{ color: "#dddddd" }],
    },
  ];

  const center = {
    lat: 3.4508326487605707,
    lng: -76.53186595118522,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
  });

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState<Coordinates[]>([
    // Coordenadas iniciales
    { lat: 3.440215257060241, lng: -76.54566298899921 },
    { lat: location.latitude, lng: location.longitude },
  ]);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((location) => {
      bounds.extend(location);
    });
    map.fitBounds(bounds);

    setMap(map);
  }, [markers]);

  const onUnmount = useCallback(function callback(_map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && markers.length > 1) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      // directionsRenderer.setOptions({ suppressMarkers: true });

      const origin = markers[0];
      const destination = markers[markers.length - 1];

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Error al obtener las direcciones:", status);
          }
        }
      );
    }
  }, [isLoaded, map, markers]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: mapStyles }}
    >
      <Polyline path={markers} options={{ strokeColor: "#FF0000 " }} />
      <Marker
        position={markers[0]}
        icon={{
          url: "/markers/pin-de-mapa.png",
          scaledSize: new window.google.maps.Size(32, 32),
        }}
      />
      <Marker
        position={markers[markers.length - 1]}
        icon={{
          url: "/markers/pin-de-mapa.png",
          scaledSize: new window.google.maps.Size(32, 32),
        }} // Reemplaza esto con la URL de tu imagen de bicicleta
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComponent;
