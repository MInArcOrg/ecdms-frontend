import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DataCenterForm from './data-center-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DataCenter } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface DataCenterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCenter: DataCenter;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const DataCenterDrawer = (props: DataCenterDrawerType) => {
  const { open, toggle, refetch, dataCenter, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().nullable(),
    name: yup.string().required('Name is required').max(100, 'Name cannot exceed 100 characters'),
    data_center_type_id: yup.string().required('Data center type is required'),
    servers: yup.boolean().nullable(),
    storage_devices: yup.boolean().nullable(),
    networking_equipment: yup.boolean().nullable(),
    cooling_systems: yup.boolean().nullable(),
    backup_generators: yup.boolean().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(dataCenter?.id);

  const createDataCenter = async (body: IApiPayload<DataCenter>) =>
    projectOtherApiSecondService<DataCenter>().create(otherSubMenu?.apiRoute || '', body);

  const editDataCenter = async (body: IApiPayload<DataCenter>) =>
    projectOtherApiSecondService<DataCenter>().update(otherSubMenu?.apiRoute || '', dataCenter?.id || '', body);

  const getPayload = (values: DataCenter) => ({
    data: {
      project_id: projectId,
      name: values.name,
      data_center_type_id: values.data_center_type_id,
      servers: values.servers,
      storage_devices: values.storage_devices,
      networking_equipment: values.networking_equipment,
      cooling_systems: values.cooling_systems,
      backup_generators: values.backup_generators,
      others: values.others,
      id: dataCenter?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<DataCenter>, payload: IApiPayload<DataCenter>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.dataCenter, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.data-center.${isEdit ? `edit-data-center` : `create-data-center`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.data-center.${isEdit ? `edit-data-center` : `create-data-center`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...dataCenter,
            name: dataCenter?.name || '',
            data_center_type_id: dataCenter?.data_center_type_id || '',
            servers: dataCenter?.servers || false,
            storage_devices: dataCenter?.storage_devices || false,
            networking_equipment: dataCenter?.networking_equipment || false,
            cooling_systems: dataCenter?.cooling_systems || false,
            backup_generators: dataCenter?.backup_generators || false,
            others: dataCenter?.others || ''
          }}
          createActionFunc={isEdit ? editDataCenter : createDataCenter}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DataCenter>) => {
            return <DataCenterForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DataCenterDrawer;
