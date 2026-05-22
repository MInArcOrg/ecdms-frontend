'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { SegmentCoordinate } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SegmentCoordinateForm from './segment-coordinate-form';

interface SegmentCoordinateDrawerProps {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    segmentCoordinate: SegmentCoordinate;
    projectId: string;
    otherSubMenu?: DetailSubMenuItemChild;
}

const SegmentCoordinateDrawer = (props: SegmentCoordinateDrawerProps) => {
    const { open, toggle, refetch, segmentCoordinate, projectId, otherSubMenu } = props;
    const [uploadableFile, setUploadableFile] = useState<File | null>(null);

    const validationSchema = yup.object().shape({
        road_segment_id: yup.string().required('Road Segment is required'),
        start_x: yup.number().required('Start X is required'),
        start_y: yup.number().required('Start Y is required'),
        end_x: yup.number().required('End X is required'),
        end_y: yup.number().required('End Y is required')
    });

    const isEdit = Boolean(segmentCoordinate?.id);

    const createSegmentCoordinate = async (body: IApiPayload<SegmentCoordinate>) =>
        projectOtherApiSecondService<SegmentCoordinate>().create(otherSubMenu?.apiRoute || '', body);

    const editSegmentCoordinate = async (body: IApiPayload<SegmentCoordinate>) =>
        projectOtherApiSecondService<SegmentCoordinate>().update(otherSubMenu?.apiRoute || '', segmentCoordinate?.id || '', body);

    const getPayload = (values: SegmentCoordinate) => ({
        data: {
            ...values,
            id: segmentCoordinate?.id,
            project_id: projectId
        },
        files: uploadableFile ? [uploadableFile] : []
    });

    const handleClose = () => toggle();

    const onActionSuccess = async (response: IApiResponse<SegmentCoordinate>, payload: IApiPayload<SegmentCoordinate>) => {
        if (payload.files.length > 0) {
            uploadFile(payload.files[0], uploadableProjectFileTypes.other.segmentCoordinate, response.payload.id, '', '');
        }
        refetch();
        handleClose();
    };

    return (
        <CustomSideDrawer
            title={`project.other.segment-coordinate.${isEdit ? 'edit-segment-coordinate' : 'create-segment-coordinate'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`project.other.segment-coordinate.${isEdit ? 'edit-segment-coordinate' : 'create-segment-coordinate'}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{ ...segmentCoordinate }}
                    createActionFunc={isEdit ? editSegmentCoordinate : createSegmentCoordinate}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<SegmentCoordinate>) => (
                        <SegmentCoordinateForm
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

export default SegmentCoordinateDrawer;
