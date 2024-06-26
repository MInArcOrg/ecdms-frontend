import { FormikProps } from 'formik';
import { useState } from 'react';
import modelMenuApiService from 'src/services/general/model-menu-service';
import { uploadFile } from 'src/services/utils/file-service';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneralMasterForm from './general-master-form';
import { GeneralMaster } from 'src/types/general/general-master';

interface GeneralMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: GeneralMaster;
  model: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const GeneralMasterDrawer = (props: GeneralMasterDrawerType) => {
  const { open, toggle, refetch, masterData, model } = props;
  const [switchStates, setSwitchStates] = useState<{ model: string; status: boolean }[]>([]);

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGeneralMaster = async (body: IApiPayload<GeneralMaster>) => {
    return await generalMasterDataApiService.create(model, body);
  };

  const editGeneralMaster = async (body: IApiPayload<GeneralMaster>) => {
    return await generalMasterDataApiService.update(model, masterData?.id || '', body);
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
      uploadFile(payload.files[0], `${model.toLocaleUpperCase()}_TYPE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`master-data.${isEdit ? 'edit-general-master' : 'create-general-master'}`} handleClose={handleClose} open={open}>
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
                <GeneralMasterForm file={uploadableFile} onFileChange={onFileChange} formik={formik} defaultLocaleData={{} as GeneralMaster} />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GeneralMasterDrawer;
