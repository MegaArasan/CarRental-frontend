//import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { InputAdornment, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
//
//function Login() {
//  const history = useHistory();
//  const dispatch = useDispatch();
//  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
//    useFormik({
//      initialValues: {
//        email: "",
//        password: "",
//      },
//      validationSchema: formvalidationSchema,
//      onSubmit: (values) => {
//        dispatch(userLogin(values));
//      },
//    });
//  const [text, setText] = useState("Show");
//  const [visible, setVisible] = useState("password");
//  const icon =
//    visible === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />;
//  const visibility = () => {
//    setVisible((visible) => (visible === "password" ? "text" : "password"));
//    setText((text) => (text === "Show" ? "Hide" : "Show"));
//  };
//  return (
//    <div className="loginpage">
//      <div className="brand">
//        <Typography
//          sx={{
//            fontSize: { xs: "50px", sm: "60px" },
//            fontFamily: "Aladin",
//            fontWeight: "bold",
//            color: "#fff",
//          }}
//          variant="h1"
//        >
//          King cars
//        </Typography>
//      </div>
//      <div className="formcontainer">
//        <form onSubmit={handleSubmit}>
//          <div>
//            <Typography
//              variant="h4"
//              sx={{
//                fontFamily: "Roboto Condensed",
//                fontSize: { sm: "35px", xs: "28px" },
//              }}
//            >
//              Log In
//            </Typography>
//          </div>
//          <div style={{ display: "flex", flexDirection: "column" }}>
//            <TextField
//              variant="outlined"
//              onChange={handleChange}
//              onBlur={handleBlur}
//              error={errors.email && touched.email}
//              value={values.email}
//              helperText={errors.email && touched.email && errors.email}
//              name="email"
//              id="email"
//              label="Email"
//              placeholder="Enter Email"
//              fullWidth
//              sx={{ margin: "5px" }}
//            />
//            <TextField
//              variant="outlined"
//              onChange={handleChange}
//              onBlur={handleBlur}
//              error={errors.password && touched.password}
//              value={values.password}
//              helperText={
//                errors.password && touched.password && errors.password
//              }
//              name="password"
//              id="password"
//              label="password"
//              type={visible}
//              placeholder="Enter the password"
//              fullWidth
//              InputProps={{
//                endAdornment: (
//                  <InputAdornment position="start">
//                    <Tooltip title={text}>
//                      <IconButton onClick={() => visibility()}>
//                        {icon}
//                      </IconButton>
//                    </Tooltip>
//                  </InputAdornment>
//                ),
//              }}
//              sx={{ margin: "5px" }}
//            />
//            <Button
//              sx={{ marginRight: "20px" }}
//              variant="text"
//              onClick={() => history.push("/forgotpassword")}
//            >
//              Forgot Password?
//            </Button>
//            <Button type="submit" variant="contained" color="success">
//              Log In
//            </Button>
//          </div>
//          <div style={{ margin: "5px" }}>
//            <label className="account">Don't have an Account?</label>
//            <Button
//              color="inherit"
//              variant="text"
//              onClick={() => history.push("/register")}
//            >
//              Register
//            </Button>
//          </div>
//        </form>
//      </div>
//    </div>
//  );
//}
//
//export default Login;
//


import React, { useState, useEffect } from "react";
import carSound from "../assets/car-ignition.wav";
import carImage from "../assets/Ford-Mustang.png"; // Add your car image here

export default function AuthSlider() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  useEffect(() => {
    const audio = new Audio(carSound);
    audio.loop = true;
    audio.play().catch(() => {});
    setTimeout(() => audio.pause(), 3000); // Play car sound for 3s
  }, []);

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

    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <div>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: { sm: "35px", xs: "28px" },
              }}
            >
              Register Here
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username && touched.username}
              value={values.username}
              helperText={
                errors.username && touched.username && errors.username
              }
              name="username"
              id="username"
              label="userName"
              placeholder="Enter the userName"
              fullWidth
              sx={{ margin: "5px" }}
            />
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
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneno}
              error={errors.phoneno && touched.phoneno}
              helperText={errors.phoneno && touched.phoneno && errors.phoneno}
              name="phoneno"
              margin="dense"
              id="phoneno"
              label="Phone No"
              variant="outlined"
              placeholder="Enter your phone no"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              error={errors.address && touched.address}
              helperText={errors.address && touched.address && errors.address}
              name="address"
              margin="dense"
              id="address"
              label="Contact Address"
              variant="outlined"
              placeholder="Enter your Address"
              fullWidth
            />
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
              value={values.password}
              helperText={
                errors.password && touched.password && errors.password
              }
              name="password"
              id="password"
              label="password"
              type={visible}
              placeholder="Enter the password"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={text}>
                      <IconButton onClick={() => visibility()}>
                        {icon}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "5px" }}
            />
            <Button type="submit" variant="contained" color="success">
              Regiter
            </Button>
          </div>
          <div style={{ margin: "5px" }}>
            <label className="account">Already have an Account?</label>
            <Button
              color="success"
              variant="text"
              onClick={() => history.push("/login")}
            >
              Log In
            </Button>
          </div>
        </form>

      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <div>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: { sm: "35px", xs: "28px" },
              }}
            >
              Log In
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
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
              value={values.password}
              helperText={
                errors.password && touched.password && errors.password
              }
              name="password"
              id="password"
              label="password"
              type={visible}
              placeholder="Enter the password"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={text}>
                      <IconButton onClick={() => visibility()}>
                        {icon}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "5px" }}
            />
            <Button
              sx={{ marginRight: "20px" }}
              variant="text"
              onClick={() => history.push("/forgotpassword")}
            >
              Forgot Password?
            </Button>
            <Button type="submit" variant="contained" color="success">
              Log In
            </Button>
          </div>
         </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <Typography
              sx={{
                fontSize: { xs: "50px", sm: "45px" },
                fontFamily: "Aladin",
                color: "#fff",
              }}
              variant="h1"
            >
              King cars
            </Typography>
            <h1>Welcome Back!</h1>
            <p>Login to continue booking your dream ride!</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
              <img style={{transform:"scaleX(-1)"}} src={carImage} alt="Car" className="car-image" />
          </div>
          <div className="overlay-panel overlay-right">
            <Typography
              sx={{
                fontSize: { xs: "30px", sm: "45px" },
                fontFamily: "Aladin",
                color: "#fff",
              }}
              variant="h1"
            >
              King cars
            </Typography>
            <h1>New Here?</h1>
            <p>Join and start your journey with our top cars.</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            <img src={carImage} alt="Car" className="car-image" />
          </div>
        </div>
      </div>

    </div>

  );
}

const formvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Required Field"),
});