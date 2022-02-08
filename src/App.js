import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import BookingCar from "./pages/BookingCar.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/bookingcar" exact component={BookingCar} />
      </Switch>
    </div>
  );
}

export default App;
