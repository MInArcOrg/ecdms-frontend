import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import HydrologicalInformationForm from './hydrological-information-form';

import { useState } from 'react';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { HydrologicalInformation } from 'src/types/project/other';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

interface HydrologicalInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  hydrologicalInformation: HydrologicalInformation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const HydrologicalInformationDrawer = (props: HydrologicalInformationDrawerType) => {
  const { open, toggle, refetch, hydrologicalInformation, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    water_source: yup.string().nullable(),
    catchment_area: yup.number().nullable(),
    elevation_change: yup.number().nullable(),
    head: yup.number().nullable(),
    total_inflow: yup.number().nullable(),
    active_storage_volume: yup.number().nullable(),
    water_stored: yup.number().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(hydrologicalInformation?.id);

  const initialValues = {
    ...hydrologicalInformation,
    water_source: hydrologicalInformation?.water_source || '',
    catchment_area: hydrologicalInformation?.catchment_area || 0,
    elevation_change: hydrologicalInformation?.elevation_change || 0,
    head: hydrologicalInformation?.head || 0,
    total_inflow: hydrologicalInformation?.total_inflow || 0,
    active_storage_volume: hydrologicalInformation?.active_storage_volume || 0,
    water_stored: hydrologicalInformation?.water_stored || 0,
    remark: hydrologicalInformation?.remark || ''
  };

  const createHydrologicalInformation = async (body: IApiPayload<HydrologicalInformation>) =>
    projectOtherApiSecondService<HydrologicalInformation>().create(otherSubMenu?.apiRoute || '', body);

  const editHydrologicalInformation = async (body: IApiPayload<HydrologicalInformation>) =>
    projectOtherApiSecondService<HydrologicalInformation>().update(otherSubMenu?.apiRoute || '', hydrologicalInformation?.id || '', body);

  const getPayload = (values: HydrologicalInformation) => {
    return {
      data: {
        ...values,
        id: hydrologicalInformation?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<HydrologicalInformation>, payload: IApiPayload<HydrologicalInformation>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.hydrologicalInformation, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.hydrological-information.${isEdit ? `edit-hydrological-information` : `create-hydrological-information`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.hydrological-information.${isEdit ? `edit-hydrological-information` : `create-hydrological-information`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={initialValues}
          createActionFunc={isEdit ? editHydrologicalInformation : createHydrologicalInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<HydrologicalInformation>) => {
            return <HydrologicalInformationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default HydrologicalInformationDrawer;
