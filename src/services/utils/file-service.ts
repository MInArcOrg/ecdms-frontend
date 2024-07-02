import axios, { AxiosResponse } from 'axios';
import authConfig from 'src/configs/auth';
import { FileModel } from 'src/types/general/file';
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

// Get files by model
export const getFilesByModel = (idx: string, params: GetRequestParam): Promise<IApiResponse<FileModel[]>> =>
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

// Get image by type
export const getImageByType = (type: string, id: string | number): string =>
  `${process.env.NEXT_PUBLIC_API_URL}/generics/files/${id}/${type}`;

// Get project file selector
// export const getProjectFileSelector = (project_id: string | number, type: string) =>
//   useAxios({
//     method: 'get',
//     url: `/projects/project-file-selector/${project_id}/${type}`
//   });

// Upload profile picture
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

// Get multiple photos
// export const getMultiplePhotos = (id: string | number) =>
//   useAxios({
//     method: 'get',
//     url: `/multiple/photo/${id}`
//   });

// Delete photo
export const deletePhoto = (id: string | number): Promise<AxiosResponse<FileUploadResponse>> => customAxios.delete(`/photo/${id}`);

// Handle user profile picture error
export const handleUserProfilePictureError = (event: React.SyntheticEvent<HTMLImageElement, Event>, gender: string) => {
  event.currentTarget.src = gender === 'female' ? '/images/avatars/user-female.png' : '/images/avatars/user-male.png';
};

// Handle profile picture error
export const handleProfilePictureError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = '/images/avatars/general-placeholder.png';
};

// Uploadable photo types
export const uploadablePhotoTypes = {
  stakeholder_profile_photo: 'STAKEHOLDER_PROFILE_PHOTO',
  project_profile_photo: 'PROJECT_PROFILE_PHOTO',
  user_profile_photo: 'USER_PROFILE_PHOTO',
  resource: 'RESOURCE',
  resourceBrand: 'RESOURCE_BRAND',
  resourceSpecification: 'RESOURCE_SPECIFICATION',
  resourceType: 'RESOURCE_TYPE',
  user_cover_photo: 'USER_COVER_PHOTO'
} as const;

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
export const uploadableProjectFileTypes = {
  time: 'TIME',
  plan: 'PROJECT_PLAN',
  report: 'PROJECT_REPORT',
  building_envelope_material: 'BUILDING_ENVELOPE_MATERIAL',
  building_dimension_detail: 'BUILDING_DIMENSION_DETAIL',
  solar_energy: 'SOLAR_ENERGY',
  wind_energy: 'WIND_ENERGY',
  transformer_type: 'TRANSFORMER_TYPE',
  extension_time: 'EXTENSION_TIME',
  projectType: 'PROJECT_TYPE',
  projectCategory: 'PROJECT_CATEGORY',
  projectSubCategory: 'PROJECT_SUB_CATEGORY',
  masterStatus: 'MASTER_STATUS'
} as const;

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
