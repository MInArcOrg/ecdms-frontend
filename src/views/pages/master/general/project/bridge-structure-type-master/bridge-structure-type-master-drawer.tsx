import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeStructureTypeMasterForm from './bridge-structure-type-master-form';
import { BridgeStructureType } from 'src/types/general/general-master';
import bridgeStructureTypeMasterService from 'src/services/general/project/bridge-structure-type-master-service';

interface BridgeStructureTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: BridgeStructureType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const BridgeStructureTypeMasterDrawer = (props: BridgeStructureTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createBridgeStructureTypeMaster = async (body: IApiPayload<BridgeStructureType>) => {
    return await bridgeStructureTypeMasterService.create(body);
  };

  const editBridgeStructureTypeMaster = async (body: IApiPayload<BridgeStructureType>) => {
    return await bridgeStructureTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: BridgeStructureType) => {
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

  const onActionSuccess = async (response: IApiResponse<BridgeStructureType>, payload: IApiPayload<BridgeStructureType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `BRIDGE_STRUCTURE_TYPE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-bridge-structure-type' : 'create-bridge-structure-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<BridgeStructureType>
          edit={isEdit}
          title="master-data.general-master.bridge-structure-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editBridgeStructureTypeMaster : createBridgeStructureTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeStructureType>) => {
            return (
              <>
                <BridgeStructureTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as BridgeStructureType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeStructureTypeMasterDrawer;
