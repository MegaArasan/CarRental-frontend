import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const history = useHistory();
  const { cars } = useSelector((state) => state.carsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [value, setValue] = React.useState([null, null]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllCars());
  });
  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);
  function setFilter(values) {
    setValue(values);
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalcars(temp);
  }
  if (!user) {
    history.push("/");
  }
  return (
    <Box>
      <div style={{ margin: "12px" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateRangePicker
            startText="start Date"
            value={value}
            onChange={setFilter}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>

      <section className="bodycontent">
        {totalCars ? (
          totalCars.map((car) => {
            return (
              <Card
                sx={{
                  maxWidth: "350px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={car.image}
                  alt={car.name}
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {car.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Rent Per Hour</b>:{car.rentPerHour}
                  </Typography>
                </CardContent>
                <CardActions justify="center">
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => history.push(`/booking/${car._id}`)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <CircularProgress color="inherit" />
        )}
      </section>
    </Box>
  );
}

export default Home;
