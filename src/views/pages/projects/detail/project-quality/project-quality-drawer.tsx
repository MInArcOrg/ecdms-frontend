import { FormikProps } from 'formik';
import React, { useState } from 'react';
import projectQualityApiService from 'src/services/project/project-quality-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectQuality } from 'src/types/project/project-quality';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectQualityForm from './project-quality-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ProjectQualityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  projectQuality: ProjectQuality;
}
  const validationSchema = yup.object().shape({
    major_quality_problem_encountered: yup.string().required("Major Quality Problem Encountered is required"),
  })

const ProjectQualityDrawer: React.FC<ProjectQualityDrawerType> = (props) => {
  const { open, toggle, refetch, projectQuality, projectId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = projectQuality?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const createProjectQuality = async (body: IApiPayload<ProjectQuality>) => {
    return await projectQualityApiService.create(body);
  };

  const editProjectQuality = async (body: IApiPayload<ProjectQuality>) => {
    return await projectQualityApiService.update(projectQuality?.id || '', body);
  };

  const getPayload = (values: ProjectQuality) => ({
    data: {
      ...values,
      id: projectQuality?.id,
      project_id: projectId,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProjectQuality>, payload: IApiPayload<ProjectQuality>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.projectQuality, response.payload.id, '', '');
      }
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.quality.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.quality.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={projectQuality}
          createActionFunc={isEdit ? editProjectQuality : createProjectQuality}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectQuality>) => {
            return (
              <ProjectQualityForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                projectId={projectId}
                defaultLocaleData={{} as ProjectQuality}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectQualityDrawer;