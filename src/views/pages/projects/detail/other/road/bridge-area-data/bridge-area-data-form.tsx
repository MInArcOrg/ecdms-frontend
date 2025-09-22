"use client";

import { Grid, FormControlLabel, Switch } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import type { BridgeAreaData } from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface BridgeAreaDataFormProps {
  formik: FormikProps<BridgeAreaData>;
}

const BridgeAreaDataForm: React.FC<BridgeAreaDataFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: areaTopographies } = useQuery({
    queryKey: ["area-topographies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.areaTopography.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-area-data.details.name")}
          placeholder={transl("project.other.bridge-area-data.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-area-data.details.bridge-name")}
          placeholder={transl(
            "project.other.bridge-area-data.details.bridge-name",
          )}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-area-data.details.river-width")}
          placeholder={transl(
            "project.other.bridge-area-data.details.river-width",
          )}
          name="river_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-area-data.details.highest-water-level",
          )}
          placeholder={transl(
            "project.other.bridge-area-data.details.highest-water-level",
          )}
          name="highest_water_level"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-area-data.details.lowest-water-level",
          )}
          placeholder={transl(
            "project.other.bridge-area-data.details.lowest-water-level",
          )}
          name="lowest_water_level"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.bridge-area-data.details.area-topography-id",
          )}
          placeholder={transl(
            "project.other.bridge-area-data.details.area-topography-id",
          )}
          name="area_topography_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            areaTopographies?.payload.map((topography) => ({
              label: topography.title,
              value: topography.id,
            })) || []
          }
        />

        <FormControlLabel
          control={
            <Switch
              checked={formik.values.detour_possibility || false}
              onChange={(e) =>
                formik.setFieldValue("detour_possibility", e.target.checked)
              }
              name="detour_possibility"
            />
          }
          label={transl(
            "project.other.bridge-area-data.details.detour-possibility",
          )}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-area-data.details.road-alignment",
          )}
          placeholder={transl(
            "project.other.bridge-area-data.details.road-alignment",
          )}
          name="road_alignment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-area-data.details.altitude")}
          placeholder={transl(
            "project.other.bridge-area-data.details.altitude",
          )}
          name="altitude"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formik.values.load_limit_sign || false}
              onChange={(e) =>
                formik.setFieldValue("load_limit_sign", e.target.checked)
              }
              name="load_limit_sign"
            />
          }
          label={transl(
            "project.other.bridge-area-data.details.load-limit-sign",
          )}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BridgeAreaDataForm;
