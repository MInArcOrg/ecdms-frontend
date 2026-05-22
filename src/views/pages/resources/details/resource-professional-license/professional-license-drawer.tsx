import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProfessionalLicenseForm from './professional-license-form';
import professionalLicenseApiService from 'src/services/resource/professional-license-service';
import type { ProfessionalLicense } from 'src/types/resource';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { pastDateRule } from 'src/utils/validator/age';

interface ProfessionalLicenseDrawerProps {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    license: ProfessionalLicense | null;
    professionalId: string;
}

const ProfessionalLicenseDrawer = (props: ProfessionalLicenseDrawerProps) => {
    const { open, toggle, refetch, license, professionalId } = props;

    const validationSchema = yup.object().shape({
        license_type_id: yup.string().required('License Type is required'),
        license_category_id: yup.string().required('License Category is required'),
        license_number: yup.string().required('License Number is required'),
        license_name: yup.string().required('License Name is required'),
        issue_date: pastDateRule().required('Issue Date is required'),
        expire_date: yup.string().required('Expire Date is required'),
        remark: yup.string().required('Remark is required'),
    });

    const isEdit = Boolean(license?.id);

    const createLicense = async (body: IApiPayload<ProfessionalLicense>): Promise<IApiResponse<ProfessionalLicense>> =>
        professionalLicenseApiService.create(body) as Promise<IApiResponse<ProfessionalLicense>>;

    const editLicense = async (body: IApiPayload<ProfessionalLicense>): Promise<IApiResponse<ProfessionalLicense>> =>
        professionalLicenseApiService.update(license?.id || '', body) as Promise<IApiResponse<ProfessionalLicense>>;

    const getPayload = (values: ProfessionalLicense) => ({
        data: {
            ...values,
            id: license?.id,
            professional_id: professionalId,
            issue_date: convertDateToLocaleDate(values.issue_date),
            expire_date: convertDateToLocaleDate(values.expire_date),
        },
        files: []
    });

    const handleClose = () => toggle();

    const onActionSuccess = async () => {
        refetch();
        handleClose();
    };

    return (
        <CustomSideDrawer
            title={`resources.professional.license.${isEdit ? 'edit-license' : 'create-license'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`resources.professional.license.${isEdit ? 'edit-license' : 'create-license'}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{
                        ...license as ProfessionalLicense,
                        issue_date: formatInitialDateDate(license?.issue_date),
                        expire_date: formatInitialDateDate(license?.expire_date),
                    }}
                    createActionFunc={isEdit ? editLicense : createLicense}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<ProfessionalLicense>) => <ProfessionalLicenseForm formik={formik} />}
                </FormPageWrapper>
            )
            }
        </CustomSideDrawer >
    );
};

export default ProfessionalLicenseDrawer;
