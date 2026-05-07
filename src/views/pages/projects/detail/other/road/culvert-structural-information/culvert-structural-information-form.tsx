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
import type { CulvertBasicData, CulvertStructuralInformation } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface CulvertStructuralInformationFormProps {
  formik: FormikProps<CulvertStructuralInformation>;
  projectId: string;
}

const CulvertStructuralInformationForm: React.FC<CulvertStructuralInformationFormProps> = ({ formik, projectId }) => {
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

  const { data: pierTypes } = useQuery({
    queryKey: ['pier-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.pierType.model }
      })
  });

  const { data: abutmentTypes } = useQuery({
    queryKey: ['abutment-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.abutmentType.model }
      })
  });

  const { data: endwallTypeInlet } = useQuery({
    queryKey: ['endwall-type-inlet-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.endwallTypeInlet.model }
      })
  });

  const { data: endwallTypeOutlet } = useQuery({
    queryKey: ['endwall-type-outlet-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.endwallTypeOutlet.model }
      })
  });

  const { data: pavedWaterWayTypes } = useQuery({
    queryKey: ['paved-water-way-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.pavedWaterWayType.model }
      })
  });

  const { data: soilTypes } = useQuery({
    queryKey: ['soil-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.soilType.model }
      })
  });

  const { data: culvertTypes } = useQuery({
    queryKey: ['culvert-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.culvertType.model }
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
          label={transl('project.other.culvert-structural-information.details.culvert-id')}
          placeholder={transl('project.other.culvert-structural-information.details.culvert-id')}
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

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.culvert-type')}
          placeholder={transl('project.other.culvert-structural-information.details.culvert-type')}
          name="culvertTypeId"
          size="small"
          sx={{ mb: 2 }}
          options={
            culvertTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.culvert-barrel-length')}
          placeholder={transl('project.other.culvert-structural-information.details.culvert-barrel-length')}
          name="culvert_barrel_length"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.culvert-height')}
          placeholder={transl('project.other.culvert-structural-information.details.culvert-height')}
          name="culvert_height"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.opening-number')}
          placeholder={transl('project.other.culvert-structural-information.details.opening-number')}
          name="opening_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.opening-width')}
          placeholder={transl('project.other.culvert-structural-information.details.opening-width')}
          name="opening_width"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.total-culvert-width')}
          placeholder={transl('project.other.culvert-structural-information.details.total-culvert-width')}
          name="total_culvert_width"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.distance-between-barrels')}
          placeholder={transl('project.other.culvert-structural-information.details.distance-between-barrels')}
          name="distance_between_barrels"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.head-wall-length')}
          placeholder={transl('project.other.culvert-structural-information.details.head-wall-length')}
          name="head_wall_length"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.pier-type-id')}
          placeholder={transl('project.other.culvert-structural-information.details.pier-type-id')}
          name="pier_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            pierTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.pier-height')}
          placeholder={transl('project.other.culvert-structural-information.details.pier-height')}
          name="pier_height"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.abutment-type-id')}
          placeholder={transl('project.other.culvert-structural-information.details.abutment-type-id')}
          name="abutment_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            abutmentTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.abutment-average-height')}
          placeholder={transl('project.other.culvert-structural-information.details.abutment-average-height')}
          name="abutment_average_height"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.endwall-type-inlet-id')}
          placeholder={transl('project.other.culvert-structural-information.details.endwall-type-inlet-id')}
          name="endwall_type_inlet_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            endwallTypeInlet?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.endwall-type-outlet-id')}
          placeholder={transl('project.other.culvert-structural-information.details.endwall-type-outlet-id')}
          name="endwall_type_outlet_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            endwallTypeOutlet?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.culvert-structural-information.details.wingwall-average-length')}
          placeholder={transl('project.other.culvert-structural-information.details.wingwall-average-length')}
          name="wingwall_average_length"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.paved-water-way-type-id')}
          placeholder={transl('project.other.culvert-structural-information.details.paved-water-way-type-id')}
          name="paved_water_way_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            pavedWaterWayTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.culvert-structural-information.details.soil-type-id')}
          placeholder={transl('project.other.culvert-structural-information.details.soil-type-id')}
          name="soil_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            soilTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />
      </Grid>
    </Grid>
  );
};

export default CulvertStructuralInformationForm;
