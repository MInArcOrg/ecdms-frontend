import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BridgeSuperStructureForm from "./bridge-super-structure-form"

import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import type { BridgeSuperStructure } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface BridgeSuperStructureDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  bridgeSuperStructure: BridgeSuperStructure
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const BridgeSuperStructureDrawer = (props: BridgeSuperStructureDrawerType) => {
  const { open, toggle, refetch, bridgeSuperStructure, projectId, otherSubMenu } = props

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bridge_name: yup.string().required('Bridge name is required'),
    bridge_structure_type_id: yup.string().required('Bridge structure type is required'),
    span_support_type_id: yup.string().required('Span support type is required'),
    deck_slab_type_id: yup.string().required('Deck slab type is required')
  });

  const isEdit = Boolean(bridgeSuperStructure?.id)

  const createBridgeSuperStructure = async (body: IApiPayload<BridgeSuperStructure>) =>
    projectOtherApiSecondService<BridgeSuperStructure>().create(otherSubMenu?.apiRoute || "", body)

  const editBridgeSuperStructure = async (body: IApiPayload<BridgeSuperStructure>) =>
    projectOtherApiSecondService<BridgeSuperStructure>().update(
      otherSubMenu?.apiRoute || "",
      bridgeSuperStructure?.id || "",
      body,
    )

  const getPayload = (values: BridgeSuperStructure): IApiPayload<BridgeSuperStructure> => ({
    data: {
      ...values,
      project_id: projectId,
      id: bridgeSuperStructure?.id,
    } as BridgeSuperStructure,
    files: [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<BridgeSuperStructure>,
    payload: IApiPayload<BridgeSuperStructure>,
  ) => {
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.bridge-super-structure.${isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-super-structure.${isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSuperStructure,
          }}
          createActionFunc={isEdit ? editBridgeSuperStructure : createBridgeSuperStructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSuperStructure>) => {
            return <BridgeSuperStructureForm formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BridgeSuperStructureDrawer
