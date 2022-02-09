import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import { Box } from "@mui/material";

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  });

  return (
    <Box>
      <h1>King Cars</h1>
      <h1>length:{cars.length}</h1>
    </Box>
  );
}

export default Home;
