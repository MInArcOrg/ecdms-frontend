import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayFasteningSystemMaintenanceAndReplacement } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayFasteningSystemMaintenanceAndReplacementFormProps {
  formik: FormikProps<RailwayFasteningSystemMaintenanceAndReplacement>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  inspectionReportsFile: File | null;
  onInspectionReportsFileChange: (file: File | null) => void;
  replacementHistoryFile: File | null;
  onReplacementHistoryFileChange: (file: File | null) => void;
}

const RailwayFasteningSystemMaintenanceAndReplacementForm: React.FC<
  RailwayFasteningSystemMaintenanceAndReplacementFormProps
> = ({
  formik,
  inspectionReportsFile,
  onInspectionReportsFileChange,
  replacementHistoryFile,
  onReplacementHistoryFileChange,
  file,
  onFileChange
}) => {
    const { t } = useTranslation();

    return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.railway_line_section_name'
            )}
            placeholder={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.railway_line_section_name'
            )}
            name="railway_line_section_name"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.scheduled_maintenance_activities'
            )}
            placeholder={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.scheduled_maintenance_activities'
            )}
            name="scheduled_maintenance_activities"
            size="small"
            sx={{ mb: 2 }}
            multiline
            rows={2}
          />

          <CustomTextBox
            fullWidth
            label={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.recent_maintenance_records_and_dates'
            )}
            placeholder={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.recent_maintenance_records_and_dates'
            )}
            name="recent_maintenance_records_and_dates"
            size="small"
            sx={{ mb: 2 }}
            multiline
            rows={3}
          />

          <CustomTextBox
            fullWidth
            label={t('project.other.railway-fastening-system-maintenance-and-replacement.details.remark')}
            placeholder={t('project.other.railway-fastening-system-maintenance-and-replacement.details.remark')}
            name="remark"
            size="small"
            sx={{ mb: 2 }}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />

        </Grid>
        <Grid item xs={12}>
          <CustomFileUpload
            label={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.inspection_reports_and_findings'
            )}
            file={inspectionReportsFile}
            onFileChange={onInspectionReportsFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFileUpload
            label={t(
              'project.other.railway-fastening-system-maintenance-and-replacement.details.fastening_system_replacement_history'
            )}
            file={replacementHistoryFile}
            onFileChange={onReplacementHistoryFileChange}
          />
        </Grid>
      </Grid>
    );
  };

export default RailwayFasteningSystemMaintenanceAndReplacementForm;