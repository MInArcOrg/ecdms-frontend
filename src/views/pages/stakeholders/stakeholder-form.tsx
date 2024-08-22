/* eslint-disable prettier/prettier */

import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { Stakeholder } from "src/types/stakeholder";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface StakeholderFormProps {
  formik: FormikProps<Stakeholder>;
  isLocaleEdit?: boolean;
  typeId: string;
}

const StakeholderForm: React.FC<StakeholderFormProps> = ({
  formik,
  isLocaleEdit = false,
  typeId,
}) => {
  const { t: transl } = useTranslation();
  const { data: resourceCategories } = useQuery({
    queryKey: ["masterCategory", "stakeholders"],
    queryFn: () =>
      masterCategoryApiService.getAll("stakeholders", {
        filter: {
          stakeholderstype_id: typeId,
        },
      }),
  });
  const { data: resourceSubCategories, refetch: refetchSubCategories } =
    useQuery({
      queryKey: ["masterSubCategory", "stakeholders"],
      queryFn: () =>
        masterSubCategoryApiService.getAll("stakeholders", {
          filter: {
            stakeholdercategory_id: formik.values.stakeholdercategory_id,
          },
        }),
      enabled: !!formik.values.stakeholdercategory_id, // Only fetch subcategories when a category is selected
    });
  useEffect(() => {
    refetchSubCategories();
  }, [formik.values.stakeholdercategory_id]);

  return (
    <>
      <Box mb={2}>
        <CustomSelect
          name="stakeholderscategory_id"
          label={transl("stakeholders.form.category")}
          options={
            resourceCategories?.payload?.map((resourceCategory) => ({
              value: resourceCategory.id,
              label: resourceCategory.title,
            })) || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          name="stakeholderssubcategory_id"
          label={transl("stakeholders.form.sub_category")}
          options={
            resourceSubCategories?.payload?.map((resourceCategory) => ({
              value: resourceCategory.id,
              label: resourceCategory.title,
            })) || []
          }
        />
      </Box>
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.title")}
        placeholder={transl("stakeholders.form.title")}
        name="title"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.field_of_business")}
        placeholder={transl("stakeholders.form.field_of_business")}
        name="field_of_business"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.location")}
        placeholder={transl("stakeholders.form.location")}
        name="location"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.ownership_type")}
        placeholder={transl("stakeholders.form.ownership_type")}
        name="ownership_type"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.trade_name")}
        placeholder={transl("stakeholders.form.trade_name")}
        name="trade_name"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.tin_number")}
        placeholder={transl("stakeholders.form.tin_number")}
        name="tin_number"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.phone")}
        placeholder={transl("stakeholders.form.phone")}
        name="phone"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholders.form.licence_issue_date")}
        placeholder={transl("stakeholders.form.licence_issue_date")}
        name="licence_issue_date"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default StakeholderForm;
