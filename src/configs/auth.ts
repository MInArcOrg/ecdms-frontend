// eslint-disable-next-line import/no-anonymous-default-export
export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/register',
  storageTokenKeyName: 'accessToken',
  storageUserKeyName: 'userData',
  onTokenExpiration: 'logout' // logout | refreshToken
};
