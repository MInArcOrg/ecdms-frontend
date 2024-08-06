import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import { MasterSubCategory } from 'src/types/master/master-types';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { uploadFile } from 'src/services/utils/file-utils';
import { useState } from 'react';
import MasterSubCategoryForm from './master-sub-category-form';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';

interface MasterSubCategoryDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: MasterSubCategory;
  model: string;
  categoryId: string;
  typeId: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const MasterSubCategoryDrawer = (props: MasterSubCategoryDrawerType) => {
  const { open, toggle, refetch, masterData, model } = props;
  console.log('master sub cattegory', masterData);
  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createMasterSubCategory = async (body: IApiPayload<MasterSubCategory>) => {
    return await masterSubCategoryApiService.create(model, body);
  };

  const editMasterSubCategory = async (body: IApiPayload<MasterSubCategory>) => {
    return await masterSubCategoryApiService.update(model, masterData?.id || '', body);
  };

  const getPayload = (values: MasterSubCategory) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
        [`${props.model}category_id`]: props.categoryId,
        [`${props.model}type_id`]: props.typeId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = (response: IApiResponse<MasterSubCategory>, payload: IApiPayload<MasterSubCategory>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `${model.toLocaleUpperCase()}_SUB_CATEGORY`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.${isEdit ? 'edit-master-sub-category' : 'create-master-sub-category'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<MasterSubCategory>
          edit={isEdit}
          title="master-data.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editMasterSubCategory : createMasterSubCategory}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MasterSubCategory>) => {
            return (
              <MasterSubCategoryForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as MasterSubCategory}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MasterSubCategoryDrawer;
