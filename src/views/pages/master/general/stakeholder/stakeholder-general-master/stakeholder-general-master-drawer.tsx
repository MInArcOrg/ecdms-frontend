import { FormikProps } from 'formik';
import { useState } from 'react';
import generalMasterDataApiService from 'src/services/general/stakeholder-general-master-data-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderGeneralMaster } from 'src/types/general/general-master';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneralMasterForm from './stakeholder-general-master-form';
import { StakeholderMasterModel } from 'src/constants/master-data/stakeholder-general-master-constants';

interface GeneralMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: StakeholderGeneralMaster;
  stakeholderMasterModel: StakeholderMasterModel;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const GeneralMasterDrawer = (props: GeneralMasterDrawerType) => {
  const { open, toggle, refetch, masterData, stakeholderMasterModel } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGeneralMaster = async (body: IApiPayload<StakeholderGeneralMaster>) => {
    return await generalMasterDataApiService.create(body);
  };

  const editGeneralMaster = async (body: IApiPayload<StakeholderGeneralMaster>) => {
    return await generalMasterDataApiService.update(masterData?.id || '', body);
  };

  const getPayload = (values: StakeholderGeneralMaster) => {
    console.log('values',values,stakeholderMasterModel.flag );
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
        model: stakeholderMasterModel.model,
        stakeholder_type_id: values.stakeholder_type_id || '',
      },
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderGeneralMaster>, payload: IApiPayload<StakeholderGeneralMaster>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], stakeholderMasterModel.fileType, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? stakeholderMasterModel.editTitle : stakeholderMasterModel.createTitle}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<StakeholderGeneralMaster>
          edit={isEdit}
          title={`master-data.general-master.${stakeholderMasterModel.title}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editGeneralMaster : createGeneralMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderGeneralMaster>) => {
            return (
              <>
                <GeneralMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as StakeholderGeneralMaster}
                  flag={stakeholderMasterModel.flag || ''}
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
