'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SolarPanelForm from './solar-panel-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { SolarPanel } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface SolarPanelDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  solarPanel: SolarPanel;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const SolarPanelDrawer = (props: SolarPanelDrawerType) => {
  const { open, toggle, refetch, solarPanel, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    manufacturer: yup.string().max(100).nullable(),
    model: yup.string().max(100).nullable(),
    solar_panel_type_id: yup.string().uuid().required('Solar panel type is required'),
    solar_panels_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    each_solar_panel_capacity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    inverter_manufacturer: yup.string().max(100).nullable(),
    inverter_model: yup.string().max(100).nullable(),
    inverters_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    other_equipment: yup.string().max(100).nullable(),
    remark: yup.string().max(100).nullable()
  });

  const isEdit = Boolean(solarPanel?.id);

  const createSolarPanel = async (body: IApiPayload<SolarPanel>) =>
    projectOtherApiSecondService<SolarPanel>().create(otherSubMenu?.apiRoute || '', body);

  const editSolarPanel = async (body: IApiPayload<SolarPanel>) =>
    projectOtherApiSecondService<SolarPanel>().update(otherSubMenu?.apiRoute || '', solarPanel?.id || '', body);

  const getPayload = (values: SolarPanel) => ({
    data: {
      project_id: projectId,
      manufacturer: values.manufacturer,
      model: values.model,
      solar_panel_type_id: values.solar_panel_type_id,
      solar_panels_number: values.solar_panels_number,
      each_solar_panel_capacity: values.each_solar_panel_capacity,
      inverter_manufacturer: values.inverter_manufacturer,
      inverter_model: values.inverter_model,
      inverters_number: values.inverters_number,
      other_equipment: values.other_equipment,
      remark: values.remark,
      id: solarPanel?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SolarPanel>, payload: IApiPayload<SolarPanel>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.solarPanel, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.solar-panel.${isEdit ? `edit-solar-panel` : `create-solar-panel`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.solar-panel.${isEdit ? `edit-solar-panel` : `create-solar-panel`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...solarPanel
          }}
          createActionFunc={isEdit ? editSolarPanel : createSolarPanel}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SolarPanel>) => {
            return <SolarPanelForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SolarPanelDrawer;
