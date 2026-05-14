import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import LicenseForm from './stakeholder-license-form';
import stakeholderLicenseApiService from 'src/services/stakeholder/stakeholder-license-service';
import type { StakeholderLicense } from 'src/types/stakeholder/stakeholder-license';
import type { IApiResponse } from 'src/types/requests';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { useTranslation } from 'react-i18next';

interface LicenseDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  license: StakeholderLicense;
  stakeholderId: string;
  typeTitle?: string;
}

const LicenseDrawer = (props: LicenseDrawerType) => {
  const { open, toggle, refetch, license, stakeholderId, typeTitle } = props;
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    license_type: yup.string().required('License type is required'),
    license_category: yup.string().required('License category is required'),
    license_name: yup.string().required('License name is required'),
    license_scope: yup.string().required('License scope is required'),
    licensing_body: yup.string().required('Licensing body is required'),
    license_number: yup.string().required('License number is required'),
    issue_date: yup.date().required('Issue date is required'),
    expire_date: yup.date().required('Expire date is required'),
    remark: yup.string()
  });

  const isEdit = Boolean(license?.id);

  const createLicense = async (body: IApiPayload<StakeholderLicense>): Promise<IApiResponse<StakeholderLicense>> => {
    return stakeholderLicenseApiService.create(body);
  };

  const editLicense = async (body: IApiPayload<StakeholderLicense>): Promise<IApiResponse<StakeholderLicense>> => {
    return stakeholderLicenseApiService.update(license?.id || '', body);
  };

  const getPayload = (values: StakeholderLicense) => ({
    data: {
      ...values,
      license_type: values.license_type,
      license_category: values.license_category,
      license_name: values.license_name,
      license_scope: values.license_scope,
      licensing_body: values.licensing_body,
      license_number: values.license_number,
      issue_date: convertDateToLocaleDate(values.issue_date),
      expire_date: convertDateToLocaleDate(values.expire_date),
      remark: values.remark,
      id: license?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderLicense>) => {
    refetch();
    handleClose();
  };

  const formatTitleWithType = (key: string) => {
    const base = t(key);
    if (!typeTitle) return base;
    if (/\b(Stakeholder|Stakholder)\b/i.test(base)) {
      return base.replace(/\b(Stakeholder|Stakholder)\b/gi, typeTitle);
    }
    if (/^(Add|Edit)\b/i.test(base)) {
      return base.replace(/^(Add|Edit)\b/i, `$1 ${typeTitle}`);
    }
    return `${typeTitle} ${base}`;
  };

  const titleKey = `stakeholder.stakeholder-license.${isEdit ? 'edit' : 'create'}`;
  const translatedTitle = formatTitleWithType(titleKey);

  return (
    <CustomSideDrawer
      title={titleKey}
      translatedTitle={typeTitle ? translatedTitle : undefined}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={titleKey}
          translatedTitle={typeTitle ? translatedTitle : undefined}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...license,
            stakeholder_id: stakeholderId,
            license_type: license?.license_type || '',
            license_category: license?.license_category || '',
            license_name: license?.license_name || '',
            license_scope: license?.license_scope || '',
            licensing_body: license?.licensing_body || '',
            license_number: license?.license_number || '',
            issue_date: formatInitialDateDate(license?.issue_date),
            expire_date: formatInitialDateDate(license?.expire_date),
            remark: license?.remark || ''
          }}
          createActionFunc={isEdit ? editLicense : createLicense}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderLicense>) => <LicenseForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default LicenseDrawer;
