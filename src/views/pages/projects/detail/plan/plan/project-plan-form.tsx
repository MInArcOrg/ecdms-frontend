import React, { Fragment, useEffect, useState } from "react";
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
import Icon from "src/@core/components/icon";
import CustomAutocomplete from "src/views/shared/form/custom-autocomplete";

export interface ProjectPlanFormProps {
  formik: FormikProps<ProjectPlan>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  viewSections:{
    manpower: boolean;
    subtotal: boolean;
  };
  toggleSection:(section: 'manpower' | 'subtotal')=>void
}

const ProjectPlanForm: React.FC<ProjectPlanFormProps> = ({
  formik,
  file,
  onFileChange,
  viewSections,
  toggleSection
}) => {
  const { t: transl } = useTranslation();
 

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
            name="type"
            size="small"
            options={planReportTypeOptions}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomAutocomplete
            fullWidth
            label={transl("project.plan.form.year")}
            name="year"
            size="small"
            options={yearListOptions}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomSelect
            fullWidth
            label={transl("project.plan.form.quarter")}
            name="quarter"
            size="small"
            options={yearQuarterOptions}
          />
        </Grid>
      </Grid>

      {viewSections.subtotal && (
        <Fragment>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => toggleSection("manpower")}
                  sx={{ mr: 1 }}
                >
                  <Icon
                    icon={`tabler:${
                      viewSections.manpower
                        ? "chevron-left"
                        : "chevron-right"
                    }`}
                    width={20}
                    height={20}
                  />
                </IconButton>
                <CustomTextBox
                  type="number"
                  fullWidth
                  label={transl("project.plan.form.manpower")}
                  name="manpower"
                  size="small"
                  disabled={viewSections.manpower}
                />
              </Box>
            </Grid>

            {viewSections.manpower && (
              <>
                <Grid item xs={12} md={4}>
                  <CustomTextBox
                    type="number"
                    fullWidth
                    label={transl("project.plan.form.direct-labour")}
                    name="direct_labour"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextBox
                    type="number"
                    fullWidth
                    label={transl("project.plan.form.indirect-labour")}
                    name="indirect_labour"
                    size="small"
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl("project.plan.form.material")}
                name="material"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl("project.plan.form.machinery")}
                name="machinery"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl("project.plan.form.other-expense")}
                name="other_expense"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl("project.plan.form.sub-contractor-cost")}
                name="sub_contractor_cost"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl("project.plan.form.cost-due-to-rework")}
                name="cost_due_to_rework"
                size="small"
              />
            </Grid>
          </Grid>
        </Fragment>
      )}

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() => toggleSection("subtotal")}
              sx={{ mr: 1 }}
            >
              <Icon
                icon={`tabler:${
                  viewSections.subtotal ? "chevron-left" : "chevron-right"
                }`}
                width={20}
                height={20}
              />
            </IconButton>
            <CustomTextBox
              type="number"
              fullWidth
              label={transl("project.plan.form.subtotal")}
              name="subtotal"
              size="small"
              disabled={viewSections.subtotal}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.profit")}
            name="profit"
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.over-head-cost")}
            name="over_head_cost"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.total-cost")}
            name="project_expense"
            disabled
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.financial-performance")}
            name="financial_performance"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl("project.plan.form.physical-performance")}
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
