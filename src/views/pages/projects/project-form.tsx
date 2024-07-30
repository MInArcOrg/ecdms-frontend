import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { isArray } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { Project } from 'src/types/project';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProjectFormProps {
  formik: FormikProps<Project>;
  isLocaleEdit?: boolean;
  typeId: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ formik, isLocaleEdit = false, typeId }) => {
  const { t: transl } = useTranslation();

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
      <Box mb={2}>
        <CustomSelect
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
      </Box>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="projectsubcategory_id"
          label={transl('project.form.sub-category')}
          options={
            isArray(projectSubCategories?.payload)
              ? projectSubCategories?.payload?.map((projectSubCategory) => ({
                  value: projectSubCategory.id,
                  label: projectSubCategory.title
                }))
              : [] || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="status_id"
          label={transl('project.form.status')}
          options={
            isArray(projectStatus?.payload)
              ? projectStatus?.payload?.map((projectSubCategory) => ({
                  value: projectSubCategory.id,
                  label: projectSubCategory.title
                }))
              : [] || []
          }
        />
      </Box>
      <CustomTextBox
        fullWidth
        label={transl('project.form.name')}
        placeholder={transl('project.form.name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.form.contract-no')}
        placeholder={transl('project.form.contract-no')}
        type="number"
        name="contract_no"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.form.budget-code')}
        placeholder={transl('project.form.budget-code')}
        name="budget_code"
        type="number"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.form.procurement-number')}
        placeholder={transl('project.form.procurement-number')}
        name="procurement_no"
        type="number"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.form.remark')}
        placeholder={transl('project.form.remark')}
        name="remark"
        multiline={true}
        rows="4"
      />
    </>
  );
};

export default ProjectForm;
