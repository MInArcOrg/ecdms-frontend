import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwaySleeperMaintenanceAndReplacementForm from './railway-sleeper-maintenance-and-replacement-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwaySleeperMaintenanceAndReplacement } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { pastDateRule } from 'src/utils/validator/age';

interface RailwaySleeperMaintenanceAndReplacementDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySleeperMaintenanceAndReplacementDrawer = ({
  open,
  toggle,
  refetch,
  railwaySleeperMaintenanceAndReplacement,
  projectId,
  otherSubMenu
}: RailwaySleeperMaintenanceAndReplacementDrawerProps) => {
  const isEdit = Boolean(railwaySleeperMaintenanceAndReplacement?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    scheduled_maintenance_activities: yup.string().nullable(),
    recent_maintenance_date: pastDateRule().nullable(),
    inspection_reports: yup.string().nullable(),
    sleeper_replacement_history: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwaySleeperMaintenanceAndReplacement = async (body: IApiPayload<RailwaySleeperMaintenanceAndReplacement>) =>
    projectOtherApiSecondService<RailwaySleeperMaintenanceAndReplacement>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwaySleeperMaintenanceAndReplacement = async (body: IApiPayload<RailwaySleeperMaintenanceAndReplacement>) =>
    projectOtherApiSecondService<RailwaySleeperMaintenanceAndReplacement>().update(
      otherSubMenu?.apiRoute || '',
      railwaySleeperMaintenanceAndReplacement.id,
      body
    );

  const getPayload = (values: RailwaySleeperMaintenanceAndReplacement): IApiPayload<RailwaySleeperMaintenanceAndReplacement> => ({
    data: {
      ...values,
      project_id: projectId,
      recent_maintenance_date: convertDateToLocaleDate(values.recent_maintenance_date)
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySleeperMaintenanceAndReplacement>,
    payload: IApiPayload<RailwaySleeperMaintenanceAndReplacement>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sleeper-maintenance-and-replacement.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sleeper-maintenance-and-replacement.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySleeperMaintenanceAndReplacement,
            recent_maintenance_date: formatInitialDateDate(railwaySleeperMaintenanceAndReplacement?.recent_maintenance_date)
          }}
          createActionFunc={isEdit ? editRailwaySleeperMaintenanceAndReplacement : createRailwaySleeperMaintenanceAndReplacement}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySleeperMaintenanceAndReplacement>) => (
            <RailwaySleeperMaintenanceAndReplacementForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySleeperMaintenanceAndReplacementDrawer;
