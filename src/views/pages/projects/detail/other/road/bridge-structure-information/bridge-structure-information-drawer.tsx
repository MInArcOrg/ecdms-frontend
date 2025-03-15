import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BridgeStructureInformationForm from "./bridge-structure-information-form"

import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import type { BridgeStructureInformation } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface BridgeStructureInformationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  bridgeStructureInformation: BridgeStructureInformation
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const BridgeStructureInformationDrawer = (props: BridgeStructureInformationDrawerType) => {
  const { open, toggle, refetch, bridgeStructureInformation, projectId, otherSubMenu } = props

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bridge_name: yup.string().required("Bridge name is required"),
    bridge_structure_type_id: yup.string().required("Bridge structure type is required"),
  })

  const isEdit = Boolean(bridgeStructureInformation?.id)

  const createBridgeStructureInformation = async (body: IApiPayload<BridgeStructureInformation>) =>
    projectOtherApiSecondService<BridgeStructureInformation>().create(otherSubMenu?.apiRoute || "", body)

  const editBridgeStructureInformation = async (body: IApiPayload<BridgeStructureInformation>) =>
    projectOtherApiSecondService<BridgeStructureInformation>().update(
      otherSubMenu?.apiRoute || "",
      bridgeStructureInformation?.id || "",
      body,
    )

  const getPayload = (values: BridgeStructureInformation): IApiPayload<BridgeStructureInformation> => ({
    data: {
      ...values,
      project_id: projectId,
      id: bridgeStructureInformation?.id,
    } as BridgeStructureInformation,
    files: [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<BridgeStructureInformation>,
    payload: IApiPayload<BridgeStructureInformation>,
  ) => {
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.bridge-structure-information.${isEdit ? `edit-bridge-structure-information` : `create-bridge-structure-information`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-structure-information.${isEdit ? `edit-bridge-structure-information` : `create-bridge-structure-information`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeStructureInformation,
          }}
          createActionFunc={isEdit ? editBridgeStructureInformation : createBridgeStructureInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeStructureInformation>) => {
            return <BridgeStructureInformationForm formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BridgeStructureInformationDrawer

