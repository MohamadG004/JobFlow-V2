import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  fullHeight?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  fullHeight = true,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      height: fullHeight ? '80vh' : '100%',
    }}
  >
    <CircularProgress />
    {message && (
      <Typography color="text.secondary" variant="body2">
        {message}
      </Typography>
    )}
  </Box>
);

export default LoadingSpinner;