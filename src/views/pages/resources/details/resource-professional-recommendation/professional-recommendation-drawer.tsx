import type { FormikProps } from 'formik';
import { useState } from 'react';
import professionalRecommendationApiService from 'src/services/resource/professional-recommendation-service';
import { uploadFile, uploadableResourceFileTypes } from 'src/services/utils/file-utils';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { ProfessionalRecommendation } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RecommendationForm from './professional-recommendation-form';

interface RecommendationDrawerProps {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    professionalId: string;
    recommendation?: ProfessionalRecommendation;
}

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().nullable(),
    file_type: yup.string().nullable()
});

const RecommendationDrawer: React.FC<RecommendationDrawerProps> = (props) => {
    const { open, toggle, refetch, professionalId, recommendation } = props;

    const [uploadableFile, setUploadableFile] = useState<File | null>(null);

    const isEdit = recommendation?.id ? true : false;
    const onFileChange = (file: File | null) => {
        setUploadableFile(file);
    };
    const createRecommendation = async (body: IApiPayload<ProfessionalRecommendation>) => {
        return await professionalRecommendationApiService.create(body);
    };

    const editRecommendation = async (body: IApiPayload<ProfessionalRecommendation>) => {
        return await professionalRecommendationApiService.update(recommendation?.id || '', body);
    };

    const getPayload = (values: ProfessionalRecommendation) => ({
        data: {
            ...values,
            professional_id: professionalId
        },
        files: uploadableFile ? [uploadableFile] : []
    });

    const handleClose = () => {
        toggle();
        setUploadableFile(null);
    };
    const onActionSuccess = async (response: IApiResponse<ProfessionalRecommendation>, payload: IApiPayload<ProfessionalRecommendation>) => {
        if (payload.files.length > 0) {
            await uploadFile(payload.files[0], uploadableResourceFileTypes.resourceProfessionalRecommendation, response?.payload?.id || '', '', '');
        }
        refetch();
        handleClose();
    };
    return (
        <CustomSideDrawer
            title={`resources.professional.recommendation.${isEdit ? 'edit' : 'create'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title="resources.professional.recommendation.title"
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{
                        ...(recommendation || {} as ProfessionalRecommendation)
                    }}
                    createActionFunc={isEdit ? editRecommendation : createRecommendation}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<ProfessionalRecommendation>) => (
                        <RecommendationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
                    )}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default RecommendationDrawer;
