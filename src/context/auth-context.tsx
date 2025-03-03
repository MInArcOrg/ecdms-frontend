// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Axios

// ** Config
import authConfig from 'src/configs/auth';

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType } from './types';
import User from 'src/types/admin/user';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { IApiResponse } from 'src/types/requests';
import { AxiosResponse } from 'axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  authLoading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  setAuthLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsGuestGuard: (isGuestGuard: boolean) => null,
  isGuestGuard: false
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [isGuestGuard, setIsGuestGuard] = useState<boolean>(defaultProvider.isGuestGuard);
  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`;
      if (storedToken) {
        setLoading(true);
        await buildGetRequest(authConfig.meEndpoint, {})
          .then(async (response: AxiosResponse<IApiResponse>) => {
            setUser({ ...response.data.payload.user_data });
          })
          .catch((error) => {
            localStorage.removeItem(authConfig.storageUserKeyName);
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            setUser(null);
            setLoading(false);
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/auth/login');
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setAuthLoading(true);

    buildPostRequest(authConfig.loginEndpoint, {
      data: params
    })
      .then(async (response: AxiosResponse<IApiResponse>) => {
        const loginResponse: IApiResponse = response.data;
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, loginResponse.payload.access_token) : null;
        const returnUrl = router.query.returnUrl;

        setUser({ ...loginResponse.payload.user_data });
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageUserKeyName, JSON.stringify(loginResponse.payload.user_data))
          : null;

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : getHomeRoute('admin');

        router.replace(redirectURL as string);
      })

      .catch((err) => {
        console.log('login error', err);
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(authConfig.storageUserKeyName);
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push('/auth/login');
  };

  const values = {
    user,
    loading,
    authLoading,
    setUser,
    setLoading,
    setAuthLoading,
    login: handleLogin,
    logout: handleLogout,
    setIsGuestGuard,
    isGuestGuard
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
