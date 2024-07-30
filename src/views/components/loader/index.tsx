// src/components/LoadingPlaceholder.tsx
import React from 'react';
import { Box, CircularProgress, Typography, CircularProgressProps } from '@mui/material';

// Define props for the LoadingPlaceholder component, including CircularProgressProps
interface LoadingPlaceholderProps {
  message?: string;
  circularProgressProps?: CircularProgressProps; // Add optional CircularProgressProps
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({ message = 'Loading...', circularProgressProps }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <CircularProgress {...circularProgressProps} /> {/* Apply props to CircularProgress */}
      <Typography variant="subtitle1" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingPlaceholder;
