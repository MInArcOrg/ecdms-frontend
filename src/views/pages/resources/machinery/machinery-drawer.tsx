import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MachineryInformationForm from './machinery-form';
import machineryInformationApiService from 'src/services/project/machinery-information-service';
import type { MachineryInformation } from 'src/types/resource/index';
import type { IApiResponse } from 'src/types/requests';

interface MachineryInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  machineryInformation: MachineryInformation | null;
  departmentId?: string;
}

const MachineryInformationDrawer = (props: MachineryInformationDrawerType) => {
  const { open, toggle, refetch, machineryInformation, departmentId } = props;

  const validationSchema = yup.object().shape({
    department_id: yup.string().required('Department is required'),
    type: yup.string().required('Type is required'),
    plate_no: yup.string().required('Plate number is required'),
    owner_name: yup.string().required('Owner name is required')
  });

  const isEdit = Boolean(machineryInformation?.id);

  const createMachineryInformation = async (
    body: IApiPayload<MachineryInformation>
  ): Promise<IApiResponse<MachineryInformation>> => {
    return machineryInformationApiService.create(body);
  };

  const editMachineryInformation = async (
    body: IApiPayload<MachineryInformation>
  ): Promise<IApiResponse<MachineryInformation>> => {
    return machineryInformationApiService.update(machineryInformation?.id || '', body);
  };

  const getPayload = (values: MachineryInformation) => ({
    data: {
      ...values,
      id: machineryInformation?.id
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<MachineryInformation>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`Machinery ${isEdit ? 'Edit' : 'Create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`Machinery ${isEdit ? 'Edit' : 'Create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(machineryInformation as MachineryInformation)
          }}
          createActionFunc={isEdit ? editMachineryInformation : createMachineryInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MachineryInformation>) => <MachineryInformationForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MachineryInformationDrawer;
