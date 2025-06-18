///* eslint-disable react-hooks/exhaustive-deps */
//import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { getAllCars } from "../../redux/actions/carsAction";
//import moment from "moment";
//import { bookCar } from "../../redux/actions/bookingActions";
//// import { useParams } from "react-router-dom";
//import {
//  Divider,
//  Box,
//  Button,
//  Checkbox,
//  Dialog,
//  CircularProgress,
//  Typography,
//  FormControlLabel,
//} from "@mui/material";
//import TextField from "@mui/material/TextField";
//import AdapterDateFns from "@mui/lab/AdapterDateFns";
//import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
//import "./BookingCar.css";
//
//function loadScript(src) {
//  return new Promise((resolve) => {
//    const script = document.createElement("script");
//    script.src = src;
//    script.onload = () => {
//      resolve(true);
//    };
//    script.onerror = () => {
//      resolve(false);
//    };
//    document.body.appendChild(script);
//  });
//}
//
//function BookingCar({ match }) {
//  const { cars } = useSelector((state) => state.carsReducer);
//  const [car, setcar] = useState({});
//  const dispatch = useDispatch();
//  // const { id } = useParams();
//  useEffect(() => {
//    if (cars.length === 0) {
//      dispatch(getAllCars());
//    } else {
//      setcar(cars.find((o) => o._id === match.params.carid));
//    }
//  }, [cars]);
//  // console.log(car);
//
//  return car ? <BookCar car={car} /> : <CircularProgress color="inherit" />;
//}
//
//function BookCar({ car }) {
//  const {user} = JSON.parse(localStorage.getItem("user"));
//  const username = user.username;
//  const dispatch = useDispatch();
//  const [from, setFrom] = useState();
//  const [to, setTo] = useState();
//  const [totalHours, setTotalHours] = useState(0);
//  const [driver, setdriver] = useState(false);
//  const [totalAmount, setTotalAmount] = useState(0);
//  const [showModal, setShowModal] = useState(false);
//  const [value, setvalue] = useState([null, null]);
//  const rent = car.rentPerHour;
//  useEffect(() => {
//    // console.log(totalHours, totalAmount, rent);
//    setTotalAmount(totalHours * rent);
//  }, [driver, totalHours, rent]);
//  useEffect(() => {
//    if (driver) return setTotalAmount(totalAmount + 30 * totalHours);
//  }, [driver]);
//  function selectTimeSlots(values) {
//    setvalue(values);
//    setFrom(moment(values[0]).format("MMM DD yyyy"));
//    setTo(moment(values[1]).format("MMM DD yyyy"));
//    // console.log(values[0], values[1]);
//    // console.log(Math.abs(values[1] - values[0]) / 36e5);
//    setTotalHours(Math.abs(values[1] - values[0]) / 36e5);
//  }
//  const onSubmit = () => {
//    const reqObj = {
//      user: user,
//      car: car._id,
//      totalHours: totalHours,
//      totalAmount: totalAmount,
//      driverRequired: driver,
//      bookedTimeSlots: {
//        from,
//        to,
//      },
//    };
//
//    dispatch(bookCar(reqObj));
//    setTimeout(() => {
//      displayRazorpay();
//    }, 500);
//  };
//  async function displayRazorpay() {
//    const res = await loadScript(
//      "https://checkout.razorpay.com/v1/checkout.js"
//    );
//    if (!res) {
//      alert("Razorpay sdk failed to load.Are you online");
//      return;
//    }
//
//    const data1 = JSON.parse(localStorage.getItem("order"));
//    const data = data1.data;
//    // console.log(data1);
//    const options = {
//      key: "rzp_test_wt6S48PF3wQ702",
//      amount: data.amount,
//      currency: "INR",
//      name: "King Cars",
//      description: "Booking Transaction",
//      image:
//        "https://image.shutterstock.com/z/stock-vector-king-car-logo-design-template-vector-illustration-466912277.jpg",
//      order_id: data.id,
//      prefill: {
//        name: username,
//        contact: user.phoneno,
//        email: user.email,
//      },
//    };
//    const paymentObject = new window.Razorpay(options);
//    paymentObject.open();
//  }
//  return (
//    <section className="carpage">
//      <div className="carinfo">
//        <div>
//          <img src={car.image} alt={car.name} className="carimage" />
//        </div>
//        <div className="info">
//          {/* <Divider type="horizontal">Car Info</Divider> */}
//          <Typography variant="h5">
//            <b>Car Info</b>
//          </Typography>
//          <div style={{ textAlign: "center" }}>
//            <h6>
//              <b>{car.name}</b>
//            </h6>
//            <h6>
//              ₹{car.rentPerHour} <b>Rent Per hour</b> /-
//            </h6>
//            <h6>
//              <b>Fuel Type : </b>
//              {car.fuelType}
//            </h6>
//            <h6>
//              <b>Max Persons : </b>
//              {car.capacity}
//            </h6>
//          </div>
//        </div>
//      </div>
//      <br />
//      <Divider type="horizontal" />
//      <Typography variant="h5">Select Time Slots</Typography>
//      <div className="centcont">
//        <LocalizationProvider dateAdapter={AdapterDateFns}>
//          <MobileDateRangePicker
//            startText="start Date"
//            value={value}
//            onChange={selectTimeSlots}
//            renderInput={(startProps, endProps) => (
//              <React.Fragment>
//                <TextField {...startProps} />
//                <Box sx={{ mx: 2 }}> to </Box>
//                <TextField {...endProps} />
//              </React.Fragment>
//            )}
//          />
//        </LocalizationProvider>
//        <br />
//        <Button
//          className="btn1 mt-2"
//          variant="outlined"
//          onClick={() => {
//            setShowModal(true);
//          }}
//        >
//          See Booked Slots
//        </Button>
//      </div>
//      {from && to && (
//        <div>
//          <p>
//            Total Hours : <b>{totalHours}</b>
//          </p>
//          <p>
//            Rent Per Hour : <b>{car.rentPerHour}</b>
//          </p>
//          <FormControlLabel
//            control={
//              <Checkbox
//                onChange={(e) => {
//                  if (e.target.checked) {
//                    setdriver(true);
//                  } else {
//                    setdriver(false);
//                  }
//                }}
//              />
//            }
//            label="Driver Required"
//          />
//
//          {/* <label></label> */}
//
//          <h3>Total Amount : {totalAmount}</h3>
//          <Button variant="outlined" onClick={() => onSubmit()}>
//            Book Now
//          </Button>
//        </div>
//      )}
//
//      {car.name && (
//        <Dialog open={showModal} title="Booked time slots">
//          <div className="p-2">
//            {car.bookedTimeSlots.length > 0 &&
//              car.bookedTimeSlots.map((slot) => {
//                return (
//                  <Button className="btn1 mt-2">
//                    {slot.from} - {slot.to}
//                  </Button>
//                );
//              })}
//            {car.bookedTimeSlots.length === 0 ? (
//              <h6>Car is not booked yet</h6>
//            ) : (
//              ""
//            )}
//
//            <div className="text-right mt-5">
//              <Button
//                className="btn1"
//                onClick={() => {
//                  setShowModal(false);
//                }}
//              >
//                CLOSE
//              </Button>
//            </div>
//          </div>
//        </Dialog>
//      )}
//    </section>
//  );
//}
//
//export default BookingCar;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions/carsAction";
import moment from "moment";
import { bookCar } from "../../redux/actions/bookingActions";
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
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import "./BookingCar.css";

function BookingCar({ match, history }) {
  const { cars } = useSelector((s) => s.carsReducer);
  const dispatch = useDispatch();
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (!cars.length) dispatch(getAllCars());
    else setCar(cars.find((c) => c._id === match.params.carid));
  }, [cars]);

  const goBack = () => history.goBack();

  return car ? <BookCar car={car} onBack={goBack} /> : <div className="loader">Loading…</div>;
}

function BookCar({ car, onBack }) {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  // booking state
  const [range, setRange] = useState([null, null]);
  const [driver, setDriver] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [total, setTotal] = useState(0);

  // calculate pricing
  useEffect(() => {
    if (range[0] && range[1]) {
      const hours = Math.abs(range[1] - range[0]) / 36e5;
      setTotalHours(hours);
      let amt = hours * car.rentPerHour + (driver ? hours * 30 : 0);
      setTotal(amt);
    }
  }, [range, driver, car.rentPerHour]);

  const handleBook = () => {
    const payload = {
      user,
      car: car._id,
      totalHours,
      totalAmount: total,
      driverRequired: driver,
      bookedTimeSlots: {
        from: moment(range[0]).format("MMM DD, yyyy"),
        to: moment(range[1]).format("MMM DD, yyyy"),
      },
    };
    dispatch(bookCar(payload));
    // then launch payment…
  };

  const hotFeatures = ["Air Conditioning", "Automatic Transmission", "Bluetooth", "USB Charging"];
  const reviews = [
    { name: "Alice", rating: 5, text: "Great ride—smooth and clean." },
    { name: "Bob",   rating: 4, text: "Good value for money." },
  ];

  return (
    <div className="page-container">
      <aside className="sidebar">
        <IconButton onClick={onBack} className="back-btn"><ArrowBackIcon /></IconButton>
        <Box className="sticky-panel">
          <Typography variant="h6">Book This Car</Typography>
          <Typography><b>₹{car.rentPerHour}/hr</b></Typography>
          <Divider />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateRangePicker
              startText="From"
              endText="To"
              value={range}
              onChange={setRange}
              renderInput={(s, e) => (
                <>
                  <TextField {...s} className="date-input" />
                  <TextField {...e} className="date-input" />
                </>
              )}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={<Checkbox checked={driver} onChange={(e) => setDriver(e.target.checked)} />}
            label="Add Driver (₹30/hr)"
          />
          {totalHours > 0 && (
            <>
              <Typography>Total: <b>₹{total.toFixed(2)}</b></Typography>
              <Button variant="contained" className="btn-book" onClick={handleBook}>
                Proceed to Pay
              </Button>
            </>
          )}
          <Button variant="text" onClick={() => setShowSlots(true)} className="view-slots">
            View Booked Slots
          </Button>
        </Box>
      </aside>

      <main className="main-content">
        <section className="images-gallery">
          {car.images?.map((img, i) => (
            <img key={i} src={img} alt={`${car.name} ${i+1}`} className="gallery-img" />
          ))}
        </section>

        <section className="car-info">
          <Typography variant="h4">{car.name}</Typography>
          <Typography color="textSecondary">{car.fuelType} • {car.capacity} seats</Typography>
          <Typography paragraph>{car.description}</Typography>

          <div className="features">
            {hotFeatures.map((feat) => (
              <span key={feat} className="feature-chip">{feat}</span>
            ))}
          </div>

          <div className="policy">
            <Typography variant="subtitle1">Cancellation Policy</Typography>
            <Typography variant="body2">
              Full refund if cancelled 24h before pickup.
            </Typography>
          </div>

          <div className="review">
            <Typography variant="subtitle1">Customer Reviews</Typography>
            {reviews.map((r, i) => (
              <div key={i} className="review">
                  <div className="review-name">{r.name}</div>
                  <div className="review-stars">
                    {[...Array(r.rating)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <div className="review-text">{r.text}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Booked Slots Dialog */}
      <Dialog open={showSlots} onClose={() => setShowSlots(false)}>
        <Box className="modal-box">
          <Typography variant="h6">Booked Slots</Typography>
          {car.bookedTimeSlots.length ? (
            car.bookedTimeSlots.map((s,i) => (
              <Typography key={i}>{s.from} — {s.to}</Typography>
            ))
          ) : (
            <Typography>No bookings yet.</Typography>
          )}
          <Button onClick={() => setShowSlots(false)} className="btn-close">Close</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default BookingCar;
