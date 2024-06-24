import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import { MasterType } from 'src/types/master/master-types';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import MasterTypeForm from './master-type-form';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { uploadFile } from 'src/services/utils/file-service';
import { SetStateAction, useState } from 'react';

interface MasterTypeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: MasterType;
  model: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const MasterTypeDrawer = (props: MasterTypeDrawerType) => {
  const { open, toggle, refetch, masterData, model } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile,setUploadableFile]=useState<File|null>(null)
  const onFileChange=(file: File | null) => {
    setUploadableFile(file);
};
  const createMasterType = async (body: IApiPayload<MasterType>) => {
    return await masterTypeApiService.create(model, body);
  };

  const editMasterType = async (body: IApiPayload<MasterType>) => {
    return await masterTypeApiService.update(model, masterData?.id || '', body);
  };

  const getPayload = (values: MasterType) => {
    const payload = {
      data: {
        ...values,  
        id: masterData?.id
      },
      files: uploadableFile?[uploadableFile]:[]
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = (response:IApiResponse<MasterType>,payload:IApiPayload<MasterType>) => {
    if(payload.files.length>0){
      uploadFile(payload.files[0],`${model.toLocaleUpperCase()}_TYPE`,response.payload.id,"","");
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.${isEdit ? 'edit-master-type' : 'create-master-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<MasterType>
          edit={isEdit}
          title="master-data.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editMasterType : createMasterType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MasterType>) => {
            return <MasterTypeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} defaultLocaleData={{} as MasterType} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MasterTypeDrawer;
