import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DataCenterFacilityCapacityForm from './data-center-facility-capacity-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DataCenterFacilityCapacity } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface DataCenterFacilityCapacityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCenterFacilityCapacity: DataCenterFacilityCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const DataCenterFacilityCapacityDrawer = (props: DataCenterFacilityCapacityDrawerType) => {
  const { open, toggle, refetch, dataCenterFacilityCapacity, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().nullable(),
    data_center_id: yup.string().required('Data Center ID is required'),
    total_floor_area: yup.string().nullable().max(100, 'Total floor area cannot exceed 100 characters'),
    power_capacity: yup.string().nullable().max(100, 'Power capacity cannot exceed 100 characters'),
    rack_space_capacity: yup.string().nullable().max(100, 'Rack space capacity cannot exceed 100 characters'),
    cooling_capacity: yup.string().nullable().max(100, 'Cooling capacity cannot exceed 100 characters'),
    access_control: yup.boolean().nullable(),
    surveillance_cameras: yup.boolean().nullable(),
    fire_suppression_systems: yup.boolean().nullable(),
    intrusion_detection_systems: yup.boolean().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(dataCenterFacilityCapacity?.id);

  const createDataCenterFacilityCapacity = async (body: IApiPayload<DataCenterFacilityCapacity>) =>
    projectOtherApiSecondService<DataCenterFacilityCapacity>().create(otherSubMenu?.apiRoute || '', body);

  const editDataCenterFacilityCapacity = async (body: IApiPayload<DataCenterFacilityCapacity>) =>
    projectOtherApiSecondService<DataCenterFacilityCapacity>().update(
      otherSubMenu?.apiRoute || '',
      dataCenterFacilityCapacity?.id || '',
      body
    );

  const getPayload = (values: DataCenterFacilityCapacity) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<DataCenterFacilityCapacity>, payload: IApiPayload<DataCenterFacilityCapacity>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.dataCenterFacilityCapacity, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.data-center-facility-capacity.${
        isEdit ? `edit-data-center-facility-capacity` : `create-data-center-facility-capacity`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.data-center-facility-capacity.${
            isEdit ? `edit-data-center-facility-capacity` : `create-data-center-facility-capacity`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...dataCenterFacilityCapacity,
            data_center_id: dataCenterFacilityCapacity?.data_center_id || '',
            total_floor_area: dataCenterFacilityCapacity?.total_floor_area || '',
            power_capacity: dataCenterFacilityCapacity?.power_capacity || '',
            rack_space_capacity: dataCenterFacilityCapacity?.rack_space_capacity || '',
            cooling_capacity: dataCenterFacilityCapacity?.cooling_capacity || '',
            access_control: dataCenterFacilityCapacity?.access_control || false,
            surveillance_cameras: dataCenterFacilityCapacity?.surveillance_cameras || false,
            fire_suppression_systems: dataCenterFacilityCapacity?.fire_suppression_systems || false,
            intrusion_detection_systems: dataCenterFacilityCapacity?.intrusion_detection_systems || false,
            others: dataCenterFacilityCapacity?.others || ''
          }}
          createActionFunc={isEdit ? editDataCenterFacilityCapacity : createDataCenterFacilityCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DataCenterFacilityCapacity>) => {
            return (
              <DataCenterFacilityCapacityForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DataCenterFacilityCapacityDrawer;
