import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { RoadSegment } from 'src/types/project/other';

const RoadSegmentForm = ({
  formData,
  onFormChange,
  onSubmit,
  isVisible,
  onClose,
}: {
  formData: RoadSegment;
  onFormChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer anchor="right" open={isVisible} onClose={onClose}>
      <Box width={400} padding={4}>
        <Typography variant="h5" gutterBottom>
          {formData.id ? 'Edit Road Segment' : 'Create Road Segment'}
        </Typography>

        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
           
            <Grid item xs={12} md={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={onFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Specifications"
                name="specifications"
                fullWidth
                value={formData.specifications}
                onChange={onFormChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Number of Layers"
                name="no_of_layers"
                fullWidth
                value={formData.no_of_layers}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Length"
                name="length"
                fullWidth
                value={formData.length}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Width"
                name="width"
                fullWidth
                value={formData.width}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Start Northing"
                name="start_northing"
                fullWidth
                value={formData.start_northing}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Start Easting"
                name="start_easting"
                fullWidth
                value={formData.start_easting}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="End Northing"
                name="end_northing"
                fullWidth
                value={formData.end_northing}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="End Easting"
                name="end_easting"
                fullWidth
                value={formData.end_easting}
                onChange={onFormChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Revision Number"
                name="revision_no"
                fullWidth
                value={formData.revision_no}
                onChange={onFormChange}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                {formData.id ? 'Update' : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
};

export default RoadSegmentForm;
