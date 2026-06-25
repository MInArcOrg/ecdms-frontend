import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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

export const getImageViewUrl = (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3010/';
  // Ensure we don't have double slashes if baseUrl has trailing slash
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase}/generics/view-image/${id}`;
};

export const customAxios = axios.create({
  baseURL
});

const blockedFileExtensions = new Set([
  'svg',
  'svgz',
  'html',
  'htm',
  'xhtml',
  'xml',
  'js',
  'mjs',
  'cjs',
  'vbs',
  'vbe',
  'wsf',
  'wsh',
  'hta',
  'cmd',
  'bat',
  'ps1',
  'psm1',
  'sh',
  'exe',
  'dll',
  'msi',
  'com',
  'scr',
  'jar'
]);

const blockedMimeTypes = new Set([
  'image/svg+xml',
  'text/html',
  'application/xhtml+xml',
  'text/xml',
  'application/xml',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-dosexec',
  'application/x-sh',
  'text/javascript',
  'application/javascript'
]);

const allowedImageExtensions = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp']);
const allowedImageMimeTypes = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

const getFileExtension = (name: string) => {
  const value = (name || '').trim();
  if (!value) return '';
  const idx = value.lastIndexOf('.');
  if (idx === -1) return '';
  return value.slice(idx + 1).toLowerCase();
};

const assertSafeUploadFile = (file: File, kind: 'file' | 'image') => {
  const ext = getFileExtension(file?.name || '');
  const mime = (file?.type || '').toLowerCase().trim();

  if (mime && blockedMimeTypes.has(mime)) {
    throw new Error('Unsupported or unsafe file type');
  }
  if (ext && blockedFileExtensions.has(ext)) {
    throw new Error('Unsupported or unsafe file type');
  }

  if (kind === 'image') {
    if (mime && !allowedImageMimeTypes.has(mime)) {
      throw new Error('Only PNG, JPG, GIF, and WEBP images are allowed');
    }
    if (ext && !allowedImageExtensions.has(ext)) {
      throw new Error('Only PNG, JPG, GIF, and WEBP images are allowed');
    }
    if (!mime && !ext) {
      throw new Error('Only PNG, JPG, GIF, and WEBP images are allowed');
    }
  }
};

const getAccessToken = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  const raw = window.localStorage.getItem(authConfig.storageTokenKeyName);
  if (!raw) return null;
  return raw.startsWith('Bearer ') ? raw : `Bearer ${raw}`;
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
  assertSafeUploadFile(file, 'file');

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
  assertSafeUploadFile(file, 'image');

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
  assertSafeUploadFile(file, 'image');

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
    process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const safeBase = (base || '').replace(/\/+$/g, '');
  let safePath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;

  if (safeBase.endsWith('/api') && safePath.startsWith('/api/')) {
    safePath = safePath.slice('/api'.length);
  } else if (safeBase.endsWith('/api') && safePath === '/api') {
    safePath = '';
  }

  return `${safeBase}${safePath}`;
};

export const getStaticPhoto = (pathOrUrl: string) => resolvePublicUrl(pathOrUrl);
export const getStaticFile = (pathOrUrl: string) => resolvePublicUrl(pathOrUrl);

/**
 * Hook to load an authenticated image by fetching with a Bearer token
 * and converting the response to a blob URL safe for <img src>.
 */
export const useAuthenticatedImage = (url: string | null | undefined): string | null => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const previousBlobUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!url) {
      setBlobUrl(null);
      return;
    }
    const fullUrl = resolvePublicUrl(url);
    const token = getAccessToken();

    let cancelled = false;
    fetch(fullUrl, {
      headers: token ? { Authorization: token } : undefined
    })
      .then((res) => {
        if (!res.ok) throw new Error('Image fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const objectUrl = URL.createObjectURL(blob);
        if (previousBlobUrl.current) URL.revokeObjectURL(previousBlobUrl.current);
        previousBlobUrl.current = objectUrl;
        setBlobUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setBlobUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return blobUrl;
};

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

const extractFilenameFromContentDisposition = (contentDisposition?: string | null) => {
  if (!contentDisposition) return '';

  const matchUtf8 = contentDisposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
  if (matchUtf8?.[1]) {
    try {
      return decodeURIComponent(matchUtf8[1].trim().replace(/^"|"$/g, ''));
    } catch {
      return matchUtf8[1].trim().replace(/^"|"$/g, '');
    }
  }

  const match = contentDisposition.match(/filename\s*=\s*([^;]+)/i);
  if (!match?.[1]) return '';
  return match[1].trim().replace(/^"|"$/g, '');
};

export const downloadFileById = async (fileId: string, fileName?: string, fallbackPathOrUrl?: string) => {
  const endpoints = [
    `/generics/download-file/${fileId}`,
    `/generics/files/${fileId}/download`,
    `/generics/files/download/${fileId}`
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await customAxios.get<Blob>(endpoint, { responseType: 'blob' });

      const headerName = extractFilenameFromContentDisposition((response.headers as any)?.['content-disposition']);
      const resolvedFileName = (fileName || headerName || 'download').trim() || 'download';

      const blobUrl = window.URL.createObjectURL(response.data);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = resolvedFileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(blobUrl);

      return;
    } catch {
      continue;
    }
  }

  if (fallbackPathOrUrl) {
    await downloadStaticFile(fallbackPathOrUrl, fileName);
  }
};

// Surgical per-row query invalidation helper
export const useInvalidateFileQueries = () => {
  const queryClient = useQueryClient();
  return (id: string, type: string) => {
    queryClient.invalidateQueries({ queryKey: ['model-file', id, type] });
    queryClient.invalidateQueries({ queryKey: ['multiple-photo', { filter: { model_id: id } }] });
    queryClient.invalidateQueries({ queryKey: ['multiple-photo', { filter: { model_id: id, type } }] });
    queryClient.invalidateQueries({ queryKey: ['multiple-file', { filter: { reference_id: id } }] });
    queryClient.invalidateQueries({ queryKey: ['multiple-file', { filter: { reference_id: id, type } }] });
  };
};

// Get multiple photos
export const useGetMultiplePhotos = (params: GetRequestParam, options?: any) => {
  return useQuery<IApiResponse<ImageModel[]>>({
    queryKey: ['multiple-photo', params],
    queryFn: async () => {
      const response: AxiosResponse<IApiResponse<ImageModel[]>> = await buildGetRequest(`/generics/photos`, params);
      return response.data; // Assuming response.data is of type ImageModel[]
    },
    ...options
  });
};
export const useGetMultipleFiles = (params: GetRequestParam, options?: any) => {
  return useQuery<IApiResponse<FileModel[]>>({
    queryKey: ['multiple-file', params],
    queryFn: async () => {
      const response: AxiosResponse<IApiResponse<FileModel[]>> = await buildGetRequest(`/generics/files`, params);
      return response.data; // Assuming response.data is of type FileModel[]
    },
    ...options
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
  resourceBrand: 'RESOURCE_BRAND',
  resourceSpecification: 'RESOURCE_SPECIFICATION',
  resourceDetailType: 'RESOURCE_DETAIL_TYPE',
  crs: 'CONSTRUCTION_RELATED_SERVICES',
  studyField: 'RESOURCE_STUDY_FIELD',
  studyLevel: 'RESOURCE_STUDY_LEVEL',
  workExperience: 'RESOURCE_WORK_EXPERIENCE',
  salary: 'RESOURCE_SALARY',
  resourceQuantity: 'RESOURCE_QUANTITY',
  resourceProfessionalRecommendation: 'RESOURCE_PROFESSIONAL_RECOMMENDATION'
} as const;

// Uploadable document file types
export const uploadableDocumentFileTypes = {
  document: 'DOCUMENT',
  documentType: 'DOCUMENT_TYPE',
  documentCategory: 'DOCUMENT_CATEGORY',
  documentSubCategory: 'DOCUMENT_SUB_CATEGORY'
} as const;
