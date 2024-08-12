import React, { Fragment, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import { ProjectPlan } from "src/types/project/project-plan";
import CustomSelect from "src/views/shared/form/custom-select";
import {
  planReportTypeConstant,
  yearListOptions,
  yearQuarterConstant,
} from "src/constants/project-plan-constants";
import CustomAutocomplete from "src/views/shared/form/custom-autocomplete";
import Icon from "src/@core/components/icon";

export interface ProjectPlanFormProps {
  formik: FormikProps<ProjectPlan>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectPlanForm: React.FC<ProjectPlanFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();
  const [viewManPower, setViewManPower] = useState(true);
  const [viewSubTotal, setViewSubTotal] = useState(true);

  const planReportTypeOptions = Object.values(planReportTypeConstant).map(
    (type) => ({
      value: type.value,
      label: type.name,
    })
  );

  const yearQuarterOptions = Object.values(yearQuarterConstant).map((type) => ({
    value: type.value,
    label: type.name,
  }));

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CustomSelect
            disabled
            fullWidth
            label={transl("project.plan.form.type")}
            placeholder={transl("project.plan.form.type")}
            name="type"
            size="small"
            options={planReportTypeOptions}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomAutocomplete
            fullWidth
            label={transl("project.plan.form.year")}
            placeholder={transl("project.plan.form.year")}
            name="year"
            size="small"
            options={yearListOptions}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomSelect
            type="number"
            fullWidth
            label={transl("project.plan.form.quarter")}
            placeholder={transl("project.plan.form.quarter")}
            name="quarter"
            size="small"
            options={yearQuarterOptions}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4}>
          <Box display={"flex"} alignItems="center" sx={{ justifyContent: 'space-between' }}>
            <IconButton
              onClick={() => {
                setViewManPower(!viewManPower);
              }}
            >
              <Icon
                icon={`tabler:${viewManPower ? "chevron-left" : "chevron-right"}`}
                width={20}
                height={20}
              />
            </IconButton>
            <CustomTextBox
              type="number"
              fullWidth
              label={transl("project.plan.form.manpower")}
              placeholder={transl("project.plan.form.manpower")}
              name="manpower"
              size="small"
            />
          </Box>
        </Grid>
        
        {viewManPower && (
          <Fragment>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                type="number"
                fullWidth
                label={transl("project.plan.form.direct_labour")}
                placeholder={transl("project.plan.form.direct_labour")}
                name="direct_labour"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                type="number"
                fullWidth
                label={transl("project.plan.form.indirect_labour")}
                placeholder={transl("project.plan.form.indirect_labour")}
                name="indirect_labour"
                size="small"
              />
            </Grid>
          </Fragment>
        )}
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.material")}
            placeholder={transl("project.plan.form.material")}
            name="material"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.machinery")}
            placeholder={transl("project.plan.form.machinery")}
            name="machinery"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.other_expense")}
            placeholder={transl("project.plan.form.other_expense")}
            name="other_expense"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.sub_contractor_cost")}
            placeholder={transl("project.plan.form.sub_contractor_cost")}
            name="sub_contractor_cost"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            label={transl("project.plan.form.cost_due_to_rework")}
            placeholder={transl("project.plan.form.cost_due_to_rework")}
            name="cost_due_to_rework"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            label={transl("project.plan.form.over_head_cost")}
            placeholder={transl("project.plan.form.over_head_cost")}
            name="over_head_cost"
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.financial_performance")}
            placeholder={transl("project.plan.form.financial_performance")}
            name="financial_performance"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextBox
            fullWidth
            label={transl("project.plan.form.physical_performance")}
            placeholder={transl("project.plan.form.physical_performance")}
            name="physical_performance"
            size="small"
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
    </Fragment>
  );
};

export default ProjectPlanForm;
