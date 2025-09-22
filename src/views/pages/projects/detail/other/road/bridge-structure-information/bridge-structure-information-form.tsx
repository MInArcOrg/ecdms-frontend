"use client";

import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import type { BridgeStructureInformation } from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextArea from "src/views/shared/form/custom-text-box";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface BridgeStructureInformationFormProps {
  formik: FormikProps<BridgeStructureInformation>;
}

const BridgeStructureInformationForm: React.FC<
  BridgeStructureInformationFormProps
> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: bridgeStructureTypes } = useQuery({
    queryKey: ["bridge-structure-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.bridgeStructureType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.name",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.name",
          )}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.bridge-name",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.bridge-name",
          )}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.bridge-structure-type-id",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.bridge-structure-type-id",
          )}
          name="bridge_structure_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            bridgeStructureTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.east-region",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.east-region",
          )}
          name="east_region"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.west-region",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.west-region",
          )}
          name="west_region"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.central-region",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.central-region",
          )}
          name="central_region"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.north-region",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.north-region",
          )}
          name="north_region"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.south-region",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.south-region",
          )}
          name="south_region"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.ring-road",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.ring-road",
          )}
          name="ring_road"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl(
            "project.other.bridge-structure-information.details.remark",
          )}
          placeholder={transl(
            "project.other.bridge-structure-information.details.remark",
          )}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          rows={3}
        />
      </Grid>
    </Grid>
  );
};

export default BridgeStructureInformationForm;
