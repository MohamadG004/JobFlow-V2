// src/components/board/ApplicationFormDialog.tsx
import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Stack, IconButton, Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { Application, ApplicationInsert, ApplicationStatus } from '@/types';

const STATUSES: ApplicationStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationInsert) => Promise<void>;
  initialData?: Application | null;
  defaultStatus?: ApplicationStatus;
}

const defaultForm: ApplicationInsert = {
  company: '',
  role: '',
  status: 'Applied',
  notes: '',
  applied_date: new Date().toISOString().split('T')[0],
};

const ApplicationFormDialog: React.FC<Props> = ({
  open, onClose, onSubmit, initialData, defaultStatus,
}) => {
  const [form, setForm] = React.useState<ApplicationInsert>(defaultForm);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof ApplicationInsert, string>>>({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          company: initialData.company,
          role: initialData.role,
          status: initialData.status,
          notes: initialData.notes || '',
          applied_date: initialData.applied_date,
        });
      } else {
        setForm({ ...defaultForm, status: defaultStatus || 'Applied' });
      }
      setErrors({});
    }
  }, [open, initialData, defaultStatus]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ApplicationInsert, string>> = {};
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    if (!form.role.trim()) newErrors.role = 'Role/title is required';
    if (!form.applied_date) newErrors.applied_date = 'Date applied is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ApplicationInsert) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700}>
          {initialData ? 'Edit Application' : 'Add New Application'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2.5}>
          <TextField
            label="Company Name"
            fullWidth
            value={form.company}
            onChange={handleChange('company')}
            error={!!errors.company}
            helperText={errors.company}
            autoFocus
            placeholder="e.g. Google, Amazon, Stripe..."
          />
          <TextField
            label="Role / Title"
            fullWidth
            value={form.role}
            onChange={handleChange('role')}
            error={!!errors.role}
            helperText={errors.role}
            placeholder="e.g. Senior Software Engineer"
          />
          <TextField
            select
            label="Status"
            fullWidth
            value={form.status}
            onChange={handleChange('status')}
          >
            {STATUSES.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date Applied"
            type="date"
            fullWidth
            value={form.applied_date}
            onChange={handleChange('applied_date')}
            error={!!errors.applied_date}
            helperText={errors.applied_date}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={form.notes}
            onChange={handleChange('notes')}
            placeholder="Recruiter contact, next steps, salary range..."
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Application'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationFormDialog;
