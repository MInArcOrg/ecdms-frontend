'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { BridgeComponentAndAncillaries } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeComponentsAncillariesForm from './bridge-components-ancillaries-form';

interface BridgeComponentsAncillariesDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  item: BridgeComponentAndAncillaries;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeComponentsAncillariesDrawer = (props: BridgeComponentsAncillariesDrawerType) => {
  const { open, toggle, refetch, item, projectId, otherSubMenu } = props;
  const [uploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    bridge_id: yup.string().uuid().required('Bridge is required'),
    expansion_joint_type_id: yup.string().uuid().required('Expansion joint type is required'),
    guard_railing_type_id: yup.string().uuid().required('Guard railing type is required'),
    abutment_bearing_type_id: yup.string().required('Abutment bearing type is required'),
    piers_bearing_type_id: yup.string().required('Piers bearing type is required'),
    surface_type_id: yup.string().uuid().required('Surface type is required'),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(item?.id);

  const createBridgeComponentsAncillaries = async (body: IApiPayload<BridgeComponentAndAncillaries>) =>
    projectOtherApiSecondService<BridgeComponentAndAncillaries>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeComponentsAncillaries = async (body: IApiPayload<BridgeComponentAndAncillaries>) =>
    projectOtherApiSecondService<BridgeComponentAndAncillaries>().update(otherSubMenu?.apiRoute || '', item?.id || '', body);

  const getPayload = (values: BridgeComponentAndAncillaries) => ({
    data: {
      project_id: projectId,
      bridge_id: values.bridge_id,
      expansion_joint_type_id: values.expansion_joint_type_id,
      guard_railing_type_id: values.guard_railing_type_id,
      abutment_bearing_type_id: values.abutment_bearing_type_id,
      piers_bearing_type_id: values.piers_bearing_type_id,
      surface_type_id: values.surface_type_id,
      remark: values.remark,
      id: item?.id,
      created_at: item?.created_at,
      updated_at: item?.updated_at
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (_response: IApiResponse<BridgeComponentAndAncillaries>, _payload: IApiPayload<BridgeComponentAndAncillaries>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={isEdit ? 'Edit Bridge Components & Ancillaries' : 'Create Bridge Components & Ancillaries'}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={isEdit ? 'Edit Bridge Components & Ancillaries' : 'Create Bridge Components & Ancillaries'}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...item,
            project_id: projectId,
            bridge_id: item?.bridge_id || item?.bridgeBasicData?.id || '',
            expansion_joint_type_id: item?.expansion_joint_type_id || item?.expansionJointType?.id || '',
            guard_railing_type_id: item?.guard_railing_type_id || item?.guardRailType?.id || '',
            surface_type_id: item?.surface_type_id || item?.surfaceType?.id || ''
          }}
          createActionFunc={isEdit ? editBridgeComponentsAncillaries : createBridgeComponentsAncillaries}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeComponentAndAncillaries>) => {
            return <BridgeComponentsAncillariesForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeComponentsAncillariesDrawer;

