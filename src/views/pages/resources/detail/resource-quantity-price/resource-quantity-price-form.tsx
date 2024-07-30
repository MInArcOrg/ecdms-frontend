import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import resourceBrandApiService from 'src/services/resource/resource-brand-service';
import resourceDetailTypeApiService from 'src/services/resource/resource-detail-type-service';
import { ResourceQuantityPrice } from 'src/types/resource';
import CustomDateSelector from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ResourceQuantityPriceFormProps {
  formik: FormikProps<ResourceQuantityPrice>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ResourceQuantityPrice;
  file: File | null;
  onFileChange: (file: File | null) => void;
  resourceId: string;
}

const ResourceQuantityPriceForm: React.FC<ResourceQuantityPriceFormProps> = ({
  formik,
  isLocaleEdit = false,
  defaultLocaleData,
  file,
  onFileChange,
  resourceId
}) => {
  console.log('Resource Values', formik.values);
  const { t: transl } = useTranslation();
  const { data: resourceBrands } = useQuery({
    queryKey: ['resource-brand', resourceId],
    queryFn: () =>
      resourceBrandApiService.getAll({
        filter: {
          resource_id: resourceId
        }
      })
  });

  const { data: resourceDetailType } = useQuery({
    queryKey: ['detail-resource-type', resourceId],
    queryFn: () =>
      resourceDetailTypeApiService.getAll({
        filter: {
          resource_id: resourceId
        }
      })
  });

  return (
    <>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="resourcebrand_id"
          label={transl('resource.resource-quantity-price.form.brand')}
          options={
            resourceBrands?.payload?.map((resourceBrandId) => ({
              value: resourceBrandId.id,
              label: resourceBrandId.title
            })) || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="detailresourcetype_id"
          label={transl('resource.resource-quantity-price.form.type')}
          options={
            resourceDetailType?.payload?.map((resourceBrandId) => ({
              value: resourceBrandId.id,
              label: resourceBrandId.title
            })) || []
          }
        />
      </Box>

      <CustomTextBox
        fullWidth
        label={transl('resource.resource-quantity-price.form.unit-price')}
        placeholder={transl('resource.resource-quantity-price.form.unit-price')}
        name="unit_price"
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-quantity-price.form.quantity')}
        placeholder={transl('resource.resource-quantity-price.form.quantity')}
        name="quantity"
        size="sm"
        type="number"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-quantity-price.form.store-address')}
        placeholder={transl('resource.resource-quantity-price.form.store-address')}
        name="store_address"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        label={transl('resource.resource-quantity-price.form.date')}
        placeholder={transl('resource.resource-quantity-price.form.date')}
        name="date"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-quantity-price.form.datasource')}
        placeholder={transl('resource.resource-quantity-price.form.datasource')}
        name="datasource"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};
export default ResourceQuantityPriceForm;
