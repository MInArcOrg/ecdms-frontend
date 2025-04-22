"use client"

import { Checkbox, Divider, FormControlLabel, Grid, Typography } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { ElectricGridControlCenterCyberSecurityData, ElectricGridControlCenterData } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface ElectricGridControlCenterCyberSecurityDataFormProps {
    formik: FormikProps<ElectricGridControlCenterCyberSecurityData>
    file: File | null
    onFileChange: (file: File | null) => void
    electricGridControlCenterData: ElectricGridControlCenterData[]
    cyberSecurityMeasuresTypes: any[]
    cyberSecurityAuditsFrequencies: any[]
}

const ElectricGridControlCenterCyberSecurityDataForm: React.FC<ElectricGridControlCenterCyberSecurityDataFormProps> = ({
    formik,
    file,
    onFileChange,
    electricGridControlCenterData,
    cyberSecurityMeasuresTypes,
    cyberSecurityAuditsFrequencies
}) => {
    const { t: transl } = useTranslation()

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    {transl("project.other.electric-grid-control-center-cyber-security-data.general-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.electric-grid-control-center-cyber-security-data.details.electric-grid-control-center-data-id")}
                            name="electric_grid_control_center_data_id"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                electricGridControlCenterData?.map((data: ElectricGridControlCenterData) => ({
                                    label: data.name,
                                    value: data.id,
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
                            label={transl("project.other.electric-grid-control-center-cyber-security-data.details.name")}
                            placeholder={transl("project.other.electric-grid-control-center-cyber-security-data.details.name")}
                            name="name"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.electric-grid-control-center-cyber-security-data.cyber-security")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.cyber_security_measures_implemented || false}
                                    onChange={(e) => {
                                        formik.setFieldValue("cyber_security_measures_implemented", e.target.checked)
                                    }}
                                    name="cyber_security_measures_implemented"
                                />
                            }
                            label={transl("project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-implemented")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-type")}
                            name="cyber_security_measures_type"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                cyberSecurityMeasuresTypes?.map((type: any) => ({
                                    label: type.title,
                                    value: type.id,
                                })) || []
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-audits-frequency")}
                            name="cyber_security_audits_frequency"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                cyberSecurityAuditsFrequencies?.map((frequency: any) => ({
                                    label: frequency.title,
                                    value: frequency.id,
                                })) || []
                            }
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.electric-grid-control-center-cyber-security-data.additional-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <CustomTextBox
                    fullWidth
                    label={transl("project.other.electric-grid-control-center-cyber-security-data.details.remark")}
                    placeholder={transl("project.other.electric-grid-control-center-cyber-security-data.details.remark")}
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

export default ElectricGridControlCenterCyberSecurityDataForm