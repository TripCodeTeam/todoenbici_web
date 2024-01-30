// Importamos la biblioteca de entorno de Node.js
import { env } from "process";

/**
 * Función para obtener la ubicación geográfica a partir de las coordenadas de latitud y longitud
 * @param {number} latitude - La latitud de la ubicación
 * @param {number} longitude - La longitud de la ubicación
 * @returns {Promise<{country: string, city: string}>} - Un objeto con el país y la ciudad de la ubicación
 *
 * Ejemplo de uso:
 * const latitude = 4.60971; // Latitud de Bogotá, Colombia
 * const longitude = -74.08175; // Longitud de Bogotá, Colombia
 * const location = await GetUbication(latitude, longitude);
 */
export const GetUbication = async (
  latitude: number,
  longitude: number
): Promise<{ country: string; city: string }> => {
  // Obtenemos la clave de API de OpenCage de las variables de entorno
  const ApiKey = env.OPEN_CAGE_API as string;
  // Construimos la URL de la API con las coordenadas y la clave de API
  const ApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${ApiKey}`;

  try {
    // Hacemos una solicitud a la API de OpenCage
    const response = await fetch(ApiUrl);
    // Parseamos la respuesta a JSON
    const data = await response.json();

    // Si hay resultados, devolvemos el país y la ciudad del primer resultado
    if (data.results && data.results.length > 0) {
      const firstResult = data.results[0];
      const components = firstResult.components;

      return {
        country: components.country,
        city: components.city || components.town || components.village,
      };
    } else {
      // Si no hay resultados, lanzamos un error
      throw new Error("No se encontraron resultados de geocodificación.");
    }
  } catch (error) {
    // Si hay un error en la solicitud o en el procesamiento de los datos, lanzamos un error
    throw new Error(
      `Error al obtener información de geolocalización: ${error}`
    );
  }
};
