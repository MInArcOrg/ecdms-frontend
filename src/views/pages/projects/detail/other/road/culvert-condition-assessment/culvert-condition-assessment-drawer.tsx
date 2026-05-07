import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import CulvertConditionAssessmentForm from './culvert-condition-assessment-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { CulvertConditionAssessment } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface CulvertConditionAssessmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  culvertConditionAssessment: CulvertConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const CulvertConditionAssessmentDrawer = (props: CulvertConditionAssessmentDrawerType) => {
  const { open, toggle, refetch, culvertConditionAssessment, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    project_id: yup.string().length(36).required('Project is required'),
    culvert_basic_data_id: yup.string().uuid().required('Culvert is required'),
    name: yup.string().max(255).required('Name is required'),
    structure_type_id: yup.string().uuid().required('Structure type is required'),
    north_id: yup.string().uuid().required('North is required'),
    east_id: yup.string().uuid().required('East is required'),
    west_id: yup.string().uuid().required('West is required'),
    south_id: yup.string().uuid().required('South is required'),
    central_id: yup.string().uuid().required('Central is required'),
    assessment_date: yup.mixed().nullable()
  });

  const isEdit = Boolean(culvertConditionAssessment?.id);

  const createCulvertConditionAssessment = async (body: IApiPayload<CulvertConditionAssessment>) =>
    projectOtherApiSecondService<CulvertConditionAssessment>().create(otherSubMenu?.apiRoute || '', body);

  const editCulvertConditionAssessment = async (body: IApiPayload<CulvertConditionAssessment>) =>
    projectOtherApiSecondService<CulvertConditionAssessment>().update(otherSubMenu?.apiRoute || '', culvertConditionAssessment?.id || '', body);

  const getPayload = (values: CulvertConditionAssessment): IApiPayload<CulvertConditionAssessment> => ({
    data: {
      project_id: projectId,
      culvert_basic_data_id: values.culvert_basic_data_id,
      name: values.name,
      structure_type_id: values.structure_type_id,
      north_id: values.north_id,
      east_id: values.east_id,
      west_id: values.west_id,
      south_id: values.south_id,
      central_id: values.central_id,
      assessment_date: values.assessment_date,
      id: culvertConditionAssessment?.id,
      culvert_id: values.culvert_id,
      road_segment_id: values.road_segment_id,
      created_at: values.created_at,
      updated_at: values.updated_at
    } as CulvertConditionAssessment,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<CulvertConditionAssessment>, payload: IApiPayload<CulvertConditionAssessment>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.culvert-condition-assessment.${isEdit ? `edit-culvert-condition-assessment` : `create-culvert-condition-assessment`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-condition-assessment.${isEdit ? `edit-culvert-condition-assessment` : `create-culvert-condition-assessment`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...culvertConditionAssessment,
            culvert_basic_data_id:
              culvertConditionAssessment?.culvert_basic_data_id || culvertConditionAssessment?.culvertBasicData?.id || '',
            structure_type_id:
              culvertConditionAssessment?.structure_type_id || culvertConditionAssessment?.structureType?.id || '',
            north_id: culvertConditionAssessment?.north_id || culvertConditionAssessment?.north?.id || '',
            east_id: culvertConditionAssessment?.east_id || culvertConditionAssessment?.east?.id || '',
            west_id: culvertConditionAssessment?.west_id || culvertConditionAssessment?.west?.id || '',
            south_id: culvertConditionAssessment?.south_id || culvertConditionAssessment?.south?.id || '',
            central_id: culvertConditionAssessment?.central_id || culvertConditionAssessment?.central?.id || '',
            project_id: projectId
          }}
          createActionFunc={isEdit ? editCulvertConditionAssessment : createCulvertConditionAssessment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertConditionAssessment>) => <CulvertConditionAssessmentForm formik={formik} projectId={projectId} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default CulvertConditionAssessmentDrawer;

