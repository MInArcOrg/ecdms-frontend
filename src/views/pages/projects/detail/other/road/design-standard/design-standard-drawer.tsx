import type { FormikProps } from 'formik';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { DesignStandard } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DesignStandardForm from './design-standard-form';

interface DesignStandardDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  designStandard: DesignStandard;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const DesignStandardDrawer = (props: DesignStandardDrawerType) => {
  const { open, toggle, refetch, designStandard, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    road_segment_id: yup.string().required('Road Segment is required'),
    functional_classification_id: yup.string().required('Functional Classification is required'),
    design_classification_id: yup.string().required('Design Classification is required'),
    design_standard_id: yup.string().required('Design Standard is required'),
    design_traffic_flow_id: yup.string().required('Design Traffic Flow is required'),
    design_life_time_years: yup.number().nullable().required('Design Life Time Years is required'),
    segment_number: yup.number().nullable().required('Segment Number is required')
  });

  const isEdit = Boolean(designStandard?.id);

  const createDesignStandard = async (body: IApiPayload<DesignStandard>) =>
    projectOtherApiSecondService<DesignStandard>().create(otherSubMenu?.apiRoute || '', body);

  const editDesignStandard = async (body: IApiPayload<DesignStandard>) =>
    projectOtherApiSecondService<DesignStandard>().update(otherSubMenu?.apiRoute || '', designStandard?.id || '', body);

  const getPayload = (values: DesignStandard): IApiPayload<DesignStandard> => ({
    data: {
      ...values,
      project_id: projectId,
      id: designStandard?.id
    } as DesignStandard,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<DesignStandard>, payload: IApiPayload<DesignStandard>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.design-standard.${isEdit ? `edit-design-standard` : `create-design-standard`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.design-standard.${isEdit ? `edit-design-standard` : `create-design-standard`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...designStandard
          }}
          createActionFunc={isEdit ? editDesignStandard : createDesignStandard}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DesignStandard>) => {
            return <DesignStandardForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DesignStandardDrawer;

