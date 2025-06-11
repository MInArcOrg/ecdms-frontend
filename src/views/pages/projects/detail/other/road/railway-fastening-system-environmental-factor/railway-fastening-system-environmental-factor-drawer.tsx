'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayFasteningSystemEnvironmentalFactorForm from './railway-fastening-system-environmental-factor-form';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayFasteningSystemEnvironmentalFactor } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';

interface RailwayFasteningSystemEnvironmentalFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayFasteningSystemEnvironmentalFactor: RailwayFasteningSystemEnvironmentalFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemEnvironmentalFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwayFasteningSystemEnvironmentalFactor,
  projectId,
  otherSubMenu
}: RailwayFasteningSystemEnvironmentalFactorDrawerProps) => {
  const isEdit = Boolean(railwayFasteningSystemEnvironmentalFactor?.id);
  const [fasteningSystemConditionDocumentationFile, setFasteningSystemConditionDocumentationFile] = useState<File | null>(null);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    environmental_compliance_measures: yup.string().nullable(),
    environmental_impact_assessment: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwayFasteningSystemEnvironmentalFactor = async (
    body: IApiPayload<RailwayFasteningSystemEnvironmentalFactor>
  ) =>
    projectOtherApiSecondService<RailwayFasteningSystemEnvironmentalFactor>().create(
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwayFasteningSystemEnvironmentalFactor = async (
    body: IApiPayload<RailwayFasteningSystemEnvironmentalFactor>
  ) =>
    projectOtherApiSecondService<RailwayFasteningSystemEnvironmentalFactor>().update(
      otherSubMenu?.apiRoute || '',
      railwayFasteningSystemEnvironmentalFactor.id as string,
      body
    );

  const getPayload = (
    values: RailwayFasteningSystemEnvironmentalFactor
  ): IApiPayload<RailwayFasteningSystemEnvironmentalFactor> => {
    return {
      data: {
        ...values,
        project_id: projectId
      },
      files: []
    };
  };

  const handleClose = () => {
    setFasteningSystemConditionDocumentationFile(null);
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayFasteningSystemEnvironmentalFactor>) => {
    try {
      console.log('API Response:', response);
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      if (fasteningSystemConditionDocumentationFile) {
        console.log('Uploading fastening system condition documentation file for record ID:', recordId);
        await uploadFile(fasteningSystemConditionDocumentationFile, 'FASTENING_SYSTEM_CONDITION_DOCUMENTATION', recordId, '', '');
      }

      if (defaultFile) {
        console.log('Uploading default file for record ID:', recordId);
        await uploadFile(defaultFile, otherSubMenu?.fileType || "", recordId, '', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-fastening-system-environmental-factor.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-fastening-system-environmental-factor.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayFasteningSystemEnvironmentalFactor}
          createActionFunc={
            isEdit
              ? editRailwayFasteningSystemEnvironmentalFactor
              : createRailwayFasteningSystemEnvironmentalFactor
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayFasteningSystemEnvironmentalFactor>) => (
            <RailwayFasteningSystemEnvironmentalFactorForm
              formik={formik}
              fasteningSystemConditionDocumentationFile={fasteningSystemConditionDocumentationFile}
              onFasteningSystemConditionDocumentationFileChange={setFasteningSystemConditionDocumentationFile}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayFasteningSystemEnvironmentalFactorDrawer;