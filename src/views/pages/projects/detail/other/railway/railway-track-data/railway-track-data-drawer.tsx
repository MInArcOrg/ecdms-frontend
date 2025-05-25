'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayTracksGeometryDataForm from './railway-track-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { RailwayTrackData, MiniGridStation } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface RailwayTrackDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayTracksGeometryData: RailwayTracksGeometryData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayTrackDataDrawer = (props: RailwayTrackDataDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    railwayTrackData,
    projectId,
    otherSubMenu,

  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };



  const isEdit = Boolean(railwayTrackData?.id);

  const createRailwayTrackData = async (body: IApiPayload<RailwayTrackData>) =>
    projectOtherApiSecondService<RailwayTrackData>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwayTrackData = async (body: IApiPayload<RailwayTrackData>) =>
    projectOtherApiSecondService<RailwayTrackData>().update(
      otherSubMenu?.apiRoute || '',
      railwayTrackData?.id || '',
      body
    );

  const validationSchema = yup.object().shape({
    project_id: yup.string().required(),
    railway_track_infrastructure_type_id: yup.string().required(),
    track_type_id: yup.string().required(),
    track_gauge_id: yup.string().required(),
    track_length: yup.number().nullable(),
    rail_type_and_size: yup.string().nullable(),
    sleepers_type_and_spacing: yup.string().nullable(),
    fastening_systems: yup.string().nullable(),
    ballast_type_and_depth: yup.string().nullable(),
    track_connection_method: yup.string().nullable(),
    track_type: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const getPayload = (values: RailwayTrackData) => ({
    data: {
      project_id: projectId,
      railway_track_infrastructure_type_id: values.railway_track_infrastructure_type_id,
      track_type_id: values.track_type_id,
      track_gauge_id: values.track_gauge_id,
      track_length: values.track_length,
      rail_type_and_size: values.rail_type_and_size,
      sleepers_type_and_spacing: values.sleepers_type_and_spacing,
      fastening_systems: values.fastening_systems,
      ballast_type_and_depth: values.ballast_type_and_depth,
      track_connection_method: values.track_connection_method,
      track_type: values.track_type,
      remark: values.remark,
      id: railwayTrackData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayTrackData>,
    payload: IApiPayload<RailwayTrackData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_grid_control_center_data, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-track-data.${isEdit ? `edit-railway-track-data` : `create-railway-track-data`}
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-tracks-geometry-data.${isEdit ? `edit-railway-tracks-geometry-data` : `create-railway-tracks-geometry-data`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayTracksGeometryData,
          }}
          createActionFunc={isEdit ? editRailwayTracksGeometryData : createRailwayTracksGeometryData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayTracksGeometryData>) => {
            return (
              <RailwayTracksGeometryDataForm
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

export default RailwayTracksGeometryDataDrawer;
