import { FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import detailResourceTypeApiService from 'src/services/resource/resource-detail-type-service';
import { deletePhoto, useGetMultiplePhotos, uploadImage } from 'src/services/utils/file-utils';
import { FileWithId } from 'src/types/general/file';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { DetailResourceType } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DetailResourceTypeForm from './detail-resource-type-form';

interface DetailResourceTypeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  detailResourceType: DetailResourceType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  datasource: yup.string().required(),
  description: yup.string().required()
});

const DetailResourceTypeDrawer: React.FC<DetailResourceTypeDrawerType> = (props) => {
  const { open, toggle, refetch, detailResourceType, resourceId } = props;

  const { data: fetchedImages } = useGetMultiplePhotos({ filter: { model_id: detailResourceType?.id || '' } });
  const [uploadableFiles, setUploadableFiles] = useState<FileWithId[]>([]);
  const [fetchedImageIds, setFetchedImageIds] = useState<string[]>([]);

  const isEdit = detailResourceType?.id ? true : false;

  const createDetailResourceType = async (body: IApiPayload<DetailResourceType>) => {
    return await detailResourceTypeApiService.create(body);
  };

  const editDetailResourceType = async (body: IApiPayload<DetailResourceType>) => {
    return await detailResourceTypeApiService.update(detailResourceType?.id || '', body);
  };

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      if (fetchedImages) {
        const fetchedFiles = fetchedImages.payload.map(async (image) => {
          const response = await fetch(image.url);
          const blob = await response.blob();
          return { id: image.id, file: new File([blob], image.title || 'image', { type: blob.type }), isFetched: true };
        });
        const convertedFiles = await Promise.all(fetchedFiles);
        setUploadableFiles(convertedFiles);
        setFetchedImageIds(fetchedImages.payload.map((image) => image.id));
      }
    };

    if (open) {
      fetchAndConvertImages();
    }
  }, [fetchedImages, open]);

  const onFilesChange = (files: FileWithId[] | null) => {
    if (files) {
      setUploadableFiles(files);
    }
  };

  const getPayload = (values: DetailResourceType) => ({
    data: {
      ...values,
      id: detailResourceType?.id,
      resource_id: resourceId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
    setUploadableFiles([]);
  };

  const onActionSuccess = async (response: IApiResponse<DetailResourceType>, payload: IApiPayload<DetailResourceType>) => {
    const uploadableFilesToUpload = uploadableFiles.filter((file) => !file.isFetched);
    const uploadPromises = uploadableFilesToUpload.map((file) => uploadImage(file.file, 'RESOURCE_DETAIL_TYPE', response.payload.id));
    await Promise.all(uploadPromises);

    const uploadableFileIds = uploadableFiles.map((file) => file.id);
    const idsToRemove = fetchedImageIds.filter((id) => !uploadableFileIds.includes(id));

    const removePromises = idsToRemove.map((id) => deletePhoto(id));
    await Promise.all(removePromises);

    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-type.${isEdit ? 'edit-resource-type' : 'create-resource-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.detail-resource-type.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={detailResourceType as DetailResourceType}
          createActionFunc={isEdit ? editDetailResourceType : createDetailResourceType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DetailResourceType>) => {
            return (
              <DetailResourceTypeForm
                files={uploadableFiles}
                onFilesChange={onFilesChange}
                formik={formik}
                defaultLocaleData={{} as DetailResourceType}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DetailResourceTypeDrawer;
