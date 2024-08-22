import { FormikProps } from 'formik';
import { useState } from 'react';
import fileModelApiService from 'src/services/general/file-api-service';
import { FileModel } from 'src/types/general/file';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectFileForm from './project-file-form';

interface ProjectFileDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectFile: FileModel;
  projectId: string;
  type: string;
}

const ProjectFileDrawer = (props: ProjectFileDrawerType) => {
  const { open, toggle, refetch, projectFile, projectId, type } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(projectFile?.id);

  const createProjectFile = async (body: IApiPayload<FileModel>) => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('reference_id', projectId);
    formData.append('upload', body.files[0]);
    formData.append('description', body.data.description ?? '');
    return fileModelApiService.create({ data: formData, files: [] });
  };

  const editProjectFile = async (body: IApiPayload<FileModel>) => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('reference_id', projectId);
    formData.append('upload', body.files[0]);
    formData.append('description', body.data.description ?? '');
    return fileModelApiService.update(projectFile.id, { data: formData, files: [] });
  };
  const getPayload = (values: FileModel) => ({
    data: {
      ...values,
      id: projectFile?.id,
      project_id: projectId,

      type
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<FileModel>, payload: IApiPayload<FileModel>) => {
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-file.${isEdit ? `edit-project-${type.toLocaleLowerCase()}` : `create-project-${type.toLocaleLowerCase()}`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-file.${
            isEdit ? `edit-project-${type.toLocaleLowerCase()}` : `create-project-${type.toLocaleLowerCase()}`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={projectFile as FileModel}
          createActionFunc={isEdit ? editProjectFile : createProjectFile}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<FileModel>) => {
            return <ProjectFileForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectFileDrawer;
