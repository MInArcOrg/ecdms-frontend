import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import authConfig from 'src/configs/auth';
import { AuthValuesType, LoginParams, ErrCallbackType } from './types';
import User from 'src/types/admin/user';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { IApiResponse } from 'src/types/requests';
import { AxiosResponse } from 'axios';
import { buildGetRequest } from 'src/utils/requests/get-request';

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
    localStorage.removeItem('refreshToken'); // if using refresh token
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
      const storedToken = localStorage.getItem(authConfig.storageTokenKeyName);
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response: AxiosResponse<IApiResponse> = await buildGetRequest(authConfig.meEndpoint, {});
        setUser({ ...response.data.payload.user_data });
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

        // Store token and user
        localStorage.setItem(authConfig.storageTokenKeyName, loginResponse.payload.access_token);
        localStorage.setItem(authConfig.storageUserKeyName, JSON.stringify(loginResponse.payload.user_data));

        setUser({ ...loginResponse.payload.user_data });

        // 🌟 FIX: Ensure returnUrl is correctly parsed and defaults to '/' 🌟
        const returnUrl = router.query.returnUrl as string;

        // Determine the final redirect path: use returnUrl if it exists and is not just '/', otherwise default to '/'
        const redirectPath = (returnUrl && returnUrl !== '/') ? returnUrl : '/';
        console.log('redirectPath', redirectPath);
        // Use router.replace to navigate to the intended page without adding login to history
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
    localStorage.removeItem('refreshToken');
    setUser(null);
    if (currentUrl.includes('login') || currentUrl.includes('check-profile')) {
      router.replace('/auth/login');
      return;
    }

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
