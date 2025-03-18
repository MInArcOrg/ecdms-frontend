import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import InternetConnectionInfrastructureAgeForm from './internet-connection-infrastructure-age-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { InternetConnectionInfrastructureAge } from 'src/types/project/other';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface InternetConnectionInfrastructureAgeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const InternetConnectionInfrastructureAgeDrawer = (props: InternetConnectionInfrastructureAgeDrawerType) => {
  const { open, toggle, refetch, internetConnectionInfrastructureAge, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    internet_connection_id: yup.string().required('Internet Connection ID is required'),
    routers: yup.number().nullable(),
    switches: yup.number().nullable(),
    modems: yup.number().nullable(),
    cables: yup.number().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(internetConnectionInfrastructureAge?.id);

  const createInternetConnectionInfrastructureAge = async (body: IApiPayload<InternetConnectionInfrastructureAge>) =>
    projectOtherApiSecondService<InternetConnectionInfrastructureAge>().create(otherSubMenu?.apiRoute || '', body);

  const editInternetConnectionInfrastructureAge = async (body: IApiPayload<InternetConnectionInfrastructureAge>) =>
    projectOtherApiSecondService<InternetConnectionInfrastructureAge>().update(
      otherSubMenu?.apiRoute || '',
      internetConnectionInfrastructureAge?.id || '',
      body
    );

  const getPayload = (values: InternetConnectionInfrastructureAge) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<InternetConnectionInfrastructureAge>, payload: IApiPayload<InternetConnectionInfrastructureAge>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.internetConnectionInfrastructureAge, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.internet-connection-infrastructure-age.${isEdit ? `edit-internet-connection-infrastructure-age` : `create-internet-connection-infrastructure-age`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.internet-connection-infrastructure-age.${isEdit ? `edit-internet-connection-infrastructure-age` : `create-internet-connection-infrastructure-age`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...internetConnectionInfrastructureAge,
            internet_connection_id: internetConnectionInfrastructureAge?.internet_connection_id || '',
            routers: internetConnectionInfrastructureAge?.routers || 0,
            switches: internetConnectionInfrastructureAge?.switches || 0,
            modems: internetConnectionInfrastructureAge?.modems || 0,
            cables: internetConnectionInfrastructureAge?.cables || 0,
            others: internetConnectionInfrastructureAge?.others || ''
          }}
          createActionFunc={isEdit ? editInternetConnectionInfrastructureAge : createInternetConnectionInfrastructureAge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<InternetConnectionInfrastructureAge>) => {
            return (
              <InternetConnectionInfrastructureAgeForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default InternetConnectionInfrastructureAgeDrawer;
