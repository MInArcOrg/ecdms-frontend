"use client"

import { Grid, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { MiniGridStationDistributionLineInfrastructure, MiniGridStation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"

interface MiniGridStationDistributionLineInfrastructureFormProps {
    formik: FormikProps<MiniGridStationDistributionLineInfrastructure>
    file: File | null
    onFileChange: (file: File | null) => void
    miniGridStations: MiniGridStation[]
    distributionLineTypes: any[]
    distributionLineMaterials: any[]
}

const MiniGridStationDistributionLineInfrastructureForm: React.FC<MiniGridStationDistributionLineInfrastructureFormProps> = ({
    formik,
    file,
    onFileChange,
    miniGridStations,
    distributionLineTypes,
    distributionLineMaterials
}) => {
    const { t: transl } = useTranslation()

    const topologyOptions = [
        { label: transl("project.other.mini-grid-station-distribution-line-infrastructure.topology-options.radial"), value: "Radial" },
        { label: transl("project.other.mini-grid-station-distribution-line-infrastructure.topology-options.ring"), value: "Ring" },
    ]

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    {transl("project.other.mini-grid-station-distribution-line-infrastructure.general-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.mini-grid-station-id")}
                            name="mini_grid_station_id"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                miniGridStations?.map((station: MiniGridStation) => ({
                                    label: station.name,
                                    value: station.id,
                                })) || []
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomTextBox
                            fullWidth
                            required
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.name")}
                            placeholder={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.name")}
                            name="name"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.mini-grid-station-distribution-line-infrastructure.technical-specifications")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-type-id")}
                            name="distribution_line_type_id"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                distributionLineTypes?.map((type: any) => ({
                                    label: type.name,
                                    value: type.id,
                                })) || []
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-material-id")}
                            name="distribution_line_material_id"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                distributionLineMaterials?.map((material: any) => ({
                                    label: material.name,
                                    value: material.id,
                                })) || []
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-conductor-size")}
                            placeholder={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-conductor-size")}
                            name="distribution_line_conductor_size"
                            type="number"
                            size="small"
                            sx={{ mb: 2 }}
                            helperText={transl("common.mm2")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.voltage-level")}
                            placeholder={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.voltage-level")}
                            name="voltage_level"
                            type="number"
                            size="small"
                            sx={{ mb: 2 }}
                            helperText={transl("common.kv")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomSelect
                            fullWidth
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.topology")}
                            name="topology"
                            size="small"
                            sx={{ mb: 2 }}
                            options={topologyOptions}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.mini-grid-station-distribution-line-infrastructure.connection-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.switching_station_connection || false}
                                    onChange={(e) => {
                                        formik.setFieldValue("switching_station_connection", e.target.checked)
                                    }}
                                    name="switching_station_connection"
                                />
                            }
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.switching-station-connection")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.station-name")}
                            placeholder={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.station-name")}
                            name="station_name"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.mini-grid-station-distribution-line-infrastructure.additional-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <CustomTextBox
                    fullWidth
                    label={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.remark")}
                    placeholder={transl("project.other.mini-grid-station-distribution-line-infrastructure.details.remark")}
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

export default MiniGridStationDistributionLineInfrastructureForm