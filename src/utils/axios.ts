import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3010/';

const axiosServices = axios.create({
  baseURL
});
export default axiosServices;
