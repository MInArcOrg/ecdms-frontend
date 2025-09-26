import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { masterDataFlagConstanct } from "src/configs/app-constants";
import { MasterType } from "src/types/master/master-types";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

// Extend MasterType to include referenceFile for formik values

interface MasterTypeFormProps {
  formik: FormikProps<MasterType>; // Use ExtendedMasterType in FormikProps

  defaultLocaleData?: MasterType;
  onFileChange: (file: File | null) => void;
  file: File | null;
}

const MasterTypeForm: React.FC<MasterTypeFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("master-data.form.title")}
        placeholder={transl("master-data.form.title")}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl("master-data.form.description")}
        placeholder={transl("master-data.form.description")}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomSelectBox
        fullWidth
        label={transl("master-data.form.flag")}
        placeholder={transl("master-data.form.flag")}
        name="flag"
        size="small"
        options={masterDataFlagConstanct(transl)}
        sx={{ mb: 2 }}
      />

      <CustomFileUpload
        label={"File Upload"}
        file={file}
        onFileChange={onFileChange}
      />
    </>
  );
};

export default MasterTypeForm;
