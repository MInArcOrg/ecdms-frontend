import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DamageConditionMasterForm from './damage-condition-master-form';
import { DamageCondition } from 'src/types/general/general-master';
import roadLengthTypeMasterService from 'src/services/general/project/damage-condition-master-service';

interface DamageConditionMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: DamageCondition;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const DamageConditionMasterDrawer = (props: DamageConditionMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createDamageConditionMaster = async (body: IApiPayload<DamageCondition>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editDamageConditionMaster = async (body: IApiPayload<DamageCondition>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: DamageCondition) => {
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

  const onActionSuccess = async (response: IApiResponse<DamageCondition>, payload: IApiPayload<DamageCondition>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `DAMAGE_CONDITION`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-damage-condition' : 'create-damage-condition'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DamageCondition>
          edit={isEdit}
          title="master-data.general-master.damage-conditions"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDamageConditionMaster : createDamageConditionMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DamageCondition>) => {
            return (
              <>
                <DamageConditionMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DamageCondition}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DamageConditionMasterDrawer;
