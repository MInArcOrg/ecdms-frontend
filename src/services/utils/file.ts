import axios from 'axios';
import { FileModelUpload } from 'src/types/general/file';

export const getProfilePictureURL = (user_id: string | undefined) =>
  `${process.env.NEXT_PUBLIC_BASE_API_URL}/generics/files/${user_id}/profile_picture`;

export const uploadFile = async (fileToUpload: FileModelUpload): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', fileToUpload.file);
    formData.append('fileable_type', fileToUpload.type);
    formData.append('fileable_id', fileToUpload.fileable_id);
    formData.append('file_description', fileToUpload.file_description);
    formData.append('file_type', fileToUpload.type);

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/generics/file/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data.imageUrl;
    } else {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
