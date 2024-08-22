import { FormikProps } from 'formik';
import { useState } from 'react';
import projectReportApiService from 'src/services/project/project-report-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';

import { ProjectPlan } from 'src/types/project/project-plan';
import { MonthlyReport, ProjectReport } from 'src/types/project/project-report';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectReportForm from './project-report-form';

interface ProjectReportFormWrapperType {
  toggle: () => void;
  refetch: () => void;
  projectReport: ProjectReport;
  projectId: string;
  projectPlan: ProjectPlan;
  monthlyReport: MonthlyReport;
}

const ProjectReportFormWrapper = (props: ProjectReportFormWrapperType) => {
  const { toggle, refetch, projectReport, projectId, projectPlan, monthlyReport } = props;

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

  const isEdit = Boolean(projectReport?.id);

  const createProjectReport = async (body: IApiPayload<ProjectReport>) => projectReportApiService.create(body);

  const editProjectReport = async (body: IApiPayload<ProjectReport>) => projectReportApiService.update(projectReport?.id || '', body);

  const getPayload = (values: ProjectReport) => ({
    data: {
      ...values,
      id: projectReport?.id,
      project_id: projectId,
      projectplan_id: projectPlan.id,
      monthlyreport_id: monthlyReport.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectReport>, payload: IApiPayload<ProjectReport>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.report, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <FormPageWrapper
      edit={isEdit}
      title={`project.report.${isEdit ? `edit-project-report` : `create-project-report`}`}
      getPayload={getPayload}
      validationSchema={validationSchema}
      initialValues={{
        ...(projectReport as ProjectReport)
      }}
      createActionFunc={isEdit ? editProjectReport : createProjectReport}
      onActionSuccess={onActionSuccess}
      onCancel={handleClose}
    >
      {(formik: FormikProps<ProjectReport>) => {
        return (
          <ProjectReportForm
            projectPlan={projectPlan}
            file={uploadableFile}
            onFileChange={onFileChange}
            formik={formik}
            toggleSection={toggleSection}
            viewSections={viewSections}
          />
        );
      }}
    </FormPageWrapper>
  );
};

export default ProjectReportFormWrapper;
