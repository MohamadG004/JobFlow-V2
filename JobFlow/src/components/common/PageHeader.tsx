import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => (
  <Box
    sx={{
      px: 3, py: 2.5,
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      flexShrink: 0,
    }}
  >
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Box>
        <Typography variant="h5" fontWeight={800}>{title}</Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        )}
      </Box>
      {action && <Box>{action}</Box>}
    </Stack>
  </Box>
);

export default PageHeader;