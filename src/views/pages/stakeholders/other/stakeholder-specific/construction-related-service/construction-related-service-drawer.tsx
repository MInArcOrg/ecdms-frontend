import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ConstructionRelatedServiceForm from './construction-related-service-form';

import { useState } from 'react';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ConstructionRelatedService } from 'src/types/stakeholder/other';

interface ConstructionRelatedServiceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  constructionRelatedService: ConstructionRelatedService;
  stakeholderId: string;
  model: string;
}

const ConstructionRelatedServiceDrawer = (props: ConstructionRelatedServiceDrawerType) => {
  const { open, toggle, refetch, constructionRelatedService, stakeholderId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(constructionRelatedService?.id);

  const createConstructionRelatedService = async (body: IApiPayload<ConstructionRelatedService>) =>
    stakeholderOtherApiService<ConstructionRelatedService>().create(model, body);

  const editConstructionRelatedService = async (body: IApiPayload<ConstructionRelatedService>) =>
    stakeholderOtherApiService<ConstructionRelatedService>().update(model, constructionRelatedService?.id || '', body);

  const getPayload = (values: ConstructionRelatedService) => {
    return {
      data: {
        ...values,
        id: constructionRelatedService?.id,
        stakeholder_id: stakeholderId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ConstructionRelatedService>, payload: IApiPayload<ConstructionRelatedService>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableStakeholderFileTypes.other.constructionRelatedService, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.other.stakeholder-service.${isEdit ? `edit-stakeholder-service` : `create-stakeholder-service`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.other.stakeholder-service.${isEdit ? `edit-stakeholder-service` : `create-stakeholder-service`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(constructionRelatedService as ConstructionRelatedService)
          }}
          createActionFunc={isEdit ? editConstructionRelatedService : createConstructionRelatedService}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ConstructionRelatedService>) => {
            return <ConstructionRelatedServiceForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ConstructionRelatedServiceDrawer;
