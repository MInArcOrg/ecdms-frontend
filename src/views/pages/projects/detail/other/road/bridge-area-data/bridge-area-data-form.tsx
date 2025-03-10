import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { BridgeAreaData } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import areaTopographyMasterService from 'src/services/general/project/area-topography-master-service';

import { useQuery } from '@tanstack/react-query';

interface BridgeAreaDataFormProps {
  formik: FormikProps<BridgeAreaData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const BridgeAreaDataForm: React.FC<BridgeAreaDataFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: areaTopographies } = useQuery({
    queryKey: ['masterCategory', 'areaTopography'],
    queryFn: () => areaTopographyMasterService.getAll({})
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.name')}
          placeholder={transl('project.other.bridge-area-data.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.bridge-name')}
          placeholder={transl('project.other.bridge-area-data.details.bridge-name')}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.river-width')}
          placeholder={transl('project.other.bridge-area-data.details.river-width')}
          name="river_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.highest-water-level')}
          placeholder={transl('project.other.bridge-area-data.details.highest-water-level')}
          name="highest_water_level"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.lowest-water-level')}
          placeholder={transl('project.other.bridge-area-data.details.lowest-water-level')}
          name="lowest_water_level"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="area_topography_id"
          label={transl('project.other.bridge-area-data.details.area-topography-id')}
          placeholder={transl('project.other.bridge-area-data.details.area-topography-id')}
          options={
            areaTopographies?.payload?.map((areaTopography) => ({
              value: areaTopography.id,
              label: areaTopography.title
            })) || []
          }
        />
        <CustomSwitch
          label={transl('project.other.bridge-area-data.details.detour-possibility')}
          name="detour_possibility"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.road-alignment')}
          placeholder={transl('project.other.bridge-area-data.details.road-alignment')}
          name="road_alignment"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-area-data.details.altitude')}
          placeholder={transl('project.other.bridge-area-data.details.altitude')}
          name="altitude"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={transl('project.other.bridge-area-data.details.load-limit-sign')}
          name="load_limit_sign"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default BridgeAreaDataForm;
