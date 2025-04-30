import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import EnvironmentalControlForm from './environmental-control-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { EnvironmentalControl } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface EnvironmentalControlDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  environmentalControl: EnvironmentalControl;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const EnvironmentalControlDrawer = (props: EnvironmentalControlDrawerType) => {
  const { open, toggle, refetch, environmentalControl, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    data_center_id: yup.string().required('Data Center ID is required'),
    temperature: yup.string().nullable(),
    humidity: yup.string().nullable(),
    air_quality: yup.string().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(environmentalControl?.id);

  const createEnvironmentalControl = async (body: IApiPayload<EnvironmentalControl>) =>
    projectOtherApiSecondService<EnvironmentalControl>().create(otherSubMenu?.apiRoute || '', body);

  const editEnvironmentalControl = async (body: IApiPayload<EnvironmentalControl>) =>
    projectOtherApiSecondService<EnvironmentalControl>().update(otherSubMenu?.apiRoute || '', environmentalControl?.id || '', body);

  const getPayload = (values: EnvironmentalControl) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<EnvironmentalControl>, payload: IApiPayload<EnvironmentalControl>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.environmentalControl, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.environmental-control.${isEdit ? `edit-environmental-control` : `create-environmental-control`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.environmental-control.${isEdit ? `edit-environmental-control` : `create-environmental-control`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...environmentalControl,
            data_center_id: environmentalControl?.data_center_id || '',
            temperature: environmentalControl?.temperature || '',
            humidity: environmentalControl?.humidity || '',
            air_quality: environmentalControl?.air_quality || '',
            others: environmentalControl?.others || ''
          }}
          createActionFunc={isEdit ? editEnvironmentalControl : createEnvironmentalControl}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<EnvironmentalControl>) => {
            return <EnvironmentalControlForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EnvironmentalControlDrawer;
