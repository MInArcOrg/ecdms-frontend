import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import DocumentForm from './document-form';
import { IApiPayload } from 'src/types/requests';
import documentApiService from 'src/services/document/document-service';
import { Document } from 'src/types/document';
import moment from 'moment';

interface DocumentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  document: Document;
  typeId: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  documentsubcategory_id: yup.string(),
  author: yup.string().required(),
  copy_right_notice: yup.string().required(),
  description: yup.string().required(),
  documentcategory_id: yup.string().required(),
  edition: yup.string().required(),
  isbn: yup.string().required(),
  publication_date: yup.string().required()
});

const DocumentDrawer = (props: DocumentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, document, typeId } = props;

  const isEdit = document?.id ? true : false;
  const createDocument = async (body: IApiPayload<Document>) => {
    return await documentApiService.create(body);
  };
  const editDocument = async (body: IApiPayload<Document>) => {
    return await documentApiService.update(document?.id || '', body);
  };

  const getPayload = (values: Document) => {
    const payload = {
      data: {
        ...values,
        id: document?.id,
        documenttype_id: typeId
      },
      files: []
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer title={`document.${isEdit ? 'edit-document' : 'create-document'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="document.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...(document as Document), publication_date: moment(document.publication_date).toDate() }}
          createActionFunc={isEdit ? editDocument : createDocument}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Document>) => {
            return <DocumentForm typeId={typeId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DocumentDrawer;
