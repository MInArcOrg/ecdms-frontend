import { FormikProps } from 'formik';
import { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ContactForm from './professional-contact-form';
import professionalContactApiService from 'src/services/resource/professional-contact-service';
import { ProfessionalContact } from 'src/types/resource';

interface ContactDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  contact: ProfessionalContact;
  professionalId: string;
}

const ContactDrawer = (props: ContactDrawerType) => {
  const { open, toggle, refetch, contact, professionalId } = props;

  const validationSchema = yup.object().shape({
    phone_no: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const isEdit = Boolean(contact?.id);

  const createContact = async (body: IApiPayload<ProfessionalContact>) => 
    professionalContactApiService.create(body);

  const editContact = async (body: IApiPayload<ProfessionalContact>) => 
    professionalContactApiService.update(contact?.id || '', body);

  const getPayload = (values: ProfessionalContact) => ({
    data: {
      ...values,
      id: contact?.id,
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
    <CustomSideDrawer
      title={`professional.contact.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`professional.contact.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(contact as ProfessionalContact)
          }}
          createActionFunc={isEdit ? editContact : createContact}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProfessionalContact>) => (
            <ContactForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ContactDrawer;