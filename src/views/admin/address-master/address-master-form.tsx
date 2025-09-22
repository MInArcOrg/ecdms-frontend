import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { AddressMaster, AddressType } from 'src/types/admin/address';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface AddressMasterFormProps {
  formik: FormikProps<AddressMaster>;
  defaultLocaleData?: AddressMaster;
  type: AddressType;
}

const AddressMasterForm: React.FC<AddressMasterFormProps> = ({ type }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      {!type && (
        <CustomSelect
          size="small"
          name="type"
          label={transl('type')}
          options={Object.values(AddressType).map((type) => ({
            value: type,
            label: type.replace('_', ' ').toUpperCase()
          }))}
          sx={{ mb: 2 }}
        />
      )}

      <CustomTextBox fullWidth label={transl('title')} placeholder={transl('title')} name="title" size="small" sx={{ mb: 2 }} />
      <CustomTextBox
        fullWidth
        label={transl('description')}
        placeholder={transl('description')}
        name="description"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default AddressMasterForm;
