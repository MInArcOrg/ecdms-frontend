'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricSmartMetersPrivacyAndSecurityDataForm from './electric-smart-meters-privacy-and-security-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ElectricSmartMetersData, ElectricSmartMetersPrivacyAndSecurityData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface ElectricSmartMetersPrivacyAndSecurityDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  electricSmartMetersData: ElectricSmartMetersData[];
  privacyMeasuresTypes: any[];
  customerEngagementFrequencies: any[];
  customerEngagementProgramTypes: any[];
}

const ElectricSmartMetersPrivacyAndSecurityDataDrawer = (props: ElectricSmartMetersPrivacyAndSecurityDataDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    electricSmartMetersPrivacyAndSecurityData,
    projectId,
    otherSubMenu,
    // electricSmartMeters,
    electricSmartMetersData,
    privacyMeasuresTypes,
    customerEngagementFrequencies,
    customerEngagementProgramTypes
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    electric_smart_meters_data_id: yup.string().required('Electric Smart Meters Data is required'),
    name: yup.string().required('Name is required'),
    privacy_measures_type_id: yup.string().required('Privacy Measures Type is required'),
    customer_engagement_frequency_id: yup.string().required('Customer Engagement Frequency is required'),
    customer_engagement_programs_type_id: yup.string().required('Customer Engagement Programs Type is required'),
    privacy_measures_implemented: yup.boolean().nullable(),
    customer_engagement_programs_implemented: yup.boolean().nullable(),
    social_impact_assessment_conducted: yup.boolean().nullable(),
    resettlement_and_compensation_measures_implemented: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(electricSmartMetersPrivacyAndSecurityData?.id);

  const createElectricSmartMetersPrivacyAndSecurityData = async (body: IApiPayload<ElectricSmartMetersPrivacyAndSecurityData>) =>
    projectOtherApiSecondService<ElectricSmartMetersPrivacyAndSecurityData>().create(otherSubMenu?.apiRoute || '', body);

  const editElectricSmartMetersPrivacyAndSecurityData = async (body: IApiPayload<ElectricSmartMetersPrivacyAndSecurityData>) =>
    projectOtherApiSecondService<ElectricSmartMetersPrivacyAndSecurityData>().update(
      otherSubMenu?.apiRoute || '',
      electricSmartMetersPrivacyAndSecurityData?.id || '',
      body
    );

  const getPayload = (values: ElectricSmartMetersPrivacyAndSecurityData) => ({
    data: {
      project_id: projectId,
      electric_smart_meters_data_id: values.electric_smart_meters_data_id,
      name: values.name,
      privacy_measures_implemented: values.privacy_measures_implemented,
      privacy_measures_type_id: values.privacy_measures_type_id,
      customer_engagement_frequency_id: values.customer_engagement_frequency_id,
      customer_engagement_programs_implemented: values.customer_engagement_programs_implemented,
      customer_engagement_programs_type_id: values.customer_engagement_programs_type_id,
      social_impact_assessment_conducted: values.social_impact_assessment_conducted,
      resettlement_and_compensation_measures_implemented: values.resettlement_and_compensation_measures_implemented,
      remark: values.remark,
      id: electricSmartMetersPrivacyAndSecurityData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ElectricSmartMetersPrivacyAndSecurityData>,
    payload: IApiPayload<ElectricSmartMetersPrivacyAndSecurityData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.electric_smart_meters_privacy_and_security_data,
        response.payload.id,
        '',
        ''
      );
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.electric-smart-meters-privacy-and-security-data.${isEdit ? `edit-electric-smart-meters-privacy-and-security-data` : `create-electric-smart-meters-privacy-and-security-data`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-smart-meters-privacy-and-security-data.${isEdit ? `edit-electric-smart-meters-privacy-and-security-data` : `create-electric-smart-meters-privacy-and-security-data`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricSmartMetersPrivacyAndSecurityData,
            privacy_measures_implemented: electricSmartMetersPrivacyAndSecurityData?.privacy_measures_implemented || false,
            customer_engagement_programs_implemented:
              electricSmartMetersPrivacyAndSecurityData?.customer_engagement_programs_implemented || false,
            social_impact_assessment_conducted: electricSmartMetersPrivacyAndSecurityData?.social_impact_assessment_conducted || false,
            resettlement_and_compensation_measures_implemented:
              electricSmartMetersPrivacyAndSecurityData?.resettlement_and_compensation_measures_implemented || false
          }}
          createActionFunc={isEdit ? editElectricSmartMetersPrivacyAndSecurityData : createElectricSmartMetersPrivacyAndSecurityData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricSmartMetersPrivacyAndSecurityData>) => {
            return (
              <ElectricSmartMetersPrivacyAndSecurityDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                electricSmartMetersData={electricSmartMetersData}
                privacyMeasuresTypes={privacyMeasuresTypes}
                customerEngagementFrequencies={customerEngagementFrequencies}
                customerEngagementProgramTypes={customerEngagementProgramTypes}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricSmartMetersPrivacyAndSecurityDataDrawer;
