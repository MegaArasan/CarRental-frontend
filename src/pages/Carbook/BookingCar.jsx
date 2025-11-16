// ///* eslint-disable react-hooks/exhaustive-deps */
// //import React, { useState, useEffect } from "react";
// //import { useSelector, useDispatch } from "react-redux";
// //import { getAllCars } from "../../redux/actions/carsAction";
// //import moment from "moment";
// //import { bookCar } from "../../redux/actions/bookingActions";
// //// import { useParams } from "react-router-dom";
// //import {
// //  Divider,
// //  Box,
// //  Button,
// //  Checkbox,
// //  Dialog,
// //  CircularProgress,
// //  Typography,
// //  FormControlLabel,
// //} from "@mui/material";
// //import TextField from "@mui/material/TextField";
// //import AdapterDateFns from "@mui/lab/AdapterDateFns";
// //import LocalizationProvider from "@mui/lab/LocalizationProvider";
// //import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
// //import "./BookingCar.css";
// //

// //
// //function BookCar({ car }) {
// //  const {user} = JSON.parse(localStorage.getItem("user"));
// //  const username = user.username;
// //  const dispatch = useDispatch();
// //  const [from, setFrom] = useState();
// //  const [to, setTo] = useState();
// //  const [totalHours, setTotalHours] = useState(0);
// //  const [driver, setdriver] = useState(false);
// //  const [totalAmount, setTotalAmount] = useState(0);
// //  const [showModal, setShowModal] = useState(false);
// //  const [value, setvalue] = useState([null, null]);
// //  const rent = car.rentPerHour;
// //  useEffect(() => {
// //    // console.log(totalHours, totalAmount, rent);
// //    setTotalAmount(totalHours * rent);
// //  }, [driver, totalHours, rent]);
// //  useEffect(() => {
// //    if (driver) return setTotalAmount(totalAmount + 30 * totalHours);
// //  }, [driver]);
// //  function selectTimeSlots(values) {
// //    setvalue(values);
// //    setFrom(moment(values[0]).format("MMM DD yyyy"));
// //    setTo(moment(values[1]).format("MMM DD yyyy"));
// //    // console.log(values[0], values[1]);
// //    // console.log(Math.abs(values[1] - values[0]) / 36e5);
// //    setTotalHours(Math.abs(values[1] - values[0]) / 36e5);
// //  }
// //  const onSubmit = () => {
// //    const reqObj = {
// //      user: user,
// //      car: car._id,
// //      totalHours: totalHours,
// //      totalAmount: totalAmount,
// //      driverRequired: driver,
// //      bookedTimeSlots: {
// //        from,
// //        to,
// //      },
// //    };
// //
// //    dispatch(bookCar(reqObj));

// //  };

// //  return (
// //    <section className="carpage">
// //      <div className="carinfo">
// //        <div>
// //          <img src={car.image} alt={car.name} className="carimage" />
// //        </div>
// //        <div className="info">
// //          {/* <Divider type="horizontal">Car Info</Divider> */}
// //          <Typography variant="h5">
// //            <b>Car Info</b>
// //          </Typography>
// //          <div style={{ textAlign: "center" }}>
// //            <h6>
// //              <b>{car.name}</b>
// //            </h6>
// //            <h6>
// //              ₹{car.rentPerHour} <b>Rent Per hour</b> /-
// //            </h6>
// //            <h6>
// //              <b>Fuel Type : </b>
// //              {car.fuelType}
// //            </h6>
// //            <h6>
// //              <b>Max Persons : </b>
// //              {car.capacity}
// //            </h6>
// //          </div>
// //        </div>
// //      </div>
// //      <br />
// //      <Divider type="horizontal" />
// //      <Typography variant="h5">Select Time Slots</Typography>
// //      <div className="centcont">
// //        <LocalizationProvider dateAdapter={AdapterDateFns}>
// //          <MobileDateRangePicker
// //            startText="start Date"
// //            value={value}
// //            onChange={selectTimeSlots}
// //            renderInput={(startProps, endProps) => (
// //              <React.Fragment>
// //                <TextField {...startProps} />
// //                <Box sx={{ mx: 2 }}> to </Box>
// //                <TextField {...endProps} />
// //              </React.Fragment>
// //            )}
// //          />
// //        </LocalizationProvider>
// //        <br />
// //        <Button
// //          className="btn1 mt-2"
// //          variant="outlined"
// //          onClick={() => {
// //            setShowModal(true);
// //          }}
// //        >
// //          See Booked Slots
// //        </Button>
// //      </div>
// //      {from && to && (
// //        <div>
// //          <p>
// //            Total Hours : <b>{totalHours}</b>
// //          </p>
// //          <p>
// //            Rent Per Hour : <b>{car.rentPerHour}</b>
// //          </p>
// //          <FormControlLabel
// //            control={
// //              <Checkbox
// //                onChange={(e) => {
// //                  if (e.target.checked) {
// //                    setdriver(true);
// //                  } else {
// //                    setdriver(false);
// //                  }
// //                }}
// //              />
// //            }
// //            label="Driver Required"
// //          />
// //
// //          {/* <label></label> */}
// //
// //          <h3>Total Amount : {totalAmount}</h3>
// //          <Button variant="outlined" onClick={() => onSubmit()}>
// //            Book Now
// //          </Button>
// //        </div>
// //      )}
// //
// //      {car.name && (
// //        <Dialog open={showModal} title="Booked time slots">
// //          <div className="p-2">
// //            {car.bookedTimeSlots.length > 0 &&
// //              car.bookedTimeSlots.map((slot) => {
// //                return (
// //                  <Button className="btn1 mt-2">
// //                    {slot.from} - {slot.to}
// //                  </Button>
// //                );
// //              })}
// //            {car.bookedTimeSlots.length === 0 ? (
// //              <h6>Car is not booked yet</h6>
// //            ) : (
// //              ""
// //            )}
// //
// //            <div className="text-right mt-5">
// //              <Button
// //                className="btn1"
// //                onClick={() => {
// //                  setShowModal(false);
// //                }}
// //              >
// //                CLOSE
// //              </Button>
// //            </div>
// //          </div>
// //        </Dialog>
// //      )}
// //    </section>
// //  );
// //}
// //
// //export default BookingCar;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

import './BookingCar.css';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

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
  const { user } = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  // booking state
  const [range, setRange] = useState([null, null]);
  const [driver, setDriver] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [total, setTotal] = useState(0);

  // derived
  const hasRange = range[0] && range[1];

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
    setTotal(amount);
  }, [range, driver, car.rentPerHour]);

  const handleBook = () => {
    if (!hasRange) return;

    const payload = {
      user,
      car: car._id,
      totalHours,
      totalAmount: total,
      driverRequired: driver,
      bookedTimeSlots: {
        from: moment(range[0]).format('MMM DD, yyyy'),
        to: moment(range[1]).format('MMM DD, yyyy'),
      },
    };

    dispatch(bookCar(payload));
    setTimeout(() => {
      displayRazorpay();
    }, 500);
  };

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay sdk failed to load.Are you online');
      return;
    }

    const data1 = JSON.parse(localStorage.getItem('order'));
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
              <MobileDateRangePicker
                startText="Start date & time"
                endText="End date & time"
                value={range}
                onChange={(newVal) => setRange(newVal)}
                renderInput={(startProps, endProps) => (
                  <div className="bc-date-fields">
                    <TextField {...startProps} size="small" fullWidth className="bc-date-input" />
                    <TextField {...endProps} size="small" fullWidth className="bc-date-input" />
                  </div>
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

            <Button
              variant="contained"
              fullWidth
              className="bc-btn-primary"
              disabled={!hasRange || totalHours <= 0}
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

export default BookingCar;
