import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import {
  RailwaySubBallastDrainageAndWaterManagement // Updated type import
} from 'src/types/project/other';


interface RailwaySubBallastDrainageAndWaterManagementFormProps { // Renamed interface
  formik: FormikProps<RailwaySubBallastDrainageAndWaterManagement>; // Updated prop type
}

const RailwaySubBallastDrainageAndWaterManagementForm: React.FC<RailwaySubBallastDrainageAndWaterManagementFormProps> = ({ formik }) => { // Renamed component
  const { t } = useTranslation();



  console.log('formik errors', formik.errors);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-drainage-and-water-management.details.railway_line_section_name')} // Updated translation key
          placeholder={t('project.other.railway-sub-ballast-drainage-and-water-management.details.railway_line_section_name')} // Updated translation key
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* drainage_condition_assessment - New field */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_condition_assessment')} // New translation key
          placeholder={t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_condition_assessment')} // New translation key
          name="drainage_condition_assessment"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        {/* drainage_infrastructure_type - New field */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_type')} // New translation key
          placeholder={t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_type')} // New translation key
          name="drainage_infrastructure_type"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* water_management_measures - New field */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-drainage-and-water-management.details.water_management_measures')} // New translation key
          placeholder={t('project.other.railway-sub-ballast-drainage-and-water-management.details.water_management_measures')} // New translation key
          name="water_management_measures"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        {/* drainage_infrastructure_length - New field */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_length')} // New translation key
          placeholder={t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_length')} // New translation key
          name="drainage_infrastructure_length"
          size="small"
          sx={{ mb: 2 }}
          type="number" // Assuming it's a numeric input
        />

        {/* remark */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-drainage-and-water-management.details.remark')} // Updated translation key
          placeholder={t('project.other.railway-sub-ballast-drainage-and-water-management.details.remark')} // Updated translation key
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default RailwaySubBallastDrainageAndWaterManagementForm; // Renamed export