import type React from 'react';
import type { FormikProps } from 'formik';
import * as yup from 'yup';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { MachineryInformation } from 'src/types/resource';
import machineryInformationApiService from 'src/services/project/machinery-information-service';
import MachineryInformationForm from './machinery-information-form';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';
import { phoneRule } from 'src/utils/validator/phone';

interface MachineryInformationDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  machineryInformation: MachineryInformation | null;
}

const validationSchema = yup.object().shape({
  department_id: yup.string().max(36).required('Department is required'),
  type: yup.string().trim().max(255).required('Type is required'),
  plate_no: yup.string().trim().max(255).required('Plate number is required'),
  owner_name: yup.string().trim().max(255).required('Owner name is required'),

  engine_no: yup.string().trim().max(255).nullable(),
  serial_no: yup.string().trim().max(255).nullable(),
  title_certificate_no: yup.string().trim().max(255).nullable(),
  registration_date: yup.date().nullable().typeError('Invalid registration date'),
  make: yup.string().trim().max(255).nullable(),
  model: yup.string().trim().max(255).nullable(),

  capacity: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 10, maxDecimalPlaces: 2 }).nullable(),
  engine_power_hp: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 10, maxDecimalPlaces: 2 }).nullable(),
  manufacture_year: limitNumberDigits(nullableIntegerSchema(), { maxIntegerDigits: 4, maxDecimalPlaces: 0 }).nullable(),

  tell: phoneRule.nullable(),
  ts_no: yup.string().trim().max(255).nullable(),
  date: yup.date().nullable().typeError('Invalid date'),
  duty: yup.string().trim().max(255).nullable(),
  data: yup.string().trim().max(255).nullable(),
  remark: yup.string().trim().max(1000).nullable(),

  edesate: yup.string().trim().max(255).nullable(),
  eged: yup.string().trim().max(255).nullable(),
  eged_d: yup.date().nullable().typeError('Invalid eged date'),
  eged_n: yup.string().trim().max(255).nullable()
});

const MachineryInformationDrawer: React.FC<MachineryInformationDrawerProps> = ({ open, toggle, refetch, projectId, machineryInformation }) => {
  const isEdit = Boolean(machineryInformation?.id);

  const emptyValues: MachineryInformation = {
    department_id: '',
    type: '',
    plate_no: '',
    owner_name: '',
    engine_no: '',
    serial_no: '',
    title_certificate_no: '',
    registration_date: '',
    make: '',
    model: '',
    capacity: '',
    engine_power_hp: '',
    manufacture_year: '',
    tell: '',
    ts_no: '',
    date: '',
    duty: '',
    data: '',
    remark: '',
    edesate: '',
    eged: '',
    eged_d: '',
    eged_n: ''
  };

  const createMachineryInformation = async (body: IApiPayload<MachineryInformation>): Promise<IApiResponse<MachineryInformation>> => {
    return machineryInformationApiService.create(body as unknown as IApiPayload<MachineryInformation>);
  };

  const updateMachineryInformation = async (body: IApiPayload<MachineryInformation>): Promise<IApiResponse<MachineryInformation>> => {
    return machineryInformationApiService.update(machineryInformation?.id || '', body as unknown as IApiPayload<MachineryInformation>);
  };

  const getPayload = (values: MachineryInformation): IApiPayload<MachineryInformation> => ({
    data: {
      ...(values as MachineryInformation),
      id: machineryInformation?.id,
      parent: projectId
    },
    files: []
  });

  const onActionSuccess = async (_response: IApiResponse<MachineryInformation>) => {
    refetch();
    toggle();
  };

  return (
    <CustomSideDrawer title={`project.resource.machinery-information.${isEdit ? 'edit' : 'create'}`} handleClose={toggle} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.resource.machinery-information.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={machineryInformation || emptyValues}
          createActionFunc={isEdit ? updateMachineryInformation : createMachineryInformation}
          onActionSuccess={onActionSuccess}
          onCancel={toggle}
        >
          {(formik: FormikProps<MachineryInformation>) => <MachineryInformationForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MachineryInformationDrawer;
