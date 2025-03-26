'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import InternetConnectionForm from './internet-connection-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { InternetConnection } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface InternetConnectionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  internetConnection: InternetConnection;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const InternetConnectionDrawer = (props: InternetConnectionDrawerType) => {
  const { open, toggle, refetch, internetConnection, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    internet_connection_type_id: yup.string().required('Internet connection type is required'),
    routers: yup.boolean().nullable(),
    switches: yup.boolean().nullable(),
    modems: yup.boolean().nullable(),
    cables: yup.boolean().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(internetConnection?.id);

  const createInternetConnection = async (body: IApiPayload<InternetConnection>) =>
    projectOtherApiSecondService<InternetConnection>().create(otherSubMenu?.apiRoute || '', body);

  const editInternetConnection = async (body: IApiPayload<InternetConnection>) =>
    projectOtherApiSecondService<InternetConnection>().update(otherSubMenu?.apiRoute || '', internetConnection?.id || '', body);

  const getPayload = (values: InternetConnection) => ({
    data: {
      ...values,
      project_id: projectId,
      internet_connection_type_id: values.internet_connection_type_id,
      routers: values.routers,
      switches: values.switches,
      modems: values.modems,
      cables: values.cables,
      others: values.others,
      id: internetConnection?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<InternetConnection>, payload: IApiPayload<InternetConnection>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.internetConnection, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.internet-connection.${isEdit ? `edit-internet-connection` : `create-internet-connection`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.internet-connection.${isEdit ? `edit-internet-connection` : `create-internet-connection`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...internetConnection
          }}
          createActionFunc={isEdit ? editInternetConnection : createInternetConnection}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<InternetConnection>) => {
            return <InternetConnectionForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default InternetConnectionDrawer;
