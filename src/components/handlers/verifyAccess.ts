import axios from "axios";
import { useGlobalContext } from "../context/ContextDashboard";

// Crear un Hook personalizado para obtener el token
function useAuthToken() {
  const { user } = useGlobalContext();
  return user?.token;
}

// Crear una instancia de axios
const axiosAccess = axios.create();

// Añadir un interceptor de solicitud
axiosAccess.interceptors.request.use(
  (config) => {
    // Usar el Hook personalizado para obtener el token
    const token = useAuthToken();

    // Si hay un token, añadirlo al encabezado de autorización
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Si hay un error, rechazar la promesa
    return Promise.reject(error);
  }
);

export default axiosAccess;
