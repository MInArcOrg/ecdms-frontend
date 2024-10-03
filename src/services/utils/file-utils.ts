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
  // Check if window and localStorage are available
  if (typeof window === 'undefined' || !window.localStorage) {
    return null; // Or handle as appropriate for your application
  }

  // Replace with your logic to retrieve the token from local storage, cookies, etc.
  // This example assumes a `token` key in local storage
  const storedToken = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`;

  return storedToken;
};

customAxios.defaults.headers.common['Authorization'] = getAccessToken();

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
export const getStaticPhoto = (path: string) => `${process.env.NEXT_PUBLIC_API_URL}${path}`;
export const getStaticFile = (path: string) => `${process.env.NEXT_PUBLIC_API_URL}${path}`;

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
