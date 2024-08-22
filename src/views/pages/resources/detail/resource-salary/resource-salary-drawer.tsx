import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourceSalaryApiService from 'src/services/resource/resource-salary-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceSalary } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceSalaryForm from './resource-salary-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ResourceSalaryDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceSalary: ResourceSalary;
}

const validationSchema = yup.object().shape({
  year: yup.string().required(),
  min_pay: yup.number().required(),
  max_pay: yup.number().required(),
  salary_type: yup.string().required()
});

const ResourceSalaryDrawer: React.FC<ResourceSalaryDrawerType> = (props) => {
  const { open, toggle, refetch, resourceSalary, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const isEdit = resourceSalary?.id ? true : false;

  const createResourceSalary = async (body: IApiPayload<ResourceSalary>) => {
    return await resourceSalaryApiService.create(body);
  };

  const editResourceSalary = async (body: IApiPayload<ResourceSalary>) => {
    return await resourceSalaryApiService.update(resourceSalary?.id || '', body);
  };

  const getPayload = (values: ResourceSalary) => ({
    data: {
      ...values,
      id: resourceSalary?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceSalary>, payload: IApiPayload<ResourceSalary>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableResourceFileTypes.resourceSalary, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-salary.${isEdit ? 'edit-resource-salary' : 'create-resource-salary'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-salary.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceSalary as ResourceSalary}
          createActionFunc={isEdit ? editResourceSalary : createResourceSalary}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceSalary>) => {
            return (
              <ResourceSalaryForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as ResourceSalary}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceSalaryDrawer;
