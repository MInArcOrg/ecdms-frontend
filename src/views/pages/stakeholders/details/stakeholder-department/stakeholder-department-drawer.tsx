import type { FormikProps } from "formik";
import type { IApiPayload } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import DepartmentForm from "./stakeholder-department-form";
import stakeholderDepartmentApiService from "src/services/stakeholder/stakeholder-department-service";
import type { StakeholderDepartment } from "src/types/stakeholder/stakeholder-department";
import type { IApiResponse } from "src/types/requests";

interface DepartmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  department: StakeholderDepartment;
  stakeholderId: string;
  departments: StakeholderDepartment[];
}

const DepartmentDrawer = (props: DepartmentDrawerType) => {
  const { open, toggle, refetch, department, stakeholderId, departments } =
    props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    parent_department_id: yup.string().nullable(),
    description: yup.string().required("Description is required"),
    reference: yup.string().nullable(),
  });

  const isEdit = Boolean(department?.id);

  const createDepartment = async (
    body: IApiPayload<StakeholderDepartment>,
  ): Promise<IApiResponse<StakeholderDepartment>> => {
    return stakeholderDepartmentApiService.create(body);
  };

  const editDepartment = async (
    body: IApiPayload<StakeholderDepartment>,
  ): Promise<IApiResponse<StakeholderDepartment>> => {
    return stakeholderDepartmentApiService.update(department?.id || "", body);
  };

  const getPayload = (values: StakeholderDepartment) => ({
    data: {
      ...values,
      id: department?.id,
      stakeholder_id: stakeholderId,
    },
    files: [],
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<StakeholderDepartment>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-department.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-department.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(department as StakeholderDepartment),
          }}
          createActionFunc={isEdit ? editDepartment : createDepartment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderDepartment>) => (
            <DepartmentForm formik={formik} departments={departments} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DepartmentDrawer;
