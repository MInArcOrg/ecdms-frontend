'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SubstationLayoutAndCommunicationDataForm from './substation-layout-and-communication-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { SubstationLayoutAndCommunicationData } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface SubstationLayoutAndCommunicationDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
  substations: any[];
}

const SubstationLayoutAndCommunicationDataDrawer = (props: SubstationLayoutAndCommunicationDataDrawerType) => {
  const { open, toggle, refetch, substationLayoutAndCommunicationData, projectId, otherSubMenu, substations } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    substation_id: yup.string().required('Substation is required'),
    name: yup.string().required('Name is required'),
    substation_layout: yup.string().nullable(),
    equipped_with_standby_diesel_generator: yup.string().nullable(),
    substation_busbar_type: yup.string().nullable(),
    substation_communication_system_id: yup.string().required('Communication System is required'),
    scada_system: yup.boolean().nullable(),
    substation_grounding_system_id: yup.string().required('Grounding System is required'),
    substation_altitude_level: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(substationLayoutAndCommunicationData?.id);

  const createSubstationLayoutAndCommunicationData = async (body: IApiPayload<SubstationLayoutAndCommunicationData>) =>
    projectOtherApiSecondService<SubstationLayoutAndCommunicationData>().create(otherSubMenu?.apiRoute || '', body);

  const editSubstationLayoutAndCommunicationData = async (body: IApiPayload<SubstationLayoutAndCommunicationData>) =>
    projectOtherApiSecondService<SubstationLayoutAndCommunicationData>().update(
      otherSubMenu?.apiRoute || '',
      substationLayoutAndCommunicationData?.id || '',
      body
    );

  const getPayload = (values: SubstationLayoutAndCommunicationData) => ({
    data: {
      project_id: projectId,
      substation_id: values.substation_id,
      name: values.name,
      substation_layout: values.substation_layout,
      equipped_with_standby_diesel_generator: values.equipped_with_standby_diesel_generator,
      substation_busbar_type: values.substation_busbar_type,
      substation_communication_system_id: values.substation_communication_system_id,
      scada_system: values.scada_system,
      substation_grounding_system_id: values.substation_grounding_system_id,
      substation_altitude_level: values.substation_altitude_level,
      remark: values.remark,
      id: substationLayoutAndCommunicationData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<SubstationLayoutAndCommunicationData>,
    payload: IApiPayload<SubstationLayoutAndCommunicationData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.substation_layout_and_communication_data,
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
      title={`project.other.substation-layout-and-communication-data.${
        isEdit ? `edit-substation-layout-and-communication-data` : `create-substation-layout-and-communication-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.substation-layout-and-communication-data.${
            isEdit ? `edit-substation-layout-and-communication-data` : `create-substation-layout-and-communication-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...substationLayoutAndCommunicationData
          }}
          createActionFunc={isEdit ? editSubstationLayoutAndCommunicationData : createSubstationLayoutAndCommunicationData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SubstationLayoutAndCommunicationData>) => {
            return (
              <SubstationLayoutAndCommunicationDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                substations={substations}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SubstationLayoutAndCommunicationDataDrawer;
