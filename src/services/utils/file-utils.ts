import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import authConfig from 'src/configs/auth';
import { FileModel, ImageModel } from 'src/types/general/file';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3010/';

// Define types and interfaces
export interface FileUploadResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

export interface FileType {
  type: string;
  reference_id: string;
  upload: File;
  description?: string | null;
}

export const customAxios = axios.create({
  baseURL
});

const getAccessToken = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
  return token ? `Bearer ${token}` : null;
};

customAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Upload files
export const uploadFile = (
  file: File,
  type: string,
  ownerObjectID: string | number,
  fileName: string | null = null,
  file_description: string | null = null
): Promise<AxiosResponse<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('reference_id', ownerObjectID.toString());
  formData.append('upload', file);
  formData.append('description', file_description ?? '');

  return customAxios.post('/generics/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const uploadImage = (file: File, type: string, ownerObjectID: string | number): Promise<AxiosResponse<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('model_id', ownerObjectID.toString());
  formData.append('upload', file);

  return customAxios.post('/generics/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Get files by model
export const getFilesByModel = (params: GetRequestParam): Promise<IApiResponse<FileModel[]>> =>
  buildGetRequest(`/generics/files`, params)
    .then((response: AxiosResponse<IApiResponse>) => response.data)
    .catch((error: any) => {
      throw error;
    });
// export const getFilesByModel = (model_id: string | number, type: string,params:GetRequestParam): Promise<IApiResponse> =>
//     buildGetRequest(`/masterdata/${model}-types/${idx}`, params)
//       .then((response: AxiosResponse<IApiResponse>) => response.data)
//       .catch((error: any) => {
//         throw error;
//       }),
//   useAxios(
//     {
//       method: 'get',
//       url: '',
//       params: {
//         id: model_id,
//         type: type
//       }
//     },
//     {
//       useCache: false
//     }
//   );

// Get all files
export const getFiles = (): Promise<AxiosResponse<FileUploadResponse>> => {
  return customAxios.get('/files');
};

// Delete file
export const deleteFile = (id: string | number): Promise<AxiosResponse<FileUploadResponse>> => {
  return customAxios.delete(`/file/${id}`);
};

export const uploadProfilePicture = (user_id: string | number, type: string, file: File): Promise<AxiosResponse<FileUploadResponse>> => {
  const formData = new FormData();
  formData.append('upload', file);
  formData.append('type', type);

  return customAxios.post(`/photo/${user_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Get photo
export const getPhoto = (id: string | number, type: string): string => `${process.env.NEXT_PUBLIC_API_URL}/api/photo/${type}/${id}`;
const resolvePublicUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const base =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const safeBase = (base || '').replace(/\/+$/g, '');
  const safePath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;

  return `${safeBase}${safePath}`;
};

export const getStaticPhoto = (pathOrUrl: string) => resolvePublicUrl(pathOrUrl);
export const getStaticFile = (pathOrUrl: string) => resolvePublicUrl(pathOrUrl);

export const downloadStaticFile = async (pathOrUrl: string, fileName?: string) => {
  const url = resolvePublicUrl(pathOrUrl);
  if (!url) return;

  const token = getAccessToken();
  const response = await fetch(url, {
    headers: token ? { Authorization: token } : undefined
  });

  if (!response.ok) throw new Error('Failed to download file');

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = fileName || 'download';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(blobUrl);
};

// Get multiple photos
export const useGetMultiplePhotos = (params: GetRequestParam) => {
  return useQuery({
    queryKey: ['multiple-photo', params],
    queryFn: async () => {
      const response: AxiosResponse<IApiResponse<ImageModel[]>> = await buildGetRequest(`/generics/photos`, params);
      return response.data; // Assuming response.data is of type ImageModel[]
    }
  });
};
export const useGetMultipleFiles = (params: GetRequestParam) => {
  return useQuery({
    queryKey: ['multiple-file', params],
    queryFn: async () => {
      const response: AxiosResponse<IApiResponse<FileModel[]>> = await buildGetRequest(`/generics/files`, params);
      return response.data; // Assuming response.data is of type FileModel[]
    }
  });
}

// Delete photo
export const deletePhoto = (id: string | number): Promise<AxiosResponse<FileUploadResponse>> =>
  customAxios.delete(`/generics/photos/${id}`);

// Handle user profile picture error
export const handleUserProfilePictureError = (event: React.SyntheticEvent<HTMLImageElement, Event>, gender: string) => {
  event.currentTarget.src = gender === 'female' ? '/images/avatars/user-female.png' : '/images/avatars/user-male.png';
};

// Handle profile picture error
export const handleProfilePictureError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = '/images/avatars/general-placeholder.png';
};

// Uploadable photo types

// Uploadable stakeholder file types
export const uploadableStakeholderFileTypes = {
  stakeholder: 'STAKEHOLDER',
  stakeholderInfo: 'STAKEHOLDER_INFO',
  stakeholderCertificate: 'STAKEHOLDER_CERTIFICATE',
  stakeholderTotalEmp: 'STAKEHOLDER_TOTAL_EMP',
  stakeholderTraining: 'STAKEHOLDER_TRAINING',
  stakeholderRegulation: 'STAKEHOLDER_REGULATION',
  stakeholderFieldOfStudy: 'STAKEHOLDER_FIELD_OF_STUDY',
  stakeholderSudyPreiod: 'STAKEHOLDER_STUDY_PERIOD',
  stakeholderGraduates: 'STAKEHOLDER_GRADUATES',
  stakeholderServices: 'STAKEHOLDER_SERVICES',
  stakeholderType: 'STAKEHOLDER_TYPE',
  stakeholderCategory: 'STAKEHOLDER_CATEGORY',
  stakeholderSubCategory: 'STAKEHOLDER_SUB_CATEGORY',
  ownershipType: 'OWNERSHIP_TYPE',
  businessField: 'BUSINESS_FIELD',
  studyLevel: 'STUDY_LEVEL',
  studyProgram: 'STUDY_PROGRAM',
  studyField: 'STUDY_FIELD',
  education: 'EDUCATION',
  employeeAge: 'EMPLOYEE_AGE',
  workExperience: 'WORK_EXPERIENCE',
  ageLevel: 'AGE_LEVEL'
} as const;

// Uploadable project file types

// Uploadable resource file types
export const uploadableResourceFileTypes = {
  resource: 'RESOURCE_FILE',
  resourceType: 'RESOURCE_TYPE',
  resourceCategory: 'RESOURCE_CATEGORY',
  resourceSubCategory: 'RESOURCE_SUB_CATEGORY',
  crs: 'CONSTRUCTION_RELATED_SERVICES',
  studyField: 'RESOURCE_STUDY_FIELD',
  studyLevel: 'RESOURCE_STUDY_LEVEL',
  workExperience: 'RESOURCE_WORK_EXPERIENCE',
  salary: 'RESOURCE_SALARY'
} as const;

// Uploadable document file types
export const uploadableDocumentFileTypes = {
  document: 'DOCUMENT',
  documentType: 'DOCUMENT_TYPE',
  documentCategory: 'DOCUMENT_CATEGORY',
  documentSubCategory: 'DOCUMENT_SUB_CATEGORY'
} as const;
