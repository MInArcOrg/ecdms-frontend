import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { RoadSegment, SegmentCoordinate } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface SegmentCoordinateFormProps {
    formik: FormikProps<SegmentCoordinate>;
    file: File | null;
    onFileChange: (file: File | null) => void;
    projectId: string;
}

const SegmentCoordinateForm: React.FC<SegmentCoordinateFormProps> = ({ formik, file, onFileChange, projectId }) => {
    const { t } = useTranslation();

    const { data: roadSegments } = useQuery({
        queryKey: ['roadsegments', projectId],
        queryFn: () =>
            projectOtherApiSecondService<RoadSegment>().getAll('roadsegments', {
                pagination: { pageSize: 100, page: 1 },
                filter: { project_id: projectId }
            })
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CustomSelectBox
                    size="small"
                    name="road_segment_id"
                    label={t('project.other.segment-coordinate.details.road-segment-id')}
                    options={roadSegments?.payload?.map((s) => ({ value: s.id, label: s.name })) || []}
                />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.segment-coordinate.details.start-x')}
                    placeholder={t('project.other.segment-coordinate.details.start-x')}
                    name="start_x"
                    size="small"
                    type="number"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.segment-coordinate.details.start-y')}
                    placeholder={t('project.other.segment-coordinate.details.start-y')}
                    name="start_y"
                    size="small"
                    type="number"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.segment-coordinate.details.end-x')}
                    placeholder={t('project.other.segment-coordinate.details.end-x')}
                    name="end_x"
                    size="small"
                    type="number"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('project.other.segment-coordinate.details.end-y')}
                    placeholder={t('project.other.segment-coordinate.details.end-y')}
                    name="end_y"
                    size="small"
                    type="number"
                    sx={{ mb: 2 }}
                />
            </Grid>

            <Grid item xs={12}>
                <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
            </Grid>
        </Grid>
    );
};

export default SegmentCoordinateForm;
