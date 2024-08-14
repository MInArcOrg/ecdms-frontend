import { FormikProps } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'src/configs/i18n';
import { variationConstants } from 'src/constants/variation-constants';
import projectVariationApiService from 'src/services/project/project-variation-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectGeneralFinance, ProjectVariation } from 'src/types/project/project-finance';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { convertDateToLocaleDate } from 'src/utils/formatter/date';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectVariationForm from './project-variation-form';

interface ProjectVariationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectVariation: ProjectVariation;
  projectId: string;
  type: string;
  projectGeneralFinance: ProjectGeneralFinance;
}

const ProjectVariationDrawer = (props: ProjectVariationDrawerType) => {
  const { open, toggle, refetch, projectVariation, projectId, type, projectGeneralFinance } = props;
  const { t } = useTranslation();
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const selectedVariationType = variationConstants[type as keyof typeof variationConstants];

  const percentagetCalculator = (value: number) => (value / projectGeneralFinance?.price_after_rebate) * 100;

  const amountCalculator = (value: number) => projectGeneralFinance?.price_after_rebate * (value / 100);

  const percentOf = (value: number) => (projectGeneralFinance?.price_after_rebate * value) / 100;

  const variationTotal = () => {
    switch (type) {
      case variationConstants.VARIATION.value:
        return projectGeneralFinance.variation_total;
      case variationConstants.SUPPLEMENT.value:
        return projectGeneralFinance.supplement_total;
      case variationConstants.OMISSION.value:
        return projectGeneralFinance.omission_total;
      case variationConstants.AMENDMENT.value:
        return projectGeneralFinance.special_total;
      default:
        return 0;
    }
  };

  const allowedVariation = percentOf(selectedVariationType?.percent ?? 0);
  const remainingVariation = allowedVariation - variationTotal();
  const remainingVariationPercent = percentagetCalculator(remainingVariation);
  console.log('remaining variation percent', remainingVariation, remainingVariationPercent);
  const validationSchema = yup.object().shape({
    extension_time: yup.number().required(`${t('Extension Time')} ${t('is required')}`),
    approval_date: yup.date().required(`${t('Approval Date')} ${t('is required')}`),
    amount: yup
      .number()
      .required(`${t('Amount')} ${t('is required')}`)
      .when('type', {
        is: (value: string) => value === variationConstants.SUPPLEMENT.value || value === variationConstants.VARIATION.value,
        then: (schema) => schema.max(remainingVariation)
      })
      .moreThan(0),
    percentage: yup
      .number()
      .required(`${t('Percentage')} ${t('is required')}`)
      .moreThan(0)
      .when('type', {
        is: (value: string) => value === variationConstants.SUPPLEMENT.value || value === variationConstants.VARIATION.value,
        then: (schema) => schema.max(remainingVariationPercent)
      })
  });

  const isEdit = Boolean(projectVariation?.id);

  const createProjectVariation = async (body: IApiPayload<ProjectVariation>) => projectVariationApiService.create(body);

  const editProjectVariation = async (body: IApiPayload<ProjectVariation>) =>
    projectVariationApiService.update(projectVariation?.id || '', body);

  const getPayload = (values: ProjectVariation) => ({
    data: {
      ...values,
      approval_date: convertDateToLocaleDate(values.approval_date),
      id: projectVariation?.id,
      project_id: projectId,
      type
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectVariation>, payload: IApiPayload<ProjectVariation>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.variation, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-${type.toLocaleLowerCase()}.${
        isEdit ? `edit-project-${type.toLocaleLowerCase()}` : `create-project-${type.toLocaleLowerCase()}`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-${type.toLocaleLowerCase()}.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            type,

            ...(projectVariation as ProjectVariation),
            percentage: percentagetCalculator(projectVariation?.amount),
            approval_date: projectVariation?.approval_date
              ? getDynamicDate(i18n, moment(String(projectVariation?.approval_date)).toDate())
              : undefined
          }}
          createActionFunc={isEdit ? editProjectVariation : createProjectVariation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectVariation>) => {
            return (
              <ProjectVariationForm
                file={uploadableFile}
                onFileChange={onFileChange}
                amountCalculator={amountCalculator}
                percentagetCalculator={percentagetCalculator}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectVariationDrawer;
