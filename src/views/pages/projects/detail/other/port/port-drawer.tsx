import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import PortForm from './port-form';

import { useState } from 'react';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { Port } from 'src/types/project/other';
import projectOtherApiService from 'src/services/project/project-other-service';

interface PortDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  port: Port;
  projectId: string;
  model: string;
}

const PortDrawer = (props: PortDrawerType) => {
  const { open, toggle, refetch, port, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(port?.id);

  const createPort = async (body: IApiPayload<Port>) => projectOtherApiService<Port>().create(model, body);

  const editPort = async (body: IApiPayload<Port>) => projectOtherApiService<Port>().update(model, port?.id || '', body);

  const getPayload = (values: Port) => ({
    data: {
      ...values,
      id: port?.id,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<Port>, payload: IApiPayload<Port>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.port, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`project.other.port.${isEdit ? `edit-port` : `create-port`}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.port.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(port as Port)
          }}
          createActionFunc={isEdit ? editPort : createPort}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Port>) => {
            return <PortForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default PortDrawer;
