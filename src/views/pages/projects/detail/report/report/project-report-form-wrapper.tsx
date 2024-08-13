import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import projectReportApiService from "src/services/project/project-report-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";

import { ProjectReport } from "src/types/project/project-report";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import ProjectReportForm from "./project-report-form";
import { planReportTypeConstant, yearListOptions } from "src/constants/project-plan-report-constants";
import { ProjectPlan } from "src/types/project/project-plan";

interface ProjectReportFormWrapperType {
  toggle: () => void;
  refetch: () => void;
  projectReport: ProjectReport;
  projectId: string;
  projectPlan: ProjectPlan
}

const ProjectReportFormWrapper = (props: ProjectReportFormWrapperType) => {
  const {
    toggle,
    refetch,
    projectReport,
    projectId,
    projectPlan
  } = props;
  const { t } = useTranslation();

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const [viewSections, setViewSections] = useState({
    manpower: true,
    subtotal: true,
  });

  const toggleSection = (section: 'manpower' | 'subtotal') => {
    setViewSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const validationSchema = yup.object().shape({
    quarter: yup.number().required(`${('Quarter')} ${('is required')}`),
    financial_performance: yup.number().required(`${('Financial Performance')} ${('is required')}`),
    physical_performance: yup.number().required(`${('Physical Performance')} ${('is required')}`),
    direct_labour: viewSections.manpower 
      ? yup.number().required(`${('Direct Labour')} ${('is required')}`)
      : yup.mixed().notRequired(),
    indirect_labour: viewSections.manpower 
      ? yup.number().required(`${('Indirect Labour')} ${('is required')}`)
      : yup.mixed().notRequired(),
    material: viewSections.subtotal 
      ? yup.number().required(`${('Material')} ${('is required')}`)
      : yup.mixed().notRequired(),
    machinery: viewSections.subtotal 
      ? yup.number().required(`${('Machinery')} ${('is required')}`)
      : yup.mixed().notRequired(),
    other_expense: viewSections.subtotal 
      ? yup.number().required(`${('Other Expense')} ${('is required')}`)
      : yup.mixed().notRequired(),
    sub_contractor_cost: viewSections.subtotal 
      ? yup.number().required(`${('Subcontractor Cost')} ${('is required')}`)
      : yup.mixed().notRequired(),
    cost_due_to_rework: viewSections.subtotal 
      ? yup.number().required(`${('Cost due to rework')} ${('is required')}`)
      : yup.mixed().notRequired(),
    over_head_cost: yup.number().required(`${('Over Head Cost')} ${('is required')}`),
    subtotal: yup.number().required(`${('Subtotal')} ${('is required')}`)
  });
  
  const isEdit = Boolean(projectReport?.id);

  const createProjectReport = async (body: IApiPayload<ProjectReport>) =>
    projectReportApiService.create(body);

  const editProjectReport = async (body: IApiPayload<ProjectReport>) =>
    projectReportApiService.update(projectReport?.id || "", body);

  const getPayload = (values: ProjectReport) => ({
    data: {
      ...values,
      id: projectReport?.id,
      project_id: projectId,
      year: typeof values?.year === 'object' && values?.year !== null ? values.year.value : values?.year || ""
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ProjectReport>,
    payload: IApiPayload<ProjectReport>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.report,
        response.payload.id,
        "",
        ""
      );
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (

        <FormPageWrapper
          edit={isEdit}
          title={`project.report.${
            isEdit
            ? `edit-project-report`
              : `create-project-report`
          }`}          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectReport as ProjectReport),
            type:planReportTypeConstant.QUARTERLY.value,
            year:yearListOptions.find(year=>year.value===projectReport.year)||null
          }}
          createActionFunc={isEdit ? editProjectReport : createProjectReport}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectReport>) => {
              useEffect(() => {
                const indirectLabour = formik.values.indirect_labour ?? 0;
                const directLabour = formik.values.direct_labour ?? 0;
                formik.setFieldValue('manpower', Number(indirectLabour + directLabour));
              }, [formik.values.indirect_labour, formik.values.direct_labour]);
            
              useEffect(() => {
                const material = formik.values.material ?? 0;
                const machinery = formik.values.machinery ?? 0;
                const otherExpense = formik.values.other_expense ?? 0;
                const subContractorCost = formik.values.sub_contractor_cost ?? 0;
                const manpower = formik.values.manpower ?? 0;
                const subtotal = manpower + material + machinery + otherExpense + subContractorCost;
                formik.setFieldValue('subtotal', subtotal);
              }, [
                formik.values.manpower,
                formik.values.material,
                formik.values.machinery,
                formik.values.other_expense,
                formik.values.sub_contractor_cost,
              ]);
            
              useEffect(() => {
                const overHeadCost = formik.values.over_head_cost ?? 0;
                const financialPerformance = formik.values.financial_performance ?? 0;
                const total = overHeadCost + financialPerformance;
                formik.setFieldValue('total', total);
              }, [formik.values.over_head_cost, formik.values.financial_performance]);
              useEffect(() => {
                const subtotal=formik.values?.subtotal||0;
                const percentOf = (value:number) => {
                  return (value * subtotal) / 100
                }
                formik.setFieldValue(
                  'project_expense',
                  Number(subtotal + percentOf(formik.values.over_head_cost||0))
                )
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [formik.values.subtotal, formik.values.over_head_cost])  
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
