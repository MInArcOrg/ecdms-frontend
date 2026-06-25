import { useEffect } from 'react';
import authConfig from 'src/configs/auth';
import axiosServices from 'src/utils/axios';

type NormalizedAuthTokens = {
  accessToken: string;
  refreshToken: string;
  userData?: any;
};

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const normalizeBearer = (rawToken: string | null | undefined): string | null => {
  if (!rawToken) return null;
  return rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
};

const getStoredAccessToken = (): string | null => {
  if (!isBrowser()) return null;
  return normalizeBearer(window.localStorage.getItem(authConfig.storageTokenKeyName));
};

const getStoredRefreshToken = (): string | null => {
  if (!isBrowser()) return null;
  const key = (authConfig as any).storageRefreshTokenKeyName || 'refreshToken';
  return normalizeBearer(window.localStorage.getItem(key));
};

const setStoredTokens = (tokens: NormalizedAuthTokens) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(authConfig.storageTokenKeyName, tokens.accessToken);
  const key = (authConfig as any).storageRefreshTokenKeyName || 'refreshToken';
  window.localStorage.setItem(key, tokens.refreshToken);
  if (tokens.userData !== undefined) {
    window.localStorage.setItem(authConfig.storageUserKeyName, JSON.stringify(tokens.userData));
  }
};

const clearStoredTokens = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(authConfig.storageUserKeyName);
  window.localStorage.removeItem(authConfig.storageTokenKeyName);
  const key = (authConfig as any).storageRefreshTokenKeyName || 'refreshToken';
  window.localStorage.removeItem(key);
};

const getIsGuestGuard = () => {
  if (!isBrowser()) return false;
  return Boolean((window as any).__NEXT_GUARD_PROPS__?.guestGuard);
};

const redirectToLogin = () => {
  if (!isBrowser()) return;
  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (currentUrl.includes('login') || currentUrl.includes('check-profile')) return;
  const loginRedirectURL = `/auth/login?returnUrl=${encodeURIComponent(currentUrl)}`;
  window.location.href = loginRedirectURL;
};

const normalizeAuthPayload = (payload: any): NormalizedAuthTokens | null => {
  const accessToken = payload?.access_token ?? payload?.accessToken;
  const refreshToken = payload?.refresh_token ?? payload?.refreshToken;
  const userData = payload?.user_data ?? payload?.userData;
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken, userData };
};

let refreshPromise: Promise<NormalizedAuthTokens> | null = null;

const useAxiosInterceptors = () => {
  useEffect(() => {
    const requestInterceptor = axiosServices.interceptors.request.use(
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

    const responseInterceptor = axiosServices.interceptors.response.use(
      (response) => response,
      (error) =>
        (async () => {
          if (!error?.response) {
            return Promise.reject('Network error');
          }

          const isGuestGuard = getIsGuestGuard();
          const status = error.response.status;
          const errorData = error.response.data;
          const originalRequest = error.config || {};

          const isLoginRequest = typeof originalRequest.url === 'string' && originalRequest.url.includes(authConfig.loginEndpoint);
          const refreshEndpoint = (authConfig as any).refreshTokenEndpoint || '/auth/refresh-token';
          const isRefreshRequest = typeof originalRequest.url === 'string' && originalRequest.url.includes(refreshEndpoint);

          const canAttemptRefresh =
            !errorData?.errorCode || String(errorData.errorCode).toUpperCase() === 'ACCESS_TOKEN_EXPIRED';

          const shouldTryRefresh =
            status === 401 &&
            !isGuestGuard &&
            !isLoginRequest &&
            !isRefreshRequest &&
            canAttemptRefresh &&
            !(originalRequest as any)._retry;

          if (shouldTryRefresh) {
            const refreshToken = getStoredRefreshToken();

            if (!refreshToken) {
              clearStoredTokens();
              redirectToLogin();
              return Promise.reject(errorData || 'API request failed');
            }

            try {
              (originalRequest as any)._retry = true;

              if (!refreshPromise) {
                refreshPromise = axiosServices
                  .get(refreshEndpoint, {
                    headers: { Authorization: refreshToken }
                  })
                  .then((resp) => {
                    const normalized = normalizeAuthPayload(resp?.data?.payload);
                    if (!normalized) {
                      throw resp?.data || new Error('Invalid refresh token response');
                    }
                    setStoredTokens(normalized);
                    return normalized;
                  })
                  .finally(() => {
                    refreshPromise = null;
                  });
              }

              const refreshed = await refreshPromise;

              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = normalizeBearer(refreshed.accessToken);

              return axiosServices(originalRequest);
            } catch {
              clearStoredTokens();
              redirectToLogin();
              return Promise.reject(errorData || 'API request failed');
            }
          }

          if (status === 401 && !isGuestGuard) {
            clearStoredTokens();
            redirectToLogin();
          }

          return Promise.reject(errorData || 'API request failed');
        })()
    );

    return () => {
      axiosServices.interceptors.request.eject(requestInterceptor);
      axiosServices.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosServices;
};

export default useAxiosInterceptors;
