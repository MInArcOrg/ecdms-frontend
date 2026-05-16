'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';
import GeothermalPowerWellForm from './geothermal-power-well-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { GeothermalPowerWell } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface GeothermalPowerWellDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  geothermalPowerWell: GeothermalPowerWell;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const GeothermalPowerWellDrawer = (props: GeothermalPowerWellDrawerType) => {
  const { open, toggle, refetch, geothermalPowerWell, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    wells_name: yup.string().max(100).required(),
    wells_number: nullableIntegerSchema().required('Wells number is required.'),
    depth: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    well_diameter: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    drilling_period: yup.string().nullable(),
    temperature_at_bottom_hole: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    plant_life: nullableIntegerSchema(),
    remark: yup.string().max(100).nullable()
  });

  const isEdit = Boolean(geothermalPowerWell?.id);

  const createGeothermalPowerWell = async (body: IApiPayload<GeothermalPowerWell>) =>
    projectOtherApiSecondService<GeothermalPowerWell>().create(otherSubMenu?.apiRoute || '', body);

  const editGeothermalPowerWell = async (body: IApiPayload<GeothermalPowerWell>) =>
    projectOtherApiSecondService<GeothermalPowerWell>().update(otherSubMenu?.apiRoute || '', geothermalPowerWell?.id || '', body);

  const getPayload = (values: GeothermalPowerWell) => ({
    data: {
      project_id: projectId,
      wells_name: values.wells_name,
      wells_number: values.wells_number,
      depth: values.depth,
      well_diameter: values.well_diameter,
      drilling_period: values.drilling_period,
      temperature_at_bottom_hole: values.temperature_at_bottom_hole,
      plant_life: values.plant_life,
      remark: values.remark,
      id: geothermalPowerWell?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<GeothermalPowerWell>, payload: IApiPayload<GeothermalPowerWell>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.geothermalPowerWell, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.geothermal-power-well.${isEdit ? `edit-geothermal-power-well` : `create-geothermal-power-well`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.geothermal-power-well.${isEdit ? `edit-geothermal-power-well` : `create-geothermal-power-well`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...geothermalPowerWell
          }}
          createActionFunc={isEdit ? editGeothermalPowerWell : createGeothermalPowerWell}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GeothermalPowerWell>) => {
            return <GeothermalPowerWellForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GeothermalPowerWellDrawer;
