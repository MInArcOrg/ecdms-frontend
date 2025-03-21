import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import InternetConnectionInfrastructureManufacturerForm from './internet-connection-infrastructure-manufacturer-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { InternetConnectionInfrastructureManufacturer } from 'src/types/project/other';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface InternetConnectionInfrastructureManufacturerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const InternetConnectionInfrastructureManufacturerDrawer = (props: InternetConnectionInfrastructureManufacturerDrawerType) => {
  const { open, toggle, refetch, internetConnectionInfrastructureManufacturer, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    internet_connection_id: yup.string().required('Internet Connection ID is required'),
    routers: yup.string().nullable(),
    switches: yup.string().nullable(),
    modems: yup.string().nullable(),
    cables: yup.string().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(internetConnectionInfrastructureManufacturer?.id);

  const createInternetConnectionInfrastructureManufacturer = async (body: IApiPayload<InternetConnectionInfrastructureManufacturer>) =>
    projectOtherApiSecondService<InternetConnectionInfrastructureManufacturer>().create(otherSubMenu?.apiRoute || '', body);

  const editInternetConnectionInfrastructureManufacturer = async (body: IApiPayload<InternetConnectionInfrastructureManufacturer>) =>
    projectOtherApiSecondService<InternetConnectionInfrastructureManufacturer>().update(
      otherSubMenu?.apiRoute || '',
      internetConnectionInfrastructureManufacturer?.id || '',
      body
    );

  const getPayload = (values: InternetConnectionInfrastructureManufacturer) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<InternetConnectionInfrastructureManufacturer>,
    payload: IApiPayload<InternetConnectionInfrastructureManufacturer>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.internetConnectionInfrastructureManufacturer,
        response.payload.id,
        '',
        ''
      );
    }
    refetch();
    handleClose();
  };

  const initialValues = {
    ...internetConnectionInfrastructureManufacturer,
    internet_connection_id: internetConnectionInfrastructureManufacturer?.internet_connection_id || '',
    routers: internetConnectionInfrastructureManufacturer?.routers || '',
    switches: internetConnectionInfrastructureManufacturer?.switches || '',
    modems: internetConnectionInfrastructureManufacturer?.modems || '',
    cables: internetConnectionInfrastructureManufacturer?.cables || '',
    others: internetConnectionInfrastructureManufacturer?.others || ''
  };

  return (
    <CustomSideDrawer
      title={`project.other.internet-connection-infrastructure-manufacturer.${isEdit ? `edit-internet-connection-infrastructure-manufacturer` : `create-internet-connection-infrastructure-manufacturer`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.internet-connection-infrastructure-manufacturer.${isEdit ? `edit-internet-connection-infrastructure-manufacturer` : `create-internet-connection-infrastructure-manufacturer`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={initialValues}
          createActionFunc={isEdit ? editInternetConnectionInfrastructureManufacturer : createInternetConnectionInfrastructureManufacturer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<InternetConnectionInfrastructureManufacturer>) => {
            return (
              <InternetConnectionInfrastructureManufacturerForm
                projectId={projectId}
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default InternetConnectionInfrastructureManufacturerDrawer;
