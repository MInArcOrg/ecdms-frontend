import { FormikProps } from 'formik';
import { useState } from 'react';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { GeneralMaster } from 'src/types/general/general-master';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneralMasterForm from './general-master-form';
import { capitalizeEveryLetterWithDash } from 'src/utils/string';

interface GeneralMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: GeneralMaster;
  type: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const GeneralMasterDrawer = (props: GeneralMasterDrawerType) => {
  const { open, toggle, refetch, masterData, type } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGeneralMaster = async (body: IApiPayload<GeneralMaster>) => {
    return await generalMasterDataApiService.create(type, body);
  };

  const editGeneralMaster = async (body: IApiPayload<GeneralMaster>) => {
    return await generalMasterDataApiService.update(type, masterData?.id || '', body);
  };

  const getPayload = (values: GeneralMaster) => {
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

  const onActionSuccess = async (response: IApiResponse<GeneralMaster>, payload: IApiPayload<GeneralMaster>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], capitalizeEveryLetterWithDash(type), response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-' + type : 'create-' + type}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<GeneralMaster>
          edit={isEdit}
          title="master-data.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editGeneralMaster : createGeneralMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GeneralMaster>) => {
            return (
              <>
                <GeneralMasterForm
                  type={type}
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as GeneralMaster}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GeneralMasterDrawer;
