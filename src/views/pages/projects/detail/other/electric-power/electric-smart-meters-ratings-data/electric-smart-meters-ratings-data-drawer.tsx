'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricSmartMetersRatingsDataForm from './electric-smart-meters-ratings-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ElectricSmartMetersData, ElectricSmartMetersRatingsData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface ElectricSmartMetersRatingsDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricSmartMetersRatingsData: ElectricSmartMetersRatingsData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  electricSmartMetersData: ElectricSmartMetersData[];
}

const ElectricSmartMetersRatingsDataDrawer = (props: ElectricSmartMetersRatingsDataDrawerType) => {
  const { open, toggle, refetch, electricSmartMetersRatingsData, projectId, otherSubMenu, electricSmartMetersData } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    electric_smart_meters_data_id: yup.string().required('Electric Smart Meters Data is required'),
    name: yup.string().required('Name is required'),
    active_reactive: yup.string().required('Active/Reactive is required'),
    kwh_kvarh_rating: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    phase: yup.string().required('Phase is required'),
    maximum_current_rating: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    other: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(electricSmartMetersRatingsData?.id);

  const createElectricSmartMetersRatingsData = async (body: IApiPayload<ElectricSmartMetersRatingsData>) =>
    projectOtherApiSecondService<ElectricSmartMetersRatingsData>().create(otherSubMenu?.apiRoute || '', body);

  const editElectricSmartMetersRatingsData = async (body: IApiPayload<ElectricSmartMetersRatingsData>) =>
    projectOtherApiSecondService<ElectricSmartMetersRatingsData>().update(
      otherSubMenu?.apiRoute || '',
      electricSmartMetersRatingsData?.id || '',
      body
    );

  const getPayload = (values: ElectricSmartMetersRatingsData) => ({
    data: {
      project_id: projectId,
      electric_smart_meters_data_id: values.electric_smart_meters_data_id,
      name: values.name,
      active_reactive: values.active_reactive,
      kwh_kvarh_rating: values.kwh_kvarh_rating,
      phase: values.phase,
      maximum_current_rating: values.maximum_current_rating,
      other: values.other,
      remark: values.remark,
      id: electricSmartMetersRatingsData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ElectricSmartMetersRatingsData>,
    payload: IApiPayload<ElectricSmartMetersRatingsData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_smart_meters_ratings_data, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.electric-smart-meters-ratings-data.${
        isEdit ? `edit-electric-smart-meters-ratings-data` : `create-electric-smart-meters-ratings-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-smart-meters-ratings-data.${
            isEdit ? `edit-electric-smart-meters-ratings-data` : `create-electric-smart-meters-ratings-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricSmartMetersRatingsData,
            active_reactive: electricSmartMetersRatingsData?.active_reactive || 'Active',
            phase: electricSmartMetersRatingsData?.phase || 'Single Phase'
          }}
          createActionFunc={isEdit ? editElectricSmartMetersRatingsData : createElectricSmartMetersRatingsData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricSmartMetersRatingsData>) => {
            return (
              <ElectricSmartMetersRatingsDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                electricSmartMetersData={electricSmartMetersData}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricSmartMetersRatingsDataDrawer;
