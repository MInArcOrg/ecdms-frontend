import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeothermalPowerInfrastructureForm from './geothermal-power-infrastructure-form';

import { useState } from 'react';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { GeothermalPowerInfrastructure } from 'src/types/project/other';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

interface GeothermalPowerInfrastructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  geothermalPowerInfrastructure: GeothermalPowerInfrastructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const GeothermalPowerInfrastructureDrawer = (props: GeothermalPowerInfrastructureDrawerType) => {
  const { open, toggle, refetch, geothermalPowerInfrastructure, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    turbine_manufacturer: yup.string().nullable(),
    turbine_model: yup.string().nullable(),
    turbine_type_id: yup.string().nullable(),
    each_turbine_capacity: yup.number().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(geothermalPowerInfrastructure?.id);

  const initialValues = {
    ...geothermalPowerInfrastructure,
    turbine_manufacturer: geothermalPowerInfrastructure?.turbine_manufacturer || '',
    turbine_model: geothermalPowerInfrastructure?.turbine_model || '',
    turbine_type_id: geothermalPowerInfrastructure?.turbine_type_id || '',
    each_turbine_capacity: geothermalPowerInfrastructure?.each_turbine_capacity || 0,
    remark: geothermalPowerInfrastructure?.remark || ''
  };

  const createGeothermalPowerInfrastructure = async (body: IApiPayload<GeothermalPowerInfrastructure>) =>
    projectOtherApiSecondService<GeothermalPowerInfrastructure>().create(otherSubMenu?.apiRoute || '', body);

  const editGeothermalPowerInfrastructure = async (body: IApiPayload<GeothermalPowerInfrastructure>) =>
    projectOtherApiSecondService<GeothermalPowerInfrastructure>().update(
      otherSubMenu?.apiRoute || '',
      geothermalPowerInfrastructure?.id || '',
      body
    );

  const getPayload = (values: GeothermalPowerInfrastructure) => {
    return {
      data: {
        ...values,
        id: geothermalPowerInfrastructure?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<GeothermalPowerInfrastructure>,
    payload: IApiPayload<GeothermalPowerInfrastructure>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.geothermalPowerInfrastructure, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.geothermal-power-infrastructure.${
        isEdit ? `edit-geothermal-power-infrastructure` : `create-geothermal-power-infrastructure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.geothermal-power-infrastructure.${
            isEdit ? `edit-geothermal-power-infrastructure` : `create-geothermal-power-infrastructure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={initialValues}
          createActionFunc={isEdit ? editGeothermalPowerInfrastructure : createGeothermalPowerInfrastructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GeothermalPowerInfrastructure>) => {
            return <GeothermalPowerInfrastructureForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GeothermalPowerInfrastructureDrawer;
