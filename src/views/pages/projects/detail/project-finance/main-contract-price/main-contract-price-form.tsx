"use client"

import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import type { ProjectGeneralFinance } from "src/types/project/project-finance"
import type { ProjectFinance } from "src/types/project"
import CustomTextBox from "src/views/shared/form/custom-text-box"

interface MainContractPriceFormProps {
  formik: FormikProps<ProjectFinance>
  projectGeneralFinance: ProjectGeneralFinance
}

const MainContractPriceForm: React.FC<MainContractPriceFormProps> = ({
  formik,

  projectGeneralFinance,
}) => {
  const { t } = useTranslation()

  const calculatePriceAfterRebate = useCallback((mainContractPrice: number, rebate: number) => {
    return mainContractPrice * (1 - rebate / 100)
  }, [])

  const handleValueChange = useCallback(
    (name: keyof ProjectFinance, value: number) => {
      formik.setFieldValue(name, value)
      if (name === "main_contract_price_amount" || name === "rebate") {
        const mainContractPrice =
          name === "main_contract_price_amount" ? value : formik.values.main_contract_price_amount || 0
        const rebate = name === "rebate" ? value : formik.values.rebate || 0
        const priceAfterRebate = calculatePriceAfterRebate(mainContractPrice, rebate)
        formik.setFieldValue("price_after_rebate", priceAfterRebate)
      }
    },
    [formik, calculatePriceAfterRebate],
  )

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("project.main-contract-price.form.main-contract-price")}
          placeholder={t("project.main-contract-price.form.main-contract-price")}
          name="main_contract_price_amount"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange("main_contract_price_amount", Number(value))}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("project.main-contract-price.form.rebate")}
          placeholder={t("project.main-contract-price.form.rebate")}
          name="rebate"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange("rebate", Number(value))}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("project.main-contract-price.form.source-of-finance")}
          placeholder={t("project.main-contract-price.form.source-of-finance")}
          name="source_of_finance"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("project.main-contract-price.form.remark")}
          placeholder={t("project.main-contract-price.form.remark")}
          name="remark"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  )
}

export default MainContractPriceForm

