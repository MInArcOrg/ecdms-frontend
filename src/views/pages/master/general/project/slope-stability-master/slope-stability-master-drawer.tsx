import { FormikProps } from 'formik';
import { useState } from 'react';
import slopeStabilityMasterService from 'src/services/general/project/slope-stability-master-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SlopeStabilityMasterForm from './slope-stability-master-form';
import { SlopeStability } from 'src/types/general/general-master';

interface SlopeStabilityMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: SlopeStability;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const SlopeStabilityMasterDrawer = (props: SlopeStabilityMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createSlopeStabilityMaster = async (body: IApiPayload<SlopeStability>) => {
    return await slopeStabilityMasterService.create(body);
  };

  const editSlopeStabilityMaster = async (body: IApiPayload<SlopeStability>) => {
    return await slopeStabilityMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: SlopeStability) => {
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

  const onActionSuccess = async (response: IApiResponse<SlopeStability>, payload: IApiPayload<SlopeStability>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `SLOPE_STABILITY`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-slope-stability' : 'create-slope-stability'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<SlopeStability>
          edit={isEdit}
          title="master-data.general-master.pedestrian-facilities"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editSlopeStabilityMaster : createSlopeStabilityMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SlopeStability>) => {
            return (
              <>
                <SlopeStabilityMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as SlopeStability}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SlopeStabilityMasterDrawer;
