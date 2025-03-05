import type { FormikProps } from 'formik';
import type React from 'react';
import { useState } from 'react';
import projectConstructionTypeApiService from 'src/services/project/project-construction-type-service';
import { uploadFile } from 'src/services/utils/file-utils';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { ProjectConstructionType } from 'src/types/project/project-construction-type';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectConstructionTypeForm from './project-construction-type-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ProjectConstructionTypeDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  projectConstructionType: ProjectConstructionType;
}

const validationSchema = yup.object().shape({
  construction_type: yup.string().required('Construction Type is required')
});

const ProjectConstructionTypeDrawer: React.FC<ProjectConstructionTypeDrawerProps> = (props) => {
  const { open, toggle, refetch, projectConstructionType, projectId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = projectConstructionType?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const createProjectConstructionType = async (body: IApiPayload<ProjectConstructionType>) => {
    return await projectConstructionTypeApiService.create(body);
  };

  const editProjectConstructionType = async (body: IApiPayload<ProjectConstructionType>) => {
    return await projectConstructionTypeApiService.update(projectConstructionType?.id || '', body);
  };

  const getPayload = (values: ProjectConstructionType) => ({
    data: {
      ...values,
      id: projectConstructionType?.id,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProjectConstructionType>, payload: IApiPayload<ProjectConstructionType>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.project_construction_type, response.payload.id, '', '');
      }
    }
    refetch();
    toggle();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`project.construction-type.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.construction-type.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={projectConstructionType}
          createActionFunc={isEdit ? editProjectConstructionType : createProjectConstructionType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectConstructionType>) => {
            return (
              <ProjectConstructionTypeForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                projectId={projectId}
                defaultLocaleData={{} as ProjectConstructionType}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectConstructionTypeDrawer;
