/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarById } from '../../redux/actions/carsAction';
import moment from 'moment';
import { bookCar } from '../../redux/actions/bookingActions';

import {
  Button,
  Checkbox,
  Dialog,
  Typography,
  FormControlLabel,
  TextField,
  Box,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/lab';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

import './BookingCar.css';
import ErrorModal from '../../components/ErrorModal';

let razorpayLoaded = false;

function loadScript(src) {
  if (razorpayLoaded) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      razorpayLoaded = true;
      resolve(true);
    };
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

let googleMapsLoaded = false;

const tryLoadGoogleMaps = () =>
  new Promise((resolve) => {
    if (googleMapsLoaded && window.google?.maps?.places) {
      return resolve(true);
    }

    // If no API key, fail silently
    if (!process.env.REACT_APP_GOOGLE_MAPS_KEY) {
      return resolve(false);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleMapsLoaded = true;
      resolve(true);
    };

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

function BookingCar({ match, history }) {
  const { car, loading } = useSelector((s) => s.carsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarById({ carId: match.params.carid }));
  }, [match.params.carid]);

  const goBack = () => history.goBack();

  if (loading || !car) {
    return (
      <div className="bc-loader-wrapper">
        <div className="bc-loader-circle" />
        <p className="bc-loader-text">Fetching car details…</p>
      </div>
    );
  }

  return <BookCar car={car} onBack={goBack} />;
}

function BookCar({ car, onBack }) {
  const { user } = useSelector((state) => state.authReducer);
  const [paymentStatus, setPaymentStatus] = useState(null); // success | failure
  console.log(paymentStatus);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: '',
  });
  const showError = (message) => {
    setErrorModal({
      open: true,
      message,
    });
  };

  const dispatch = useDispatch();
  const [bookingInProgress, setBookingInProgress] = useState(false);

  // booking state
  const [range, setRange] = useState([null, null]);
  const [driver, setDriver] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [total, setTotal] = useState(0);

  // derived
  const hasRange = range[0] && range[1];
  const overlap = hasOverlap(range, car.bookings);
  const isDriverInfoInvalid = driver && (!pickupLocation.trim() || !dropLocation.trim());

  const formatForBackend = (date) => moment(date).local().format('MMM DD YYYY HH:mm');
  const FUTURE_BUFFER_MINUTES = 5;
  const nowPlusBuffer = new Date(Date.now() + FUTURE_BUFFER_MINUTES * 60 * 1000);
  const nowWithBuffer = moment().add(FUTURE_BUFFER_MINUTES, 'minutes');
  const isPastPickup = range[0] && moment(range[0]).isSameOrBefore(nowWithBuffer);
  const MIN_HOURS = 1;
  const isTooShort = hasRange && totalHours < MIN_HOURS;

  // calculate pricing
  useEffect(() => {
    if (!hasRange) {
      setTotalHours(0);
      setTotal(0);
      return;
    }

    const hours = Math.abs(range[1] - range[0]) / 36e5;
    setTotalHours(hours);

    let amount = hours * car.rentPerHour;
    if (driver) amount += hours * 30;
    setTotal(Math.round(amount));
  }, [range, driver, car.rentPerHour]);

  // Map loading
  const [mapsAvailable, setMapsAvailable] = useState(false);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    if (!driver) return;

    tryLoadGoogleMaps().then((loaded) => {
      setMapsAvailable(loaded);

      if (!loaded) return;

      if (pickupRef.current) {
        const pickupAuto = new window.google.maps.places.Autocomplete(pickupRef.current, {
          types: ['geocode'],
        });

        pickupAuto.addListener('place_changed', () => {
          const place = pickupAuto.getPlace();
          setPickupLocation(place.formatted_address || '');
        });
      }

      if (dropRef.current) {
        const dropAuto = new window.google.maps.places.Autocomplete(dropRef.current, {
          types: ['geocode'],
        });
        dropAuto.addListener('place_changed', () => {
          const place = dropAuto.getPlace();
          setDropLocation(place.formatted_address || '');
        });
      }
    });
  }, [driver]);

  const handleBook = async () => {
     if (bookingInProgress) return;
     setBookingInProgress(true)
    if (!hasRange) {
      setBookingInProgress(false);
      return;
    }

    // FINAL SAFETY CHECK (authoritative)
    const overlapNow = hasOverlap(range, car.bookings);
    if (overlapNow) {
      showError('Selected dates overlap with an existing booking');
      return;
    }

    if (isPastPickup) {
      showError('Pickup time must be in the future');
      return;
    }

    if (isTooShort) {
      showError('Minimum booking duration is 1 hour');
      return;
    }

    if (isDriverInfoInvalid) {
      showError('Pickup and drop locations are required when driver is selected');
      return;
    }

    const payload = {
      car: car._id,
      totalHours,
      totalAmount: total,
      driverRequired: driver,
      bookedTimeSlots: {
        from: formatForBackend(range[0]),
        to: formatForBackend(range[1]),
      },
      pickupDate: formatForBackend(range[0]),
      dropDate: formatForBackend(range[1]),
      ...(driver && {
        pickupLocation,
        dropLocation,
      }),
    };

    const result = await dispatch(bookCar(payload));

    if (!result?.success) {
      showError(result?.data || result.message);
      setBookingInProgress(false);
      return;
    }
    displayRazorpay();
    setBookingInProgress(false);
  };

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      showError('Razorpay sdk failed to load.Are you online');
      return;
    }

    const orderRaw = localStorage.getItem('order');
    if (!orderRaw) {
      showError('Payment cannot be initiated. Order not created.');
      return;
    }

    const data1 = JSON.parse(orderRaw);
    if (!data1?.data?.id || !data1?.data?.amount) {
      showError('Invalid payment order. Please try again.');
      return;
    }

    const data = data1.data;
    // console.log(data1);
    const options = {
      key: 'rzp_test_wt6S48PF3wQ702',
      amount: data.amount,
      currency: 'INR',
      name: 'King Cars',
      description: 'Booking Transaction',
      image:
        'https://image.shutterstock.com/z/stock-vector-king-car-logo-design-template-vector-illustration-466912277.jpg',
      order_id: data.id,
      prefill: {
        name: 'user', // TODO: username has to be passed here
        contact: user.phoneno,
        email: user.email,
      },
      handler: () => {
        setPaymentStatus('success');
        window.location.href = '/my-bookings';
      },
      modal: {
        ondismiss: () => setPaymentStatus('failure'),
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const title =
    car.manufacturer && car.model
      ? `${car.manufacturer} ${car.model} ${car.variant || ''}`.trim()
      : car.name || 'Rental Car';

  const specs = [
    { label: 'Fuel', value: car.fuelType },
    { label: 'Transmission', value: car.transmission || 'Manual' },
    { label: 'Seats', value: `${car.capacity || 5} seats` },
    { label: 'Segment', value: car.segment || 'Sedan' },
  ];

  const hotFeatures = ['Air Conditioning', 'Bluetooth / USB', 'Power Steering', 'ABS & Airbags'];

  const reviews = [
    { name: 'Anand', rating: 5, text: 'Very clean car and smooth drive around the city.' },
    { name: 'Priya', rating: 4, text: 'Pickup was on time, overall great experience.' },
  ];

  const locationText =
    car.location?.city && car.location?.state
      ? `${car.location.city}, ${car.location.state}`
      : 'Available in your city';
  console.log(!hasRange, totalHours, overlap, isPastPickup, isDriverInfoInvalid);
  console.log({
    pickup: range[0]?.toString(),
    nowWithBuffer: nowWithBuffer.toString(),
  });

  return (
    <div className="bc-page">
      {/* Top header bar for mobile */}
      <header className="bc-header">
        <IconButton onClick={onBack} className="bc-back-icon">
          <ArrowBackIcon />
        </IconButton>
        <div className="bc-header-title">
          <Typography variant="subtitle2" className="bc-location">
            {locationText}
          </Typography>
          <Typography variant="h6" className="bc-car-title">
            {title}
          </Typography>
        </div>
        <div className="bc-header-price">
          <Typography variant="body2" className="bc-price-label">
            from
          </Typography>
          <Typography variant="subtitle1" className="bc-price-value">
            ₹{car.rentPerHour}/hr
          </Typography>
        </div>
      </header>

      <div className="bc-layout">
        {/* MAIN CONTENT */}
        <main className="bc-main">
          {/* HERO IMAGE + BADGES */}
          <section className="bc-hero">
            <div className="bc-hero-image-wrapper">
              <img
                src={car.image}
                alt={title}
                className="bc-hero-image"
                // onError={(e) => {
                //   e.target.src = 'https://via.placeholder.com/900x500?text=Car+Image+Not+Available';
                // }}
              />
              <div className="bc-hero-badges">
                <Chip label={car.fuelType || 'Petrol'} className="bc-chip" />
                <Chip label={car.transmission || 'Manual'} className="bc-chip" />
                <Chip label={`${car.capacity || 5} Seater`} className="bc-chip" />
              </div>
            </div>
            <div className="bc-hero-meta">
              <div className="bc-rating-row">
                <div className="bc-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className="bc-star" />
                  ))}
                </div>
                <Typography variant="body2" className="bc-rating-text">
                  4.8 · 32 trips
                </Typography>
              </div>
              <Typography variant="body2" className="bc-small-muted">
                Instant booking · No security deposit
              </Typography>
            </div>
          </section>

          {/* SPECS + DESCRIPTION */}
          <section className="bc-section bc-specs-section">
            <Typography variant="h6" className="bc-section-title">
              Car details
            </Typography>
            <div className="bc-specs-grid">
              {specs.map(
                (s) =>
                  s.value && (
                    <div className="bc-spec-card" key={s.label}>
                      <span className="bc-spec-label">{s.label}</span>
                      <span className="bc-spec-value">{s.value}</span>
                    </div>
                  )
              )}
            </div>
            {car.description && (
              <Typography variant="body2" className="bc-description">
                {car.description}
              </Typography>
            )}
          </section>

          {/* FEATURES */}
          <section className="bc-section">
            <Typography variant="h6" className="bc-section-title">
              Included features
            </Typography>
            <div className="bc-features">
              {hotFeatures.map((feat) => (
                <span key={feat} className="bc-feature-chip">
                  {feat}
                </span>
              ))}
            </div>
          </section>

          {/* POLICIES */}
          <section className="bc-section bc-policy-section">
            <Typography variant="h6" className="bc-section-title">
              Policies
            </Typography>
            <div className="bc-policy-row">
              <div>
                <Typography variant="subtitle2">Free cancellation</Typography>
                <Typography variant="body2" className="bc-small-muted">
                  Full refund if cancelled 24 hours before pickup time.
                </Typography>
              </div>
              <Divider orientation="vertical" flexItem className="bc-policy-divider" />
              <div>
                <Typography variant="subtitle2">Fuel policy</Typography>
                <Typography variant="body2" className="bc-small-muted">
                  Return with the same fuel level as at pickup.
                </Typography>
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="bc-section">
            <Typography variant="h6" className="bc-section-title">
              Customer reviews
            </Typography>
            <div className="bc-reviews">
              {reviews.map((r, i) => (
                <div key={i} className="bc-review-card">
                  <div className="bc-review-header">
                    <div className="bc-review-avatar">{r.name[0]}</div>
                    <div>
                      <div className="bc-review-name">{r.name}</div>
                      <div className="bc-review-stars">
                        {[...Array(r.rating)].map((_, idx) => (
                          <StarIcon key={idx} className="bc-review-star" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bc-review-text">{r.text}</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* BOOKING SIDEBAR / CARD */}
        <aside className="bc-sidebar">
          <Box className="bc-booking-card">
            <Typography variant="subtitle1" className="bc-booking-title">
              Book this car
            </Typography>

            <div className="bc-price-row">
              <span className="bc-price-main">₹{car.rentPerHour}</span>
              <span className="bc-price-sub">/ hour</span>
            </div>

            <Divider className="bc-divider" />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {overlap && (
                <Typography className="bc-small-muted" color="error">
                  Selected dates overlap with an existing booking
                </Typography>
              )}
              <MobileDateTimePicker
                label="Pickup date & time"
                value={range[0]}
                minDateTime={nowPlusBuffer}
                onChange={(val) => setRange([val, range[1]])}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ margin: '10px' }}
                    size="small"
                    fullWidth
                    className="bc-date-input"
                  />
                )}
              />

              <MobileDateTimePicker
                label="Drop date & time"
                value={range[1]}
                minDateTime={range[0] || nowPlusBuffer}
                onChange={(val) => setRange([range[0], val])}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ margin: '10px' }}
                    size="small"
                    fullWidth
                    className="bc-date-input"
                  />
                )}
              />
            </LocalizationProvider>

            <FormControlLabel
              className="bc-driver-check"
              control={
                <Checkbox
                  checked={driver}
                  onChange={(e) => setDriver(e.target.checked)}
                  size="small"
                />
              }
              label="Add driver (₹30/hr)"
            />

            {driver && (
              <div className="bc-driver-locations">
                {/* Pickup */}
                {mapsAvailable ? (
                  <TextField
                    label="Pickup location"
                    size="small"
                    sx={{ margin: '10px' }}
                    fullWidth
                    inputRef={pickupRef}
                    placeholder="Search pickup location"
                  />
                ) : (
                  <TextField
                    label="Pickup location"
                    size="small"
                    sx={{ margin: '10px' }}
                    fullWidth
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup location"
                  />
                )}

                {/* Drop */}
                {mapsAvailable ? (
                  <TextField
                    label="Drop location"
                    size="small"
                    sx={{ margin: '10px' }}
                    fullWidth
                    inputRef={dropRef}
                    placeholder="Search drop location"
                  />
                ) : (
                  <TextField
                    label="Drop location"
                    size="small"
                    sx={{ margin: '10px' }}
                    fullWidth
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="Enter drop location"
                  />
                )}

                {!mapsAvailable && (
                  <Typography className="bc-small-muted">
                    Map search unavailable — you can type locations manually
                  </Typography>
                )}
              </div>
            )}

            {hasRange && (
              <div className="bc-summary">
                <div className="bc-summary-row">
                  <span>Trip duration</span>
                  <span>{totalHours.toFixed(1)} hrs</span>
                </div>
                <div className="bc-summary-row">
                  <span>Car rent</span>
                  <span>₹{(totalHours * car.rentPerHour).toFixed(0)}</span>
                </div>
                {driver && (
                  <div className="bc-summary-row">
                    <span>Driver charges</span>
                    <span>₹{(totalHours * 30).toFixed(0)}</span>
                  </div>
                )}
                <Divider className="bc-divider" />
                <div className="bc-summary-row bc-summary-total">
                  <span>Total amount</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>
            )}
            {driver && isDriverInfoInvalid && (
              <Typography className="bc-small-muted" color="error">
                Pickup and drop locations are required when driver is selected
              </Typography>
            )}
            {isPastPickup && (
              <Typography className="bc-small-muted" color="error">
                Pickup time must be in the future
              </Typography>
            )}

            {isDriverInfoInvalid && (
              <Typography className="bc-small-muted" color="error">
                Pickup and drop locations are required when driver is selected
              </Typography>
            )}

            {overlap && (
              <Typography className="bc-small-muted" color="error">
                Selected dates overlap with an existing booking
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              className="bc-btn-primary"
              // disabled={!hasRange || totalHours <= 0}
              disabled={
                !hasRange ||
                isTooShort ||
                overlap ||
                isPastPickup ||
                isDriverInfoInvalid ||
                bookingInProgress
              }
              onClick={handleBook}
            >
              Proceed to pay
            </Button>

            <Button
              variant="text"
              fullWidth
              className="bc-btn-secondary"
              onClick={() => setShowSlots(true)}
            >
              View booked slots
            </Button>

            {hasRange && (
              <Typography variant="caption" className="bc-caption">
                Pickup: {moment(range[0]).format('MMM DD, hh:mm A')} · Drop:{' '}
                {moment(range[1]).format('MMM DD, hh:mm A')}
              </Typography>
            )}
          </Box>
          <ErrorModal
            open={errorModal.open}
            title="Error while booking a car"
            message={errorModal.message}
            onClose={() => setErrorModal({ open: false, message: '' })}
          />
        </aside>
      </div>

      {/* BOOKED SLOTS DIALOG */}
      <Dialog open={showSlots} onClose={() => setShowSlots(false)} maxWidth="xs" fullWidth>
        <Box className="bc-modal">
          <Typography variant="h6" className="bc-modal-title">
            Booked slots
          </Typography>
          <Divider className="bc-divider" />
          <div className="bc-slots-list">
            {car.bookings && car.bookings.length > 0 ? (
              car.bookings.map((slot, i) => (
                <div key={i} className="bc-slot-row">
                  <span>{slot.from}</span>
                  <span className="bc-slot-arrow">→</span>
                  <span>{slot.to}</span>
                </div>
              ))
            ) : (
              <Typography variant="body2" className="bc-small-muted">
                This car is not booked yet. All slots are available.
              </Typography>
            )}
          </div>
          <Button
            onClick={() => setShowSlots(false)}
            variant="contained"
            fullWidth
            className="bc-btn-primary mt-2"
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}

const hasOverlap = (range, bookings = []) => {
  if (!range[0] || !range[1] || !bookings.length) return false;

  const start = moment(range[0]).valueOf();
  const end = moment(range[1]).valueOf();

  return bookings.some((b) => {
    const bStart = moment(b.from, 'MMM DD YYYY HH:mm').valueOf();
    const bEnd = moment(b.to, 'MMM DD YYYY HH:mm').valueOf();

    return start < bEnd && end > bStart;
  });
};

export default BookingCar;
