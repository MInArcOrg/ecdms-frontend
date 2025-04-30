'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import EnvironmentalAndSocialImpactForm from './environmental-and-social-impact-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { EnvironmentalAndSocialImpact } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface EnvironmentalAndSocialImpactDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  environmentalAndSocialImpact: EnvironmentalAndSocialImpact;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const EnvironmentalAndSocialImpactDrawer = (props: EnvironmentalAndSocialImpactDrawerType) => {
  const { open, toggle, refetch, environmentalAndSocialImpact, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    environmental_impact_assessment_conducted: yup.boolean().nullable(),
    mitigation_measures_implemented: yup.boolean().nullable(),
    social_impact_assessment_conducted: yup.boolean().nullable(),
    resettlement_and_compensation_measures_implemented: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(environmentalAndSocialImpact?.id);

  const createEnvironmentalAndSocialImpact = async (body: IApiPayload<EnvironmentalAndSocialImpact>) =>
    projectOtherApiSecondService<EnvironmentalAndSocialImpact>().create(otherSubMenu?.apiRoute || '', body);

  const editEnvironmentalAndSocialImpact = async (body: IApiPayload<EnvironmentalAndSocialImpact>) =>
    projectOtherApiSecondService<EnvironmentalAndSocialImpact>().update(
      otherSubMenu?.apiRoute || '',
      environmentalAndSocialImpact?.id || '',
      body
    );

  const getPayload = (values: EnvironmentalAndSocialImpact) => ({
    data: {
      project_id: projectId,
      environmental_impact_assessment_conducted: values.environmental_impact_assessment_conducted,
      mitigation_measures_implemented: values.mitigation_measures_implemented,
      social_impact_assessment_conducted: values.social_impact_assessment_conducted,
      resettlement_and_compensation_measures_implemented: values.resettlement_and_compensation_measures_implemented,
      remark: values.remark,
      id: environmentalAndSocialImpact?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<EnvironmentalAndSocialImpact>,
    payload: IApiPayload<EnvironmentalAndSocialImpact>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.environmentalAndSocialImpact, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.environmental-and-social-impact.${
        isEdit ? `edit-environmental-and-social-impact` : `create-environmental-and-social-impact`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.environmental-and-social-impact.${
            isEdit ? `edit-environmental-and-social-impact` : `create-environmental-and-social-impact`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...environmentalAndSocialImpact
          }}
          createActionFunc={isEdit ? editEnvironmentalAndSocialImpact : createEnvironmentalAndSocialImpact}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<EnvironmentalAndSocialImpact>) => {
            return <EnvironmentalAndSocialImpactForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EnvironmentalAndSocialImpactDrawer;
