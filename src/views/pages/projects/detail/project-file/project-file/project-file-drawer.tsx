'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import projectFileApiService from 'src/services/project/project-file-service';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ProjectFile } from 'src/types/project/project-file';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectFileForm from './project-file-form';

interface ProjectFileDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectFile: ProjectFile;
  projectId: string;
  type: string;
}

const ProjectFileDrawer = (props: ProjectFileDrawerProps) => {
  const { open, toggle, refetch, projectFile, projectId, type } = props;
  const { t } = useTranslation();

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required(`${t('Title')} ${t('is required')}`),
    description: yup.string().nullable()
  });

  const isEdit = Boolean(projectFile?.id);

  const createProjectFile = async (body: IApiPayload<ProjectFile>) => projectFileApiService.create(body);
  const editProjectFile = async (body: IApiPayload<ProjectFile>) => projectFileApiService.update(projectFile?.id || '', body);

  const getPayload = (values: ProjectFile): IApiPayload<ProjectFile> => ({
    data: {
      ...values,
      id: projectFile?.id,
      project_id: projectId,
      type
    },
    files: []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProjectFile>, _payload: IApiPayload<ProjectFile>) => {
    const recordId = response.payload.id;
    if (uploadableFile) {
      await uploadFile(uploadableFile, type, recordId, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={t(isEdit ? 'Edit Project File' : 'Create Project File')} handleClose={handleClose} open={open} width={650}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={t(isEdit ? 'Edit Project File' : 'Create Project File')}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...projectFile,
            type,
            project_id: projectId
          }}
          createActionFunc={isEdit ? editProjectFile : createProjectFile}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectFile>) => {
            return <ProjectFileForm formik={formik} file={uploadableFile} onFileChange={onFileChange} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectFileDrawer;

