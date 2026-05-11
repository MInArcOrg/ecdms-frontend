import type React from 'react';
import type { FormikProps } from 'formik';
import type { Resource } from 'src/types/resource';
import ResourceForm from 'src/views/pages/resources/resource-form';

interface MaterialsFormProps {
  formik: FormikProps<Resource>;
  resourceTypeId: string;
}

const MaterialsForm: React.FC<MaterialsFormProps> = ({ formik, resourceTypeId }) => {
  return <ResourceForm typeId={resourceTypeId} formik={formik} />;
};

export default MaterialsForm;
