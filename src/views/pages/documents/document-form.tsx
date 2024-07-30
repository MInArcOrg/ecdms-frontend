import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { isArray } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { Document } from 'src/types/document';
import CustomDateSelector from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface DocumentFormProps {
  formik: FormikProps<Document>;
  isLocaleEdit?: boolean;
  typeId: string;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ formik, isLocaleEdit = false, typeId }) => {
  const { t: transl } = useTranslation();

  const { data: documentCategories } = useQuery({
    queryKey: ['masterCategory', 'document'],
    queryFn: () =>
      masterCategoryApiService.getAll('document', {
        filter: {
          documenttype_id: typeId
        }
      })
  });

  const { data: documentSubCategories, refetch: refetchSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'document'],
    queryFn: () =>
      masterSubCategoryApiService.getAll('document', {
        filter: {
          documentcategory_id: formik.values.documentcategory_id
        }
      }),
    enabled: !!formik.values.documentcategory_id // Only fetch subcategories when a category is selected
  });

  useEffect(() => {
    if (formik.values.documentcategory_id) {
      refetchSubCategories();
    }
  }, [formik.values.documentcategory_id, refetchSubCategories]);

  return (
    <>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="documentcategory_id"
          label={transl('document.form.category')}
          options={
            documentCategories?.payload?.map((documentCategory) => ({
              value: documentCategory.id,
              label: documentCategory.title
            })) || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="documentsubcategory_id"
          label={transl('document.form.sub-category')}
          options={
            isArray(documentSubCategories?.payload)
              ? documentSubCategories?.payload?.map((documentSubCategory) => ({
                  value: documentSubCategory.id,
                  label: documentSubCategory.title
                }))
              : [] || []
          }
        />
      </Box>
      <CustomTextBox
        fullWidth
        label={transl('document.form.title')}
        placeholder={transl('document.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('document.form.description')}
        placeholder={transl('document.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('document.form.author')}
        placeholder={transl('document.form.author')}
        name="author"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('document.form.copy_right_notice')}
        placeholder={transl('document.form.copy_right_notice')}
        name="copy_right_notice"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('document.form.edition')}
        placeholder={transl('document.form.edition')}
        name="edition"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('document.form.isbn')}
        placeholder={transl('document.form.isbn')}
        name="isbn"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        type="date"
        label={transl('document.form.publication_date')}
        placeholder={transl('document.form.publication_date')}
        name="publication_date"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default DocumentForm;
