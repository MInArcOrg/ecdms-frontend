'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayCommunicationSystemSafetyAndComplianceForm from './railway-communication-system-safety-and-compliance-form';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayCommunicationSystemSafetyAndCompliance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface RailwayCommunicationSystemSafetyAndComplianceDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayCommunicationSystemSafetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayCommunicationSystemSafetyAndComplianceDrawer = ({
  open,
  toggle,
  refetch,
  railwayCommunicationSystemSafetyAndCompliance,
  projectId,
  otherSubMenu
}: RailwayCommunicationSystemSafetyAndComplianceDrawerProps) => {
  const isEdit = Boolean(railwayCommunicationSystemSafetyAndCompliance?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    safety_measures_and_protocols_done: yup.boolean().nullable(),
    compliance_with_signaling_and_communication_standards: yup.boolean().nullable(),
    incident_or_accident_records: yup.boolean().nullable(),
    incident_date: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwayCommunicationSystemSafetyAndCompliance = async (
    body: IApiPayload<RailwayCommunicationSystemSafetyAndCompliance>
  ) =>
    projectOtherApiSecondService<RailwayCommunicationSystemSafetyAndCompliance>().create(
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwayCommunicationSystemSafetyAndCompliance = async (
    body: IApiPayload<RailwayCommunicationSystemSafetyAndCompliance>
  ) =>
    projectOtherApiSecondService<RailwayCommunicationSystemSafetyAndCompliance>().update(
      otherSubMenu?.apiRoute || '',
      railwayCommunicationSystemSafetyAndCompliance.id as string,
      body
    );

  const getPayload = (
    values: RailwayCommunicationSystemSafetyAndCompliance
  ): IApiPayload<RailwayCommunicationSystemSafetyAndCompliance> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        incident_date: convertDateToLocaleDate(values.incident_date),

      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayCommunicationSystemSafetyAndCompliance>) => {
    try {
      console.log('API Response:', response);
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      if (defaultFile) {
        await uploadFile(defaultFile, otherSubMenu?.fileType || "",
          recordId, '', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-communication-system-safety-and-compliance.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-communication-system-safety-and-compliance.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayCommunicationSystemSafetyAndCompliance,
            incident_date: formatInitialDateDate(
              railwayCommunicationSystemSafetyAndCompliance?.incident_date,
            ),
          }}
          createActionFunc={
            isEdit
              ? editRailwayCommunicationSystemSafetyAndCompliance
              : createRailwayCommunicationSystemSafetyAndCompliance
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayCommunicationSystemSafetyAndCompliance>) => (
            <RailwayCommunicationSystemSafetyAndComplianceForm
              formik={formik}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayCommunicationSystemSafetyAndComplianceDrawer;