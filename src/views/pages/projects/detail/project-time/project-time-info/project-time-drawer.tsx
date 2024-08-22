import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ProjectTimeForm from './project-time-form'; // Import your projectTime form component
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectTime } from 'src/types/project/project-time';
import projectTimeApiService from 'src/services/project/project-time-service';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import moment from 'moment';
import i18n from 'src/configs/i18n';
import { convertDateToLocaleDate } from 'src/utils/formatter/date';

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
            contract_signing_date: projectTime?.contract_signing_date
              ? getDynamicDate(i18n, moment(String(projectTime?.contract_signing_date)).toDate())
              : undefined,
            site_handover_date: projectTime?.site_handover_date
              ? getDynamicDate(i18n, moment(String(projectTime?.site_handover_date)).toDate())
              : undefined,
            commencement_date: projectTime?.commencement_date
              ? getDynamicDate(i18n, moment(String(projectTime?.commencement_date)).toDate())
              : undefined,
            mobilization_days_no: moment(projectTime.commencement_date).diff(moment(projectTime.site_handover_date), 'days'),
            original_contract_duration: moment(projectTime.project_completion_date).diff(moment(projectTime.commencement_date), 'days')
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
