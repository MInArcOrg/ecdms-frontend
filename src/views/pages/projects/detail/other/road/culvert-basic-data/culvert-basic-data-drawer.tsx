import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import CulvertBasicDataForm from "./culvert-basic-data-form"

import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import type { CulvertBasicData } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface CulvertBasicDataDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  culvertBasicData: CulvertBasicData
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const CulvertBasicDataDrawer = (props: CulvertBasicDataDrawerType) => {
  const { open, toggle, refetch, culvertBasicData, projectId, otherSubMenu } = props

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    culvert_name: yup.string().required("Culvert name is required"),
    area_topography_id: yup.string().required("Area topography is required"),
  })

  const isEdit = Boolean(culvertBasicData?.id)

  const createCulvertBasicData = async (body: IApiPayload<CulvertBasicData>) =>
    projectOtherApiSecondService<CulvertBasicData>().create(otherSubMenu?.apiRoute || "", body)

  const editCulvertBasicData = async (body: IApiPayload<CulvertBasicData>) =>
    projectOtherApiSecondService<CulvertBasicData>().update(
      otherSubMenu?.apiRoute || "",
      culvertBasicData?.id || "",
      body
    )

  const getPayload = (values: CulvertBasicData) => ({
    data: {
      project_id: projectId,
      name: values.name,
      culvert_name: values.culvert_name,
      culvert_number: values.culvert_number,
      culvert_coordinate_x: values.culvert_coordinate_x,
      culvert_coordinate_y: values.culvert_coordinate_y,
      area_topography_id: values.area_topography_id,
      highest_water_level: values.highest_water_level,
      lowest_water_level: values.lowest_water_level,
      construction_year: values.construction_year,
      contractor: values.contractor,
      designer: values.designer,
      culvert_cost: values.culvert_cost,
      detour_possibility: values.detour_possibility,
      road_alignment: values.road_alignment,
      altitude: values.altitude,
      id: culvertBasicData?.id,
      created_at: values.created_at,
      updated_at: values.updated_at,
    },
    files: [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<CulvertBasicData>, payload: IApiPayload<CulvertBasicData>) => {
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.culvert-basic-data.${isEdit ? `edit-culvert-basic-data` : `create-culvert-basic-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-basic-data.${isEdit ? `edit-culvert-basic-data` : `create-culvert-basic-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...culvertBasicData,
          }}
          createActionFunc={isEdit ? editCulvertBasicData : createCulvertBasicData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertBasicData>) => {
            return <CulvertBasicDataForm formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default CulvertBasicDataDrawer
