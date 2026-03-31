import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { isArray } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { Project } from 'src/types/project';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProjectFormProps {
  formik: FormikProps<Project>;

  typeId: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ formik, typeId }) => {
  const { t: transl } = useTranslation();

  const handleNumberChange = (field: keyof Project, value: string | number) => {
    const v = value === '' ? null : Number(value);
    formik.setFieldValue(field, Number.isNaN(v as number) ? null : v);
  };

  const { data: projectStatus } = useQuery({
    queryKey: ['general-master', 'project-progress-statuses'],
    queryFn: () => generalMasterDataApiService.getAll('project-progress-statuses', {})
  });
  const { data: projectCategories } = useQuery({
    queryKey: ['masterCategory', 'project'],
    queryFn: () =>
      masterCategoryApiService.getAll('project', {
        filter: {
          projecttype_id: typeId
        }
      })
  });

  const { data: projectSubCategories, refetch: refetchSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'project'],
    queryFn: () =>
      masterSubCategoryApiService.getAll('project', {
        filter: {
          projectcategory_id: formik.values.projectcategory_id
        }
      }),
    enabled: !!formik.values.projectcategory_id // Only fetch subcategories when a category is selected
  });

  useEffect(() => {
    if (formik.values.projectcategory_id) {
      refetchSubCategories();
    }
  }, [formik.values.projectcategory_id, refetchSubCategories]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Project Setup
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
                    label={transl('project.form.name')}
                    placeholder={transl('project.form.name')}
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
                  <CustomTextBox
                    fullWidth
                    label={transl('project.main-contract-price.form.source-of-finance')}
                    placeholder={transl('project.main-contract-price.form.source-of-finance')}
                    name="source_of_finance"
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card variant="outlined">
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
            </Card>

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
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>


      </Grid>
    </>
  );
};

export default ProjectForm;
