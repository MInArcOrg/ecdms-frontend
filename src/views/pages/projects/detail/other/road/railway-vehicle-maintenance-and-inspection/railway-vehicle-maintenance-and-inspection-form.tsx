import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleIdentification, RailwayVehicleMaintenanceAndInspection } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface RailwayVehicleMaintenanceAndInspectionFormProps {
  formik: FormikProps<RailwayVehicleMaintenanceAndInspection>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayVehicleMaintenanceAndInspectionForm: React.FC<RailwayVehicleMaintenanceAndInspectionFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();
  const { data: vehicleIdentifications } = useQuery({
    queryKey: ['vehicle-identifications'],
    queryFn: () => projectOtherApiSecondService<RailwayVehicleIdentification>().getAll('railway-vehicle-identifications', dropDownConfig())
  });

  const { data: brakingSystemTypes } = useQuery({
    queryKey: [projectMasterModels.brakingSystemType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.brakingSystemType.model
          }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-vehicle-specification.details.railway_vehicle_identification_id')}
          name="railway_vehicle_identification_id"
          options={
            vehicleIdentifications?.payload.map((item) => ({
              label: item.vehicle_type + ' - ' + item.manufacturer_supplier_name + ' - ' + item.manufacture_year,
              value: item.id
            })) || []
          }
          value={formik.values.railway_vehicle_identification_id}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-maintenance-and-inspection.details.maintenance_history_records')}
          placeholder="Summarize historical maintenance records"
          name="maintenance_history_records"
          value={formik.values.maintenance_history_records}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-maintenance-and-inspection.details.vehicle_weight_and_load_capacity')}
          placeholder="e.g. Total Weight: 50t, Payload: 100t"
          name="vehicle_weight_and_load_capacity"
          value={formik.values.vehicle_weight_and_load_capacity}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-maintenance-and-inspection.details.maximum_speed')}
          placeholder="e.g. 160 (km/h)"
          name="maximum_speed"
          value={formik.values.maximum_speed}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-vehicle-maintenance-and-inspection.details.braking_system_type')}
          name="braking_system_type_id"
          value={formik.values.braking_system_type_id}
          size="small"
          sx={{ mb: 2 }}
          options={
            brakingSystemTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-maintenance-and-inspection.details.remark')}
          placeholder={t('common.form.remark-placeholder')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.technical-document-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayVehicleMaintenanceAndInspectionForm;
