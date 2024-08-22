import { FormikProps } from 'formik';
import { useState } from 'react';
import projectPlanApiService from 'src/services/project/project-plan-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';

import moment from 'moment';
import { planReportTypeConstant } from 'src/constants/project-plan-report-constants';
import { ProjectPlan } from 'src/types/project/project-plan';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { getQuarterStartDate } from 'src/utils/genertor/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectPlanForm from './project-plan-form';

interface ProjectPlanDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectPlan: ProjectPlan;
  projectId: string;
}

const ProjectPlanDrawer = (props: ProjectPlanDrawerType) => {
  const { open, toggle, refetch, projectPlan, projectId } = props;

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

  const isEdit = Boolean(projectPlan?.id);

  const createProjectPlan = async (body: IApiPayload<ProjectPlan>) => projectPlanApiService.create(body);

  const editProjectPlan = async (body: IApiPayload<ProjectPlan>) => projectPlanApiService.update(projectPlan?.id || '', body);

  const getPayload = (values: ProjectPlan) => ({
    data: {
      ...values,
      id: projectPlan?.id,
      project_id: projectId,
      year: moment(values.year).toDate().getFullYear().toString(),
      start: getQuarterStartDate(moment(values.year).toDate().getFullYear(), Number(values.quarter))
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectPlan>, payload: IApiPayload<ProjectPlan>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.plan, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.plan.${isEdit ? `edit-project-plan` : `create-project-plan`}`}
      handleClose={handleClose}
      open={open}
      width={700}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.plan.${isEdit ? `edit-project-plan` : `create-project-plan`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectPlan as ProjectPlan),
            type: planReportTypeConstant.QUARTERLY.value,
            year: moment({ year: Number(projectPlan.year || new Date().getFullYear()), month: 0, day: 1 }).toDate()
          }}
          createActionFunc={isEdit ? editProjectPlan : createProjectPlan}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectPlan>) => {
            return (
              <ProjectPlanForm
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

export default ProjectPlanDrawer;
