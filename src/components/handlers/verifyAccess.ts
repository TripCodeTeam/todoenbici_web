import axios from "axios";
import TokenService from "@/classes/Token";
import { useGlobalContext } from "../context/ContextDashboard";

// Crear una instancia de axios
const axiosAccess = axios.create();

const { user } = useGlobalContext();

// Añadir un interceptor de solicitud
axiosAccess.interceptors.request.use(
  (config) => {
    // Obtener el token del estado global (aquí necesitarás implementar tu propia lógica para obtener el token)
    const token = user?.token;

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
