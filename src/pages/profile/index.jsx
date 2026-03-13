import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Avatar, Typography, Divider, Button, TextField, Chip } from '@mui/material';

import { uploadProfileImage, updateProfile } from '../../redux/actions/profileActions';

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { uploading, updating } = useSelector((state) => state.profileReducer);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: user.username || '',
    email: user.email || '',
    phoneno: user.phoneno || '',
    address: user.address || '',
    profile: user.profile || null,
  });

  const [preview, setPreview] = useState(user.profile);

  if (!user) return null;

  // IMAGE UPLOAD
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const uploaded = await dispatch(uploadProfileImage(file));
    if (uploaded?.gridFsFileId) {
      setForm((prev) => ({
        ...prev,
        profile: uploaded.gridFsFileId,
      }));
    }
  };

  // SAVE PROFILE
  const handleSave = async () => {
    const payload = {};

    Object.keys(form).forEach((k) => {
      if (form[k]) payload[k] = form[k];
    });

    const res = await dispatch(updateProfile(user._id, payload));
    if (res.success) setEditMode(false);
  };

  return (
    <Box display="flex" justifyContent="center" py={4}>
      <Card sx={{ width: '100%', maxWidth: 440, p: 3, borderRadius: 3 }}>
        {/* Avatar */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={preview || undefined}
            sx={{
              width: 90,
              height: 90,
              bgcolor: '#C62828',
              fontSize: '1.8rem',
            }}
          >
            {!preview && getInitials(user.username)}
          </Avatar>

          {editMode && (
            <Button component="label" size="small" sx={{ mt: 1, textTransform: 'none' }}>
              Change Photo
              <input hidden type="file" accept="image/*" onChange={handleImageChange} />
            </Button>
          )}

          <Typography variant="h6" fontWeight={600} mt={1}>
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>

          <Chip
            label={user.role?.toUpperCase()}
            size="small"
            sx={{ mt: 1, bgcolor: '#fdecec', color: '#C62828' }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Details */}
        {editMode ? (
          <Box display="flex" flexDirection="column" gap={1.5}>
            <TextField
              label="Username"
              size="small"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              label="Email"
              size="small"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Phone"
              size="small"
              value={form.phoneno}
              onChange={(e) => setForm({ ...form, phoneno: e.target.value })}
            />
            <TextField
              label="Address"
              size="small"
              multiline
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={1}>
            <ProfileRow label="Phone" value={user.phoneno || '—'} />
            <ProfileRow label="Address" value={user.address || '—'} />
            <ProfileRow label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Actions */}
        <Box display="flex" gap={1}>
          {editMode ? (
            <>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setEditMode(false)}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                disabled={uploading || updating}
                onClick={handleSave}
                sx={{
                  bgcolor: '#C62828',
                  '&:hover': { bgcolor: '#b71c1c' },
                  textTransform: 'none',
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setEditMode(true)}
              sx={{
                bgcolor: '#C62828',
                '&:hover': { bgcolor: '#b71c1c' },
                textTransform: 'none',
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
}

const ProfileRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

export default Profile;
