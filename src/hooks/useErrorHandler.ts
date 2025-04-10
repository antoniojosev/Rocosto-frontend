import { QrCode } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { AxiosError } from 'axios';

// Tipo para representar los errores de la API
interface ApiError {
  message?: string;
  error?: string;
  detail?: string;
}

// Opciones para el manejador de errores
interface ErrorHandlerOptions {
  showNotification?: boolean;
}

/**
 * Hook personalizado para manejar errores de la API y mostrar notificaciones
 */
export function useErrorHandler() {
  const { addNotification } = useNotification();

  /**
   * Procesa un error y opcionalmente muestra una notificación con un mensaje personalizado
   * @param error El error capturado
   * @param defaultMessage Mensaje predeterminado si no se puede extraer del error
   * @param options Opciones de configuración para el manejador de errores
   * @returns El objeto de error procesado o undefined
   */
  const handleError = (
    error: unknown, 
    defaultMessage: string = "Ha ocurrido un error", 
    options: ErrorHandlerOptions = { showNotification: true }
  ) => {
    // Desestructuramos las opciones con valores por defecto
    const { showNotification = true } = options;
    
    // Variable para almacenar el mensaje de error procesado
    let processedError: string | undefined = undefined;
    
    // Por defecto asumimos que estamos manejando un AxiosError
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ApiError>;
      
      // Intentamos obtener el mensaje de error del response.data
      if (axiosError.response?.data) {
        console.log(axiosError.response.data);
        const data = axiosError.response.data;
        // Extract error message from response data
        let errorObject = "";
        if (data.message) {
          errorObject = data.message;
        } else if (data.error) {
          errorObject = data.error;
        } else if (data.detail) {
          errorObject = data.detail;
        } else {
            console.log("No se encontró un mensaje de error específico en la respuesta");
            // Iterate through the object keys and create a structured error message
            const errorItems = Object.entries(data).map(([key, value]) => {
                // Format the key as the main item
                let keyItem = `${key}:`;
                
                // Handle different value types
                if (Array.isArray(value)) {
                    // For arrays, list each value as a sub-item with HTML line breaks
                    const subItems = value.map(item => `<br/>  - ${item}`).join('');
                    return `${keyItem}${subItems}`;
                } else if (value && typeof value === 'object') {
                    // For nested objects, list each property as a sub-item with HTML line breaks
                    const subItems = Object.entries(value)
                        .map(([subKey, subVal]) => `<br/>  - ${subKey}: ${subVal}`)
                        .join('');
                    return `${keyItem}${subItems}`;
                } else {
                    // For primitive values, display directly
                    return `${keyItem} ${value}`;
                }
            }).join('<br/>');

            errorObject = errorItems;
        }
        
        if (errorObject) {
          processedError = errorObject;
          
          // Solo mostrar notificación si se solicita explícitamente
          if (showNotification) {
            addNotification('error', errorObject);
          }
          
          // Devolvemos el objeto de error para uso posterior
          return { error: data, message: processedError };
        }
      }
      
      // Si tenemos un código de estado, incluirlo en el mensaje
      if (axiosError.response?.status) {
        const statusCode = axiosError.response.status;
        processedError = `Error ${statusCode}: ${defaultMessage}`;
        
        if (showNotification) {
          addNotification('error', processedError);
        }
        
        return { 
          error: axiosError.response.data, 
          message: processedError,
          status: statusCode 
        };
      }
    }
    
    // Si todo lo demás falla, usamos el mensaje predeterminado
    processedError = defaultMessage;
    
    if (showNotification) {
      addNotification('error', processedError);
    }
    
    return { message: processedError };
  };

  return { handleError };
}