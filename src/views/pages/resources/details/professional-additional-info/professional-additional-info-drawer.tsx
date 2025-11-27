import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AdditionalInfoForm from './professional-additional-info-form';
import professionalAdditionalInfoApiService from 'src/services/resource/professional-additional-info-service';
import type { ProfessionalAdditionalInfo } from 'src/types/resource';

interface AdditionalInfoDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  additionalInfo: ProfessionalAdditionalInfo;
  professionalId: string;
}

const AdditionalInfoDrawer = (props: AdditionalInfoDrawerType) => {
  const { open, toggle, refetch, additionalInfo, professionalId } = props;

  const validationSchema = yup.object().shape({
    additional_information: yup.string().required('Additional information is required')
  });

  const isEdit = Boolean(additionalInfo?.id);

  const createAdditionalInfo = async (body: IApiPayload<ProfessionalAdditionalInfo>) => professionalAdditionalInfoApiService.create(body);

  const editAdditionalInfo = async (body: IApiPayload<ProfessionalAdditionalInfo>) =>
    professionalAdditionalInfoApiService.update(additionalInfo?.id || '', body);

  const getPayload = (values: ProfessionalAdditionalInfo) => ({
    data: {
      ...values,
      id: additionalInfo?.id,
      professional_id: professionalId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = () => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`resources.professional.additional-info.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`resources.professional.additional-info.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(additionalInfo as ProfessionalAdditionalInfo)
          }}
          createActionFunc={isEdit ? editAdditionalInfo : createAdditionalInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProfessionalAdditionalInfo>) => <AdditionalInfoForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AdditionalInfoDrawer;
