import { Box, Grid, IconButton } from '@mui/material';
import { FormikProps } from 'formik';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import CustomTextField from 'src/@core/components/mui/text-field';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { planReportTypeConstant, yearQuarterConstant } from 'src/constants/project-plan-report-constants';
import { ProjectPlan } from 'src/types/project/project-plan';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
export interface ProjectPlanFormProps {
  formik: FormikProps<ProjectPlan>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  viewSections: {
    manpower: boolean;
    subtotal: boolean;
  };
  toggleSection: (section: 'manpower' | 'subtotal') => void;
}

const ProjectPlanForm: React.FC<ProjectPlanFormProps> = ({ formik, file, onFileChange, viewSections, toggleSection }) => {
  const { t: transl } = useTranslation();
  useEffect(() => {
    const indirectLabour = formik.values.indirect_labour ?? 0;
    const directLabour = formik.values.direct_labour ?? 0;
    formik.setFieldValue('manpower', Number(indirectLabour + directLabour));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.indirect_labour, formik.values.direct_labour]);

  useEffect(() => {
    const material = formik.values.material ?? 0;
    const machinery = formik.values.machinery ?? 0;
    const otherExpense = formik.values.other_expense ?? 0;
    const subContractorCost = formik.values.sub_contractor_cost ?? 0;
    const manpower = formik.values.manpower ?? 0;
    const subtotal = manpower + material + machinery + otherExpense + subContractorCost;
    formik.setFieldValue('subtotal', subtotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.manpower,
    formik.values.material,
    formik.values.machinery,
    formik.values.other_expense,
    formik.values.sub_contractor_cost
  ]);

  useEffect(() => {
    const overHeadCost = formik.values.over_head_cost ?? 0;
    const financialPerformance = formik.values.financial_performance ?? 0;
    const total = overHeadCost + financialPerformance;
    formik.setFieldValue('total', total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.over_head_cost, formik.values.financial_performance]);
  useEffect(() => {
    const subtotal = formik.values?.subtotal || 0;
    const percentOf = (value: number) => {
      return (value * subtotal) / 100;
    };
    formik.setFieldValue('project_expense', Number(subtotal + percentOf(formik.values.over_head_cost || 0)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.subtotal, formik.values.over_head_cost]);
  const planReportTypeOptions = Object.values(planReportTypeConstant).map((type) => ({
    value: type.value,
    label: type.name
  }));

  const yearQuarterOptions = Object.values(yearQuarterConstant).map((type) => ({
    value: type.value,
    label: type.name
  }));

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CustomSelect
            disabled
            fullWidth
            label={transl('project.plan.form.type')}
            name="type"
            size="small"
            options={planReportTypeOptions}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePickerWrapper>
            <DatePicker
              selected={moment(formik.values.year).toDate()}
              required
              showYearDropdown
              showYearPicker
              dateFormat="yyyy"
              id="form-layouts-tabs-date"
              placeholderText="Year"
              customInput={<CustomTextField fullWidth label={transl('project.plan.form.year')} />}
              onChange={(selectedDate) => {
                formik.setFieldValue('year', selectedDate);
              }}
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomSelect fullWidth label={transl('project.plan.form.quarter')} name="quarter" size="small" options={yearQuarterOptions} />
        </Grid>
      </Grid>

      {viewSections.subtotal && (
        <Fragment>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => toggleSection('manpower')} sx={{ mr: 1 }}>
                  <Icon icon={`tabler:${viewSections.manpower ? 'chevron-left' : 'chevron-right'}`} width={20} height={20} />
                </IconButton>
                <CustomTextBox
                  type="number"
                  fullWidth
                  label={transl('project.plan.form.manpower')}
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
                    label={transl('project.plan.form.direct-labour')}
                    name="direct_labour"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextBox
                    type="number"
                    fullWidth
                    label={transl('project.plan.form.indirect-labour')}
                    name="indirect_labour"
                    size="small"
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={4}>
              <CustomTextBox fullWidth type="number" label={transl('project.plan.form.material')} name="material" size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox fullWidth type="number" label={transl('project.plan.form.machinery')} name="machinery" size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox fullWidth type="number" label={transl('project.plan.form.other-expense')} name="other_expense" size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl('project.plan.form.sub-contractor-cost')}
                name="sub_contractor_cost"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextBox
                fullWidth
                type="number"
                label={transl('project.plan.form.cost-due-to-rework')}
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
            <IconButton onClick={() => toggleSection('subtotal')} sx={{ mr: 1 }}>
              <Icon icon={`tabler:${viewSections.subtotal ? 'chevron-left' : 'chevron-right'}`} width={20} height={20} />
            </IconButton>
            <CustomTextBox
              type="number"
              fullWidth
              label={transl('project.plan.form.subtotal')}
              name="subtotal"
              size="small"
              disabled={viewSections.subtotal}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox fullWidth type="number" label={transl('project.plan.form.profit')} name="profit" size="small" disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox fullWidth type="number" label={transl('project.plan.form.over-head-cost')} name="over_head_cost" size="small" />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl('project.plan.form.total-cost')}
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
            label={transl('project.plan.form.financial-performance')}
            name="financial_performance"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextBox
            fullWidth
            type="number"
            label={transl('project.plan.form.physical-performance')}
            name="physical_performance"
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProjectPlanForm;
