import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import DataCenterComponentAgeForm from './data-center-component-age-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DataCenterComponentAge } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface DataCenterComponentAgeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCenterComponentAge: DataCenterComponentAge;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const DataCenterComponentAgeDrawer = (props: DataCenterComponentAgeDrawerType) => {
  const { open, toggle, refetch, dataCenterComponentAge, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    data_center_id: yup.string().required('Data Center ID is required'),
    servers: nullableIntegerSchema(),
    storage_devices: nullableIntegerSchema(),
    networking_equipment: nullableIntegerSchema(),
    cooling_systems: nullableIntegerSchema(),
    backup_generators: nullableIntegerSchema(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(dataCenterComponentAge?.id);

  const createDataCenterComponentAge = async (body: IApiPayload<DataCenterComponentAge>) =>
    projectOtherApiSecondService<DataCenterComponentAge>().create(otherSubMenu?.apiRoute || '', body);

  const editDataCenterComponentAge = async (body: IApiPayload<DataCenterComponentAge>) =>
    projectOtherApiSecondService<DataCenterComponentAge>().update(otherSubMenu?.apiRoute || '', dataCenterComponentAge?.id || '', body);

  const getPayload = (values: DataCenterComponentAge) => ({
    data: {
      project_id: projectId,
      data_center_id: values.data_center_id,
      servers: values.servers,
      storage_devices: values.storage_devices,
      networking_equipment: values.networking_equipment,
      cooling_systems: values.cooling_systems,
      backup_generators: values.backup_generators,
      others: values.others,
      id: dataCenterComponentAge?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<DataCenterComponentAge>, payload: IApiPayload<DataCenterComponentAge>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.dataCenterComponentAge, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.data-center-component-age.${isEdit ? `edit-data-center-component-age` : `create-data-center-component-age`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.data-center-component-age.${
            isEdit ? `edit-data-center-component-age` : `create-data-center-component-age`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...dataCenterComponentAge,
            data_center_id: dataCenterComponentAge?.data_center_id || '',
            servers: dataCenterComponentAge?.servers || 0,
            storage_devices: dataCenterComponentAge?.storage_devices || 0,
            networking_equipment: dataCenterComponentAge?.networking_equipment || 0,
            cooling_systems: dataCenterComponentAge?.cooling_systems || 0,
            backup_generators: dataCenterComponentAge?.backup_generators || 0,
            others: dataCenterComponentAge?.others || ''
          }}
          createActionFunc={isEdit ? editDataCenterComponentAge : createDataCenterComponentAge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DataCenterComponentAge>) => {
            return <DataCenterComponentAgeForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DataCenterComponentAgeDrawer;
