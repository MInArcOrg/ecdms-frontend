import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DataCenterComponentAgeForm from './data-center-component-age-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DataCenterComponentAge } from 'src/types/project/other';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface DataCenterComponentAgeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCenterComponentAge: DataCenterComponentAge;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const DataCenterComponentAgeDrawer = (props: DataCenterComponentAgeDrawerType) => {
  const { open, toggle, refetch, dataCenterComponentAge, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    data_center_id: yup.string().required('Data Center ID is required'),
    servers: yup.number().nullable(),
    storage_devices: yup.number().nullable(),
    networking_equipment: yup.number().nullable(),
    cooling_systems: yup.number().nullable(),
    backup_generators: yup.number().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(dataCenterComponentAge?.id);

  const createDataCenterComponentAge = async (body: IApiPayload<DataCenterComponentAge>) =>
    projectOtherApiSecondService<DataCenterComponentAge>().create(otherSubMenu?.apiRoute || '', body);

  const editDataCenterComponentAge = async (body: IApiPayload<DataCenterComponentAge>) =>
    projectOtherApiSecondService<DataCenterComponentAge>().update(otherSubMenu?.apiRoute || '', dataCenterComponentAge?.id || '', body);

  const getPayload = (values: DataCenterComponentAge) => ({
    data: {
      ...values,
      project_id: projectId
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
