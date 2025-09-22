import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import DataCollectionGuide from "src/types/general/data-collection-guide";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface DataCollectionGuideFormProps {
  formik: FormikProps<DataCollectionGuide>;
  defaultLocaleData?: DataCollectionGuide;
}

const DataCollectionGuideForm: React.FC<DataCollectionGuideFormProps> = ({
  formik,
  defaultLocaleData,
}) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("data-collection-guide.form.title")}
        placeholder={transl("data-collection-guide.form.title")}
        name="title"
        size="small"
        sx={{ mb: 2 }}
        required
      />
      <CustomTextBox
        fullWidth
        label={transl("data-collection-guide.form.description")}
        placeholder={transl("data-collection-guide.form.description")}
        name="description"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("data-collection-guide.form.instruction")}
        placeholder={transl("data-collection-guide.form.instruction")}
        name="instruction"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("data-collection-guide.form.data_collection_frequency")}
        placeholder={transl(
          "data-collection-guide.form.data_collection_frequency",
        )}
        name="data_collection_frequency"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("data-collection-guide.form.data_source")}
        placeholder={transl("data-collection-guide.form.data_source")}
        name="data_source"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl(
          "data-collection-guide.form.responsible_data_collector_body",
        )}
        placeholder={transl(
          "data-collection-guide.form.responsible_data_collector_body",
        )}
        name="responsible_data_collector_body"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default DataCollectionGuideForm;
