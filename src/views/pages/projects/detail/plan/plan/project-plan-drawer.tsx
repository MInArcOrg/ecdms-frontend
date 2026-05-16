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
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
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
    parent_id: yup.string().length(36).nullable(), // Identifier of a related or parent report
    start: yup.string().nullable(),
    end: yup.string().nullable(),
    type: yup.string().max(255).nullable(),
    project_expense: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    manpower: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    direct_labour: viewSections.manpower ? limitNumberDigits(nullableNumberSchema().required('Direct Labour is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    indirect_labour: viewSections.manpower ? limitNumberDigits(nullableNumberSchema().required('Indirect Labour is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    material: viewSections.subtotal ? limitNumberDigits(nullableNumberSchema().required('Material is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    machinery: viewSections.subtotal ? limitNumberDigits(nullableNumberSchema().required('Machinery is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    other_expense: viewSections.subtotal ? limitNumberDigits(nullableNumberSchema().required('Other Expense is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    sub_contractor_cost: viewSections.subtotal ? limitNumberDigits(nullableNumberSchema().required('Subcontractor Cost is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    cost_due_to_rework: viewSections.subtotal ? limitNumberDigits(nullableNumberSchema().required('Cost due to rework is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }) : limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    financial_performance: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    physical_performance: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    over_head_cost: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    profit: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    year: yup.string().max(255).nullable(),
    quarter: yup.string().max(255).nullable(),
    is_summary: yup.boolean().nullable(),
    remark: yup.string().nullable(),
    revision_no: nullableIntegerSchema()
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
            ...projectPlan,
            type: planReportTypeConstant.QUARTERLY.value,
            year: moment({
              year: Number(projectPlan.year || new Date().getFullYear()),
              month: 0,
              day: 1
            }).toDate()
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
