import { FormikProps } from 'formik';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import MaritalStatus, { MaritalStatusType } from 'src/types/member/marital-status';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import MemberAutocomplete from '../../list/member-selector';

interface MaritalStatusFormProps {
  formik: FormikProps<MaritalStatus>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: MaritalStatus;
}

const MaritalStatusForm: React.FC<MaritalStatusFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  const { values } = formik;
  values;
  return (
    <>
      <>
        <CustomSelect
          fullWidth
          label={transl('Status')}
          placeholder={transl('Status')}
          name="status"
          size="sm"
          options={Object.values(MaritalStatusType).map((status) => ({
            value: status,
            label: status
          }))}
          sx={{ mb: 2 }}
        />
        {formik.values.status === MaritalStatusType.Married && (
          <Fragment>
            <CustomTextBox
              fullWidth
              label={transl('date-of-marriage')}
              placeholder={transl('date-of-marriage')}
              name="date_of_marriage"
              type="date"
              size="sm"
              sx={{ mb: 2 }}
            />
            <CustomSwitch
              fullWidth
              label={transl('is-spouse-christian?')}
              placeholder={transl('is-spouse-christian?')}
              name="is_your_spouse_christian"
              type="checkbox"
              size="sm"
              sx={{ mb: 2 }}
            />
            {!formik.values.is_your_spouse_christian ? (
              <>
                <CustomTextBox
                  fullWidth
                  label={transl('spouse-name')}
                  placeholder={transl('spouse-name')}
                  name="spouses_name"
                  size="sm"
                  sx={{ mb: 2 }}
                />
                <CustomTextBox
                  fullWidth
                  label={transl('spouse-phone')}
                  placeholder={transl('spouse-phone')}
                  name="spouses_phone"
                  size="sm"
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <Fragment>
                <CustomSwitch
                  fullWidth
                  label={transl('is-spouse-member?')}
                  placeholder={transl('is-spouse-member?')}
                  name="is_your_spouse_member"
                  type="checkbox"
                  size="sm"
                  sx={{ mb: 2 }}
                />

                {formik.values.is_your_spouse_member ? (
                  <>
                    <MemberAutocomplete label={transl('Spouse Account')} name="spouse_id" member={formik.values.spouse} sx={{ mb: 2 }} />
                  </>
                ) : (
                  <>
                    <CustomTextBox
                      fullWidth
                      label={transl('spouse-name')}
                      placeholder={transl('spouse-name')}
                      name="spouses_name"
                      size="sm"
                      sx={{ mb: 2 }}
                    />
                    <CustomTextBox
                      fullWidth
                      label={transl('spouse-phone')}
                      placeholder={transl('spouse-phone')}
                      name="spouses_phone"
                      size="sm"
                      sx={{ mb: 2 }}
                    />
                    <CustomTextBox
                      fullWidth
                      label={transl('spouse-church')}
                      placeholder={transl('spouse-church')}
                      name="spouses_church"
                      size="sm"
                      sx={{ mb: 2 }}
                    />
                  </>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </>
    </>
  );
};

export default MaritalStatusForm;
