import type { FormikProps } from 'formik';
import type React from 'react';
import { useState } from 'react';
import constructionMethodApiService from 'src/services/project/construction-method-service';
import { uploadFile } from 'src/services/utils/file-utils';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { ConstructionMethod } from 'src/types/project/construction-method';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ConstructionMethodForm from './construction-method-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { useTranslation } from 'react-i18next';

interface ConstructionMethodDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  constructionMethod: ConstructionMethod | null;
}

const ConstructionMethodDrawer: React.FC<ConstructionMethodDrawerProps> = (props) => {
  const { open, toggle, refetch, constructionMethod, projectId } = props;
  const { t } = useTranslation();

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = Boolean(constructionMethod?.id);

  const validationSchema = yup.object().shape({
    project_method_id: yup.string().required(t('project.construction-method.method-required')),
    description: yup.string().nullable()
  });

  const createConstructionMethod = async (body: IApiPayload<ConstructionMethod>) => {
    return await constructionMethodApiService.create(body);
  };

  const editConstructionMethod = async (body: IApiPayload<ConstructionMethod>) => {
    return await constructionMethodApiService.update(constructionMethod?.id || '', body);
  };

  const getPayload = (values: ConstructionMethod) => ({
    data: {
      ...values,
      id: constructionMethod?.id,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ConstructionMethod>, payload: IApiPayload<ConstructionMethod>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        await uploadFile(payload.files[0], uploadableResourceFileTypes.constructionMethod, response.payload.id, '', '');
      }
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={isEdit ? 'project.construction-method.edit' : 'project.construction-method.create'}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={isEdit ? 'project.construction-method.edit' : 'project.construction-method.create'}
          getPayload={getPayload as (values: ConstructionMethod) => IApiPayload<ConstructionMethod>}
          validationSchema={validationSchema}
          initialValues={{
            project_method_id:
              constructionMethod?.project_method_id || constructionMethod?.projectMethod?.id || constructionMethod?.project_method?.id || '',
            description: constructionMethod?.description || '',
            ...constructionMethod
          } as ConstructionMethod}
          createActionFunc={isEdit ? editConstructionMethod : createConstructionMethod}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ConstructionMethod>) => (
            <ConstructionMethodForm
              formik={formik}
              file={uploadableFile}
              onFileChange={setUploadableFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ConstructionMethodDrawer;
