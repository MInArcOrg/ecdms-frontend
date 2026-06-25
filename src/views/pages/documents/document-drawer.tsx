import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';
import * as yup from 'yup';

import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import documentApiService from 'src/services/document/document-service';
import { deleteFile, deletePhoto, uploadFile, uploadImage, useGetMultipleFiles, useGetMultiplePhotos } from 'src/services/utils/file-utils';
import { Document } from 'src/types/document';
import { FileWithId } from 'src/types/general/file';
import { MasterType } from 'src/types/master/master-types';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import DocumentForm from './document-form';

interface DocumentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  document: Document;
  typeId: string;
  type: MasterType | undefined;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required').max(36),
  documentcategory_id: yup.string().required('Document category is required'),
  documentsubcategory_id: yup.string().nullable(),
  description: yup.string().nullable(),
  author: yup.string().nullable().max(36),
  publishing_organization: yup.string().nullable().max(36),
  publication_date: yup.date().nullable(),
  reference_no: yup.string().nullable().max(100),
  language: yup.string().nullable().max(100),
  keywords: yup.string().nullable(),
  country_or_region: yup.string().nullable().max(100),
  sector_id: yup.string().nullable(),
  related_entity_id: yup.string().nullable(),
  legal_status: yup.string().nullable().max(50),
  confidentiality_level: yup.string().nullable().max(50),
  file_format: yup.string().nullable().max(20),
  file_size_mb: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
  document_link: yup.string().nullable().max(100),
  version_no: nullableIntegerSchema(),
  remark: yup.string().nullable()
});

const resolveDocumentId = (response: IApiResponse<Document>, fallbackId?: string) => {
  return (
    response?.payload?.id ||
    response?.payload?.data?.id ||
    response?.payload?.document?.id ||
    response?.data?.id ||
    fallbackId ||
    ''
  );
};

const DocumentDrawer = (props: DocumentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, document, typeId, type } = props;

  const { t } = useTranslation();

  const { data: fetchedImages } = useGetMultiplePhotos(
    { filter: { model_id: document?.id, type: 'DOCUMENT' } },
    { enabled: !!document?.id }
  );
  const { data: fetchedFiles } = useGetMultipleFiles(
    { filter: { reference_id: document?.id, type: 'DOCUMENT' } },
    { enabled: !!document?.id }
  );

  const [uploadableImages, setUploadableImages] = useState<FileWithId[]>([]);
  const [fetchedImageIds, setFetchedImageIds] = useState<string[]>([]);
  const [uploadableFiles, setUploadableFiles] = useState<FileWithId[]>([]);
  const [fetchedFileIds, setFetchedFileIds] = useState<string[]>([]);
  const isEdit = document?.id ? true : false;
  const createDocument = async (body: IApiPayload<Document>) => {
    return await documentApiService.create(body);
  };
  const editDocument = async (body: IApiPayload<Document>) => {
    return await documentApiService.update(document?.id || '', body);
  };
  useEffect(() => {
    const fetchAndConvertImages = async () => {
      if (fetchedImages) {
        const _fetchedImages = fetchedImages.payload.map(async (file: any) => {
          const response = await fetch(file.url);
          const blob = await response.blob();
          return {
            id: file.id,
            file: new File([blob], file.title || 'image', { type: blob.type }),
            isFetched: true,
          };
        });
        const convertedImages = await Promise.all(_fetchedImages);
        setUploadableImages(convertedImages);
        setFetchedImageIds(fetchedImages.payload.map((img: any) => img.id));
      }
    };

    const fetchAndConvertFiles = async () => {
      if (fetchedFiles) {
        const _fetchedFiles = fetchedFiles.payload.map(async (file: any) => {
          const response = await fetch(file.url);
          const blob = await response.blob();
          return {
            id: file.id,
            file: new File([blob], file.title || 'file', { type: blob.type }),
            isFetched: true
          };
        });
        const convertedFiles = await Promise.all(_fetchedFiles);
        setUploadableFiles(convertedFiles);
        setFetchedFileIds(fetchedFiles.payload.map((f: any) => f.id));
      }
    };

    if (open) {
      fetchAndConvertImages();
      fetchAndConvertFiles();
    }
  }, [fetchedImages, fetchedFiles, open]);

  const onFilesChange = (files: FileWithId[] | null) => {
    if (files) setUploadableFiles(files);
  };

  const onImagesChange = (images: FileWithId[] | null) => {
    if (images) setUploadableImages(images);
  };

  const getPayload = (values: Document) => {
    const payload = {
      data: {
        ...values,
        id: document?.id,
        documenttype_id: typeId,
        publication_date: convertDateToLocaleDate(values.publication_date)
      },
      files: []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };
  const onActionSuccess = async (response: IApiResponse<Document>, payload: IApiPayload<Document>) => {
    const targetId = resolveDocumentId(response, document?.id);

    if (!targetId) {
      toast.error('Document saved, but upload reference id is missing.');
      refetch();
      handleClose();
      return;
    }

    // Process Images
    const imagesToUpload = uploadableImages.filter((img) => !img.isFetched);
    const imgUploadPromises = imagesToUpload.map((img) => uploadImage(img.file, 'DOCUMENT', targetId));
    await Promise.all(imgUploadPromises);

    const activeImageIds = uploadableImages.map((img) => img.id);
    const imgIdsToRemove = fetchedImageIds.filter((id) => !activeImageIds.includes(id));
    const imgRemovePromises = imgIdsToRemove.map((id) => deletePhoto(id));
    await Promise.all(imgRemovePromises);

    // Process Files
    const uploadableFilesToUpload = uploadableFiles.filter((file) => !file.isFetched);
    const uploadPromises = uploadableFilesToUpload.map((file) => uploadFile(file.file, 'DOCUMENT', targetId));
    await Promise.all(uploadPromises);

    const uploadableFileIds = uploadableFiles.map((file) => file.id);
    const idsToRemove = fetchedFileIds.filter((id) => !uploadableFileIds.includes(id));

    const removePromises = idsToRemove.map((id) => deleteFile(id));
    await Promise.all(removePromises);

    toggle();
    refetch();
    handleClose();
  };
  const translatedTitle = t(`common.${isEdit ? 'edit' : 'create'}`) + " " + type?.title + " " + t('document.title');

  return (
    <CustomSideDrawer title={translatedTitle} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="document.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...document,
            publication_date: formatInitialDateDate(document.publication_date)
          }}
          createActionFunc={isEdit ? editDocument : createDocument}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Document>) => {
            return <DocumentForm
              onFilesChange={onFilesChange}
              typeId={typeId}
              formik={formik}
              files={uploadableFiles}
              images={uploadableImages}
              onImagesChange={onImagesChange}
            />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DocumentDrawer;
