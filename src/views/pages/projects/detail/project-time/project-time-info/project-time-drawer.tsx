import { FormikProps } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import projectTimeApiService from 'src/services/project/project-time-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectTime } from 'src/types/project/project-time';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectTimeForm from './project-time-form'; // Import your projectTime form component

interface ProjectTimeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectTime: ProjectTime;
  projectId: string;
}

const validationSchema = yup.object().shape({
  description: yup.string()
});

const ProjectTimeDrawer = (props: ProjectTimeDrawerType) => {
  // ** Props
  const { open, toggle, refetch, projectTime, projectId } = props;

  const isEdit = projectTime?.id ? true : false;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createProjectTime = async (body: IApiPayload<ProjectTime>) => {
    return await projectTimeApiService.create(body);
  };

  const getPayload = (values: ProjectTime) => {
    const payload = {
      data: {
        project_id: projectId,
        site_handover_date: convertDateToLocaleDate(values.site_handover_date),
        contract_signing_date: convertDateToLocaleDate(values.contract_signing_date),
        commencement_date: convertDateToLocaleDate(values.commencement_date)
      } as ProjectTime,
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<ProjectTime>, payload: IApiPayload<ProjectTime>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.time, response.payload.id, '', '');
    }
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-time.${isEdit ? 'edit-project-time' : 'create-project-time'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-time.${isEdit ? 'edit-project-time' : 'create-project-time'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectTime as ProjectTime),
            contract_signing_date: formatInitialDateDate(projectTime?.contract_signing_date),
            site_handover_date: formatInitialDateDate(projectTime?.site_handover_date),

            commencement_date: formatInitialDateDate(projectTime?.commencement_date),
            mobilization_days_no: moment(projectTime?.commencement_date).diff(moment(projectTime?.site_handover_date), 'days'),
            original_contract_duration: moment(projectTime?.project_completion_date).diff(moment(projectTime?.commencement_date), 'days')
          }}
          createActionFunc={createProjectTime}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectTime>) => {
            return <ProjectTimeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectTimeDrawer;
