import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import GeneratingCapacityForm from './generating-capacity-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { GeneratingCapacity } from 'src/types/project/other';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface GeneratingCapacityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  generatingCapacity: GeneratingCapacity;
  projectId: string;
  model: string;
}

const GeneratingCapacityDrawer = (props: GeneratingCapacityDrawerType) => {
  const { open, toggle, refetch, generatingCapacity, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(generatingCapacity?.id);

  const createGeneratingCapacity = async (body: IApiPayload<GeneratingCapacity>) =>
    projectOtherApiService<GeneratingCapacity>().create(model, body);

  const editGeneratingCapacity = async (body: IApiPayload<GeneratingCapacity>) =>
    projectOtherApiService<GeneratingCapacity>().update(model, generatingCapacity?.id || '', body);

  const getPayload = (values: GeneratingCapacity) => {
    return {
      data: {
        ...values,
        id: generatingCapacity?.id,
        project_id: projectId,
        commission_date: convertDateToLocaleDate(values.commission_date)
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<GeneratingCapacity>, payload: IApiPayload<GeneratingCapacity>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.generatingCapacity, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.generating-capacity.${isEdit ? `edit-generating-capacity` : `create-generating-capacity`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.generating-capacity.${isEdit ? `edit-generating-capacity` : `create-generating-capacity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(generatingCapacity as GeneratingCapacity),
            commission_date: formatInitialDateDate(generatingCapacity?.commission_date)
          }}
          createActionFunc={isEdit ? editGeneratingCapacity : createGeneratingCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GeneratingCapacity>) => {
            return <GeneratingCapacityForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GeneratingCapacityDrawer;
