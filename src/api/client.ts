import axios, { AxiosError, AxiosRequestConfig } from 'axios';
const basePath = "https://construlink-backend-g6p7.onrender.com/api"

// Configura el cliente Axios base
const client = axios.create({
  baseURL: `${basePath}/v1`,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_INITIAL_TOKEN || ''}`
  }
});

// Variable para evitar múltiples inicios de sesión simultáneos
let isLoggingIn = false;
let loginQueue: ((token: string) => void)[] = [];

// Función para realizar login y obtener un nuevo token
const performLogin = async (): Promise<string> => {
  try {
    // Obtiene credenciales del archivo .env
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;

    if (!username || !password) {
      throw new Error('Credenciales no disponibles en el archivo .env');
    }

    const response = await axios.post(
      `${basePath}/token/`,
      { username, password }
    );

    const newToken = response.data.access;
    
    // Actualiza el token en el cliente
    client.defaults.headers.Authorization = `Bearer ${newToken}`;
    
    return newToken;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Interceptor para manejar errores de autorización
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Si ya hay un inicio de sesión en curso, espera y reintenta cuando termine
      if (isLoggingIn) {
        return new Promise((resolve) => {
          loginQueue.push((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(client(originalRequest));
          });
        });
      }
      
      isLoggingIn = true;

      try {
        const newToken = await performLogin();
        isLoggingIn = false;
        
        // Notifica a todas las solicitudes en cola
        loginQueue.forEach(cb => cb(newToken));
        loginQueue = [];
        
        // Reintenta la solicitud original con el nuevo token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return client(originalRequest);
      } catch (loginError) {
        isLoggingIn = false;
        loginQueue = [];
        return Promise.reject(loginError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default client;