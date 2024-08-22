import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { RoadSegment } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RoadSegmentFormProps {
  formik: FormikProps<RoadSegment>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RoadSegmentForm: React.FC<RoadSegmentFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.name')}
          placeholder={transl('project.other.road-segment.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.specifications')}
          placeholder={transl('project.other.road-segment.details.specifications')}
          name="specifications"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.no-of-layers')}
          placeholder={transl('project.other.road-segment.details.no-of-layers')}
          name="no_of_layers"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.length')}
          placeholder={transl('project.other.road-segment.details.length')}
          name="length"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.width')}
          placeholder={transl('project.other.road-segment.details.width')}
          name="width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.remark')}
          placeholder={transl('project.other.road-segment.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.start-northing')}
          placeholder={transl('project.other.road-segment.details.start-northing')}
          name="start_northing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.start-easting')}
          placeholder={transl('project.other.road-segment.details.start-easting')}
          name="start_easting"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.end-northing')}
          placeholder={transl('project.other.road-segment.details.end-northing')}
          name="end_northing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-segment.details.end-easting')}
          placeholder={transl('project.other.road-segment.details.end-easting')}
          name="end_easting"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RoadSegmentForm;
