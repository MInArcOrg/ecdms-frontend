import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import DocumentForm from "./document-form";
import { IApiPayload } from "src/types/requests";
import documentApiService from "src/services/document/document-service";
import { Document } from "src/types/document";
import moment from "moment";

interface DocumentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  document: Document;
  typeId: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(36),
  documentcategory_id: yup.string().required("Document category is required"),
  documentsubcategory_id: yup.string().nullable(),
  description: yup.string().nullable(),
  author: yup.string().nullable().max(36),
  publishing_organization: yup.string().nullable().max(36),
  publication_date: yup.date().nullable(),
  reference_no: yup.string().nullable().max(100),
  language: yup.string().nullable().max(100),
  keywords: yup.string().nullable(),
  country_or_region: yup.string().nullable().max(100),
  sector_id: yup.string().nullable(),
  related_entity_id: yup.string().nullable(),
  legal_status: yup.string().nullable().max(50),
  confidentiality_level: yup.string().nullable().max(50),
  file_format: yup.string().nullable().max(20),
  file_size_mb: yup.number().nullable(),
  document_link: yup.string().nullable().max(100),
  version_no: yup.number().integer().nullable(),
  remark: yup.string().nullable(),
});

const DocumentDrawer = (props: DocumentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, document, typeId } = props;

  const isEdit = document?.id ? true : false;
  const createDocument = async (body: IApiPayload<Document>) => {
    return await documentApiService.create(body);
  };
  const editDocument = async (body: IApiPayload<Document>) => {
    return await documentApiService.update(document?.id || "", body);
  };

  const getPayload = (values: Document) => {
    const payload = {
      data: {
        ...values,
        id: document?.id,
        documenttype_id: typeId,
      },
      files: [],
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
    <CustomSideDrawer
      title={`document.${isEdit ? "edit-document" : "create-document"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="document.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...document,
            publication_date: moment(document.publication_date).toDate(),
          }}
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
