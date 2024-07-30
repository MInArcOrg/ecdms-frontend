import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { Resource } from 'src/types/resource';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ResourceFormProps {
  formik: FormikProps<Resource>;
  isLocaleEdit?: boolean;
  typeId: string;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ formik, isLocaleEdit = false, typeId }) => {
  const { t: transl } = useTranslation();
  const { data: resourceCategories } = useQuery({
    queryKey: ['masterCategory', 'resource'],
    queryFn: () =>
      masterCategoryApiService.getAll('resource', {
        filter: {
          resourcetype_id: typeId
        }
      })
  });
  const { data: resourceSubCategories, refetch: refetchSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'resource'],
    queryFn: () =>
      masterSubCategoryApiService.getAll('resource', {
        filter: {
          resourcecategory_id: formik.values.resourcecategory_id
        }
      }),
    enabled: !!formik.values.resourcecategory_id // Only fetch subcategories when a category is selected
  });
  useEffect(() => {
    refetchSubCategories();
  }, [formik.values.resourcecategory_id]);
  return (
    <>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="resourcecategory_id"
          label={transl('resource.form.category')}
          options={
            resourceCategories?.payload?.map((resourceCategory) => ({
              value: resourceCategory.id,
              label: resourceCategory.title
            })) || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="resourcesubcategory_id"
          label={transl('resource.form.sub-category')}
          options={
            resourceSubCategories?.payload?.map((resourceCategory) => ({
              value: resourceCategory.id,
              label: resourceCategory.title
            })) || []
          }
        />
      </Box>
      <CustomTextBox
        fullWidth
        label={transl('resource.form.title')}
        placeholder={transl('resource.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.form.measurement_unit')}
        placeholder={transl('resource.form.measurement_unit')}
        name="measurement_unit"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('resource.form.description')}
        placeholder={transl('resource.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default ResourceForm;
