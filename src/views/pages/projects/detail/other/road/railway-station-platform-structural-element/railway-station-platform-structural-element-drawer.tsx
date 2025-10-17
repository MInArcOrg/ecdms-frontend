'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayStationPlatformStructuralElement } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayStationPlatformStructuralElementForm from './railway-station-platform-structural-element-form';

interface RailwayStationPlatformStructuralElementDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformStructuralElement: RailwayStationPlatformStructuralElement;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformStructuralElementDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformStructuralElement,
  projectId,
  otherSubMenu
}: RailwayStationPlatformStructuralElementDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformStructuralElement?.id);
  // Primary file upload state
  const [defaultFile, setDefaultFile] = useState<File | null>(null);
  // Secondary file upload state for CANOPY_OR_SHELTER_DETAIL
  const [canopyDetailFile, setCanopyDetailFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup.string().required('Platform Layout ID is required'),
    materials_used: yup.string().nullable(),
    roofing_type_and_design: yup.string().nullable(),
    lighting_fixtures: yup.boolean().nullable(),
    accessibility_features: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createStructuralElement = async (body: IApiPayload<RailwayStationPlatformStructuralElement>) =>
    projectOtherApiSecondService<RailwayStationPlatformStructuralElement>().create(otherSubMenu?.apiRoute || '', body);

  const editStructuralElement = async (body: IApiPayload<RailwayStationPlatformStructuralElement>) =>
    projectOtherApiSecondService<RailwayStationPlatformStructuralElement>().update(
      otherSubMenu?.apiRoute || '',
      railwayStationPlatformStructuralElement.id as string,
      body
    );

  const getPayload = (values: RailwayStationPlatformStructuralElement): IApiPayload<RailwayStationPlatformStructuralElement> => {
    return {
      data: {
        ...values,
        project_id: projectId
      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    setCanopyDetailFile(null); // Reset secondary file state
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayStationPlatformStructuralElement>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const primaryFileType = otherSubMenu?.fileType || 'RAILWAY_STATION_PLATFORM_STRUCTURAL_ELEMENT';

      // 1. Upload Primary Document (e.g., General Structural Document)
      if (defaultFile) {
        await uploadFile(defaultFile, primaryFileType, recordId, 'structural_element_document', '');
      }

      // 2. Upload Secondary Document (CANOPY_OR_SHELTER_DETAIL)
      if (canopyDetailFile) {
        await uploadFile(
          canopyDetailFile,
          'CANOPY_OR_SHELTER_DETAIL', // Specific file type for this upload
          recordId,
          'canopy_or_shelter_detail_document',
          ''
        );
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-station-platform-structural-element.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-structural-element.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformStructuralElement}
          createActionFunc={isEdit ? editStructuralElement : createStructuralElement}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayStationPlatformStructuralElement>) => (
            <RailwayStationPlatformStructuralElementForm
              formik={formik}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
              canopyDetailFile={canopyDetailFile} // Pass secondary file state
              onCanopyDetailFileChange={setCanopyDetailFile} // Pass secondary file handler
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayStationPlatformStructuralElementDrawer;
