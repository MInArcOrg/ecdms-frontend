/* eslint-disable prettier/prettier */
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FieldArray, FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import generalMasterDataApiService from "src/services/general/general-master-data-service";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { Stakeholder } from "src/types/stakeholder";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import { Icon } from '@iconify/react';
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface StakeholderFormProps {
  formik: FormikProps<Stakeholder>;
  isLocaleEdit?: boolean;
  typeId: string;
  isEdit: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderForm: React.FC<StakeholderFormProps> = ({
  formik,
  isLocaleEdit = false,
  typeId,
  isEdit,
  file,
  onFileChange
}) => {
  const { t: transl } = useTranslation();

  const { data: resourceCategories } = useQuery({
    queryKey: ["masterCategory", "stakeholder"],
    queryFn: () =>
      masterCategoryApiService.getAll("stakeholder", {
        filter: { stakeholdertype_id: typeId },
      }),
  });

  const { data: resourceSubCategories, refetch: refetchSubCategories } =
    useQuery({
      queryKey: ["masterSubCategory", "stakeholder"],
      queryFn: () =>
        masterSubCategoryApiService.getAll("stakeholder", {
          filter: { stakeholdercategory_id: formik.values.stakeholdercategory_id },
        }),
      enabled: !!formik.values.stakeholdercategory_id,
    });

  useEffect(() => {
    refetchSubCategories();
  }, [formik.values.stakeholdercategory_id]);

  const { data: ownershipTypes } = useQuery({
    queryKey: ["ownershipTypes"],
    queryFn: () => generalMasterDataApiService.getAll("ownerships", {}),
  });

  const { data: businessfields } = useQuery({
    queryKey: ["businessfields"],
    queryFn: () => generalMasterDataApiService.getAll("business-fields", {}),
  });

  // Utility to check if there's a primary email or phone
  const hasPrimary = (array: any[], key: string) =>
    array.some((item) => item[key]);

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
            resourceSubCategories?.payload?.map((resourceSubCategory) => ({
              value: resourceSubCategory.id,
              label: resourceSubCategory.title,
            })) || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          name="businessfield_id"
          label={transl("stakeholder.form.businessfield")}
          options={
            businessfields?.payload?.map((businessfield) => ({
              value: businessfield.id,
              label: businessfield.title,
            })) || []
          }
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          name="ownership_id"
          label={transl("stakeholder.form.ownership")}
          options={
            ownershipTypes?.payload?.map((ownership) => ({
              value: ownership.id,
              label: ownership.title,
            })) || []
          }
        />
      </Box>


      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.trade_name")}
        placeholder={transl("stakeholder.form.trade_name")}
        name="trade_name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.tin")}
        placeholder={transl("stakeholder.form.tin")}
        name="tin"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("stakeholder.form.origin")}
        placeholder={transl("stakeholder.form.origin")}
        name="origin"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomDynamicDatePicker
        fullWidth
        label={transl('stakeholder.form.license_issued_date')}
        name="license_issued_date"
        required
        showYearDropdown
        showMonthDropdown
        customInput={<CustomTextBox name="license_issued_date" />}
      />


      {/* Emails Section */}
      {
        !isEdit &&
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            {transl("stakeholder.form.emails")}
          </Typography>
          <FieldArray name="stakeholderemails">
            {({ push, remove }) => {
              const hasPrimaryEmail = hasPrimary(formik.values.stakeholderemails || [], "is_primary");

              return (
                <>
                  {formik.values.stakeholderemails?.map((email, index) => (
                    <Box key={index} mb={2} sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 1,
                    }}>
                      <Box>
                        <CustomTextBox
                          fullWidth
                          label={transl("stakeholder.form.email")}
                          placeholder={transl("stakeholder.form.email")}
                          name={`stakeholderemails[${index}].email`}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <CustomSwitch
                          sx={{ mb: 2 }}
                          name={`stakeholderemails[${index}].is_primary`}
                          label={transl("stakeholder.form.is_primary_email")}
                          checked={email.is_primary}
                          onChange={() => {
                            formik.setFieldValue(
                              `stakeholderemails`,
                              formik.values?.stakeholderemails?.map((e, i) =>
                                i === index
                                  ? { ...e, is_primary: !e.is_primary }
                                  : { ...e, is_primary: false }
                              )
                            );
                          }}
                          disabled={hasPrimaryEmail && !email.is_primary}
                        />
                      </Box>
                      <Box>
                        <Button onClick={() => remove(index)} sx={{ mt: 1 }}>
                          <Icon icon="tabler:trash" fontSize={20} />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                  <Button onClick={() => push({ email: "", is_primary: false })}>
                    <Icon icon="tabler:plus" fontSize={20} />
                  </Button>
                </>
              );
            }}
          </FieldArray>
        </Box>
      }
      {/* Phones Section */}
      {
        !isEdit &&
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            {transl("stakeholder.form.phones")}
          </Typography>
          <FieldArray name="stakeholderphones">
            {({ push, remove }) => {
              const hasPrimaryPhone = hasPrimary(formik?.values?.stakeholderphones || [], "is_primary");

              return (
                <>
                  {formik.values.stakeholderphones?.map((phone, index) => (
                    <Box key={index} mb={2} sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 1,
                    }}>
                      <Box>

                        <CustomPhoneInput
                          fullWidth
                          label={transl("stakeholder.form.phone")}
                          placeholder={transl("stakeholder.form.phone")}
                          name={`stakeholderphones[${index}].phone`}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <CustomSwitch
                          sx={{ mb: 2 }}
                          name={`stakeholderphones[${index}].is_primary`}
                          label={transl("stakeholder.form.is_primary_phone")}
                          checked={phone.is_primary}
                          onChange={() => {
                            formik.setFieldValue(
                              `stakeholderphones`,
                              formik.values?.stakeholderphones?.map((p, i) =>
                                i === index
                                  ? { ...p, is_primary: !p.is_primary }
                                  : { ...p, is_primary: false }
                              )
                            );
                          }}
                          disabled={hasPrimaryPhone && !phone.is_primary}
                        />
                      </Box>
                      <Box>
                        <Button onClick={() => remove(index)} sx={{ mt: 1 }}>
                          <Icon icon="tabler:trash" fontSize={20} />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                  <Button onClick={() => push({ phone: "", is_primary: false })}>
                    <Icon icon="tabler:plus" fontSize={20} />
                  </Button>
                </>
              );
            }}
          </FieldArray>
        </Box>
      }
      <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default StakeholderForm;
