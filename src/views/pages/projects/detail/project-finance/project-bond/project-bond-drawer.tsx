import { FormikProps } from 'formik';
import { useState } from 'react';
import { institutionType } from 'src/constants/bond-constants';
import projectBondApiService from 'src/services/project/project-bond-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectBond, ProjectGeneralFinance } from 'src/types/project/project-finance';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import ProjectBondForm from './project-bond-form';
import { phoneRule } from 'src/utils/validator/phone';
import { birthDateRule, pastDateRule } from 'src/utils/validator/age';

interface ProjectBondDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectBond: ProjectBond;
  projectId: string;
  type: string;
  projectGeneralFinance: ProjectGeneralFinance;
}

const ProjectBondDrawer = (props: ProjectBondDrawerType) => {
  const { open, toggle, refetch, projectBond, projectId, type, projectGeneralFinance } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const percentagetCalculator = (event: number) => {
    return (event / projectGeneralFinance?.price_after_rebate) * 100;
  };

  const amountCalculator = (event: number) => {
    return projectGeneralFinance?.price_after_rebate * (event / 100);
  };
  const validationSchema = yup.object().shape({
    parent_id: yup.string().length(36).nullable(),
    type: yup.string().max(255).nullable(),
    issue_date: pastDateRule().nullable(),
    expiration_date: pastDateRule().nullable(),
    issuing_institute: yup.string().max(255).nullable(),
    institute_branch: yup.string().max(255).nullable(),
    branch_address: yup.string().max(255).nullable(),
    institution_type: yup.string().max(50).nullable(),
    phone: phoneRule.nullable(),
    remark: yup.string().nullable(),
    revision_no: nullableIntegerSchema(),
    amount: yup
      .number()
      .nullable()
      .when('institution_type', {
        is: (value: string) => value === institutionType.bank.value,
        then: (schema) => schema.max(amountCalculator(institutionType.bank.percent)).min(0)
      })
      .when('institution_type', {
        is: (value: string) => value === institutionType.insurance.value,
        then: (schema) => schema.max(amountCalculator(institutionType.insurance.percent)).min(0)
      }),
    percent: yup
      .number()
      .nullable()
      .when('institution_type', {
        is: (value: string) => value === institutionType.bank.value,
        then: (schema) => schema.max(institutionType.bank.percent).min(0)
      })
      .when('institution_type', {
        is: (value: string) => value === institutionType.insurance.value,
        then: (schema) => schema.max(institutionType.insurance.percent).min(0)
      })
  });

  const isEdit = Boolean(projectBond?.id);

  const createProjectBond = async (body: IApiPayload<ProjectBond>) => projectBondApiService.create(body);

  const editProjectBond = async (body: IApiPayload<ProjectBond>) => projectBondApiService.update(projectBond?.id || '', body);

  const getPayload = (values: ProjectBond) => ({
    data: {
      ...values,
      id: projectBond?.id,
      project_id: projectId,
      expiration_date: convertDateToLocaleDate(values.expiration_date),
      issue_date: convertDateToLocaleDate(values.issue_date),
      type
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectBond>, payload: IApiPayload<ProjectBond>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.bond, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-bond.${isEdit ? `edit-project-${type.toLocaleLowerCase()}` : `create-project-${type.toLocaleLowerCase()}`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-bond.project-${type.toLocaleLowerCase()}`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            type,
            ...projectBond,
            issue_date: formatInitialDateDate(projectBond?.issue_date),
            expiration_date: formatInitialDateDate(projectBond?.expiration_date)
          }}
          createActionFunc={isEdit ? editProjectBond : createProjectBond}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectBond>) => {
            return (
              <ProjectBondForm
                amountCalculator={amountCalculator}
                percentagetCalculator={percentagetCalculator}
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectBondDrawer;
