import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import BookingCar from "./pages/Carbook/BookingCar.jsx";
import Forgotpassword from "./pages/ForgotPassword/Forgotpassword.jsx";
import Resetpassword from "./pages/ResetPassword/Resetpassword.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Paper from "@mui/material/Paper";
import UserBookings from "./pages/UserBookings";
import Products from "./pages/Products/Products";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgotpassword" exact component={Forgotpassword} />
        <Route
          path="/resetpassword/:userId/:token"
          exact
          component={Resetpassword}
        />
        <>
          <Paper
            elevation={0}
            style={{ borderStyle: "none", minHeight: "100vh" }}
          >
            <Navbar />
            <Route path="/home" exact component={Home} />
            <Route path="/cars" exact component={Products} />
            <Route path='/booking/:carid' exact component={BookingCar} />
            <Route path="/my-bookings" exact component={UserBookings} />
          </Paper>
        </>
      </Switch>
    </div>
  );
}

export default App;
