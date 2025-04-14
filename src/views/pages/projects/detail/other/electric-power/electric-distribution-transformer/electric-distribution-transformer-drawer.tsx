'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricDistributionTransformerForm from './electric-distribution-transformer-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ElectricDistributionTransformer } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface ElectricDistributionTransformerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricDistributionTransformer: ElectricDistributionTransformer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fireExtinguishingTechnologies: any[];
}

const ElectricDistributionTransformerDrawer = (props: ElectricDistributionTransformerDrawerType) => {
  const { open, toggle, refetch, electricDistributionTransformer, projectId, otherSubMenu, fireExtinguishingTechnologies } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    fire_extinguishing_technology_id: yup.string().required('Fire Extinguishing Technology is required'),
    service_area: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    installation_year: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Installation year must be an integer'),
    transformers_total_number: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Total number of transformers must be an integer'),
    gps_x_coordinates: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    gps_y_coordinates: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    other: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(electricDistributionTransformer?.id);

  const createElectricDistributionTransformer = async (body: IApiPayload<ElectricDistributionTransformer>) =>
    projectOtherApiSecondService<ElectricDistributionTransformer>().create(otherSubMenu?.apiRoute || '', body);

  const editElectricDistributionTransformer = async (body: IApiPayload<ElectricDistributionTransformer>) =>
    projectOtherApiSecondService<ElectricDistributionTransformer>().update(
      otherSubMenu?.apiRoute || '',
      electricDistributionTransformer?.id || '',
      body
    );

  const getPayload = (values: ElectricDistributionTransformer) => ({
    data: {
      project_id: projectId,
      name: values.name,
      fire_extinguishing_technology_id: values.fire_extinguishing_technology_id,
      service_area: values.service_area,
      installation_year: values.installation_year,
      transformers_total_number: values.transformers_total_number,
      gps_x_coordinates: values.gps_x_coordinates,
      gps_y_coordinates: values.gps_y_coordinates,
      other: values.other,
      remark: values.remark,
      id: electricDistributionTransformer?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ElectricDistributionTransformer>,
    payload: IApiPayload<ElectricDistributionTransformer>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_distribution_transformer, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.electric-distribution-transformer.${isEdit ? `edit-electric-distribution-transformer` : `create-electric-distribution-transformer`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-distribution-transformer.${isEdit ? `edit-electric-distribution-transformer` : `create-electric-distribution-transformer`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricDistributionTransformer
          }}
          createActionFunc={isEdit ? editElectricDistributionTransformer : createElectricDistributionTransformer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricDistributionTransformer>) => {
            return (
              <ElectricDistributionTransformerForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                fireExtinguishingTechnologies={fireExtinguishingTechnologies}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricDistributionTransformerDrawer;
