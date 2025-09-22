import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import roleApiService from "src/services/admin/role-service";
import Position from "src/types/department/position";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface PositionFormProps {
  formik: FormikProps<Position>;

  defaultLocaleData?: Position;
}

const PositionForm: React.FC<PositionFormProps> = ({
  formik,
  defaultLocaleData,
}) => {
  const { t: transl } = useTranslation();
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleApiService.getAll(dropDownConfig({})),
  });
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("department.position.form.name")}
        placeholder={transl("department.position.form.name")}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl("department.position.form.description")}
        placeholder={transl("department.position.form.description")}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomSelectBox
        size="small"
        name="role_id"
        label={transl("department.position.form.role")}
        options={
          roles?.payload?.map((role) => ({
            value: role.id,
            label: role.name,
          })) || []
        }
      />
    </>
  );
};
export default PositionForm;
