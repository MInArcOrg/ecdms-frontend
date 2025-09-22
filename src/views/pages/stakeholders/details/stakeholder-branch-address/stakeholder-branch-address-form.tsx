import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FormikProps } from "formik";
import { gridSpacing } from "src/configs/app-constants";
import type { StakeholderBranchAddress } from "src/types/stakeholder/stakeholder-branch-address";
import type { StakeholderBranch } from "src/types/stakeholder/stakeholder-branch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomSelect from "src/views/shared/form/custom-select";
import countriesList from "src/constants/countries";

interface BranchAddressFormProps {
  formik: FormikProps<StakeholderBranchAddress>;
  stakeholderBranches: StakeholderBranch[];
}

const BranchAddressForm: React.FC<BranchAddressFormProps> = ({
  formik,
  stakeholderBranches,
}) => {
  const { t } = useTranslation();
  const [country, setCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    const selectedCountry = countriesList.find(
      (c) => c.title === formik.values.country,
    );
    if (selectedCountry) {
      setCountry({
        value: selectedCountry.title,
        label: selectedCountry.title,
      });
    } else {
      setCountry(null);
    }
  }, [formik.values.country]);

  const branchOptions = stakeholderBranches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <CustomSelect
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.branch")}
            name="stakeholder_branch_id"
            options={branchOptions}
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <FormLabel>{t("address.form.country")}</FormLabel>
              <Autocomplete
                options={countriesList.map((country) => ({
                  value: country.title,
                  label: country.title,
                }))}
                size="small"
                disableClearable
                id="autocomplete-outlined"
                value={country || { value: "", label: "" }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                onChange={(event, newValue) => {
                  setCountry(newValue);
                  formik.setFieldValue("country", newValue?.value || "");
                }}
                renderInput={(params) => <TextField {...params} />}
                onBlur={formik.handleBlur}
              />
              {formik.touched.country && formik.errors.country ? (
                <FormHelperText error>{formik.errors.country}</FormHelperText>
              ) : null}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.region")}
            name="region"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.city")}
            name="city"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.subcity")}
            name="subcity"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.woreda")}
            name="woreda"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.street")}
            name="street"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.blockNo")}
            name="block_no"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.website")}
            name="website"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.northing")}
            name="northing"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextBox
            fullWidth
            label={t("stakeholder.stakeholder-branch-address.easting")}
            name="easting"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BranchAddressForm;
