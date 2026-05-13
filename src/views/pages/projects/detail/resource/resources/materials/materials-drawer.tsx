import type React from 'react';
import type { FormikProps } from 'formik';
import * as yup from 'yup';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { Resource } from 'src/types/resource';
import resourceApiService from 'src/services/resource/resource-service';
import MaterialsForm from './materials-form';

interface MaterialsDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  resourceTypeId: string;
  material: Resource | null;
}

const validationSchema = yup.object().shape({
  resourcecategory_id: yup.string().required('Resource category is required'),
  resourcesubcategory_id: yup.string().required('Resource subcategory is required'),
  name: yup.string().trim().required('Name is required').max(100, 'Name cannot exceed 100 characters'),
  quantity_measurement_unit_id: yup.string().required('Quantity measurement unit is required'),
  quality_measurement_unit_id: yup.string().required('Quality measurement unit is required'),
  remark: yup.string().trim().max(1000).nullable()
});

const MaterialsDrawer: React.FC<MaterialsDrawerProps> = ({ open, toggle, refetch, projectId, resourceTypeId, material }) => {
  const isEdit = Boolean(material?.id);

  const emptyValues: Resource = {
    id: '',
    resourcetype_id: resourceTypeId,
    resourcecategory_id: '',
    resourcesubcategory_id: '',
    name: '',
    quantity_measurement_unit_id: '',
    quality_measurement_unit_id: '',
    remark: '',
    created_at: '',
    updated_at: ''
  };

  const createMaterial = async (body: IApiPayload<Resource>): Promise<IApiResponse<Resource>> => {
    return resourceApiService.create(body);
  };

  const updateMaterial = async (body: IApiPayload<Resource>): Promise<IApiResponse<Resource>> => {
    return resourceApiService.update(material?.id || '', body);
  };

  const getPayload = (values: Resource): IApiPayload<Resource> => {
    const data: any = {
      ...values,
      parent: projectId,
      resourcetype_id: resourceTypeId
    };

    if (material?.id) {
      data.id = material.id;
    }

    return {
      data,
      files: []
    };
  };

  const onActionSuccess = async (_response: IApiResponse<Resource>) => {
    refetch();
    toggle();
  };

  return (
    <CustomSideDrawer title={`project.resource.materials.${isEdit ? 'edit' : 'create'}`} handleClose={toggle} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.resource.materials.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={material || emptyValues}
          createActionFunc={isEdit ? updateMaterial : createMaterial}
          onActionSuccess={onActionSuccess}
          onCancel={toggle}
        >
          {(formik: FormikProps<Resource>) => <MaterialsForm formik={formik} resourceTypeId={resourceTypeId} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaterialsDrawer;
