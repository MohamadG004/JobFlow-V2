import React from 'react';
import { Chip } from '@mui/material';
import type { ApplicationStatus } from '@/types';

const STATUS_CONFIG: Record<ApplicationStatus, { color: string; bg: string }> = {
  Applied:   { color: '#2563EB', bg: '#EFF6FF' },
  Interview: { color: '#D97706', bg: '#FFFBEB' },
  Offer:     { color: '#059669', bg: '#ECFDF5' },
  Rejected:  { color: '#DC2626', bg: '#FEF2F2' },
};

interface StatusChipProps {
  status: ApplicationStatus;
  size?: 'small' | 'medium';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <Chip
      label={status}
      size={size}
      sx={{
        fontWeight: 700,
        fontSize: '0.72rem',
        color: cfg.color,
        bgcolor: cfg.bg,
        border: `1px solid ${cfg.color}30`,
      }}
    />
  );
};

export default StatusChip;
