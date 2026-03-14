import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteOffer, fetchOffers, saveOffer } from '../../redux/actions/adminActions';
import { getAllCars } from '../../redux/actions/carsAction';
import './Admin.css';

const initialForm = {
  title: '',
  description: '',
  discountType: 'percentage',
  discountValue: '',
  carIds: [],
  isGlobal: false,
  minDays: '',
  promoCode: '',
  startDate: '',
  endDate: '',
  isActive: true,
};

function AdminOffers() {
  const dispatch = useDispatch();
  const { offers, dashboardLoading, submittingOffer, deletingOfferId, error } = useSelector(
    (state) => state.adminReducer
  );
  const { cars } = useSelector((state) => state.carsReducer);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(getAllCars());
  }, [dispatch]);

  const availableCars = cars?.cars || [];

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);

    const result = await dispatch(saveOffer(form, editingId));

    if (result.success) {
      setFeedback({
        type: 'success',
        message: editingId ? 'Offer updated successfully.' : 'Offer created successfully.',
      });
      setForm(initialForm);
      setEditingId(null);
      return;
    }

    setFeedback({ type: 'error', message: result.message });
  };

  const handleEdit = (offer) => {
    setEditingId(offer._id || offer.id);
    setForm({
      title: offer.title || offer.name || '',
      description: offer.description || '',
      discountType: offer.discountType || 'percentage',
      discountValue: offer.discountValue || '',
      carIds: Array.isArray(offer.carIds) ? offer.carIds : [],
      isGlobal: Boolean(offer.isGlobal),
      minDays: offer.minDays || '',
      promoCode: offer.promoCode || '',
      startDate: offer.startDate ? String(offer.startDate).slice(0, 10) : '',
      endDate: offer.endDate ? String(offer.endDate).slice(0, 10) : '',
      isActive: offer.isActive !== undefined ? Boolean(offer.isActive) : true,
    });
  };

  const handleDelete = async (offerId) => {
    const result = await dispatch(deleteOffer(offerId));
    setFeedback({
      type: result.success ? 'success' : 'error',
      message: result.success ? 'Offer removed successfully.' : result.message,
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <section className="admin-hero">
          <div>
            <Typography variant="h4" fontWeight={700}>
              Manage Offers
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              Create, update, and remove promotional offers.
            </Typography>
          </div>
          <Chip
            label={`${offers.length} offers`}
            sx={{ alignSelf: 'flex-start', bgcolor: '#fff', color: '#991b1b' }}
          />
        </section>

        <Card className="admin-card" sx={{ mb: 3 }}>
          <CardContent>
            {(feedback || error) && (
              <Alert severity={feedback?.type || 'error'} sx={{ mb: 2 }}>
                {feedback?.message || error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <div className="admin-form">
                <TextField
                  label="Title"
                  value={form.title}
                  onChange={handleChange('title')}
                  required
                />
                <TextField
                  select
                  label="Discount Type"
                  value={form.discountType}
                  onChange={handleChange('discountType')}
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="flat">Flat</MenuItem>
                </TextField>
                <TextField
                  label="Discount Value"
                  type="number"
                  value={form.discountValue}
                  onChange={handleChange('discountValue')}
                  required
                />
                <TextField
                  label="Minimum Days"
                  type="number"
                  value={form.minDays}
                  onChange={handleChange('minDays')}
                />
                <TextField
                  label="Promo Code"
                  value={form.promoCode}
                  onChange={handleChange('promoCode')}
                />
                <TextField
                  label="Start Date"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange('startDate')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange('endDate')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className="admin-form-wide"
                  label="Description"
                  value={form.description}
                  onChange={handleChange('description')}
                  multiline
                  minRows={3}
                />
                <Box className="admin-form-wide">
                  <InputLabel id="offer-cars-label" sx={{ mb: 1 }}>
                    Cars
                  </InputLabel>
                  <Select
                    labelId="offer-cars-label"
                    multiple
                    fullWidth
                    value={form.carIds}
                    onChange={handleChange('carIds')}
                    input={<OutlinedInput />}
                    disabled={form.isGlobal}
                    renderValue={(selected) =>
                      selected
                        .map((carId) => {
                          const car = availableCars.find((item) => item._id === carId);
                          return car ? `${car.manufacturer} ${car.model}` : carId;
                        })
                        .join(', ')
                    }
                  >
                    {availableCars.map((car) => (
                      <MenuItem key={car._id} value={car._id}>
                        <Checkbox checked={form.carIds.indexOf(car._id) > -1} />
                        {`${car.manufacturer} ${car.model} (${car._id})`}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box className="admin-form-wide" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.isGlobal}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            isGlobal: event.target.checked,
                            carIds: event.target.checked ? [] : prev.carIds,
                          }))
                        }
                      />
                    }
                    label="Global Offer"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.isActive}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, isActive: event.target.checked }))
                        }
                      />
                    }
                    label="Active"
                  />
                </Box>
              </div>

              <div className="admin-actions">
                {editingId && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingId(null);
                      setForm(initialForm);
                    }}
                    disabled={submittingOffer}
                  >
                    Cancel Edit
                  </Button>
                )}
                <Button type="submit" variant="contained" disabled={submittingOffer}>
                  {submittingOffer ? 'Saving...' : editingId ? 'Update Offer' : 'Create Offer'}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>

        <Card className="admin-card">
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Existing Offers
            </Typography>

            {dashboardLoading ? (
              <div className="admin-empty">Loading offers...</div>
            ) : offers.length === 0 ? (
              <div className="admin-empty">No offers available.</div>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Promo Code</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Scope</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {offers.map((offer) => {
                      const offerId = offer._id || offer.id;
                      return (
                        <TableRow key={offerId}>
                          <TableCell>{offer.title || offer.name}</TableCell>
                          <TableCell>{offer.promoCode || '-'}</TableCell>
                          <TableCell>
                            {offer.discountValue}
                            {offer.discountType === 'percentage' ? '%' : ''}
                          </TableCell>
                          <TableCell>
                            {offer.isGlobal ? 'Global' : `${offer.carIds?.length || 0} cars`}
                          </TableCell>
                          <TableCell>{offer.isActive ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="right">
                            <div className="admin-table-actions">
                              <IconButton onClick={() => handleEdit(offer)} size="small">
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDelete(offerId)}
                                size="small"
                                disabled={deletingOfferId === offerId}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </div>
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

export default AdminOffers;
