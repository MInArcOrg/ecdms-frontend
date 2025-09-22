'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwaySignalingSystemForm from './railway-signaling-system-form';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwaySignalingSystem } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';

interface RailwaySignalingSystemDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySignalingSystem: RailwaySignalingSystem;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySignalingSystemDrawer = ({
  open,
  toggle,
  refetch,
  railwaySignalingSystem,
  projectId,
  otherSubMenu
}: RailwaySignalingSystemDrawerProps) => {
  const isEdit = Boolean(railwaySignalingSystem?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    signaling_system_type: yup.string().nullable(),
    signaling_system_manufacturer_or_supplier_name: yup.string().nullable(),
    signaling_system_manufacturer_or_supplier_phone: yup.string().nullable(),
    signaling_system_components: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwaySignalingSystem = async (
    body: IApiPayload<RailwaySignalingSystem>
  ) =>
    projectOtherApiSecondService<RailwaySignalingSystem>().create(
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwaySignalingSystem = async (
    body: IApiPayload<RailwaySignalingSystem>
  ) =>
    projectOtherApiSecondService<RailwaySignalingSystem>().update(
      otherSubMenu?.apiRoute || '',
      railwaySignalingSystem.id as string,
      body
    );

  const getPayload = (
    values: RailwaySignalingSystem
  ): IApiPayload<RailwaySignalingSystem> => {
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
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwaySignalingSystem>) => {
    try {
      console.log('API Response:', response);
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;



      if (defaultFile) {


        await uploadFile(defaultFile, otherSubMenu?.id || '', recordId, '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-signaling-system.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-signaling-system.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwaySignalingSystem}
          createActionFunc={
            isEdit
              ? editRailwaySignalingSystem
              : createRailwaySignalingSystem
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySignalingSystem>) => (
            <RailwaySignalingSystemForm
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

export default RailwaySignalingSystemDrawer;