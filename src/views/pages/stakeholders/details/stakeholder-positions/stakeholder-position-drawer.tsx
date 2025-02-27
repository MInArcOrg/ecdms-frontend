import type { FormikProps } from "formik"
import type { IApiPayload } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import PositionForm from "./stakeholder-position-form"
import stakeholderPositionApiService from "src/services/stakeholder/stakeholder-position-service"
import type { StakeholderPosition } from "src/types/stakeholder/stakeholder-positions"
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';

interface PositionDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  position: StakeholderPosition
  stakeholderId: string
  departments: StakeholderDepartment[]
}

const PositionDrawer = (props: PositionDrawerType) => {
  const { open, toggle, refetch, position, stakeholderId, departments } = props

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    stakeholder_department_id: yup.string().required("Parent department is required"),
    description: yup.string().required("Description is required"),
    required_education: yup.string(),
    required_work_experience: yup.string(),
    salary: yup.number().positive("Salary must be positive"),
    no_of_professionals: yup
      .number()
      .integer("Number of professionals must be an integer")
      .positive("Number of professionals must be positive"),
    reference: yup.string(),
  })

  const isEdit = Boolean(position?.id)

  const createPosition = async (body: IApiPayload<StakeholderPosition>) => stakeholderPositionApiService.create(body)

  const editPosition = async (body: IApiPayload<StakeholderPosition>) =>
    stakeholderPositionApiService.update(position?.id || "", body)

  const getPayload = (values: StakeholderPosition) => ({
    data: {
      ...values,
      id: position?.id,
      stakeholder_id: stakeholderId,
    },
    files: [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = () => {
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`stakeholder.position.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.position.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(position as StakeholderPosition),
          }}
          createActionFunc={isEdit ? editPosition : createPosition}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderPosition>) => <PositionForm formik={formik} departments={departments} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default PositionDrawer

