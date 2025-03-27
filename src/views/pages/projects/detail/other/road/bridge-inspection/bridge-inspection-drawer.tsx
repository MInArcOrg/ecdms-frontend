'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeInspectionForm from './bridge-inspection-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { BridgeInspection } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface BridgeInspectionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeInspection: BridgeInspection;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const BridgeInspectionDrawer = (props: BridgeInspectionDrawerType) => {
  const { open, toggle, refetch, bridgeInspection, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bridge_name: yup.string().required('Bridge name is required'),
    bridge_part_defect_id: yup.string().required('Bridge part defect is required'),
    damage_type_id: yup.string().required('Damage type is required'),
    damage_condition_id: yup.string().required('Damage condition is required'),
    hydrology_defect_id: yup.string().required('Hydrology defect is required')
  });

  const isEdit = Boolean(bridgeInspection?.id);

  const createBridgeInspection = async (body: IApiPayload<BridgeInspection>) =>
    projectOtherApiSecondService<BridgeInspection>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeInspection = async (body: IApiPayload<BridgeInspection>) =>
    projectOtherApiSecondService<BridgeInspection>().update(otherSubMenu?.apiRoute || '', bridgeInspection?.id || '', body);

  const getPayload = (values: BridgeInspection) => ({
    data: {
      project_id: projectId,
      name: values.name,
      bridge_name: values.name,
      bridge_part_defect_id: values.bridge_part_defect_id,
      damage_type_id: values.damage_type_id,
      damage_condition_id: values.damage_condition_id,
      hydrology_defect_id: values.hydrology_defect_id,
      maintenance_action: values.maintenance_action,
      bridge_history: values.bridge_history,
      inspector_remark: values.inspector_remark,
      id: bridgeInspection?.id,
      created_at: bridgeInspection?.created_at,
      updated_at: bridgeInspection?.updated_at
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeInspection>, payload: IApiPayload<BridgeInspection>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.bridgeInspection, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-inspection.${isEdit ? `edit-bridge-inspection` : `create-bridge-inspection`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-inspection.${isEdit ? `edit-bridge-inspection` : `create-bridge-inspection`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeInspection
          }}
          createActionFunc={isEdit ? editBridgeInspection : createBridgeInspection}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeInspection>) => {
            return <BridgeInspectionForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeInspectionDrawer;
