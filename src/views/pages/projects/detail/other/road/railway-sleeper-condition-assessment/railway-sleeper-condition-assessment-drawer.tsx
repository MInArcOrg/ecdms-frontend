import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwaySleeperConditionAssessment } from 'src/types/project/other';
import RailwaySleeperConditionAssessmentForm from './railway-sleeper-condition-assessment-form';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { phoneRule } from 'src/utils/validator/phone';

interface RailwaySleeperConditionAssessmentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySleeperConditionAssessmentDrawer = ({
  open,
  toggle,
  refetch,
  railwaySleeperConditionAssessment,
  projectId,
  otherSubMenu
}: RailwaySleeperConditionAssessmentDrawerProps) => {
  const isEdit = Boolean(railwaySleeperConditionAssessment?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    inspection_dates: yup
      .date()
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr)),
    sleeper_condition_rating: yup.string().nullable(),
    defect_presence: yup.string().nullable(),
    sleeper_stability_and_alignment: yup.string().nullable(),
    sleepers_required_number: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    supplier_name: yup.string().nullable(),
    supplier_phone: phoneRule.nullable(),
    remark: yup.string().nullable()
  });

  const createRailwaySleeperConditionAssessment = async (body: IApiPayload<RailwaySleeperConditionAssessment>) =>
    projectOtherApiSecondService<RailwaySleeperConditionAssessment>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwaySleeperConditionAssessment = async (body: IApiPayload<RailwaySleeperConditionAssessment>) =>
    projectOtherApiSecondService<RailwaySleeperConditionAssessment>().update(
      otherSubMenu?.apiRoute || '',
      railwaySleeperConditionAssessment.id,
      body
    );

  const getPayload = (values: RailwaySleeperConditionAssessment): IApiPayload<RailwaySleeperConditionAssessment> => ({
    data: {
      ...values,
      project_id: projectId,
      inspection_dates: convertDateToLocaleDate(values.inspection_dates)
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySleeperConditionAssessment>,
    payload: IApiPayload<RailwaySleeperConditionAssessment>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sleeper-condition-assessment.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sleeper-condition-assessment.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySleeperConditionAssessment,
            inspection_dates: formatInitialDateDate(railwaySleeperConditionAssessment?.inspection_dates)
          }}
          createActionFunc={isEdit ? editRailwaySleeperConditionAssessment : createRailwaySleeperConditionAssessment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySleeperConditionAssessment>) => <RailwaySleeperConditionAssessmentForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySleeperConditionAssessmentDrawer;
