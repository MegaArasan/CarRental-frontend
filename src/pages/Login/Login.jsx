import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/userActions";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { InputAdornment, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import car from "../../assets/background.png";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        dispatch(userLogin(values));
      },
    });
  const [text, setText] = useState("Show");
  const [visible, setVisible] = useState("password");
  const icon =
    visible === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === "password" ? "text" : "password"));
    setText((text) => (text === "Show" ? "Hide" : "Show"));
  };
  return (
<div className="login-container">
  <div className="company-name"> King Cars</div>

  <div className="car-stage">
    <img
      src={car}
      alt="Porsche GT3"
      className="car-image"
    />
  </div>

  <form className="login-form glass-card" onSubmit={handleSubmit}>
    <Typography sx={{ paddingBottom: "10px" }} variant="h5">
      Welcome back Buddy
    </Typography>

    <TextField
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.email && touched.email}
      value={values.email}
      helperText={errors.email && touched.email && errors.email}
      name="email"
      label="Email ID"
      fullWidth
      sx={{ margin: "5px 0" }}
    />

    <TextField
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.password && touched.password}
      value={values.password}
      helperText={errors.password && touched.password && errors.password}
      name="password"
      label="Password"
      type={visible}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <Tooltip title={text}>
              <IconButton onClick={visibility}>
                {icon}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      sx={{ margin: "5px 0" }}
    />

    <button
      type="button"
      className="forgetpass"
      onClick={() => history.push("/forgotpassword")}
    >
      Forgot Password?
    </button>

    <Button
      type="submit"
      variant="contained"
      color="error"
      sx={{ borderRadius: "10px", margin: "10px 0" }}
    >
      LOGIN
    </Button>

    <label for="register" className="account">Don't have an Account?</label>
    <button
      id="register"
      color="inherit"
      onClick={() => history.push("/register")}
    >
      Register
    </button>
  </form>
</div>


  );
}

export default Login;



const formvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Required Field"),
});