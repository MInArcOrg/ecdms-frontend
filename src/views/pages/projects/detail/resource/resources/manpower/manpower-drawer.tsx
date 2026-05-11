import type React from 'react';
import type { FormikProps } from 'formik';
import * as yup from 'yup';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { Professional } from 'src/types/resource';
import professionalApiService from 'src/services/resource/professional-service';
import { nationalIdRule } from 'src/utils/validator/id';
import ManpowerForm from './manpower-form';

interface ManpowerDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  manpower: Professional | null;
  projectId: string;
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  national_id_no: nationalIdRule.required('National ID number is required'),
  date_of_birth: yup.date().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  phone_no: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required')
});

const ManpowerDrawer: React.FC<ManpowerDrawerProps> = ({ open, toggle, refetch, manpower, projectId }) => {
  const isEdit = Boolean(manpower?.id);

  const emptyManpower: Professional = {
    first_name: '',
    middle_name: '',
    last_name: '',
    national_id_no: '',
    date_of_birth: '',
    gender: '',
    phone_no: '',
    email: ''
  };

  const createManpower = async (body: IApiPayload<Professional>): Promise<IApiResponse<Professional>> => {
    return professionalApiService.create(body);
  };

  const updateManpower = async (body: IApiPayload<Professional>): Promise<IApiResponse<Professional>> => {
    return professionalApiService.update(manpower?.id || '', body);
  };

  const getPayload = (values: Professional) => ({
    data: {
      ...values,
      id: manpower?.id,
      parentId: projectId
    },
    files: []
  });

  const onActionSuccess = async (_response: IApiResponse<Professional>) => {
    refetch();
    toggle();
  };

  return (
    <CustomSideDrawer title={`project.resource.manpower.${isEdit ? 'edit' : 'create'}`} handleClose={toggle} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.resource.manpower.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={manpower || emptyManpower}
          createActionFunc={isEdit ? updateManpower : createManpower}
          onActionSuccess={onActionSuccess}
          onCancel={toggle}
        >
          {(formik: FormikProps<Professional>) => <ManpowerForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ManpowerDrawer;
