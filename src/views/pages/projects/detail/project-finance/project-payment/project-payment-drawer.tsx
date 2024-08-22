import { FormikProps } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import projectPaymentApiService from 'src/services/project/project-payment-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectPayment } from 'src/types/project/project-finance';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectPaymentForm from './project-payment-form';

interface ProjectPaymentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectPayment: ProjectPayment;
  projectId: string;
  type: string;
}

const ProjectPaymentDrawer = (props: ProjectPaymentDrawerType) => {
  const { open, toggle, refetch, projectPayment, projectId, type } = props;
  const { t } = useTranslation();

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    amount: yup.number().required(`${t('Amount')} ${t('is required')}`),
    retention: yup.number().required(`${t('Retention')} ${t('is required')}`)
  });

  const isEdit = Boolean(projectPayment?.id);

  const createProjectPayment = async (body: IApiPayload<ProjectPayment>) => projectPaymentApiService.create(body);

  const editProjectPayment = async (body: IApiPayload<ProjectPayment>) => projectPaymentApiService.update(projectPayment?.id || '', body);

  const getPayload = (values: ProjectPayment) => ({
    data: {
      ...values,
      id: projectPayment?.id,
      project_id: projectId,
      type
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectPayment>, payload: IApiPayload<ProjectPayment>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.payment, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-${type.toLocaleLowerCase()}.${
        isEdit ? `edit-project-${type.toLocaleLowerCase()}` : `create-project-${type.toLocaleLowerCase()}`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-${type.toLocaleLowerCase()}.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            type,
            ...(projectPayment as ProjectPayment)
          }}
          createActionFunc={isEdit ? editProjectPayment : createProjectPayment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectPayment>) => {
            return <ProjectPaymentForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectPaymentDrawer;
