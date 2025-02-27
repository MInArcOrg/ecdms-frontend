import { FormikProps } from 'formik';
import { useState } from 'react';
import areaTopographyMasterService from 'src/services/general/project/area-topography-master-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AreaTopographyMasterForm from './area-topography-master-form';
import { AreaTopography } from 'src/types/general/general-master';

interface AreaTopographyMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: AreaTopography;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const AreaTopographyMasterDrawer = (props: AreaTopographyMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createAreaTopographyMaster = async (body: IApiPayload<AreaTopography>) => {
    return await areaTopographyMasterService.create(body);
  };

  const editAreaTopographyMaster = async (body: IApiPayload<AreaTopography>) => {
    return await areaTopographyMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: AreaTopography) => {
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

  const onActionSuccess = async (response: IApiResponse<AreaTopography>, payload: IApiPayload<AreaTopography>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `AREA_TOPOGRAPHY`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-area-topography' : 'create-area-topography'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<AreaTopography>
          edit={isEdit}
          title="master-data.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editAreaTopographyMaster : createAreaTopographyMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<AreaTopography>) => {
            return (
              <>
                <AreaTopographyMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as AreaTopography}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AreaTopographyMasterDrawer;
