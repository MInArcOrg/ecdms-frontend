import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectFinance } from 'src/types/project';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface MainContractFormProps {
  formik: FormikProps<ProjectFinance>;
}

const MainContractForm: React.FC<MainContractFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('project.main-contract-price.form.main-contract-price')}
        placeholder={transl('project.main-contract-price.form.main-contract-price')}
        name="main_contract_price_amount"
        size="small"
        type="number"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('project.main-contract-price.form.rebate')}
        placeholder={transl('project.main-contract-price.form.rebate')}
        name="rebate"
        size="small"
        type="number"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('project.main-contract-price.form.remark')}
        placeholder={transl('project.main-contract-price.form.remark')}
        name="remark"
        multiline={true}
        rows="4"
      />
    </>
  );
};

export default MainContractForm;
