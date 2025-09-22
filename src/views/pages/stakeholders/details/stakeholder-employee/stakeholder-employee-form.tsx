import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { StakeholderEmployee } from "src/types/stakeholder/stakeholder-employee";
import type { StakeholderDepartment } from "src/types/stakeholder/stakeholder-department";
import type { StakeholderPosition } from "src/types/stakeholder/stakeholder-positions";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import { genderList } from "src/configs/app-constants";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";

interface EmployeeFormProps {
  formik: FormikProps<StakeholderEmployee>;
  departments: StakeholderDepartment[];
  positions: StakeholderPosition[];
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  formik,
  departments,
  positions,
}) => {
  const { t } = useTranslation();

  const departmentOptions = departments.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }));

  const positionOptions = positions.map((pos) => ({
    value: pos.id,
    label: pos.name,
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t("stakeholder.employee.department")}
          name="stakeholder_department_id"
          options={departmentOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t("stakeholder.employee.position")}
          name="stakeholder_position_id"
          options={positionOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.employee.firstName")}
          name="first_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.employee.middleName")}
          name="middle_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.employee.lastName")}
          name="last_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.employee.nationalIdNo")}
          name="national_id_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox
          fullWidth
          label={t("stakeholder.employee.gender")}
          name="gender"
          options={genderList(t)}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput
          fullWidth
          label={t("stakeholder.employee.phone")}
          name="phone"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.employee.email")}
          name="email"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
