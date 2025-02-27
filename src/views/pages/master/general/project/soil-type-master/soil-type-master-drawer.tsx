import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SoilTypeMasterForm from './soil-type-master-form';
import { SoilType } from 'src/types/general/general-master';
import soilTypeMasterService from 'src/services/general/project/soil-type-master-service';

interface SoilTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: SoilType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const SoilTypeMasterDrawer = (props: SoilTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createSoilTypeMaster = async (body: IApiPayload<SoilType>) => {
    return await soilTypeMasterService.create(body);
  };

  const editSoilTypeMaster = async (body: IApiPayload<SoilType>) => {
    return await soilTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: SoilType) => {
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

  const onActionSuccess = async (response: IApiResponse<SoilType>, payload: IApiPayload<SoilType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `SOIL_TYPE_TYPE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-soil-type' : 'create-soil-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<SoilType>
          edit={isEdit}
          title="master-data.general-master.soil-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editSoilTypeMaster : createSoilTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SoilType>) => {
            return (
              <>
                <SoilTypeMasterForm file={uploadableFile} onFileChange={onFileChange} formik={formik} defaultLocaleData={{} as SoilType} />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};
export default SoilTypeMasterDrawer;
