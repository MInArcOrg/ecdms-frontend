import React from 'react';
import { Box, Typography, Drawer, Grid, TextField, Button } from '@mui/material';
import { FormData } from 'src/types/road';

const RoadInfoForm = ({
  formData,
  onFormChange,
  onSubmit,
  isVisible,
  onClose
}: {
  formData: FormData;
  onFormChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer anchor="right" open={isVisible} onClose={onClose}>
      <Box width={400} padding={4}>
        <Typography variant="h4" gutterBottom>
          {formData.id ? 'Edit Road Info' : 'Create Road Info'}
        </Typography>

        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {['material', 'location_function', 'traffic_type', 'economy', 'rigidity', 'topography'].map((field) => (
              <Grid item xs={12} sm={12} key={field}>
                <TextField
                  fullWidth
                  label={field.replace('_', ' ')}
                  name={field}
                  value={formData[field as keyof FormData]}
                  onChange={onFormChange}
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Traffic Volume"
                name="traffic_volume"
                type="number"
                value={formData.traffic_volume}
                onChange={onFormChange}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                {formData.id ? 'Update' : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
};

export { RoadInfoForm };
