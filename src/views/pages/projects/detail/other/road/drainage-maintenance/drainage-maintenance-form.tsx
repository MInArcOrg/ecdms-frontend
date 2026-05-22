import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import { DrainageMaintenance, RoadSegment } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface DrainageMaintenanceFormProps {
    formik: FormikProps<DrainageMaintenance>;
    file: File | null;
    onFileChange: (file: File | null) => void;
    projectId: string;
}

const DrainageMaintenanceForm: React.FC<DrainageMaintenanceFormProps> = ({ formik, file, onFileChange, projectId }) => {
    const { t } = useTranslation();

    const { data: roadSegments } = useQuery({
        queryKey: ['roadsegments', projectId],
        queryFn: () =>
            projectOtherApiSecondService<RoadSegment>().getAll('roadsegments', {
                pagination: { pageSize: 100, page: 1 },
                filter: { project_id: projectId }
            })
    });

    const { data: soilTypes } = useQuery({
        queryKey: ['soil-types'],
        queryFn: () => projectGeneralMasterDataApiService.getAll({ filter: { model: projectMasterModels.soilType.model } })
    });

    const { data: groundWaterImpacts } = useQuery({
        queryKey: ['ground-water-impacts'],
        queryFn: () => projectGeneralMasterDataApiService.getAll({ filter: { model: projectMasterModels.groundWaterImpact.model } })
    });

    const { data: slopeStabilities } = useQuery({
        queryKey: ['slope-stabilities'],
        queryFn: () => projectGeneralMasterDataApiService.getAll({ filter: { model: projectMasterModels.slopeStability.model } })
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CustomSelectBox
                    size="small"
                    name="road_segment_id"
                    label={t('project.other.drainage-maintenance.details.road-segment-id')}
                    options={roadSegments?.payload?.map((s) => ({ value: s.id, label: s.name })) || []}
                />
                <CustomSelectBox
                    size="small"
                    name="soil_type_id"
                    label={t('project.other.drainage-maintenance.details.soil-type-id')}
                    options={soilTypes?.payload?.map((s) => ({ value: s.id, label: s.title || '' })) || []}
                />
                <CustomSelectBox
                    size="small"
                    name="ground_water_impact_id"
                    label={t('project.other.drainage-maintenance.details.ground-water-impact-id')}
                    options={groundWaterImpacts?.payload?.map((s) => ({ value: s.id, label: s.title || '' })) || []}
                />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.drainage-maintenance.details.soil-bearing-capacity')}
                    placeholder={t('project.other.drainage-maintenance.details.soil-bearing-capacity')}
                    name="soil_bearing_capacity"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomSelectBox
                    size="small"
                    name="slope_stability_id"
                    label={t('project.other.drainage-maintenance.details.slope-stability-id')}
                    options={slopeStabilities?.payload?.map((s) => ({ value: s.id, label: s.title || '' })) || []}
                />
                <CustomSwitch name="retaining_walls" label={t('project.other.drainage-maintenance.details.retaining-walls')} />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.drainage-maintenance.details.geological-hazard')}
                    placeholder={t('project.other.drainage-maintenance.details.geological-hazard')}
                    name="geological_hazard"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.drainage-maintenance.details.remark')}
                    placeholder={t('project.other.drainage-maintenance.details.remark')}
                    name="remark"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>

            <Grid item xs={12}>
                <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
            </Grid>
        </Grid>
    );
};

export default DrainageMaintenanceForm;
