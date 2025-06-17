import React from "react";
import { useDispatch } from "react-redux";
import { userForgotpass } from "../../redux/actions/userActions";
import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Forgotpassword.css";
import car from "../../assets/background.png";

function Forgotpassword() {
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        dispatch(userForgotpass(values));
        // console.log(values);
      },
    });
  return (
    <div className="forgot-container">
      <div className="company-name"> King Cars</div>

      <div className="car-stage">
        <img
          src={car}
          alt="Porsche GT3"
          className="car-image"
        />
      </div>


        <form className="forgot-form glass-card" onSubmit={handleSubmit}>
          <div>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: { sm: "35px", xs: "28px" },
              }}
            >
              Forgot Password
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: "20px",
              }}
            >
              Please enter the registered mail to get the password reset link
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              value={values.email}
              helperText={errors.email && touched.email && errors.email}
              name="email"
              id="email"
              label="Email"
              placeholder="Enter Email"
              fullWidth
              sx={{ margin: "5px" }}
            />

            <Button sx={{borderRadius:"10px",margin:"10px 0"}} type="submit" variant="contained" color="error">
              Submit
            </Button>
          </div>
        </form>

    </div>
  );
}

export default Forgotpassword;

const formvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Required Field"),
});
