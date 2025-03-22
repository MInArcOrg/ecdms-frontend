import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import PavementForm from "./pavement-form"

import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import type { Pavement } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface PavementDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  pavement: Pavement
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const PavementDrawer = (props: PavementDrawerType) => {
  const { open, toggle, refetch, pavement, projectId, otherSubMenu } = props

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    road_length_type_id: yup.string().required("Road length type is required"),
  })

  const isEdit = Boolean(pavement?.id)

  const createPavement = async (body: IApiPayload<Pavement>) =>
    projectOtherApiSecondService<Pavement>().create(otherSubMenu?.apiRoute || "", body)

  const editPavement = async (body: IApiPayload<Pavement>) =>
    projectOtherApiSecondService<Pavement>().update(otherSubMenu?.apiRoute || "", pavement?.id || "", body)

  const getPayload = (values: Pavement) => ({
    data: {
      project_id: projectId,
      name: values.name,
      tangent_length: values.tangent_length,
      curve_length: values.curve_length,
      road_length_type_id: values.road_length_type_id,
      road_pavement_thickness: values.road_pavement_thickness,
      paved_road_surface_width: values.paved_road_surface_width,
      id: pavement?.id,
      created_at: values.created_at,
      updated_at: values.updated_at,
    },
    files: [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<Pavement>, payload: IApiPayload<Pavement>) => {
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.pavement.${isEdit ? `edit-pavement` : `create-pavement`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.pavement.${isEdit ? `edit-pavement` : `create-pavement`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...pavement,
          }}
          createActionFunc={isEdit ? editPavement : createPavement}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Pavement>) => {
            return <PavementForm formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default PavementDrawer

