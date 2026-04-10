import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  actionLabel,
  onAction,
  icon,
}) => (
  <Box
    sx={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      py: 8, px: 4, textAlign: 'center',
    }}
  >
    <Box sx={{ mb: 2, color: 'text.disabled', opacity: 0.5 }}>
      {icon ?? <InboxRoundedIcon sx={{ fontSize: 56 }} />}
    </Box>
    <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>{title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 320 }}>
      {description}
    </Typography>
    {actionLabel && onAction && (
      <Button variant="contained" onClick={onAction}>{actionLabel}</Button>
    )}
  </Box>
);

export default EmptyState;
