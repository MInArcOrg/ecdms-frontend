// eslint-disable-next-line import/no-anonymous-default-export
export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  refreshTokenEndpoint: '/auth/refresh-token',
  registerEndpoint: '/auth/register',
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  storageUserKeyName: 'userData',
  onTokenExpiration: 'logout' // logout | refreshToken
};
