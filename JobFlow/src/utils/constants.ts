import type { ApplicationStatus } from '@/types';

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  Applied: 'Applied',
  Interview: 'Interview',
  Offer: 'Offer',
  Rejected: 'Rejected',
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Applied: '#2D52E0',
  Interview: '#C27803',
  Offer: '#047857',
  Rejected: '#B91C1C',
};

export const STATUS_BG_COLORS: Record<ApplicationStatus, string> = {
  Applied: '#EEF2FF',
  Interview: '#FFFBEB',
  Offer: '#ECFDF5',
  Rejected: '#FEF2F2',
};

export const STATUS_BORDER_COLORS: Record<ApplicationStatus, string> = {
  Applied: '#C7D2FE',
  Interview: '#FDE68A',
  Offer: '#A7F3D0',
  Rejected: '#FECACA',
};

export const APP_NAME = 'JobFlow';
export const APP_VERSION = '1.0.0';