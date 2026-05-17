import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { isArray } from 'lodash';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { Project } from 'src/types/project';
import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';
import { convertToGC, getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { dropDownConfig } from 'src/configs/api-constants';

interface ProjectFormProps {
  formik: FormikProps<Project>;

  typeId: string;
  module?: 'project' | 'infrastructure';
}

const ProjectForm: React.FC<ProjectFormProps> = ({ formik, typeId, module }) => {
  const { t: transl, i18n } = useTranslation();
  const { values, setFieldValue } = formik;
  const isInfrastructure = module === 'infrastructure';

  const handleNumberChange = (field: keyof Project, value: string | number) => {
    const v = value === '' ? null : Number(value);
    setFieldValue(field, Number.isNaN(v as number) ? null : v);
  };

  const toGregorian = useCallback(
    (dateValue?: string | Date | EthiopianDate | null) => {
      if (!dateValue) return null;
      if (dateValue instanceof EthiopianDate) return convertToGC(dateValue);
      const date = new Date(dateValue as any);
      return isNaN(date.getTime()) ? null : date;
    },
    []
  );

  const isSameDay = useCallback(
    (a?: string | Date | EthiopianDate | null, b?: string | Date | EthiopianDate | null) => {
      const dateA = toGregorian(a);
      const dateB = toGregorian(b);
      if (!dateA || !dateB) return !dateA && !dateB;
      return moment(dateA).isSame(dateB, 'day');
    },
    [toGregorian]
  );

  const { data: projectStatus } = useQuery({
    queryKey: ['projectTypes', projectMasterModels.projectStatus.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.projectStatus.model
          }
        })
      )
  });

  const infrastructureDefaultStatusId =
    isInfrastructure && isArray(projectStatus?.payload)
      ? projectStatus?.payload?.find((status) => status?.title?.toString().trim().toLowerCase() === 'completed')?.id
      : undefined;
  const { data: sourceOffunds } = useQuery({
    queryKey: ['sourceOfFunds', projectMasterModels.sourceOfFund.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.sourceOfFund.model
          }
        })
      )
  });
  const { data: projectCategories } = useQuery({
    queryKey: ['masterCategory', 'project', typeId],
    queryFn: () =>
      masterCategoryApiService.getAll(
        'project',
        dropDownConfig({
          filter: {
            projecttype_id: typeId
          }
        })
      ),
    enabled: !!typeId
  });

  const { data: projectSubCategories, refetch: refetchSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'project', values.projectcategory_id],
    queryFn: () =>
      masterSubCategoryApiService.getAll(
        'project',
        dropDownConfig({
          filter: {
            projectcategory_id: values.projectcategory_id
          }
        })
      ),
    enabled: !!values.projectcategory_id // Only fetch subcategories when a category is selected
  });

  useEffect(() => {
    if (values.projectcategory_id) {
      refetchSubCategories();
    }
  }, [values.projectcategory_id, refetchSubCategories]);

  // Handle auto-calculation of completion date from commencement + duration
  useEffect(() => {
    const commencementDate = toGregorian(values.commencement_date);
    const duration = values.original_contract_duration;

    if (!commencementDate || duration === undefined || duration === null) return;

    const computedCompletion = moment(commencementDate).add(duration, 'days').toDate();
    const dynamicCompletion = getDynamicDate(i18n, computedCompletion);

    if (!isSameDay(values.completion_date, dynamicCompletion)) {
      setFieldValue('completion_date', dynamicCompletion, false);
    }
  }, [i18n, isSameDay, setFieldValue, toGregorian, values.commencement_date, values.original_contract_duration]);

  // Handle auto-calculation of duration from commencement + completion
  useEffect(() => {
    const commencementDate = toGregorian(values.commencement_date);
    const completionDate = toGregorian(values.completion_date);

    if (!commencementDate || !completionDate) return;

    const computedDuration = moment(completionDate).diff(moment(commencementDate), 'days');

    if (values.original_contract_duration !== computedDuration) {
      // Check if this update would trigger a loop by re-calculating the same completion date
      const recalculatedCompletion = moment(commencementDate).add(computedDuration, 'days').toDate();
      if (isSameDay(completionDate, recalculatedCompletion)) {
        setFieldValue('original_contract_duration', computedDuration, false);
      }
    }
  }, [isSameDay, setFieldValue, toGregorian, values.commencement_date, values.completion_date]);

  useEffect(() => {
    if (!isInfrastructure) return;
    if (!infrastructureDefaultStatusId) return;
    if (values.status_id !== infrastructureDefaultStatusId) {
      setFieldValue('status_id', infrastructureDefaultStatusId, false);
    }
  }, [infrastructureDefaultStatusId, isInfrastructure, setFieldValue, values.status_id]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={isInfrastructure ? 12 : 4}>
          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {isInfrastructure ? 'General Info' : 'Project Setup'}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  <CustomSelect
                    fullWidth
                    size="small"
                    name="projectcategory_id"
                    label={transl('project.form.category')}
                    options={
                      projectCategories?.payload?.map((projectCategory) => ({
                        value: projectCategory.id,
                        label: projectCategory.title
                      })) || []
                    }
                  />
                  <CustomSelect
                    fullWidth
                    size="small"
                    name="projectsubcategory_id"
                    label={transl('project.form.sub-category')}
                    options={
                      isArray(projectSubCategories?.payload)
                        ? projectSubCategories?.payload?.map((projectSubCategory) => ({
                          value: projectSubCategory.id,
                          label: projectSubCategory.title
                        }))
                        : []
                    }
                  />
                  <CustomSelect
                    fullWidth
                    size="small"
                    name="status_id"
                    label={transl('project.form.status')}
                    required={true}
                    disabled={isInfrastructure}
                    options={
                      isArray(projectStatus?.payload)
                        ? projectStatus?.payload?.map((projectSubCategory) => ({
                          value: projectSubCategory.id,
                          label: projectSubCategory.title
                        }))
                        : []
                    }
                  />
                  <CustomTextBox
                    fullWidth
                    label={isInfrastructure ? 'Name' : transl('project.form.name')}
                    placeholder={isInfrastructure ? 'Name' : transl('project.form.name')}
                    name="name"
                    size="small"
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {transl('project.form.remark')}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <CustomTextBox
                    fullWidth
                    label={transl('project.form.remark')}
                    placeholder={transl('project.form.remark')}
                    name="remark"
                    multiline={true}
                    rows="4"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {!isInfrastructure && (
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Contract & Codes
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <CustomTextBox
                      fullWidth
                      label={transl('project.form.contract-no')}
                      placeholder={transl('project.form.contract-no')}
                      name="contract_no"
                      size="small"
                    />
                    <CustomTextBox
                      fullWidth
                      label={transl('project.form.budget-code')}
                      placeholder={transl('project.form.budget-code')}
                      name="budget_code"
                      size="small"
                    />
                    <CustomTextBox
                      fullWidth
                      label={transl('project.form.procurement-number')}
                      placeholder={transl('project.form.procurement-number')}
                      name="procurement_no"
                      size="small"
                    />
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {transl('project.main-contract-price.price-details')}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <CustomTextBox
                      fullWidth
                      label={transl('project.main-contract-price.form.main-contract-price-amount')}
                      placeholder={transl('project.main-contract-price.form.main-contract-price-amount')}
                      name="main_contract_price_amount"
                      size="small"
                      type="number"
                      onValueChange={(value: string | number) => handleNumberChange('main_contract_price_amount', value)}
                    />
                    <CustomSelect
                      fullWidth
                      size="small"
                      name="source_of_fund_id"
                      label={transl('project.main-contract-price.form.source-of-finance')}
                      options={
                        isArray(sourceOffunds?.payload)
                          ? sourceOffunds?.payload?.map((sourceOfFund) => ({
                            value: sourceOfFund.id,
                            label: sourceOfFund.title
                          }))
                          : []
                      }
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        )}

        {!isInfrastructure && (
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Additional
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  <CustomTextBox
                    fullWidth
                    label={transl('project.form.grade')}
                    placeholder={transl('project.form.grade')}
                    name="grade"
                    size="small"
                  />
                  <CustomTextBox
                    fullWidth
                    label={transl('project.form.end-user')}
                    placeholder={transl('project.form.end-user')}
                    name="end_user"
                    size="small"
                  />
                  <CustomTextBox
                    fullWidth
                    label={transl('project.form.function')}
                    placeholder={transl('project.form.function')}
                    name="function"
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card> */}

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {transl('project.project-time.information')}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <CustomDynamicDatePicker
                      fullWidth
                      label={transl('project.project-time.form.commencement-date')}
                      name="commencement_date"
                      showYearDropdown
                      showMonthDropdown
                      customInput={<CustomTextBox name="commencement_date" />}
                    />
                    <CustomTextBox
                      fullWidth
                      label={transl('project.project-time.form.original-contract-duration')}
                      placeholder={transl('project.project-time.form.original-contract-duration')}
                      name="original_contract_duration"
                      size="small"
                      type="number"
                      onValueChange={(value: string | number) => handleNumberChange('original_contract_duration', value)}
                    />
                    <CustomDynamicDatePicker
                      fullWidth
                      label={transl('project.project-time.completion-date')}
                      name="completion_date"
                      showYearDropdown
                      showMonthDropdown
                      customInput={<CustomTextBox name="completion_date" />}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        )}


      </Grid>
    </>
  );
};

export default ProjectForm;
