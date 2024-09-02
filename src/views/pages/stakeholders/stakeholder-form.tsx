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
    queryKey: ["masterCategory", "stakeholder"],
    queryFn: () =>
      masterCategoryApiService.getAll("stakeholder", {
        filter: {
          stakeholdertype_id: typeId,
        },
      }),
  });
  const { data: resourceSubCategories, refetch: refetchSubCategories } =
    useQuery({
      queryKey: ["masterSubCategory", "stakeholder"],
      queryFn: () =>
        masterSubCategoryApiService.getAll("stakeholder", {
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
          name="stakeholdercategory_id"
          label={transl("stakeholder.form.category")}
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
          name="stakeholdersubcategory_id"
          label={transl("stakeholder.form.sub_category")}
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
        label={transl("stakeholder.form.title")}
        placeholder={transl("stakeholder.form.title")}
        name="title"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.field_of_business")}
        placeholder={transl("stakeholder.form.field_of_business")}
        name="field_of_business"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.location")}
        placeholder={transl("stakeholder.form.location")}
        name="location"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.ownership_type")}
        placeholder={transl("stakeholder.form.ownership_type")}
        name="ownership_type"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.trade_name")}
        placeholder={transl("stakeholder.form.trade_name")}
        name="trade_name"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.tin_number")}
        placeholder={transl("stakeholder.form.tin_number")}
        name="tin_number"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.phone")}
        placeholder={transl("stakeholder.form.phone")}
        name="phone"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.licence_issue_date")}
        placeholder={transl("stakeholder.form.licence_issue_date")}
        name="licence_issue_date"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default StakeholderForm;
