import React, { useState, useEffect } from 'react';
import { Drawer, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-infos';
import { IApiPayload } from 'src/types/requests';
import projectAdditionalInfosApiService from 'src/services/project/project-additional-info';
import { ProjectAdditionalInfoPayload } from 'src/types/project/project-additional-infos';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ProjectAdditionalInfoDrawerProps {
  open: boolean;
  toggle: () => void;
  projectInfo: ProjectAdditionalInfo | null;
  refetch: () => void;
  projectId: string;
}

const ProjectAdditionalInfoDrawer: React.FC<ProjectAdditionalInfoDrawerProps> = ({
  projectId,
  open,
  toggle,
  projectInfo,
  refetch
}) => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      reason: projectInfo ? projectInfo.reason : '',
      status: projectInfo ? projectInfo.project_status : '',
      workAccidentNumber: projectInfo ? projectInfo.work_accident_number : '',
    },
    validationSchema: Yup.object({
      reason: Yup.string().required('Reason is required'),
      status: Yup.string().required('Status is required'),
      workAccidentNumber: Yup.number().required('Work Accident Number is required').typeError('Must be a number'),
    }),
    onSubmit: async (values) => {
      const payload: IApiPayload<ProjectAdditionalInfoPayload> = {
        data: {
          project_id: projectId,
          project_status: values.status,
          reason: values.reason,
          work_accident_number: Number(values.workAccidentNumber),
        },
        files: [],
      };
      await createActionFunc(payload);
    },
  });

  useEffect(() => {
    if (projectInfo) {
      formik.setValues({
        reason: projectInfo.reason,
        status: projectInfo.project_status,
        workAccidentNumber: projectInfo.work_accident_number,
      });
    }
  }, [projectInfo]);

  const createActionFunc = async (payload: IApiPayload<ProjectAdditionalInfoPayload>): Promise<void> => {
    try {
      if (projectInfo && projectInfo.id) {
        await projectAdditionalInfosApiService.update(projectInfo.id, payload);
      } else {
        await projectAdditionalInfosApiService.create(payload);
      }
      toggle();
      refetch();
    } catch (error) {
      console.error("Error saving project additional info:", error);
    }
  };

  return (
    <CustomSideDrawer
      open={open}
      handleClose={toggle}
      title={projectInfo ? 'Edit Project Additional Info' : 'Add Project Additional Info'}
    >
      {() => (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              label="Reason"
              fullWidth
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.reason && Boolean(formik.errors.reason)}
              helperText={formik.touched.reason && formik.errors.reason}
              style={{ marginBottom: 20 }}
            />
            <FormControl fullWidth style={{ marginBottom: 20 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <div style={{ color: 'red', marginTop: '4px' }}>
                  {formik.errors.status}
                </div>
              )}
            </FormControl>
            <TextField
              label="Work Accident Number"
              type="number"
              fullWidth
              name="workAccidentNumber"
              value={formik.values.workAccidentNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.workAccidentNumber && Boolean(formik.errors.workAccidentNumber)}
              helperText={formik.touched.workAccidentNumber && formik.errors.workAccidentNumber}
              style={{ marginBottom: 20 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectAdditionalInfoDrawer;
