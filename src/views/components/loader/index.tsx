// src/components/LoadingPlaceholder.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingPlaceholder: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <CircularProgress />
      <Typography variant="subtitle1" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingPlaceholder;
