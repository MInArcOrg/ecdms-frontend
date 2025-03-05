import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SeverityLevelMasterForm from './severity-level-master-form';
import { SeverityLevel } from 'src/types/general/general-master';
import roadLengthTypeMasterService from 'src/services/general/project/drainage-type-master-service';

interface SeverityLevelMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: SeverityLevel;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const SeverityLevelMasterDrawer = (props: SeverityLevelMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createSeverityLevelMaster = async (body: IApiPayload<SeverityLevel>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editSeverityLevelMaster = async (body: IApiPayload<SeverityLevel>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: SeverityLevel) => {
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

  const onActionSuccess = async (response: IApiResponse<SeverityLevel>, payload: IApiPayload<SeverityLevel>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `SEVERITY_LEVEL`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-drainage-type' : 'create-drainage-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<SeverityLevel>
          edit={isEdit}
          title="master-data.general-master.drainage-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editSeverityLevelMaster : createSeverityLevelMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SeverityLevel>) => {
            return (
              <>
                <SeverityLevelMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as SeverityLevel}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SeverityLevelMasterDrawer;
