import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { resourceMasterModels } from 'src/constants/master-data/resource-general-master-constants';
import resourceGeneralMasterDataApiService from 'src/services/general/resource-general-master-data-service';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { Resource } from 'src/types/resource';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ResourceFormProps {
  formik: FormikProps<Resource>;
  typeId: string;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ formik, typeId }) => {
  console.log('formik errors', formik.errors);
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
      masterSubCategoryApiService.getAll('resource', dropDownConfig({
        filter: {
          resourcecategory_id: formik.values.resourcecategory_id
        }
      })),
    enabled: !!formik.values.resourcecategory_id // Only fetch subcategories when a category is selected
  });
  const { data: qualityMeasurementUnits } = useQuery({
    queryKey: ['quality-measurement-units', resourceMasterModels.qualityMeasurementUnit.model],
    queryFn: () =>
      resourceGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: resourceMasterModels.qualityMeasurementUnit.model
          }
        })
      )
  });
  const { data: quantityMeasurementUnits } = useQuery({
    queryKey: ['quantity-measurement-units', resourceMasterModels.quantityMeasurementUnit.model],
    queryFn: () =>
      resourceGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: resourceMasterModels.quantityMeasurementUnit.model
          }
        })
      )
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
          label={transl('resource.form.resourcecategory_id')}
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
          label={transl('resource.form.resourcesubcategory_id')}
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
        label={transl('resource.form.name')}
        placeholder={transl('resource.form.name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomSelect
        size="small"
        name="quantity_measurement_unit_id"
        label={transl('resource.form.quantity_measurement_unit_id')}
        options={
          qualityMeasurementUnits?.payload?.map((qualityMeasurementUnit) => ({
            label: qualityMeasurementUnit.title,
            value: qualityMeasurementUnit.id
          })) || []
        }
        sx={{ mb: 2 }}
      />
      <CustomSelect
        size="small"
        name="quality_measurement_unit_id"
        label={transl('resource.form.quality_measurement_unit_id')}
        options={
          quantityMeasurementUnits?.payload?.map((qualityMeasurementUnit) => ({
            label: qualityMeasurementUnit.title,
            value: qualityMeasurementUnit.id
          })) || []
        }
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.form.remark')}
        placeholder={transl('resource.form.remark')}
        name="remark"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default ResourceForm;
