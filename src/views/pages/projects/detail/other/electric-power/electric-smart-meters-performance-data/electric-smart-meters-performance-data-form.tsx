"use client"

import { Grid, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { ElectricSmartMetersData, ElectricSmartMetersPerformanceData } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"

interface ElectricSmartMetersPerformanceDataFormProps {
    formik: FormikProps<ElectricSmartMetersPerformanceData>
    file: File | null
    onFileChange: (file: File | null) => void
    electricSmartMetersData: ElectricSmartMetersData[]
    maintenanceFrequencies: any[]
}

const ElectricSmartMetersPerformanceDataForm: React.FC<ElectricSmartMetersPerformanceDataFormProps> = ({
    formik,
    file,
    onFileChange,
    electricSmartMetersData,
    maintenanceFrequencies
}) => {
    const { t: transl } = useTranslation()

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    {transl("project.other.electric-smart-meters-performance-data.general-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.electric-smart-meters-performance-data.details.electric-smart-meters-data-id")}
                            name="electric_smart_meters_data_id"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                electricSmartMetersData?.map((data: ElectricSmartMetersData) => ({
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
                            label={transl("project.other.electric-smart-meters-performance-data.details.name")}
                            placeholder={transl("project.other.electric-smart-meters-performance-data.details.name")}
                            name="name"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomSelect
                            fullWidth
                            required
                            label={transl("project.other.electric-smart-meters-performance-data.details.maintenance-frequency-id")}
                            name="maintenance_frequency_id"
                            size="small"
                            sx={{ mb: 2 }}
                            options={
                                maintenanceFrequencies?.map((frequency: any) => ({
                                    label: frequency.title,
                                    value: frequency.id,
                                })) || []
                            }
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.electric-smart-meters-performance-data.technical-specifications")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.electric-smart-meters-performance-data.details.average-meter-lifespan")}
                            placeholder={transl("project.other.electric-smart-meters-performance-data.details.average-meter-lifespan")}
                            name="average_meter_lifespan"
                            type="number"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.electric-smart-meters-performance-data.details.average-meter-accuracy")}
                            placeholder={transl("project.other.electric-smart-meters-performance-data.details.average-meter-accuracy")}
                            name="average_meter_accuracy"
                            type="number"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.electric-smart-meters-performance-data.safety-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.electric-smart-meters-performance-data.details.safety-problems-encountered")}
                            placeholder={transl("project.other.electric-smart-meters-performance-data.details.safety-problems-encountered")}
                            name="safety_problems_encountered"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.electric-smart-meters-performance-data.details.work-accidents-number")}
                            placeholder={transl("project.other.electric-smart-meters-performance-data.details.work-accidents-number")}
                            name="work_accidents_number"
                            type="number"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.on_site_safety_regulation_implemented || false}
                                    onChange={(e) => {
                                        formik.setFieldValue("on_site_safety_regulation_implemented", e.target.checked)
                                    }}
                                    name="on_site_safety_regulation_implemented"
                                />
                            }
                            label={transl("project.other.electric-smart-meters-performance-data.details.on-site-safety-regulation-implemented")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomTextBox
                            fullWidth
                            label={transl("project.other.electric-smart-meters-performance-data.details.other")}
                            placeholder={transl("project.other.electric-smart-meters-performance-data.details.other")}
                            name="other"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    {transl("project.other.electric-smart-meters-performance-data.additional-information")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <CustomTextBox
                    fullWidth
                    label={transl("project.other.electric-smart-meters-performance-data.details.remark")}
                    placeholder={transl("project.other.electric-smart-meters-performance-data.details.remark")}
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

export default ElectricSmartMetersPerformanceDataForm