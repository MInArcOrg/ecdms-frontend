import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';

import { FormikProps } from 'formik';
import projectApiService from 'src/services/project/project-service';
import projectStakeholderApiService from 'src/services/project/project-stakeholder-service';
import { Project } from 'src/types/project';
import { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import StakeholderProjectForm from './stakeholder-project-form';
import { MasterType } from 'src/types/master/master-types';
import { useTranslation } from 'react-i18next';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface StakeholderProjectDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  project: Project | any;
  typeId: string;
  type?: MasterType | undefined;
  stakeholderId: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().max(255).required('Project name is required'),
  parent_id: yup.string().length(36).nullable(),
  department_id: yup.string().length(36).nullable(),
  projectcategory_id: yup.string().length(36).required(),
  projecttype_id: yup.string().length(36).nullable(),
  projectsubcategory_id: yup.string().length(36).required(),
  grade: yup.string().max(50).nullable(),
  end_user: yup.string().max(255).nullable(),
  function: yup.string().max(255).nullable(),
  remark: yup.string().nullable(),
  contract_no: yup.string().max(255).nullable(),
  budget_code: yup.string().max(255).nullable(),
  procurement_no: yup.string().max(255).nullable(),
  main_contract_price_amount: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
  source_of_fund_id: yup.string().max(255).nullable(),
  status_id: yup.string().length(36).required(),
  commencement_date: yup.mixed().nullable(),
  completion_date: yup.mixed().nullable(),
  original_contract_duration: nullableIntegerSchema(),
  revision_no: nullableIntegerSchema(),
  stakeholder_title: yup.string().max(255).required('Stakeholder assignment title is required'),
  stakeholder_description: yup.string().nullable(),
  stakeholder_remark: yup.string().nullable()
});

const StakeholderProjectDrawer = (props: StakeholderProjectDrawerType) => {
  // ** Props
  const { open, toggle, refetch, project, typeId, type, stakeholderId } = props;
  const { t } = useTranslation();
  const isEdit = project?.id ? true : false;
  
  const createProject = async (body: IApiPayload<any>) => {
    // 1. First, create the project
    const projectBody = {
      ...body,
      data: { ...body.data }
    };
    
    // Remove stakeholder specific fields from project payload
    delete projectBody.data.stakeholder_title;
    delete projectBody.data.stakeholder_description;
    delete projectBody.data.stakeholder_remark;

    const res = await projectApiService.create(projectBody);
    const newProjectId = res?.payload?.id;

    if (newProjectId) {
      // 2. Then, link the stakeholder
      const stakeholderPayload = {
        data: {
          project_id: newProjectId,
          stakeholder_id: stakeholderId,
          title: body.data.stakeholder_title,
          description: body.data.stakeholder_description,
          remark: body.data.stakeholder_remark
        },
        files: []
      };
      // The create service will auto-generate the id, so the payload doesn't need to include it
      await projectStakeholderApiService.create(stakeholderPayload as IApiPayload<any>);
    }
    
    return res;
  };
  
  const editProject = async (body: IApiPayload<any>) => {
    // Remove stakeholder specific fields from project payload
    const projectBody = { ...body, data: { ...body.data } };
    delete projectBody.data.stakeholder_title;
    delete projectBody.data.stakeholder_description;
    delete projectBody.data.stakeholder_remark;

    return await projectApiService.update(project?.id || '', projectBody);
  };

  const getPayload = (values: any) => {
    const payload = {
      data: {
        ...values,
        id: project?.id,
        projecttype_id: values.projecttype_id,
        main_contract_price_amount:
          values.main_contract_price_amount === undefined || values.main_contract_price_amount === null
            ? undefined
            : Number(values.main_contract_price_amount),
        commencement_date: convertDateToLocaleDate(values.commencement_date),
        completion_date: convertDateToLocaleDate(values.completion_date),
        original_contract_duration:
          values.original_contract_duration === undefined || values.original_contract_duration === null
            ? undefined
            : Number(values.original_contract_duration)
      },
      files: []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  const translatedTitle = t(`common.${isEdit ? 'edit' : 'create'}`) + " " + (type?.title || "") + " " + t('project.title');

  return (
    <CustomSideDrawer
      model={'project'}
      translatedTitle={translatedTitle}
      handleClose={handleClose}
      open={open} 
      width={1000}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          translatedTitle={translatedTitle}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...project,
            commencement_date: formatInitialDateDate(project?.commencement_date),
            completion_date: formatInitialDateDate(project?.completion_date),
            projecttype_id: project?.projecttype_id || '',
            stakeholder_title: project?.stakeholder_title || '',
            stakeholder_description: project?.stakeholder_description || '',
            stakeholder_remark: project?.stakeholder_remark || ''
          }}
          createActionFunc={isEdit ? editProject : createProject}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<any>) => {
            return <StakeholderProjectForm typeId={typeId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderProjectDrawer;
