import authConfig from 'src/configs/auth';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3010/';

const axiosServices = axios.create({
  baseURL
});

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const normalizeBearer = (rawToken: string | null | undefined): string | null => {
  if (!rawToken) return null;
  return rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
};

const getStoredAccessToken = (): string | null => {
  if (!isBrowser()) return null;
  return normalizeBearer(window.localStorage.getItem(authConfig.storageTokenKeyName));
};

axiosServices.interceptors.request.use(
  (config) => {
    if (!isBrowser()) return config;
    if (config.headers?.Authorization) return config;

    const token = getStoredAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosServices;
