import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeothermalPowerInfrastructureForm from './geothermal-power-infrastructure-form';

import { useState } from 'react';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
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
  otherSubMenu?: OtherMenuRoute;
}

const GeothermalPowerInfrastructureDrawer = (props: GeothermalPowerInfrastructureDrawerType) => {
  const { open, toggle, refetch, geothermalPowerInfrastructure, projectId, otherSubMenu } = props;
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

  const isEdit = Boolean(geothermalPowerInfrastructure?.id);

  const initialValues = {
    ...geothermalPowerInfrastructure,
    water_source: geothermalPowerInfrastructure?.water_source || '',
    catchment_area: geothermalPowerInfrastructure?.catchment_area || 0,
    elevation_change: geothermalPowerInfrastructure?.elevation_change || 0,
    head: geothermalPowerInfrastructure?.head || 0,
    total_inflow: geothermalPowerInfrastructure?.total_inflow || 0,
    active_storage_volume: geothermalPowerInfrastructure?.active_storage_volume || 0,
    water_stored: geothermalPowerInfrastructure?.water_stored || 0,
    remark: geothermalPowerInfrastructure?.remark || ''
  };

  const createGeothermalPowerInfrastructure = async (body: IApiPayload<GeothermalPowerInfrastructure>) =>
    projectOtherApiSecondService<GeothermalPowerInfrastructure>().create(otherSubMenu?.apiRoute || '', body);

  const editGeothermalPowerInfrastructure = async (body: IApiPayload<GeothermalPowerInfrastructure>) =>
    projectOtherApiSecondService<GeothermalPowerInfrastructure>().update(otherSubMenu?.apiRoute || '', geothermalPowerInfrastructure?.id || '', body);

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

  const onActionSuccess = async (response: IApiResponse<GeothermalPowerInfrastructure>, payload: IApiPayload<GeothermalPowerInfrastructure>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.geothermalPowerInfrastructure, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.geothermal-power-infrastructure.${isEdit ? `edit-geothermal-power-infrastructure` : `create-geothermal-power-infrastructure`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.geothermal-power-infrastructure.${isEdit ? `edit-geothermal-power-infrastructure` : `create-geothermal-power-infrastructure`}`}
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
