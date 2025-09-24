import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import {
  genderList,
  gridSpacing,
  maritalStatusList,
} from "src/configs/app-constants";
import departmentApiService from "src/services/department/department-service";
import positionApiService from "src/services/department/position-service";
import User from "src/types/admin/user";
import CustomDateSelector from "src/views/shared/form/custom-date-box";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface UserFormProps {
  formik: FormikProps<User>;
  departmentId?: string;
  isEdit: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  formik,
  departmentId,
  isEdit,
}) => {
  const { t: transl } = useTranslation();
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApiService.getAll(dropDownConfig()),
  });

  const { data: positions } = useQuery({
    queryKey: ["positions", departmentId, formik.values.department_id],
    queryFn: () =>
      positionApiService.getAll(
        dropDownConfig({
          filter: {
            department_id: formik.values.department_id || departmentId,
          },
        }),
      ),
  });
  console.log('user datas',formik.values.marital_status);
  useEffect(() => {
    if (departmentId && !formik.values.department_id) {
      formik.setFieldValue("department_id", departmentId);
    }
  }, [departmentId, formik.values.department_id]);
 return (
  <Grid container spacing={gridSpacing}>
    {/* First & Middle Name */}
    <Grid item xs={12} md={6}>
      <CustomTextBox
        fullWidth
        label={transl("department.user.form.first_name")}
        placeholder={transl("department.user.form.first_name")}
        name="first_name"
        size="small"
        sx={{ mb: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <CustomTextBox
        fullWidth
        label={transl("department.user.form.middle_name")}
        placeholder={transl("department.user.form.middle_name")}
        name="middle_name"
        size="small"
        sx={{ mb: 2 }}
      />
    </Grid>

    {/* Last Name & Birth Date */}
    <Grid item xs={12} md={6}>
      <CustomTextBox
        fullWidth
        label={transl("department.user.form.last_name")}
        placeholder={transl("department.user.form.last_name")}
        name="last_name"
        size="small"
        sx={{ mb: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <CustomDateSelector
        fullWidth
        type="date"
        label={transl("department.user.form.birth_date")}
        placeholder={transl("department.user.form.birth_date")}
        name="birth_date"
        size="small"
        sx={{ mb: 2 }}
      />
    </Grid>

    {/* Email & Phone */}
    <Grid item xs={12} md={12}>
      <CustomTextBox
        fullWidth
        type="email"
        label={transl("department.user.form.email")}
        placeholder={transl("department.user.form.email")}
        name="email"
        size="small"
        sx={{ mb: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={12}>
      <CustomPhoneInput
        name="phone"
        label={transl("department.user.form.phone")}
      />
    </Grid>

    {/* Department & Position */}
    {isEdit && (
      <Grid item xs={12} md={12}>
        <CustomSelectBox
          size="small"
          required
          name="department_id"
          label={transl("department.user.form.department")}
          options={
            departments?.payload?.map((department) => ({
              value: department.id,
              label: department.name,
            })) || []
          }
        />
      </Grid>
    )}
    <Grid item xs={12} md={12}>
      <CustomSelectBox
        size="small"
        name="position_id"
        label={transl("department.user.form.position")}
        options={
          positions?.payload?.map((position) => ({
            value: position.id,
            label: position.name,
          })) || []
        }
      />
    </Grid>

    {/* Gender & Marital Status */}
    <Grid item xs={12} md={6}>
      <CustomRadioBox
        label={transl("department.user.form.gender")}
        name="gender"
        options={genderList(transl)}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <CustomRadioBox
        label={transl("department.user.form.marital_status")}
        name="marital_status"
        options={maritalStatusList(transl)}
      />
    </Grid>

    {/* Partner Name - Conditional */}
    {formik.values.marital_status === 1 && (
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("department.user.form.partner_name")}
          placeholder={transl("department.user.form.partner_name")}
          name="partner_name"
          size="small"
        />
      </Grid>
    )}
  </Grid>
);

};
export default UserForm;
