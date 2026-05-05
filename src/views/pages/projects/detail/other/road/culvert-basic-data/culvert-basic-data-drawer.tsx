import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import CulvertBasicDataForm from './culvert-basic-data-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { CulvertBasicData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';

interface CulvertBasicDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  culvertBasicData: CulvertBasicData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const CulvertBasicDataDrawer = (props: CulvertBasicDataDrawerType) => {
  const { open, toggle, refetch, culvertBasicData, projectId, otherSubMenu } = props;

  const currentYear = new Date().getFullYear();
  const numberField = nullableNumberSchema();
  const integerField = nullableIntegerSchema();

  const validationSchema = yup.object().shape({
    parent_id: yup.string().length(36).nullable(),
    project_id: yup.string().length(36).required('Project is required'),
    name: yup.string().max(255).required('Name is required'),
    road_segment_id: yup.string().length(36).nullable(),
    culvert_number: limitNumberDigits(integerField.min(0, 'Culvert number must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    culvert_coordinate_x: limitNumberDigits(numberField, { maxIntegerDigits: 12, maxDecimalPlaces: 6 }),
    culvert_coordinate_y: limitNumberDigits(numberField, { maxIntegerDigits: 12, maxDecimalPlaces: 6 }),
    area_topography_id: yup.string().length(36).required('Area topography is required'),
    highest_water_level: limitNumberDigits(numberField, { maxIntegerDigits: 6, maxDecimalPlaces: 2 }),
    lowest_water_level: limitNumberDigits(numberField, { maxIntegerDigits: 6, maxDecimalPlaces: 2 }),
    construction_year: limitNumberDigits(
      integerField
        .min(1900, 'Construction year must be greater than or equal to 1900')
        .max(currentYear, `Construction year must be less than or equal to ${currentYear}`),
      { maxIntegerDigits: 4, maxDecimalPlaces: 0 }
    ),
    contractor: yup.string().max(255).nullable(),
    designer: yup.string().max(255).nullable(),
    culvert_cost: limitNumberDigits(numberField.min(0, 'Culvert cost must be greater than or equal to 0'), {
      maxIntegerDigits: 15,
      maxDecimalPlaces: 2
    }),
    detour_possibility: yup.boolean().nullable(),
    road_allignment: yup.string().max(255).nullable(),
    altitude: limitNumberDigits(numberField, { maxIntegerDigits: 6, maxDecimalPlaces: 2 })
  });

  const isEdit = Boolean(culvertBasicData?.id);

  const createCulvertBasicData = async (body: IApiPayload<CulvertBasicData>) =>
    projectOtherApiSecondService<CulvertBasicData>().create(otherSubMenu?.apiRoute || '', body);

  const editCulvertBasicData = async (body: IApiPayload<CulvertBasicData>) =>
    projectOtherApiSecondService<CulvertBasicData>().update(otherSubMenu?.apiRoute || '', culvertBasicData?.id || '', body);

  const getPayload = (values: CulvertBasicData) => ({
    data: {
      parent_id: values.parent_id,
      project_id: projectId,
      name: values.name,
      road_segment_id: values.road_segment_id,
      culvert_number: values.culvert_number,
      culvert_coordinate_x: values.culvert_coordinate_x,
      culvert_coordinate_y: values.culvert_coordinate_y,
      area_topography_id: values.area_topography_id,
      highest_water_level: values.highest_water_level,
      lowest_water_level: values.lowest_water_level,
      construction_year: values.construction_year,
      contractor: values.contractor,
      designer: values.designer,
      culvert_cost: values.culvert_cost,
      detour_possibility: values.detour_possibility,
      road_allignment: values.road_allignment,
      altitude: values.altitude,
      id: culvertBasicData?.id,
      created_at: values.created_at,
      updated_at: values.updated_at
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<CulvertBasicData>, payload: IApiPayload<CulvertBasicData>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.culvert-basic-data.${isEdit ? `edit-culvert-basic-data` : `create-culvert-basic-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-basic-data.${isEdit ? `edit-culvert-basic-data` : `create-culvert-basic-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...culvertBasicData,
            road_segment_id: culvertBasicData?.road_segment_id || culvertBasicData?.roadSegment?.id,
            area_topography_id: culvertBasicData?.area_topography_id || culvertBasicData?.areaTopography?.id||'',
            road_allignment: (culvertBasicData as any)?.road_allignment || (culvertBasicData as any)?.road_alignment,
            project_id: projectId
          }}
          createActionFunc={isEdit ? editCulvertBasicData : createCulvertBasicData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertBasicData>) => {
            return <CulvertBasicDataForm projectId={projectId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default CulvertBasicDataDrawer;
