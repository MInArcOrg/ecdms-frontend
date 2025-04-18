import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DataCenterComponentManufacturerForm from './data-center-component-manufacturer-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DataCenterComponentManufacturer } from 'src/types/project/other';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface DataCenterComponentManufacturerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCenterComponentManufacturer: DataCenterComponentManufacturer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const DataCenterComponentManufacturerDrawer = (props: DataCenterComponentManufacturerDrawerType) => {
  const { open, toggle, refetch, dataCenterComponentManufacturer, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    data_center_id: yup.string().required('Data Center ID is required'),
    servers: yup.string().nullable(),
    storage_devices: yup.string().nullable(),
    networking_equipment: yup.string().nullable(),
    cooling_systems: yup.string().nullable(),
    backup_generators: yup.string().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(dataCenterComponentManufacturer?.id);

  const createDataCenterComponentManufacturer = async (body: IApiPayload<DataCenterComponentManufacturer>) =>
    projectOtherApiSecondService<DataCenterComponentManufacturer>().create(otherSubMenu?.apiRoute || '', body);

  const editDataCenterComponentManufacturer = async (body: IApiPayload<DataCenterComponentManufacturer>) =>
    projectOtherApiSecondService<DataCenterComponentManufacturer>().update(
      otherSubMenu?.apiRoute || '',
      dataCenterComponentManufacturer?.id || '',
      body
    );

  const getPayload = (values: DataCenterComponentManufacturer) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<DataCenterComponentManufacturer>,
    payload: IApiPayload<DataCenterComponentManufacturer>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.dataCenterComponentManufacturer, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.data-center-component-manufacturer.${isEdit ? `edit-data-center-component-manufacturer` : `create-data-center-component-manufacturer`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.data-center-component-manufacturer.${isEdit ? `edit-data-center-component-manufacturer` : `create-data-center-component-manufacturer`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...dataCenterComponentManufacturer,
            data_center_id: dataCenterComponentManufacturer?.data_center_id || '',
            servers: dataCenterComponentManufacturer?.servers || '',
            storage_devices: dataCenterComponentManufacturer?.storage_devices || '',
            networking_equipment: dataCenterComponentManufacturer?.networking_equipment || '',
            cooling_systems: dataCenterComponentManufacturer?.cooling_systems || '',
            backup_generators: dataCenterComponentManufacturer?.backup_generators || '',
            others: dataCenterComponentManufacturer?.others || ''
          }}
          createActionFunc={isEdit ? editDataCenterComponentManufacturer : createDataCenterComponentManufacturer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DataCenterComponentManufacturer>) => {
            return (
              <DataCenterComponentManufacturerForm
                projectId={projectId}
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DataCenterComponentManufacturerDrawer;
