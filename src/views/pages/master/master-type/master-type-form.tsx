import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import modelMenuApiService from "src/services/general/model-menu-service";
import { MasterType } from "src/types/master/master-types";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

// Extend MasterType to include referenceFile for formik values

interface MasterTypeFormProps {
  formik: FormikProps<MasterType>; // Use ExtendedMasterType in FormikProps
  isLocaleEdit?: boolean;
  defaultLocaleData?: MasterType;
  onFileChange: (file: File | null) => void;
  file: File | null;
  typeId:string;
  module:string;
}
interface SwitchStates {
  [key: string]: boolean;
}
interface TypeModel {
  model: string;
  status: boolean;
}

const MasterTypeForm: React.FC<MasterTypeFormProps> = ({
  formik,
  isLocaleEdit = false,
  defaultLocaleData,
  file,
  onFileChange,
  typeId,
  module
}) => {
  const { t: transl } = useTranslation();
  const [switchStates, setSwitchStates] = useState<SwitchStates>({});

  const { data: moduleModels } = useQuery(
    {
      queryKey:['module-models',module],
      queryFn: ()=>modelMenuApiService.getModelsByModule(module,{})
    }
  )
  const { data: typeModels, isLoading } = useQuery(
    {
      queryKey:['type-models',typeId],
      queryFn: ()=>modelMenuApiService.getModelsByModule(module,{})
    }
  )



  useEffect(() => {
    const initialStates = typeModels?.reduce((acc, item) => ({ ...acc, [item.model]: false }), {});
    setSwitchStates(moduleModels?.reduce((acc, module) => ({ ...acc, [module]: initialStates[module] ?? false }), {}));
  }, [moduleModels, typeModels]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSwitchStates({
      ...switchStates,
      [name]: checked,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted switch states:', switchStates);
    // Here you can send switchStates to your server or handle it as needed
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted switch states:', switchStates);
    // Here you can send switchStates to your server or handle it as needed
  };
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("master-data.form.title")}
        placeholder={transl("master-data.form.title")}
        name="title"
        size="sm"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl("master-data.form.description")}
        placeholder={transl("master-data.form.description")}
        name="description"
        multiline={true}
        rows="4"
        size="sm"
        sx={{ mb: 2 }}
      />

      <CustomFileUpload
        label={"File Upload"}
        file={file}
        onFileChange={onFileChange}
      />
       <FormGroup>
        <Typography variant="h6">Switches</Typography>
        {moduleModels.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Switch
                checked={switchStates[option]}
                onChange={handleChange}
                name={option}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default MasterTypeForm;
