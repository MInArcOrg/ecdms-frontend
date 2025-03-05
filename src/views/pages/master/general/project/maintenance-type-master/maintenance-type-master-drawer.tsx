import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MaintenanceTypeMasterForm from './maintenance-type-master-form';
import { MaintenanceType } from 'src/types/general/general-master';
import roadLengthTypeMasterService from 'src/services/general/project/maintenance-type-master-service';

interface MaintenanceTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: MaintenanceType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const MaintenanceTypeMasterDrawer = (props: MaintenanceTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createMaintenanceTypeMaster = async (body: IApiPayload<MaintenanceType>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editMaintenanceTypeMaster = async (body: IApiPayload<MaintenanceType>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: MaintenanceType) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id
      },
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<MaintenanceType>, payload: IApiPayload<MaintenanceType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `HYDROLOGY_DEFECT`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-maintenance-type' : 'create-maintenance-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<MaintenanceType>
          edit={isEdit}
          title="master-data.general-master.maintenance-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editMaintenanceTypeMaster : createMaintenanceTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MaintenanceType>) => {
            return (
              <>
                <MaintenanceTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as MaintenanceType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaintenanceTypeMasterDrawer;
