import { FormikProps } from 'formik';
import { useState } from 'react';
import projectResourceApiService from 'src/services/project/project-resource-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';

import { ProjectResource } from 'src/types/project/project-resource';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectResourceForm from './project-resource-form';

interface ProjectResourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectResource: ProjectResource;
  projectId: string;
}

const ProjectResourceDrawer = (props: ProjectResourceDrawerType) => {
  const { open, toggle, refetch, projectResource, projectId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const [viewSections, setViewSections] = useState({
    manpower: true,
    subtotal: true
  });

  const toggleSection = (section: 'manpower' | 'subtotal') => {
    setViewSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };
  const validationSchema = yup.object().shape({
    quarter: yup.number().required(`${'Quarter'} ${'is required'}`),
    financial_performance: yup.number().required(`${'Financial Performance'} ${'is required'}`),
    physical_performance: yup.number().required(`${'Physical Performance'} ${'is required'}`),
    direct_labour: viewSections.manpower ? yup.number().required(`${'Direct Labour'} ${'is required'}`) : yup.mixed().notRequired(),
    indirect_labour: viewSections.manpower ? yup.number().required(`${'Indirect Labour'} ${'is required'}`) : yup.mixed().notRequired(),
    material: viewSections.subtotal ? yup.number().required(`${'Material'} ${'is required'}`) : yup.mixed().notRequired(),
    machinery: viewSections.subtotal ? yup.number().required(`${'Machinery'} ${'is required'}`) : yup.mixed().notRequired(),
    other_expense: viewSections.subtotal ? yup.number().required(`${'Other Expense'} ${'is required'}`) : yup.mixed().notRequired(),
    sub_contractor_cost: viewSections.subtotal
      ? yup.number().required(`${'Subcontractor Cost'} ${'is required'}`)
      : yup.mixed().notRequired(),
    cost_due_to_rework: viewSections.subtotal
      ? yup.number().required(`${'Cost due to rework'} ${'is required'}`)
      : yup.mixed().notRequired(),
    over_head_cost: yup.number().required(`${'Over Head Cost'} ${'is required'}`),
    subtotal: yup.number().required(`${'Subtotal'} ${'is required'}`)
  });

  const isEdit = Boolean(projectResource?.id);

  const createProjectResource = async (body: IApiPayload<ProjectResource>) => projectResourceApiService.create(body);

  const editProjectResource = async (body: IApiPayload<ProjectResource>) => projectResourceApiService.update(projectResource?.id || '', body);

  const getPayload = (values: ProjectResource) => ({
    data: {
      ...values,
      id: projectResource?.id,
      project_id: projectId,
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectResource>, payload: IApiPayload<ProjectResource>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.resource, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.resource.${isEdit ? `edit-project-resource` : `create-project-resource`}`}
      handleClose={handleClose}
      open={open}
      width={700}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.resource.${isEdit ? `edit-project-resource` : `create-project-resource`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectResource as ProjectResource),
                 }}
          createActionFunc={isEdit ? editProjectResource : createProjectResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectResource>) => {
           
            return (
              <ProjectResourceForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                toggleSection={toggleSection}
                viewSections={viewSections}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectResourceDrawer;
