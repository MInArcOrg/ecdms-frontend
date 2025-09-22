'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayCommunicationSystemForm from './railway-communication-system-form';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayCommunicationSystem } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';

interface RailwayCommunicationSystemDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayCommunicationSystem: RailwayCommunicationSystem;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayCommunicationSystemDrawer = ({
  open,
  toggle,
  refetch,
  railwayCommunicationSystem,
  projectId,
  otherSubMenu
}: RailwayCommunicationSystemDrawerProps) => {
  const isEdit = Boolean(railwayCommunicationSystem?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    communication_system_type: yup.string().nullable(),
    communication_system_protocols_or_standards: yup.string().nullable(),
    communication_system_components: yup.string().nullable(),
    signaling_system_components: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwayCommunicationSystem = async (
    body: IApiPayload<RailwayCommunicationSystem>
  ) =>
    projectOtherApiSecondService<RailwayCommunicationSystem>().create(
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwayCommunicationSystem = async (
    body: IApiPayload<RailwayCommunicationSystem>
  ) =>
    projectOtherApiSecondService<RailwayCommunicationSystem>().update(
      otherSubMenu?.apiRoute || '',
      railwayCommunicationSystem.id as string,
      body
    );

  const getPayload = (
    values: RailwayCommunicationSystem
  ): IApiPayload<RailwayCommunicationSystem> => {
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

  const onActionSuccess = async (response: IApiResponse<RailwayCommunicationSystem>) => {
    try {
      console.log('API Response:', response);
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;


      if (defaultFile) {


        await uploadFile(defaultFile, otherSubMenu?.fileType || '', recordId, '', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-communication-system.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-communication-system.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayCommunicationSystem}
          createActionFunc={
            isEdit
              ? editRailwayCommunicationSystem
              : createRailwayCommunicationSystem
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayCommunicationSystem>) => (
            <RailwayCommunicationSystemForm
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

export default RailwayCommunicationSystemDrawer;