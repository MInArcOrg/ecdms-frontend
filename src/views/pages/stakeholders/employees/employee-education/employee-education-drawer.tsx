import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import EmployeeEducationForm from './employee-education-form';

import { useState } from 'react';
import employeeEducationApiService from 'src/services/stakeholder/employee-education-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { EmployeeEducation } from 'src/types/stakeholder/employee-education';
import countriesList from 'src/constants/countries';
import { useQuery } from '@tanstack/react-query';
import totalEmployeeApiService from 'src/services/stakeholder/total-employee-service';

interface EmployeeEducationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  employeeEducation: EmployeeEducation;
  stakeholderId: string;
}

const EmployeeEducationDrawer = (props: EmployeeEducationDrawerType) => {
  const { open, toggle, refetch, employeeEducation, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const { data: totalEmployees } = useQuery({
    queryKey: ['totalEmployee'],
    queryFn: () =>
      totalEmployeeApiService.getAll({
        filter: { stakeholder_id: stakeholderId },
        pagination: { page: 1, pageSize: 1000 }
      })
  });

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(employeeEducation?.id);

  const createEmployeeEducation = async (body: IApiPayload<EmployeeEducation>) => employeeEducationApiService.create(body);

  const editEmployeeEducation = async (body: IApiPayload<EmployeeEducation>) =>
    employeeEducationApiService.update(employeeEducation?.id || '', body);

  const getPayload = (values: EmployeeEducation) => ({
    data: {
      ...values,
      id: employeeEducation?.id,
      stakeholder_id: stakeholderId,
      nationality: typeof values.nationality === 'object' ? values.nationality.value : values.nationality
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<EmployeeEducation>, payload: IApiPayload<EmployeeEducation>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.employee-education.${isEdit ? `edit-employee-education` : `create-employee-education`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.employee-education.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(employeeEducation as EmployeeEducation),
            nationality: countriesList
              .map((country) => ({
                label: country.title,
                value: country.title
              }))
              .find((country) => country.value === employeeEducation.nationality)
          }}
          createActionFunc={isEdit ? editEmployeeEducation : createEmployeeEducation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<EmployeeEducation>) => {
            return (
              <EmployeeEducationForm
                totalEmployees={totalEmployees?.payload || []}
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EmployeeEducationDrawer;
