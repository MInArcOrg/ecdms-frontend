'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SubstationTransformerAndSwitchgearDataForm from './substation-transformer-and-switchgear-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { SubstationTransformerAndSwitchgearData, TransmissionLine } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface SubstationTransformerAndSwitchgearDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
  transmissionLines: TransmissionLine[];
}

const SubstationTransformerAndSwitchgearDataDrawer = (props: SubstationTransformerAndSwitchgearDataDrawerType) => {
  const { open, toggle, refetch, substationTransformerAndSwitchgearData, projectId, otherSubMenu, transmissionLines } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    transmission_line_id: yup.string().required('Transmission Line is required'),
    name: yup.string().required('Name is required'),
    transformers_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    transformer_type: yup.string().nullable(),
    transformer_capacity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    input_voltage_level: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    output_voltage_level: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    switchgear_type_id: yup.string().required('Switchgear Type is required'),
    circuit_breaker_type_id: yup.string().required('Circuit Breaker Type is required'),
    other_equipment: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(substationTransformerAndSwitchgearData?.id);

  const createSubstationTransformerAndSwitchgearData = async (body: IApiPayload<SubstationTransformerAndSwitchgearData>) =>
    projectOtherApiSecondService<SubstationTransformerAndSwitchgearData>().create(otherSubMenu?.apiRoute || '', body);

  const editSubstationTransformerAndSwitchgearData = async (body: IApiPayload<SubstationTransformerAndSwitchgearData>) =>
    projectOtherApiSecondService<SubstationTransformerAndSwitchgearData>().update(
      otherSubMenu?.apiRoute || '',
      substationTransformerAndSwitchgearData?.id || '',
      body
    );

  const getPayload = (values: SubstationTransformerAndSwitchgearData) => ({
    data: {
      project_id: projectId,
      transmission_line_id: values.transmission_line_id,
      name: values.name,
      transformers_number: values.transformers_number,
      transformer_type: values.transformer_type,
      transformer_capacity: values.transformer_capacity,
      input_voltage_level: values.input_voltage_level,
      output_voltage_level: values.output_voltage_level,
      switchgear_type_id: values.switchgear_type_id,
      circuit_breaker_type_id: values.circuit_breaker_type_id,
      other_equipment: values.other_equipment,
      remark: values.remark,
      id: substationTransformerAndSwitchgearData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<SubstationTransformerAndSwitchgearData>,
    payload: IApiPayload<SubstationTransformerAndSwitchgearData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.SUBSTATION_TRANSFORMER_AND_SWITCH_GEAR_DATA,
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
      title={`project.other.substation-transformer-and-switchgear-data.${
        isEdit ? `edit-substation-transformer-and-switchgear-data` : `create-substation-transformer-and-switchgear-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.substation-transformer-and-switchgear-data.${
            isEdit ? `edit-substation-transformer-and-switchgear-data` : `create-substation-transformer-and-switchgear-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...substationTransformerAndSwitchgearData
          }}
          createActionFunc={isEdit ? editSubstationTransformerAndSwitchgearData : createSubstationTransformerAndSwitchgearData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SubstationTransformerAndSwitchgearData>) => {
            return (
              <SubstationTransformerAndSwitchgearDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                transmissionLines={transmissionLines}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SubstationTransformerAndSwitchgearDataDrawer;
