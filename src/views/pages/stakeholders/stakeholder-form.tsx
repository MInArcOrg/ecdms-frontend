/* eslint-disable prettier/prettier */
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { Stakeholder } from "src/types/stakeholder";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import stakeholderGeneralMasterDataApiService from "src/services/general/stakeholder-general-master-data-service";
import { stakeholderMasterModels } from "src/constants/master-data/stakeholder-general-master-constants";
import countriesList from "src/constants/countries";
import { dropDownConfig } from "src/configs/api-constants";

interface StakeholderFormProps {
  formik: FormikProps<Stakeholder>;

  typeId: string;
  isEdit: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderForm: React.FC<StakeholderFormProps> = ({
  formik,

  typeId,
  isEdit,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  const { data: resourceCategories } = useQuery({
    queryKey: ["masterCategory", "stakeholder"],
    queryFn: () =>
      masterCategoryApiService.getAll("stakeholder", dropDownConfig({
        filter: { stakeholdertype_id: typeId },
      })),
  });

  const { data: resourceSubCategories, refetch: refetchSubCategories } =
    useQuery({
      queryKey: ["masterSubCategory", "stakeholder"],
      queryFn: () =>
        masterSubCategoryApiService.getAll("stakeholder", dropDownConfig({
          filter: {
            stakeholdercategory_id: formik.values.stakeholdercategory_id,
          },
        })),
      enabled: !!formik.values.stakeholdercategory_id,
    });

  useEffect(() => {
    refetchSubCategories();
  }, [formik.values.stakeholdercategory_id]);

  const { data: ownershipTypes } = useQuery({
    queryKey: ["ownershipTypes", stakeholderMasterModels.businessfield.model],
    queryFn: () => stakeholderGeneralMasterDataApiService.getAll(dropDownConfig({
      filter: {
        model: stakeholderMasterModels.ownershiptype.model,
      }
    })),
  });

  const { data: businessfields } = useQuery({
    queryKey: ["businessfields", stakeholderMasterModels.businessfield.model],
    queryFn: () => stakeholderGeneralMasterDataApiService.getAll(dropDownConfig({
      filter: {
        model: stakeholderMasterModels.businessfield.model,
      }
    })),
  });

  useEffect(() => {
    if (isEdit) return;

    const currentEmails = Array.isArray(formik.values.stakeholderemails)
      ? formik.values.stakeholderemails
      : [];
    const nextEmails = currentEmails.slice(0, 1);

    if (nextEmails.length === 0) {
      nextEmails.push({ email: "", is_primary: true } as any);
    } else {
      nextEmails[0] = { ...nextEmails[0], is_primary: true } as any;
    }

    const emailsOk =
      Array.isArray(formik.values.stakeholderemails) &&
      formik.values.stakeholderemails.length === 1 &&
      !!(formik.values.stakeholderemails[0] as any)?.is_primary;

    if (!emailsOk) {
      formik.setFieldValue("stakeholderemails", nextEmails);
    }

    const currentPhones = Array.isArray(formik.values.stakeholderphones)
      ? formik.values.stakeholderphones
      : [];
    const nextPhones = currentPhones.slice(0, 2);

    while (nextPhones.length < 2) {
      nextPhones.push({ phone: "", is_primary: false } as any);
    }

    const primaryIndex = nextPhones.findIndex((p: any) => !!p?.is_primary);
    const resolvedPrimaryIndex = primaryIndex === -1 ? 0 : primaryIndex;
    const normalizedPhones = nextPhones.map((p: any, i: number) => ({
      ...p,
      is_primary: i === resolvedPrimaryIndex,
    }));

    const phonesOk =
      Array.isArray(formik.values.stakeholderphones) &&
      formik.values.stakeholderphones.length === 2 &&
      formik.values.stakeholderphones.filter((p: any) => !!p?.is_primary)
        .length === 1;

    if (!phonesOk) {
      formik.setFieldValue("stakeholderphones", normalizedPhones);
    }
  }, [isEdit, formik.values.stakeholderemails, formik.values.stakeholderphones]);

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
        maxLength={10}
        size="small"
        sx={{ mb: 2 }}
      />
      <Box mb={2}>
        <CustomSelect
          name="origin"
          label={transl("stakeholder.form.origin")}
          options={
            countriesList.map((country) => ({
              value: country.title,
              label: country.title,
            })) || []
          }
        />
      </Box>

      <CustomTextBox
        fullWidth
        label="License Number"
        placeholder="License Number"
        name="license_number"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomDynamicDatePicker
        fullWidth
        label={transl("stakeholder.form.license_issued_date")}
        name="license_issued_date"
        required
        showYearDropdown
        showMonthDropdown
        customInput={<CustomTextBox name="license_issued_date" />}
      />

      {/* Emails Section */}
      {!isEdit && (
        <Box mb={2}>
  
          
            <Box>
              <CustomTextBox
                fullWidth
                label={transl("stakeholder.form.email")}
                placeholder={transl("stakeholder.form.email")}
                name="stakeholderemails[0].email"
                size="small"
                type="email"
                sx={{ mb: 1 }}
              />
            </Box>
          </Box>
      )}
      {/* Phones Section */}
      {!isEdit && (
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            {transl("stakeholder.form.phones")}
          </Typography>
          {(() => {
            const stakeholderPhones = Array.isArray(formik.values?.stakeholderphones)
              ? (formik.values.stakeholderphones as any[])
              : [];
            const primaryIndex = stakeholderPhones.findIndex((p: any) => !!p?.is_primary);
            const resolvedPrimaryIndex = primaryIndex === -1 ? 0 : primaryIndex;

            return [0, 1].map((index) => (
              <Box
                key={index}
                mb={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                }}
              >
                <Box>
                  <CustomPhoneInput
                    fullWidth
                    label={`${transl("stakeholder.form.phone")} ${index + 1}`}
                    placeholder={transl("stakeholder.form.phone")}
                    name={`stakeholderphones[${index}].phone`}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    label={transl("stakeholder.form.is_primary_phone")}
                    control={
                      <Switch
                        checked={index === resolvedPrimaryIndex}
                        onChange={(_event, nextChecked) => {
                          if (!nextChecked) return;
                          formik.setFieldValue(
                            "stakeholderphones",
                            stakeholderPhones.map((p: any, i: number) => ({
                              ...p,
                              is_primary: i === index,
                            }))
                          );
                        }}
                      />
                    }
                    sx={{ mb: 2 }}
                  />
                </Box>
              </Box>
            ));
          })()}
        </Box>
      )}
      <CustomFileUpload
        label={transl("common.form.file-upload")}
        file={file}
        onFileChange={onFileChange}
      />
    </>
  );
};

export default StakeholderForm;
