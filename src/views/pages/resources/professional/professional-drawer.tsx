import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProfessionalForm from './professional-form';
import professionalApiService from 'src/services/resource/professional-service';
import type { Professional } from 'src/types/resource/index';
import type { IApiResponse } from 'src/types/requests';
import { nationalIdRule } from 'src/utils/validator/id';

interface ProfessionalDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  professional: Professional | null;
}

const ProfessionalDrawer = (props: ProfessionalDrawerType) => {
  const { open, toggle, refetch, professional } = props;
  const emptyProfessional: Professional = {
    first_name: '',
    middle_name: '',
    last_name: '',
    national_id_no: '',
    date_of_birth: '',
    gender: '',
    phone_no: '',
    email: ''
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    national_id_no: nationalIdRule.required('National ID number is required'),
    date_of_birth: yup.date().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    phone_no: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const isEdit = Boolean(professional?.id);

  const createProfessional = async (body: IApiPayload<Professional>): Promise<IApiResponse<Professional>> => {
    return professionalApiService.create(body);
  };

  const editProfessional = async (body: IApiPayload<Professional>): Promise<IApiResponse<Professional>> => {
    return professionalApiService.update(professional?.id || '', body);
  };

  const getPayload = (values: Professional) => ({
    data: {
      ...values,
      id: professional?.id
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<Professional>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`resources.professional.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`resources.professional.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={professional || emptyProfessional}
          createActionFunc={isEdit ? editProfessional : createProfessional}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Professional>) => <ProfessionalForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProfessionalDrawer;
