import { Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { TelecomInfrastructureComponent } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface TelecomInfrastructureComponentFormProps {
  formik: FormikProps<TelecomInfrastructureComponent>
  file: File | null
  onFileChange: (file: File | null) => void
}

const TelecomInfrastructureComponentForm: React.FC<TelecomInfrastructureComponentFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  const { data: mobileNetworkTypes } = useQuery({
    queryKey: ["mobile-network-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model },
      }),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl("project.other.telecom-infrastructure-component.details.mobile-network-type")}
          placeholder={transl("project.other.telecom-infrastructure-component.details.mobile-network-type")}
          name="mobile_network_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            mobileNetworkTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.cables")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.cables")}
              name="cables"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.wires")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.wires")}
              name="wires"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.routers")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.routers")}
              name="routers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.switches")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.switches")}
              name="switches"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.hubs")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.hubs")}
              name="hubs"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.repeaters")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.repeaters")}
              name="repeaters"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.antennas")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.antennas")}
              name="antennas"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.telecom-infrastructure-component.details.towers")}
              placeholder={transl("project.other.telecom-infrastructure-component.details.towers")}
              name="towers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.telecom-infrastructure-component.details.remark")}
          placeholder={transl("project.other.telecom-infrastructure-component.details.remark")}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default TelecomInfrastructureComponentForm

