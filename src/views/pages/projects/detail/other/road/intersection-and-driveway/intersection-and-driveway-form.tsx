import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { IntersectionAndDriveway } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomSwitch from "src/views/shared/form/custom-switch"
import intersectionTypeMasterService from "src/services/general/project/intersection-type-master-service"
import drivewayAccessPointMasterService from "src/services/general/project/driveway-access-point-master-service"

import { useQuery } from "@tanstack/react-query"

interface IntersectionAndDrivewayFormProps {
  formik: FormikProps<IntersectionAndDriveway>
  file: File | null
  onFileChange: (file: File | null) => void
}

const IntersectionAndDrivewayForm: React.FC<IntersectionAndDrivewayFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: intersectionTypes } = useQuery({
    queryKey: ["masterCategory", "intersectionType"],
    queryFn: () => intersectionTypeMasterService.getAll({}),
  })

  const { data: drivewayAccessPoints } = useQuery({
    queryKey: ["masterCategory", "drivewayAccessPoint"],
    queryFn: () => drivewayAccessPointMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.intersection-and-driveway.details.name")}
          placeholder={transl("project.other.intersection-and-driveway.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.intersection-and-driveway.details.number-of-intersections")}
          placeholder={transl("project.other.intersection-and-driveway.details.number-of-intersections")}
          name="number_of_intersections"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="intersection_type_id"
          label={transl("project.other.intersection-and-driveway.details.intersection-type-id")}
          placeholder={transl("project.other.intersection-and-driveway.details.intersection-type-id")}
          options={
            intersectionTypes?.payload?.map((intersectionType) => ({
              value: intersectionType.id,
              label: intersectionType.title,
            })) || []
          }
        />
        <CustomSelectBox
          size="small"
          name="driveway_access_point_id"
          label={transl("project.other.intersection-and-driveway.details.driveway-access-point-id")}
          placeholder={transl("project.other.intersection-and-driveway.details.driveway-access-point-id")}
          options={
            drivewayAccessPoints?.payload?.map((drivewayAccessPoint) => ({
              value: drivewayAccessPoint.id,
              label: drivewayAccessPoint.title,
            })) || []
          }
        />
        <CustomSwitch
          label={transl("project.other.intersection-and-driveway.details.similar-for-all")}
          name="similar_for_all"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default IntersectionAndDrivewayForm

