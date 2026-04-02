import { FormikProps } from 'formik';
import { useState } from 'react';
import generalMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectGeneralMaster } from 'src/types/general/general-master';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneralMasterForm from './project-general-master-form';
import { ProjectMasterModel } from 'src/constants/master-data/project-general-master-constants';

interface GeneralMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: ProjectGeneralMaster;
  projectMasterModel: ProjectMasterModel;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const GeneralMasterDrawer = (props: GeneralMasterDrawerType) => {
  const { open, toggle, refetch, masterData, projectMasterModel } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGeneralMaster = async (body: IApiPayload<ProjectGeneralMaster>) => {
    return await generalMasterDataApiService.create(body);
  };

  const editGeneralMaster = async (body: IApiPayload<ProjectGeneralMaster>) => {
    return await generalMasterDataApiService.update(masterData?.id || '', body);
  };

  const getPayload = (values: ProjectGeneralMaster) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
        model: projectMasterModel.model,
        project_type_id: values.project_type_id,
      },
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<ProjectGeneralMaster>, payload: IApiPayload<ProjectGeneralMaster>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], projectMasterModel.fileType, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? projectMasterModel.editTitle : projectMasterModel.createTitle}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<ProjectGeneralMaster>
          edit={isEdit}
          title={`master-data.general-master.${projectMasterModel.title}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editGeneralMaster : createGeneralMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectGeneralMaster>) => {
            return (
              <>
                <GeneralMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as ProjectGeneralMaster}
                  flag={projectMasterModel.flag || ''}
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
