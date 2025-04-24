import { AxiosResponse } from 'axios';
import { IApiResponse } from 'src/types/requests';
import axios from 'src/utils/axios';

interface ForgotPasswordPayload {
  email: string;
  redirectUrl: string;
}

interface ResetPasswordPayload {
  user_id: string;
  resetString: string;
  password: string;
}

const authApiService = {
  sendResetEmail: async (payload: ForgotPasswordPayload): Promise<IApiResponse> =>
    axios
      .post('/request-password-reset', payload)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: IApiResponse) => {
        throw error;
      }),
  resetPassword: async (payload: ResetPasswordPayload): Promise<IApiResponse> =>
    axios
      .post('/auth/reset-password', payload)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: IApiResponse) => {
        throw error;
      })
};

export default authApiService;
