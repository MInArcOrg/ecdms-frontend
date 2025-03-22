import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import CountTypeMasterForm from './count-type-master-form';
import { CountType } from 'src/types/general/general-master';
import roadLengthTypeMasterService from 'src/services/general/project/count-type-master-service';

interface CountTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: CountType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const CountTypeMasterDrawer = (props: CountTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createCountTypeMaster = async (body: IApiPayload<CountType>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editCountTypeMaster = async (body: IApiPayload<CountType>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: CountType) => {
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

  const onActionSuccess = async (response: IApiResponse<CountType>, payload: IApiPayload<CountType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `COUNT_TYPE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-count-type' : 'create-count-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<CountType>
          edit={isEdit}
          title="master-data.general-master.count-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editCountTypeMaster : createCountTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CountType>) => {
            return (
              <>
                <CountTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as CountType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default CountTypeMasterDrawer;
