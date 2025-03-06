import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import HazardTypeMasterForm from './hazard-type-master-form';
import { HazardType } from 'src/types/general/general-master';
import hazardTypeMasterService from 'src/services/general/project/hazard-type-master-service';

interface HazardTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: HazardType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const HazardTypeMasterDrawer = (props: HazardTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createHazardTypeMaster = async (body: IApiPayload<HazardType>) => {
    return await hazardTypeMasterService.create(body);
  };

  const editHazardTypeMaster = async (body: IApiPayload<HazardType>) => {
    return await hazardTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: HazardType) => {
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

  const onActionSuccess = async (response: IApiResponse<HazardType>, payload: IApiPayload<HazardType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `HAZARD_TYPE_TYPE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-hazard-type' : 'create-hazard-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<HazardType>
          edit={isEdit}
          title="master-data.general-master.hazard-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editHazardTypeMaster : createHazardTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<HazardType>) => {
            return (
              <>
                <HazardTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as HazardType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};
export default HazardTypeMasterDrawer;
