import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { CulvertBasicData, CulvertRoadOverInformation } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface CulvertRoadOverInformationFormProps {
  formik: FormikProps<CulvertRoadOverInformation>;
  projectId: string;
}

const CulvertRoadOverInformationForm: React.FC<CulvertRoadOverInformationFormProps> = ({ formik, projectId }) => {
  const { t: transl } = useTranslation();

  const { data: culverts } = useQuery({
    queryKey: ['culvert-basic-datas', projectId],
    queryFn: () =>
      projectOtherApiSecondService<CulvertBasicData>().getAll(
        'culvert-basic-datas',
        dropDownConfig({
          filter: { project_id: projectId }
        })
      )
  });

  const { data: guardRailTypes } = useQuery({
    queryKey: ['guard-rail-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.guardRailType.model }
      })
  });
  useEffect(() => {
       if(!formik.values.culvert_id) return;
    formik.setFieldValue('road_segment_id', culverts?.payload?.find((item) => item.id === formik.values.culvert_id)?.road_segment_id || '');

  }, [formik.values.culvert_id]);
  
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.culvert-id')}
          placeholder={transl('project.other.culvert-road-over-information.details.culvert-id')}
          name="culvert_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            culverts?.payload?.map((item) => ({
              label: item?.name || `${item.id.slice(0, 5)}...`,
              value: item.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.carriage-way-width')}
          placeholder={transl('project.other.culvert-road-over-information.details.carriage-way-width')}
          name="carriage_way_width"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.side-walk-width')}
          placeholder={transl('project.other.culvert-road-over-information.details.side-walk-width')}
          name="side_walk_width"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.lane-number')}
          placeholder={transl('project.other.culvert-road-over-information.details.lane-number')}
          name="lane_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.head-wall-to-head-wall')}
          placeholder={transl('project.other.culvert-road-over-information.details.head-wall-to-head-wall')}
          name="head_wall_to_head_wall"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.average-fill-height')}
          placeholder={transl('project.other.culvert-road-over-information.details.average-fill-height')}
          name="average_fill_height"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.guard-rail-type-id')}
          placeholder={transl('project.other.culvert-road-over-information.details.guard-rail-type-id')}
          name="guard_rail_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            guardRailTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-road-over-information.details.parapet-length')}
          placeholder={transl('project.other.culvert-road-over-information.details.parapet-length')}
          name="parapet_length"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default CulvertRoadOverInformationForm;
