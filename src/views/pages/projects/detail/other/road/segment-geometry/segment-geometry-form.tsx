import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { SegmentGeometry } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

import { useQuery } from '@tanstack/react-query';

interface SegmentGeometryFormProps {
  formik: FormikProps<SegmentGeometry>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const SegmentGeometryForm: React.FC<SegmentGeometryFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: crossSectionTypes } = useQuery({
    queryKey: ['general-master', 'cross-section-types'],
    queryFn: () => projectGeneralMasterDataApiService.getAll({ filter: { model: 'CrossSectionType' } })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.name')}
          placeholder={transl('project.other.segment-geometry.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="cross_section_type_id"
          label={transl('project.other.segment-geometry.details.cross-section-type-id')}
          placeholder={transl('project.other.segment-geometry.details.cross-section-type-id')}
          options={
            crossSectionTypes?.payload?.map((crossSectionType) => ({
              value: crossSectionType.id,
              label: crossSectionType.title
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.carriage-way-width')}
          placeholder={transl('project.other.segment-geometry.details.carriage-way-width')}
          name="carriage_way_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.lane-width')}
          placeholder={transl('project.other.segment-geometry.details.lane-width')}
          name="lane_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.shoulder-width')}
          placeholder={transl('project.other.segment-geometry.details.shoulder-width')}
          name="shoulder_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.grade-percentage')}
          placeholder={transl('project.other.segment-geometry.details.grade-percentage')}
          name="grade_percentage"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.elevation-change')}
          placeholder={transl('project.other.segment-geometry.details.elevation-change')}
          name="elevation_change"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.segment-geometry.details.cross-slope-percentage')}
          placeholder={transl('project.other.segment-geometry.details.cross-slope-percentage')}
          name="cross_slope_percentage"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={transl('project.other.segment-geometry.details.property-access-control')}
          name="property_access_control"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={transl('project.other.segment-geometry.details.similar-for-all-lane')}
          name="similar_for_all_lane"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default SegmentGeometryForm;
