import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import authConfig from 'src/configs/auth';
import { AuthValuesType, LoginParams, ErrCallbackType } from './types';
import User from 'src/types/admin/user';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { IApiResponse } from 'src/types/requests';
import { AxiosResponse } from 'axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import axiosServices from 'src/utils/axios';

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  authLoading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  setAuthLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isGuestGuard: false,
};

const AuthContext = createContext(defaultProvider);

type Props = { children: ReactNode };

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const router = useRouter();

  let isGuestGuard = false;
  if (typeof window !== 'undefined' && window.__NEXT_GUARD_PROPS__) {
    isGuestGuard = window.__NEXT_GUARD_PROPS__.guestGuard;
  }

  // Handle token expiration
  const handleTokenExpiration = () => {
    localStorage.removeItem(authConfig.storageUserKeyName);
    localStorage.removeItem(authConfig.storageTokenKeyName);
    localStorage.removeItem((authConfig as any).storageRefreshTokenKeyName || 'refreshToken');
    setUser(null);

    if (authConfig.onTokenExpiration === 'logout' && !isGuestGuard) {
      const currentUrl = window.location.pathname;
      if (!currentUrl.includes('login') && !currentUrl.includes('check-profile')) {
        const loginRedirectURL = `/auth/login?returnUrl=${encodeURIComponent(currentUrl)}`;
        window.location.href = loginRedirectURL;
      }
    }
  };

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const refreshTokenKey = (authConfig as any).storageRefreshTokenKeyName || 'refreshToken';
      const refreshToken = localStorage.getItem(refreshTokenKey);

      if (!refreshToken) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const refreshEndpoint = (authConfig as any).refreshTokenEndpoint || '/auth/refresh-token';
        const response: AxiosResponse<IApiResponse> = await axiosServices.get(refreshEndpoint, {
          headers: { Authorization: refreshToken.startsWith('Bearer ') ? refreshToken : `Bearer ${refreshToken}` }
        });

        const payload = response.data?.payload;
        const accessToken = payload?.access_token ?? payload?.accessToken;
        const nextRefreshToken = payload?.refresh_token ?? payload?.refreshToken;
        const userData = payload?.user_data ?? payload?.userData;

        if (accessToken) localStorage.setItem(authConfig.storageTokenKeyName, accessToken);
        if (nextRefreshToken) localStorage.setItem(refreshTokenKey, nextRefreshToken);
        if (userData) {
          localStorage.setItem(authConfig.storageUserKeyName, JSON.stringify(userData));
          setUser({ ...userData });
        } else {
          const meResponse: AxiosResponse<IApiResponse> = await buildGetRequest(authConfig.meEndpoint, {});
          setUser({ ...(meResponse.data.payload.user_data as any) });
        }
      } catch (error) {
        handleTokenExpiration();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setAuthLoading(true);

    buildPostRequest(authConfig.loginEndpoint, { data: params })
      .then((response: AxiosResponse<IApiResponse>) => {
        const loginResponse = response.data;
        const accessToken = loginResponse?.payload?.access_token ?? loginResponse?.payload?.accessToken;
        const refreshToken = loginResponse?.payload?.refresh_token ?? loginResponse?.payload?.refreshToken;
        const userData = loginResponse?.payload?.user_data ?? loginResponse?.payload?.userData;

        // Store token and user
        if (accessToken) localStorage.setItem(authConfig.storageTokenKeyName, accessToken);
        if (refreshToken) localStorage.setItem((authConfig as any).storageRefreshTokenKeyName || 'refreshToken', refreshToken);
        if (userData) localStorage.setItem(authConfig.storageUserKeyName, JSON.stringify(userData));

        if (userData) setUser({ ...userData });

        const returnUrlQuery = router.query.returnUrl;
        const returnUrlFromQuery = Array.isArray(returnUrlQuery) ? returnUrlQuery[0] : returnUrlQuery;
        const returnUrlFromStorage = typeof window !== 'undefined' ? localStorage.getItem('returnUrl') : null;

        const rawReturnUrl = returnUrlFromQuery || returnUrlFromStorage || '/';
        const redirectPath = (() => {
          try {
            const decoded = decodeURIComponent(rawReturnUrl);
            return decoded && decoded !== '/' ? decoded : '/';
          } catch {
            return rawReturnUrl && rawReturnUrl !== '/' ? rawReturnUrl : '/';
          }
        })();

        if (typeof window !== 'undefined') localStorage.removeItem('returnUrl');
        router.replace(redirectPath);
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handleLogout = () => {
    const currentUrl =
      typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : router.asPath;

    localStorage.removeItem(authConfig.storageUserKeyName);
    localStorage.removeItem(authConfig.storageTokenKeyName);
    localStorage.removeItem((authConfig as any).storageRefreshTokenKeyName || 'refreshToken');
    setUser(null);
    if (currentUrl.includes('login') || currentUrl.includes('check-profile')) {
      router.replace('/auth/login');
      return;
    }

    localStorage.setItem('returnUrl', currentUrl);
    router.replace({
      pathname: '/auth/login',
      query: { returnUrl: currentUrl }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        setUser,
        setLoading,
        setAuthLoading,
        login: handleLogin,
        logout: handleLogout,
        isGuestGuard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
