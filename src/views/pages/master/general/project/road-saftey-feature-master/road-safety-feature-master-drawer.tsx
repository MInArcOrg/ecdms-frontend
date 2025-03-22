import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadSafetyFeatureMasterForm from './road-safety-feature-master-form';
import { RoadSafetyFeature } from 'src/types/general/general-master';
import roadSafetyMasterService from 'src/services/general/project/road-safety-feature-master-service';

interface RoadSafetyFeatureMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: RoadSafetyFeature;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const RoadSafetyFeatureMasterDrawer = (props: RoadSafetyFeatureMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createRoadSafetyFeatureMaster = async (body: IApiPayload<RoadSafetyFeature>) => {
    return await roadSafetyMasterService.create(body);
  };

  const editRoadSafetyFeatureMaster = async (body: IApiPayload<RoadSafetyFeature>) => {
    return await roadSafetyMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: RoadSafetyFeature) => {
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

  const onActionSuccess = async (response: IApiResponse<RoadSafetyFeature>, payload: IApiPayload<RoadSafetyFeature>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `ROAD_SAFETY_FEATURE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-road-safety-feature' : 'create-road-safety-feature'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<RoadSafetyFeature>
          edit={isEdit}
          title="master-data.general-master.road-safety-features"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editRoadSafetyFeatureMaster : createRoadSafetyFeatureMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadSafetyFeature>) => {
            return (
              <>
                <RoadSafetyFeatureMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as RoadSafetyFeature}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadSafetyFeatureMasterDrawer;
