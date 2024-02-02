"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import axios from "axios";

import { FaHome, FaBicycle } from "react-icons/fa";
import { useGlobalContext } from "../context/ContextDashboard";

interface Coordinates {
  lat: number;
  lng: number;
}

interface dataResponse {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  state: string;
  createdAt: string;
}

function MapComponent() {
  const [location, setLocation] = useState<Coordinates>();
  const { user } = useGlobalContext();

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/coordinates", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data: dataResponse = response.data;
        const filterResponse = {
          lat: data.latitude,
          lng: data.longitude,
        };
        setLocation(filterResponse);
      } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
      }
    };

    fetchData();
  }, []);

  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    // ... (previous map styles)
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
    { lat: 3.440215257060241, lng: -76.54566298899921 },
    { lat: location ? location.lat : 0, lng: location ? location.lng : 0 },
  ]);

  useEffect(() => {
    // Update markers when location changes
    setMarkers([
      { lat: 3.440215257060241, lng: -76.54566298899921 },
      { lat: location ? location.lat : 0, lng: location ? location.lng : 0 },
    ]);
  }, [location]);

  const onLoad = useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((location) => {
        if (location.lat && location.lng) {
          bounds.extend(location);
        }
      });
      map.fitBounds(bounds);

      setMap(map);
    },
    [markers]
  );

  const onUnmount = useCallback(function callback(_map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && markers.length > 1) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

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
            console.log("Error al obtener las direcciones: ", status);
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
      <Marker position={markers[0]} />
      <Marker position={markers[markers.length - 1]} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComponent;
