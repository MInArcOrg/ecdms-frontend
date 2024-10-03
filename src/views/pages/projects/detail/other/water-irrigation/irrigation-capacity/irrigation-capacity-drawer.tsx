import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import IrrigationCapacityForm from './irrigation-capacity-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { IrrigationCapacity } from 'src/types/project/other';

interface IrrigationCapacityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  irrigationCapacity: IrrigationCapacity;
  projectId: string;
  model: string;
}

const IrrigationCapacityDrawer = (props: IrrigationCapacityDrawerType) => {
  const { open, toggle, refetch, irrigationCapacity, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(irrigationCapacity?.id);

  const createIrrigationCapacity = async (body: IApiPayload<IrrigationCapacity>) =>
    projectOtherApiService<IrrigationCapacity>().create(model, body);

  const editIrrigationCapacity = async (body: IApiPayload<IrrigationCapacity>) =>
    projectOtherApiService<IrrigationCapacity>().update(model, irrigationCapacity?.id || '', body);

  const getPayload = (values: IrrigationCapacity) => {
    return {
      data: {
        ...values,
        id: irrigationCapacity?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<IrrigationCapacity>, payload: IApiPayload<IrrigationCapacity>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.irrigationCapacity, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.irrigation-capacity.${isEdit ? `edit-irrigation-capacity` : `create-irrigation-capacity`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.irrigation-capacity.${isEdit ? `edit-irrigation-capacity` : `create-irrigation-capacity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(irrigationCapacity as IrrigationCapacity)
          }}
          createActionFunc={isEdit ? editIrrigationCapacity : createIrrigationCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<IrrigationCapacity>) => {
            return <IrrigationCapacityForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default IrrigationCapacityDrawer;
