const ENVS = import.meta.env;

const Envs = {
    VITE_SITE_apiKey : ENVS.VITE_SITE_apiKey,
    VITE_SITE_authDomain : ENVS.VITE_SITE_authDomain,
    VITE_SITE_projectId : ENVS.VITE_SITE_projectId,
    VITE_SITE_storageBucket : ENVS.VITE_SITE_storageBucket,
    VITE_SITE_messagingSenderId : ENVS.VITE_SITE_messagingSenderId,
    VITE_SITE_appId : ENVS.VITE_SITE_appId,
    VITE_SITE_measurementId : ENVS.VITE_SITE_measurementId,
}

export default Envs;