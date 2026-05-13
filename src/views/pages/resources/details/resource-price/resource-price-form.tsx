import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { dropDownConfig } from 'src/configs/api-constants';
import resourceBrandApiService from 'src/services/resource/resource-brand-service';
import resourceSpecificationApiService from 'src/services/resource/resource-specification-service';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { resourceMasterModels } from 'src/constants/master-data/resource-general-master-constants';
import { ResourcePrice } from 'src/types/resource';
import CustomDateSelector from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ResourcePriceFormProps {
  formik: FormikProps<ResourcePrice>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  resourceId: string;
}

const ResourcePriceForm: React.FC<ResourcePriceFormProps> = ({
  formik,
  file,
  onFileChange,
  resourceId
}) => {
  const { t } = useTranslation();

  const { data: resourceBrands } = useQuery({
    queryKey: ['resource-brand', resourceId],
    queryFn: () =>
      resourceBrandApiService.getAll(
        dropDownConfig({
          filter: { resource_id: resourceId }
        })
      )
  });

  const { data: resourceSpecifications } = useQuery({
    queryKey: ['resource-specification', resourceId],
    queryFn: () =>
      resourceSpecificationApiService.getAll(
        dropDownConfig({
          filter: { resource_id: resourceId }
        })
      )
  });

  const fetchMasterData = (modelKey: keyof typeof resourceMasterModels) => {
    const model = resourceMasterModels[modelKey];
    return generalMasterDataApiService.getAllResourceGeneralMaster(
      model.dbModel,
      dropDownConfig()
    );
  };

  const { data: qualities } = useQuery({
    queryKey: ['master-data', 'quality'],
    queryFn: () => fetchMasterData('quality')
  });

  const { data: supplierNames } = useQuery({
    queryKey: ['master-data', 'supplierName'],
    queryFn: () => fetchMasterData('supplierName')
  });

  const { data: supplierAddresses } = useQuery({
    queryKey: ['master-data', 'supplierAddress'],
    queryFn: () => fetchMasterData('supplierAddress')
  });

  const { data: unitPrices } = useQuery({
    queryKey: ['master-data', 'unitPrice'],
    queryFn: () => fetchMasterData('unitPrice')
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          size="small"
          name="resource_brand_id"
          label={t('resource.resource-price.form.brand')}
          options={
            resourceBrands?.payload?.map((item) => ({
              value: item.id,
              label: item.name
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          size="small"
          name="resource_specification_id"
          label={t('resource.resource-price.form.specification')}
          options={
            resourceSpecifications?.payload?.map((item) => ({
              value: item.id,
              label: item.title
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          size="small"
          name="supplier_name_id"
          label={t('resource.resource-price.form.supplier-name')}
          options={
            supplierNames?.payload?.map((item) => ({
              value: item.id,
              label: item.title
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          size="small"
          name="supplier_address_id"
          label={t('resource.resource-price.form.supplier-address')}
          options={
            supplierAddresses?.payload?.map((item) => ({
              value: item.id,
              label: item.title
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomSelect
          fullWidth
          size="small"
          name="quality_id"
          label={t('resource.resource-price.form.quality')}
          options={
            qualities?.payload?.map((item) => ({
              value: item.id,
              label: item.title
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomSelect
          fullWidth
          size="small"
          name="unit_price_id"
          label={t('resource.resource-price.form.unit-price')}
          options={
            unitPrices?.payload?.map((item) => ({
              value: item.id,
              label: item.title
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          type="number"
          size="small"
          name="total_quantity_available"
          label={t('resource.resource-price.form.total-quantity-available')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateSelector
          fullWidth
          size="small"
          name="price_date"
          label={t('resource.resource-price.form.price-date')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={3}
          size="small"
          name="remark"
          label={t('resource.resource-price.form.remark')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ResourcePriceForm;
