import { FormikProps } from 'formik';
import React from 'react';
import projectClaimApiService from 'src/services/project/project-claim-service';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectClaim } from 'src/types/project/project-claim';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectClaimForm from './project-claim-form';

interface ProjectClaimDrawerType {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    projectId: string;
    projectClaim: ProjectClaim;
}

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is Required')
});

const ProjectClaimDrawer: React.FC<ProjectClaimDrawerType> = (props) => {
    const { open, toggle, refetch, projectClaim, projectId } = props;

    const isEdit = projectClaim?.id ? true : false;

    const createProjectClaim = async (body: IApiPayload<ProjectClaim>) => {
        return await projectClaimApiService.create(body);
    };

    const editProjectClaim = async (body: IApiPayload<ProjectClaim>) => {
        return await projectClaimApiService.update(projectClaim?.id || '', body);
    };

    const getPayload = (values: ProjectClaim): IApiPayload<ProjectClaim> => ({
        data: {
            ...values,
            id: projectClaim?.id,
            project_id: projectId
        },
        files: []
    });

    const handleClose = () => {
        toggle();
    };

    const onActionSuccess = async (response: IApiResponse<ProjectClaim>, payload: IApiPayload<ProjectClaim>) => {
        refetch();
        toggle();
    };

    return (
        <CustomSideDrawer
            title={`project.navigation.submenu.reporting.report.claim-${isEdit ? 'edit' : 'create'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`project.navigation.submenu.reporting.report.claim-${isEdit ? 'edit' : 'create'}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={projectClaim}
                    createActionFunc={isEdit ? editProjectClaim : createProjectClaim}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<ProjectClaim>) => {
                        return <ProjectClaimForm formik={formik} projectId={projectId} />;
                    }}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default ProjectClaimDrawer;
