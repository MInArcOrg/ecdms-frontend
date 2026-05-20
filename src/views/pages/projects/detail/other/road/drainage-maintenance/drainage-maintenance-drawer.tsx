'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import { DrainageMaintenance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DrainageMaintenanceForm from './drainage-maintenance-form';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

interface DrainageMaintenanceDrawerProps {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    drainageMaintenance: DrainageMaintenance;
    projectId: string;
    otherSubMenu?: DetailSubMenuItemChild;
}

const DrainageMaintenanceDrawer = (props: DrainageMaintenanceDrawerProps) => {
    const { open, toggle, refetch, drainageMaintenance, projectId, otherSubMenu } = props;
    const [uploadableFile, setUploadableFile] = useState<File | null>(null);

    const validationSchema = yup.object().shape({
        road_segment_id: yup.string().required('Road Segment is required'),
        soil_type_id: yup.string().required('Soil Type is required'),
        ground_water_impact_id: yup.string().required('Ground Water Impact is required'),
        slope_stability_id: yup.string().required('Slope Stability is required')
    });

    const isEdit = Boolean(drainageMaintenance?.id);

    const createDrainageMaintenance = async (body: IApiPayload<DrainageMaintenance>) =>
        projectOtherApiSecondService<DrainageMaintenance>().create(otherSubMenu?.apiRoute || '', body);

    const editDrainageMaintenance = async (body: IApiPayload<DrainageMaintenance>) =>
        projectOtherApiSecondService<DrainageMaintenance>().update(otherSubMenu?.apiRoute || '', drainageMaintenance?.id || '', body);

    const getPayload = (values: DrainageMaintenance) => ({
        data: {
            ...values,
            id: drainageMaintenance?.id,
            project_id: projectId
        },
        files: uploadableFile ? [uploadableFile] : []
    });

    const handleClose = () => toggle();

    const onActionSuccess = async (response: IApiResponse<DrainageMaintenance>, payload: IApiPayload<DrainageMaintenance>) => {
        if (payload.files.length > 0) {
            uploadFile(payload.files[0], uploadableProjectFileTypes.other.drainageMaintenance, response.payload.id, '', '');
        }
        refetch();
        handleClose();
    };

    return (
        <CustomSideDrawer
            title={`project.other.drainage-maintenance.${isEdit ? 'edit-drainage-maintenance' : 'create-drainage-maintenance'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`project.other.drainage-maintenance.${isEdit ? 'edit-drainage-maintenance' : 'create-drainage-maintenance'}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{
                        ...drainageMaintenance,
                        retaining_walls: drainageMaintenance?.retaining_walls ?? false
                    }}
                    createActionFunc={isEdit ? editDrainageMaintenance : createDrainageMaintenance}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<DrainageMaintenance>) => (
                        <DrainageMaintenanceForm
                            file={uploadableFile}
                            onFileChange={setUploadableFile}
                            formik={formik}
                            projectId={projectId}
                        />
                    )}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default DrainageMaintenanceDrawer;
