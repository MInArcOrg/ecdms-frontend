import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import JointVentureForm from './joint-venture-form';
import jointVentureApiService from 'src/services/stakeholder/joint-venture-service';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import type { IApiResponse } from 'src/types/requests';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { useState } from 'react';
import { nameRule } from 'src/utils/validator/name';

interface JointVentureDrawerType {
  open: boolean;
  toggle: () => void;
  jointVenture: JointVenture;
  refetch: () => void;
  stakeholderId: string;
}

const JointVentureDrawer = (props: JointVentureDrawerType) => {
  const { open, toggle, refetch, jointVenture, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const validationSchema = yup.object().shape({
    name: nameRule.required('Name is required'),
    member_companies_no: limitNumberDigits(nullableNumberSchema().required('Number of member companies is required'), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }).positive().integer(),
    description: yup.string().required('Description is required'),
    reference: yup.string().nullable()
  });

  const isEdit = Boolean(jointVenture?.id);

  const createJointVenture = async (body: IApiPayload<JointVenture>): Promise<IApiResponse<JointVenture>> => {
    return jointVentureApiService.create(body);
  };

  const editJointVenture = async (body: IApiPayload<JointVenture>): Promise<IApiResponse<JointVenture>> => {
    return jointVentureApiService.update(jointVenture?.id || '', body);
  };

  const getPayload = (values: JointVenture): IApiPayload<JointVenture> => ({
    data: {
      ...values,
      id: jointVenture?.id,
      stakeholder_id: stakeholderId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<JointVenture>, payload: IApiPayload<JointVenture>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.jointVenture, response.payload.id || '', '', '');
    }
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer title={`stakeholder.joint-venture.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.joint-venture.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={jointVenture}
          createActionFunc={isEdit ? editJointVenture : createJointVenture}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<JointVenture>) => <JointVentureForm formik={formik} file={uploadableFile} onFileChange={onFileChange} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default JointVentureDrawer;
