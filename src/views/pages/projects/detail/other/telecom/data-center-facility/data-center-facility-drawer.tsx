import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DataCenterFacilityForm from './data-center-facility-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DataCenterFacility } from 'src/types/project/other';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface DataCenterFacilityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCenterFacility: DataCenterFacility;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const DataCenterFacilityDrawer = (props: DataCenterFacilityDrawerType) => {
  const { open, toggle, refetch, dataCenterFacility, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    data_center_id: yup.string().required('Data Center ID is required'),
    total_floor_area: yup.string().nullable(),
    power_capacity: yup.string().nullable(),
    rack_space_capacity: yup.string().nullable(),
    cooling_capacity: yup.string().nullable(),
    access_control: yup.boolean().nullable(),
    surveillance_cameras: yup.boolean().nullable(),
    fire_suppression_systems: yup.boolean().nullable(),
    intrusion_detection_systems: yup.boolean().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(dataCenterFacility?.id);

  const createDataCenterFacility = async (body: IApiPayload<DataCenterFacility>) =>
    projectOtherApiSecondService<DataCenterFacility>().create(otherSubMenu?.apiRoute || '', body);

  const editDataCenterFacility = async (body: IApiPayload<DataCenterFacility>) =>
    projectOtherApiSecondService<DataCenterFacility>().update(otherSubMenu?.apiRoute || '', dataCenterFacility?.id || '', body);

  const getPayload = (values: DataCenterFacility) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<DataCenterFacility>, payload: IApiPayload<DataCenterFacility>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.dataCenterFacility, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.data-center-facility.${isEdit ? `edit-data-center-facility` : `create-data-center-facility`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.data-center-facility.${isEdit ? `edit-data-center-facility` : `create-data-center-facility`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...dataCenterFacility,
            data_center_id: dataCenterFacility?.data_center_id || '',
            total_floor_area: dataCenterFacility?.total_floor_area || '',
            power_capacity: dataCenterFacility?.power_capacity || '',
            rack_space_capacity: dataCenterFacility?.rack_space_capacity || '',
            cooling_capacity: dataCenterFacility?.cooling_capacity || '',
            access_control: dataCenterFacility?.access_control || false,
            surveillance_cameras: dataCenterFacility?.surveillance_cameras || false,
            fire_suppression_systems: dataCenterFacility?.fire_suppression_systems || false,
            intrusion_detection_systems: dataCenterFacility?.intrusion_detection_systems || false,
            others: dataCenterFacility?.others || ''
          }}
          createActionFunc={isEdit ? editDataCenterFacility : createDataCenterFacility}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DataCenterFacility>) => {
            return <DataCenterFacilityForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DataCenterFacilityDrawer;