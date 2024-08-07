import { FormikProps } from 'formik';
import { useState } from 'react';
import modelMenuApiService from 'src/services/general/model-menu-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { MasterType } from 'src/types/master/master-types';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MasterTypeForm from './master-type-form';
import ModelSpecificMenus from './model-specific-menus';

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
  const [switchStates, setSwitchStates] = useState<{ model: string; status: boolean }[]>([]);

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
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
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<MasterType>, payload: IApiPayload<MasterType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `${model.toLocaleUpperCase()}_TYPE`, response.payload.id, '', '');
    }

    await modelMenuApiService.updateModelsbyType(response.payload.id, {
      data: {
        models: switchStates,
        module: model
      },
      files: []
    });
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`master-data.${isEdit ? 'edit-master-type' : 'create-master-type'}`} handleClose={handleClose} open={open}>
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
            return (
              <>
                <MasterTypeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} defaultLocaleData={{} as MasterType} />
                <ModelSpecificMenus setSwitchStates={setSwitchStates} switchStates={switchStates} module={model} typeId={masterData?.id} />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MasterTypeDrawer;
