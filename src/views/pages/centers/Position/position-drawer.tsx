import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import PositionForm from './position-form';
import Position from 'src/types/department/position';
import positionApiService from 'src/services/department/position-service';
import { IApiPayload } from 'src/types/requests';

interface PositionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  departmentId: string;
  position: Position;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const PositionDrawer = (props: PositionDrawerType) => {
  // ** Props
  const { open, toggle, refetch, position } = props;

  const isEdit = position?.id ? true : false;
  const createPosition = async (body: IApiPayload<Position>) => {
    return await positionApiService.create(body);
  };
  const editPosition = async (body: IApiPayload<Position>) => {
    return await positionApiService.update(position?.id || '', body);
  };

  const getPayload = (values: Position) => {
    const payload = {
      data: {
        ...values,
        id: position?.id,
        department_id: props.departmentId
      },
      files: []
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer title={`department.position.${isEdit ? 'edit-position' : 'create-position'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="department.position.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={position as Position}
          createActionFunc={isEdit ? editPosition : createPosition}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Position>) => {
            return <PositionForm formik={formik} defaultLocaleData={{} as Position} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default PositionDrawer;
