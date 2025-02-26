import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadLengthTypeMasterForm from './road-length-type-master-form';
import { RoadLengthType } from 'src/types/general/general-master';
import roadLengthTypeMasterService from 'src/services/general/project/road-length-type-master-service';

interface RoadLengthTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: RoadLengthType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const RoadLengthTypeMasterDrawer = (props: RoadLengthTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createRoadLengthTypeMaster = async (body: IApiPayload<RoadLengthType>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editRoadLengthTypeMaster = async (body: IApiPayload<RoadLengthType>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: RoadLengthType) => {
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

  const onActionSuccess = async (response: IApiResponse<RoadLengthType>, payload: IApiPayload<RoadLengthType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `PEDESTRIAN_FACILITY`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-pedestrian-facilities' : 'create-pedestrian-facilities'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<RoadLengthType>
          edit={isEdit}
          title="master-data.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editRoadLengthTypeMaster : createRoadLengthTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadLengthType>) => {
            return (
              <>
                <RoadLengthTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as RoadLengthType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadLengthTypeMasterDrawer;
