import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TotalEmployeeForm from './total-employee-form';

import { useState } from 'react';
import totalEmployeeApiService from 'src/services/stakeholder/total-employee-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TotalEmployee } from 'src/types/stakeholder/total-employee';
import countriesList from 'src/constants/countries';

interface TotalEmployeeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  totalEmployee: TotalEmployee;
  stakeholderId: string;
}

const TotalEmployeeDrawer = (props: TotalEmployeeDrawerType) => {
  const { open, toggle, refetch, totalEmployee, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(totalEmployee?.id);

  const createTotalEmployee = async (body: IApiPayload<TotalEmployee>) => totalEmployeeApiService.create(body);

  const editTotalEmployee = async (body: IApiPayload<TotalEmployee>) => totalEmployeeApiService.update(totalEmployee?.id || '', body);

  const getPayload = (values: TotalEmployee) => ({
    data: {
      ...values,
      id: totalEmployee?.id,
      stakeholder_id: stakeholderId,
      nationality: typeof values.nationality === 'object' ? values.nationality.value : values.nationality
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TotalEmployee>, payload: IApiPayload<TotalEmployee>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.total-employee.${isEdit ? `edit-total-employee` : `create-total-employee`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.total-employee.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(totalEmployee as TotalEmployee),
            nationality: countriesList
              .map((country) => ({
                label: country.title,
                value: country.title
              }))
              .find((country) => country.value === totalEmployee.nationality)
          }}
          createActionFunc={isEdit ? editTotalEmployee : createTotalEmployee}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TotalEmployee>) => {
            return <TotalEmployeeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TotalEmployeeDrawer;
