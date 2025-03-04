import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SpanSupportTypeMasterForm from './span-support-type-master-form';
import { SpanSupportType } from 'src/types/general/general-master';
import spanSupportTypeMasterService from 'src/services/general/project/span-support-type-master-service';

interface SpanSupportTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: SpanSupportType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const SpanSupportTypeMasterDrawer = (props: SpanSupportTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createSpanSupportTypeMaster = async (body: IApiPayload<SpanSupportType>) => {
    return await spanSupportTypeMasterService.create(body);
  };

  const editSpanSupportTypeMaster = async (body: IApiPayload<SpanSupportType>) => {
    return await spanSupportTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: SpanSupportType) => {
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

  const onActionSuccess = async (response: IApiResponse<SpanSupportType>, payload: IApiPayload<SpanSupportType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `SPAN_SUPPORT_TYPE`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-span-support-type' : 'create-span-support-type'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<SpanSupportType>
          edit={isEdit}
          title="master-data.general-master.span-support-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editSpanSupportTypeMaster : createSpanSupportTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SpanSupportType>) => {
            return (
              <>
                <SpanSupportTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as SpanSupportType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SpanSupportTypeMasterDrawer;
