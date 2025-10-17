'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayFasteningSystemMaintenanceAndReplacementForm from './railway-fastening-system-maintenance-and-replacement-form';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayFasteningSystemMaintenanceAndReplacement } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';

interface RailwayFasteningSystemMaintenanceAndReplacementDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayFasteningSystemMaintenanceAndReplacement: RailwayFasteningSystemMaintenanceAndReplacement;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemMaintenanceAndReplacementDrawer = ({
  open,
  toggle,
  refetch,
  railwayFasteningSystemMaintenanceAndReplacement,
  projectId,
  otherSubMenu
}: RailwayFasteningSystemMaintenanceAndReplacementDrawerProps) => {
  const isEdit = Boolean(railwayFasteningSystemMaintenanceAndReplacement?.id);
  const [inspectionReportsFile, setInspectionReportsFile] = useState<File | null>(null);
  const [replacementHistoryFile, setReplacementHistoryFile] = useState<File | null>(null);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    scheduled_maintenance_activities: yup.string().nullable(),
    recent_maintenance_records_and_dates: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwayFasteningSystemMaintenanceAndReplacement = async (
    body: IApiPayload<RailwayFasteningSystemMaintenanceAndReplacement>
  ) => projectOtherApiSecondService<RailwayFasteningSystemMaintenanceAndReplacement>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwayFasteningSystemMaintenanceAndReplacement = async (body: IApiPayload<RailwayFasteningSystemMaintenanceAndReplacement>) =>
    projectOtherApiSecondService<RailwayFasteningSystemMaintenanceAndReplacement>().update(
      otherSubMenu?.apiRoute || '',
      railwayFasteningSystemMaintenanceAndReplacement.id as string,
      body
    );

  const getPayload = (
    values: RailwayFasteningSystemMaintenanceAndReplacement
  ): IApiPayload<RailwayFasteningSystemMaintenanceAndReplacement> => {
    const files: File[] = [];
    if (inspectionReportsFile) {
      files.push(inspectionReportsFile);
    }
    if (replacementHistoryFile) {
      files.push(replacementHistoryFile);
    }
    return {
      data: {
        ...values,
        project_id: projectId
      },
      files: files
    };
  };

  const handleClose = () => {
    setInspectionReportsFile(null);
    setReplacementHistoryFile(null);
    setUploadableFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayFasteningSystemMaintenanceAndReplacement>) => {
    try {
      console.log('API Response:', response);
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      if (uploadableFile && otherSubMenu?.fileType) {
        console.log('Uploading main file for record ID:', recordId);
        await uploadFile(uploadableFile, otherSubMenu.fileType, recordId, '', '');
      }

      if (inspectionReportsFile) {
        console.log('Uploading inspection reports file for record ID:', recordId);
        await uploadFile(inspectionReportsFile, 'INSPECTION_REPORTS_AND_FINDINGS', recordId, '', '');
      }

      if (replacementHistoryFile) {
        console.log('Uploading replacement history file for record ID:', recordId);
        await uploadFile(replacementHistoryFile, 'FASTENING_SYSTEM_REPLACEMENT_HISTORY', recordId, '', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-fastening-system-maintenance-and-replacement.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-fastening-system-maintenance-and-replacement.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayFasteningSystemMaintenanceAndReplacement
          }}
          createActionFunc={
            isEdit ? editRailwayFasteningSystemMaintenanceAndReplacement : createRailwayFasteningSystemMaintenanceAndReplacement
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayFasteningSystemMaintenanceAndReplacement>) => (
            <RailwayFasteningSystemMaintenanceAndReplacementForm
              formik={formik}
              file={uploadableFile}
              onFileChange={setUploadableFile}
              inspectionReportsFile={inspectionReportsFile}
              onInspectionReportsFileChange={setInspectionReportsFile}
              replacementHistoryFile={replacementHistoryFile}
              onReplacementHistoryFileChange={setReplacementHistoryFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayFasteningSystemMaintenanceAndReplacementDrawer;
