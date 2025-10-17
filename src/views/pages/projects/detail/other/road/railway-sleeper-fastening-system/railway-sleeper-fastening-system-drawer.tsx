import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwaySleeperFasteningSystemForm from './railway-sleeper-fastening-system-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwaySleeperFasteningSystem } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface RailwaySleeperFasteningSystemDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySleeperFasteningSystemDrawer = ({
  open,
  toggle,
  refetch,
  railwaySleeperFasteningSystem,
  projectId,
  otherSubMenu
}: RailwaySleeperFasteningSystemDrawerProps) => {
  const isEdit = Boolean(railwaySleeperFasteningSystem?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    used_fastening_systems_type: yup.string().nullable(),
    fastener_condition_assessment: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRailwaySleeperFasteningSystem = async (body: IApiPayload<RailwaySleeperFasteningSystem>) =>
    projectOtherApiSecondService<RailwaySleeperFasteningSystem>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwaySleeperFasteningSystem = async (body: IApiPayload<RailwaySleeperFasteningSystem>) =>
    projectOtherApiSecondService<RailwaySleeperFasteningSystem>().update(
      otherSubMenu?.apiRoute || '',
      railwaySleeperFasteningSystem.project_id,
      body
    );

  const getPayload = (values: RailwaySleeperFasteningSystem): IApiPayload<RailwaySleeperFasteningSystem> => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySleeperFasteningSystem>,
    payload: IApiPayload<RailwaySleeperFasteningSystem>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sleeper-fastening-system.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sleeper-fastening-system.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySleeperFasteningSystem
          }}
          createActionFunc={isEdit ? editRailwaySleeperFasteningSystem : createRailwaySleeperFasteningSystem}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySleeperFasteningSystem>) => <RailwaySleeperFasteningSystemForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySleeperFasteningSystemDrawer;
