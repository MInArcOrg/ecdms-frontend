// src/views/stakeholder/document/document-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import StakeholderDocumentForm from './stakeholder-document-form';
import type { FileTypeConfig } from './file-type-config';
import stakeholderDocumentApiService from 'src/services/stakeholder/stakeholder-document-service';
import { StakeholderDocument } from 'src/types/stakeholder/other';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { pastDateRule } from 'src/utils/validator/age';


interface StakeholderDocumentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderDocument: StakeholderDocument;
  stakeholderId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
  titleKey: string;       // Contextual key for the CREATE title (e.g., "Create Strategy Document")
  editTitleKey: string;   // Contextual key for the EDIT title (e.g., "Edit Strategy Document Record")
}

const StakeholderDocumentDrawer = ({
  open,
  toggle,
  refetch,
  stakeholderDocument: data,
  stakeholderId,
  fileTypesConfig,
  titleKey,
  editTitleKey
}: StakeholderDocumentDrawerProps) => {
  const isEdit = Boolean(data?.id);

  // Ensure document_type is always available for form context (pre-set by list component)
  const documentType = data?.document_type || '';

  // Dynamic state initialization for all files
  const initialFileStates = fileTypesConfig.reduce((acc, config) => {
    acc[config.key] = null;
    return acc;
  }, {} as Record<string, File | null>);

  const [fileStates, setFileStates] = useState<Record<string, File | null>>(initialFileStates);

  const handleFileChange = (key: string, file: File | null) => {
    setFileStates(prev => ({ ...prev, [key]: file }));
  };

  // Validation Schema
  const validationSchema = yup.object().shape({
    document_type: yup
      .string()
      .required('Document Type is required'),
    title: yup
      .string()
      .required('Title is required'),
    description: yup
      .string()
      .required('Description is required'),
    author: yup
      .string()
      .required('Author is required'),
    edition: yup.string().nullable(),
    publication_date: pastDateRule().required('Publication Date is required'),
    isbn: yup.string().nullable(),
    copy_right_notice: yup.string().nullable(),
  });

  // API Service Calls
  const createRecord = async (body: IApiPayload<StakeholderDocument>) =>
    stakeholderDocumentApiService.create(body);

  const editRecord = async (body: IApiPayload<StakeholderDocument>) =>
    stakeholderDocumentApiService.update(
      data.id as string,
      body
    );

  // Payload Construction
  const getPayload = (
    values: StakeholderDocument
  ): IApiPayload<StakeholderDocument> => {
    return {
      data: {
        ...values,
        stakeholder_id: stakeholderId,
        document_type: documentType,
        publication_date: convertDateToLocaleDate(values.publication_date)
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  // Handle post-action file upload
  const onActionSuccess = async (response: IApiResponse<StakeholderDocument>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // Dynamic Upload Loop
      for (const config of fileTypesConfig) {
        const file = fileStates[config.key];

        if (file) {
          await uploadFile(
            file,
            config.type,
            recordId,
            `${file.name}_document`,
            ''
          );
        }
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={isEdit ? editTitleKey : titleKey} // Contextual Drawer Title
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={isEdit ? editTitleKey : titleKey} // Contextual FormWrapper Title
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
            publication_date: formatInitialDateDate(data?.publication_date)
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderDocument>) => (
            <StakeholderDocumentForm
              formik={formik}
              fileTypesConfig={fileTypesConfig}
              fileStates={fileStates}
              onFileChange={handleFileChange}
              isDocumentTypeReadOnly={true} // Constraint applied: document type cannot be changed from this view
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderDocumentDrawer;