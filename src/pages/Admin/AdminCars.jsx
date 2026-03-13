import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { addCar, updateCar, uploadAdminAsset } from '../../redux/actions/adminActions';
import { getAllCars } from '../../redux/actions/carsAction';
import './Admin.css';

const initialForm = {
  manufacturer: '',
  model: '',
  variant: '',
  fuelType: 'Petrol',
  transmission: 'Manual',
  capacity: 5,
  rentPerHour: '',
  image: '',
  thumbnail: '',
  segment: '',
  status: 'active',
  city: '',
  state: '',
  country: 'India',
};

function AdminCars() {
  const dispatch = useDispatch();
  const { submittingCar, uploadingAsset, error } = useSelector((state) => state.adminReducer);
  const { cars } = useSelector((state) => state.carsReducer);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [uploadTarget, setUploadTarget] = useState(null);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const carList = useMemo(() => cars?.cars || [], [cars]);

  const isValid = useMemo(
    () =>
      form.manufacturer &&
      form.model &&
      form.rentPerHour &&
      form.image &&
      form.thumbnail &&
      form.city &&
      form.state &&
      form.country,
    [form]
  );

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);

    const payload = {
      manufacturer: form.manufacturer.trim(),
      model: form.model.trim(),
      variant: form.variant.trim(),
      transmission: form.transmission,
      segment: form.segment.trim(),
      image: form.image.trim(),
      thumbnail: form.thumbnail.trim(),
      capacity: Number(form.capacity),
      fuelType: form.fuelType,
      rentPerHour: Number(form.rentPerHour),
      status: form.status,
      location: {
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
      },
    };

    const result = editingId ? await dispatch(updateCar(editingId, payload)) : await dispatch(addCar(payload));

    if (result.success) {
      setFeedback({
        type: 'success',
        message: editingId ? 'Car updated successfully.' : 'Car added successfully.',
      });
      setForm(initialForm);
      setEditingId(null);
      return;
    }

    setFeedback({ type: 'error', message: result.message });
  };

  const handleEdit = (car) => {
    setEditingId(car._id || car.id);
    setForm({
      manufacturer: car.manufacturer || '',
      model: car.model || '',
      variant: car.variant || '',
      fuelType: car.fuelType || 'Petrol',
      transmission: car.transmission || 'Manual',
      capacity: car.capacity || 5,
      rentPerHour: car.rentPerHour || '',
      image: car.image || '',
      thumbnail: car.thumbnail || '',
      segment: car.segment || '',
      status: car.status || 'active',
      city: car.location?.city || '',
      state: car.location?.state || '',
      country: car.location?.country || 'India',
    });
    setFeedback(null);
  };

  const handleAssetUpload = (field) => async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadTarget(field);
    const result = await dispatch(uploadAdminAsset(file));
    setUploadTarget(null);

    if (result.success && result.assetId) {
      setForm((prev) => ({ ...prev, [field]: result.assetId }));
      setFeedback({ type: 'success', message: `${field === 'image' ? 'Image' : 'Thumbnail'} uploaded.` });
      return;
    }

    setFeedback({ type: 'error', message: result.message });
  };

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <section className="admin-hero">
          <div>
            <Typography variant="h4" fontWeight={700}>
              {editingId ? 'Edit Car' : 'Add New Car'}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              Admin-only inventory creation and update flow aligned to the backend car payload.
            </Typography>
          </div>
          <Chip label="Admin Access" sx={{ alignSelf: 'flex-start', bgcolor: '#fff', color: '#991b1b' }} />
        </section>

        <Card className="admin-card">
          <CardContent>
            {(feedback || error) && (
              <Alert severity={feedback?.type || 'error'} sx={{ mb: 2 }}>
                {feedback?.message || error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <div className="admin-form">
                <TextField label="Manufacturer" value={form.manufacturer} onChange={handleChange('manufacturer')} required />
                <TextField label="Model" value={form.model} onChange={handleChange('model')} required />
                <TextField label="Variant" value={form.variant} onChange={handleChange('variant')} />
                <TextField select label="Fuel Type" value={form.fuelType} onChange={handleChange('fuelType')}>
                  <MenuItem value="Petrol">Petrol</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                  <MenuItem value="Electric">Electric</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </TextField>
                <TextField select label="Transmission" value={form.transmission} onChange={handleChange('transmission')}>
                  <MenuItem value="Manual">Manual</MenuItem>
                  <MenuItem value="Automatic">Automatic</MenuItem>
                </TextField>
                <TextField label="Seats" type="number" value={form.capacity} onChange={handleChange('capacity')} />
                <TextField label="Rent / Hour" type="number" value={form.rentPerHour} onChange={handleChange('rentPerHour')} required />
                <TextField label="Segment" value={form.segment} onChange={handleChange('segment')} />
                <TextField select label="Status" value={form.status} onChange={handleChange('status')}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
                <TextField label="City" value={form.city} onChange={handleChange('city')} required />
                <TextField label="State" value={form.state} onChange={handleChange('state')} required />
                <TextField label="Country" value={form.country} onChange={handleChange('country')} required />
                <TextField
                  label="Image Asset ID"
                  value={form.image}
                  onChange={handleChange('image')}
                  required
                />
                <TextField
                  label="Thumbnail Asset ID"
                  value={form.thumbnail}
                  onChange={handleChange('thumbnail')}
                  required
                />
              </div>

              <div className="admin-actions">
                <Button component="label" variant="outlined" disabled={uploadingAsset}>
                  {uploadTarget === 'image' ? 'Uploading Image...' : 'Upload Image'}
                  <input hidden type="file" accept="image/*" onChange={handleAssetUpload('image')} />
                </Button>
                <Button component="label" variant="outlined" disabled={uploadingAsset}>
                  {uploadTarget === 'thumbnail' ? 'Uploading Thumbnail...' : 'Upload Thumbnail'}
                  <input hidden type="file" accept="image/*" onChange={handleAssetUpload('thumbnail')} />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setForm(initialForm);
                    setEditingId(null);
                  }}
                  disabled={submittingCar}
                >
                  {editingId ? 'Cancel Edit' : 'Reset'}
                </Button>
                <Button type="submit" variant="contained" disabled={!isValid || submittingCar}>
                  {submittingCar ? 'Saving...' : editingId ? 'Update Car' : 'Create Car'}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        <Card className="admin-card">
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Existing Cars
            </Typography>

            {carList.length === 0 ? (
              <div className="admin-empty">No cars available.</div>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Manufacturer</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Variant</TableCell>
                      <TableCell>Rent / Hour</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {carList.map((car) => {
                      const carId = car._id || car.id;
                      return (
                        <TableRow key={carId}>
                          <TableCell>{car.manufacturer || '-'}</TableCell>
                          <TableCell>{car.model || '-'}</TableCell>
                          <TableCell>{car.variant || '-'}</TableCell>
                          <TableCell>{car.rentPerHour || '-'}</TableCell>
                          <TableCell sx={{ textTransform: 'capitalize' }}>{car.status || 'active'}</TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={() => handleEdit(car)}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminCars;
