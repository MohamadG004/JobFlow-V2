import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack, TextField,
  Button, Divider, Alert, Avatar,
} from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setMsg({ type: 'error', text: 'Passwords do not match' }); return; }
    if (password.length < 8) { setMsg({ type: 'error', text: 'Password must be 8+ characters' }); return; }
    setLoading(true);
    try {
      await authService.updatePassword(password);
      setMsg({ type: 'success', text: 'Password updated successfully!' });
      setPassword(''); setConfirm('');
    } catch (err) {
      setMsg({ type: 'error', text: err instanceof Error ? err.message : 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 640 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>Profile & Settings</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Manage your account</Typography>

      {/* Account info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography fontWeight={700} sx={{ mb: 2.5 }}>Account</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, fontWeight: 700, fontSize: '1.2rem', background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
              {user?.email?.[0].toUpperCase()}
            </Avatar>
            <Box>
              <Typography fontWeight={600}>{user?.email}</Typography>
              <Typography variant="body2" color="text.secondary">Free Plan · Member since today</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography fontWeight={700} sx={{ mb: 2.5 }}>Change Password</Typography>
          {msg && <Alert severity={msg.type} sx={{ mb: 2, borderRadius: 2 }}>{msg.text}</Alert>}
          <form onSubmit={handlePasswordUpdate}>
            <Stack spacing={2.5}>
              <TextField label="New password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} helperText="Minimum 8 characters" />
              <TextField label="Confirm new password" type="password" fullWidth required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              <Button type="submit" variant="contained" disabled={loading} sx={{ alignSelf: 'flex-start' }}>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card sx={{ border: '1px solid', borderColor: 'error.light' }}>
        <CardContent>
          <Typography fontWeight={700} color="error.main" sx={{ mb: 1 }}>Danger Zone</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Sign out of all devices.</Typography>
          <Button variant="outlined" color="error" onClick={signOut}>Sign Out</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;