import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwaySleeperEnvironmentalAndOtherFactorForm from './railway-sleeper-environmental-and-other-factor-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwaySleeperEnvironmentalAndOtherFactor } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { uploadFile } from 'src/services/utils/file-utils';
import { useState } from 'react';

interface RailwaySleeperEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySleeperEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwaySleeperEnvironmentalAndOtherFactor,
  projectId,
  otherSubMenu
}: RailwaySleeperEnvironmentalAndOtherFactorDrawerProps) => {
  const isEdit = Boolean(railwaySleeperEnvironmentalAndOtherFactor?.project_id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const [sleeperConditionPhotoFile, setSleeperConditionPhotoFile] = useState<File | null>(null); // New state for secondary upload

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    environmental_compliance_measures: yup.string().nullable(),
    environmental_impact_assessment: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwaySleeperEnvironmentalAndOtherFactor = async (body: IApiPayload<RailwaySleeperEnvironmentalAndOtherFactor>) =>
    projectOtherApiSecondService<RailwaySleeperEnvironmentalAndOtherFactor>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwaySleeperEnvironmentalAndOtherFactor = async (body: IApiPayload<RailwaySleeperEnvironmentalAndOtherFactor>) =>
    projectOtherApiSecondService<RailwaySleeperEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || '',
      railwaySleeperEnvironmentalAndOtherFactor.id,
      body
    );

  const getPayload = (values: RailwaySleeperEnvironmentalAndOtherFactor): IApiPayload<RailwaySleeperEnvironmentalAndOtherFactor> => {
    const files: File[] = [];
    if (uploadableFile) {
      files.push(uploadableFile);
    }
    // Only add if different from the first or if there's no first file already
    if (sleeperConditionPhotoFile && sleeperConditionPhotoFile !== uploadableFile) {
      files.push(sleeperConditionPhotoFile);
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
    setUploadableFile(null);
    setSleeperConditionPhotoFile(null); // Reset secondary file on close
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwaySleeperEnvironmentalAndOtherFactor>,
    payload: IApiPayload<RailwaySleeperEnvironmentalAndOtherFactor>
  ) => {
    try {
      console.log('API Response:', response);
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // Upload primary file if exists
      if (uploadableFile) {
        console.log('Uploading primary file for record ID:', recordId);
        await uploadFile(uploadableFile, otherSubMenu?.fileType || '', recordId, '', '');
      }

      // Upload secondary file if exists
      if (sleeperConditionPhotoFile) {
        console.log('Uploading SLEEPER_CONDITION_PHOTO file for record ID:', recordId);
        await uploadFile(sleeperConditionPhotoFile, 'SLEEPER_CONDITION_PHOTO', recordId, '', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed:', error);
      // Handle error appropriately
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sleeper-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sleeper-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySleeperEnvironmentalAndOtherFactor
          }}
          createActionFunc={isEdit ? editRailwaySleeperEnvironmentalAndOtherFactor : createRailwaySleeperEnvironmentalAndOtherFactor}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySleeperEnvironmentalAndOtherFactor>) => (
            <RailwaySleeperEnvironmentalAndOtherFactorForm
              formik={formik}
              onFileChange={setUploadableFile}
              file={uploadableFile}
              onSleeperConditionPhotoFileChange={setSleeperConditionPhotoFile} // Pass secondary file handler
              sleeperConditionPhotoFile={sleeperConditionPhotoFile} // Pass secondary file state
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySleeperEnvironmentalAndOtherFactorDrawer;
