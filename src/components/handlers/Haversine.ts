/**
 * Calcula la distancia haversine entre dos puntos geográficos especificados por latitud y longitud.
 * @param lat1 - Latitud del primer punto en grados.
 * @param lon1 - Longitud del primer punto en grados.
 * @param lat2 - Latitud del segundo punto en grados.
 * @param lon2 - Longitud del segundo punto en grados.
 * @returns La distancia haversine entre los dos puntos en kilómetros.
 */
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Radio de la Tierra en kilómetros
  const R = 6371;

  // Diferencias de latitud y longitud en radianes
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  // Fórmula haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Distancia en kilómetros
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

export default haversine;
