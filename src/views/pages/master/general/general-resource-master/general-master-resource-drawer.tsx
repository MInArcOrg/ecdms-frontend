import { FormikProps } from 'formik';
import { useState } from 'react';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneralMasterResourceForm from './general-master-resource-form';
import { GeneralMasterResource } from 'src/types/general/general-master';
import { capitalizeEveryLetterWithDash } from 'src/utils/string';

interface GeneralMasterResourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: GeneralMasterResource;
  type: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const GeneralMasterResourceDrawer = (props: GeneralMasterResourceDrawerType) => {
  const { open, toggle, refetch, masterData, type } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGeneralMasterResource = async (body: IApiPayload<GeneralMasterResource>) => {
    return await generalMasterDataApiService.createResourceGeneralMaster(type, body);
  };

  const editGeneralMasterResource = async (body: IApiPayload<GeneralMasterResource>) => {
    return await generalMasterDataApiService.updateResourceGeneralMaster(type, masterData?.id || '', body);
  };

  const getPayload = (values: GeneralMasterResource) => {
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

  const onActionSuccess = async (response: IApiResponse<GeneralMasterResource>, payload: IApiPayload<GeneralMasterResource>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `${capitalizeEveryLetterWithDash(type)}_type`, response.payload.id, '', '');
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
        <FormPageWrapper<GeneralMasterResource>
          edit={isEdit}
          title="master-data.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editGeneralMasterResource : createGeneralMasterResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GeneralMasterResource>) => {
            return (
              <>
                <GeneralMasterResourceForm
                  type={type}
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as GeneralMasterResource}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GeneralMasterResourceDrawer;
