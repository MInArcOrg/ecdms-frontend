import { FormikProps } from 'formik';
import { useState } from 'react';
import generalMasterDataApiService from 'src/services/general/resource-general-master-data-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { ResourceGeneralMaster } from 'src/types/general/general-master';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneralMasterForm from './resource-general-master-form';
import { ResourceMasterModel } from 'src/constants/master-data/resource-general-master-constants';

interface GeneralMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: ResourceGeneralMaster;
  resourceMasterModel: ResourceMasterModel;
}

const validationSchema = yup.object().shape({
  resource_type_id: yup.string().required('Resource Type is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const GeneralMasterDrawer = (props: GeneralMasterDrawerType) => {
  const { open, toggle, refetch, masterData, resourceMasterModel } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGeneralMaster = async (body: IApiPayload<ResourceGeneralMaster>) => {
    return await generalMasterDataApiService.create(body);
  };

  const editGeneralMaster = async (body: IApiPayload<ResourceGeneralMaster>) => {
    return await generalMasterDataApiService.update(masterData?.id || '', body);
  };

  const getPayload = (values: ResourceGeneralMaster) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
        model: resourceMasterModel.model
      },
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<ResourceGeneralMaster>, payload: IApiPayload<ResourceGeneralMaster>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], resourceMasterModel.fileType, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? resourceMasterModel.editTitle : resourceMasterModel.createTitle}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<ResourceGeneralMaster>
          edit={isEdit}
          title={`master-data.general-master.${resourceMasterModel.title}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editGeneralMaster : createGeneralMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceGeneralMaster>) => {
            return (
              <>
                <GeneralMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as ResourceGeneralMaster}
                  flag={resourceMasterModel.flag || ''}
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
