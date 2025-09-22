import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { RoadSegment } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelectBox from "src/views/shared/form/custom-select";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

import { useQuery } from "@tanstack/react-query";

interface RoadSegmentFormProps {
  formik: FormikProps<RoadSegment>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RoadSegmentForm: React.FC<RoadSegmentFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  const { data: surfaceTypes } = useQuery({
    queryKey: ["surface-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.surfaceType.model },
      }),
  });

  const { data: designStandardTypes } = useQuery({
    queryKey: ["design-standard-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.designStandard.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-segment.details.name")}
          placeholder={transl("project.other.road-segment.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="surface_type_id"
          label={transl("project.other.road-segment.details.surface-type-id")}
          placeholder={transl(
            "project.other.road-segment.details.surface-type-id",
          )}
          options={
            surfaceTypes?.payload?.map((surfaceTypes) => ({
              value: surfaceTypes.id,
              label: surfaceTypes.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-segment.details.start-northing")}
          placeholder={transl(
            "project.other.road-segment.details.start-northing",
          )}
          name="start_northing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-segment.details.start-easting")}
          placeholder={transl(
            "project.other.road-segment.details.start-easting",
          )}
          name="start_easting"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-segment.details.end-northing")}
          placeholder={transl(
            "project.other.road-segment.details.end-northing",
          )}
          name="end_northing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-segment.details.end-easting")}
          placeholder={transl("project.other.road-segment.details.end-easting")}
          name="end_easting"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          label={transl(
            "project.other.road-segment.details.design-standard-id",
          )}
          placeholder={transl(
            "project.other.road-segment.details.design-standard-id",
          )}
          name="design_standard_id"
          options={
            designStandardTypes?.payload?.map((designStandardTypes) => ({
              value: designStandardTypes.id,
              label: designStandardTypes.title,
            })) || []
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("common.form.file-upload")}
          file={file}
          onFileChange={onFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RoadSegmentForm;
