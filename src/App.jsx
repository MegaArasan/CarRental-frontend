import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import BookingCar from './pages/Carbook/BookingCar.jsx';
import Forgotpassword from './pages/ForgotPassword/Forgotpassword.jsx';
import Resetpassword from './pages/ResetPassword/Resetpassword.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import UserBookings from './pages/BookingHistory/UserBookings';
import Products from './pages/Products/Products';

import Paper from '@mui/material/Paper';

import { fetchCsrfToken } from './redux/actions/userActions';
import { fetchProfile } from './redux/actions/userActions';
import CarLoader from './components/CarLoader/CarLoader';
import Profile from './pages/profile';
import AdminCars from './pages/Admin/AdminCars';
import AdminOffers from './pages/Admin/AdminOffers';
import AdminReports from './pages/Admin/AdminReports';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchCsrfToken()); // 🔐 must run first
    dispatch(fetchProfile()); // restore session if cookie exists
  }, [dispatch]);

  if (loading) return <CarLoader />;

  return (
    <div className="App">
      <Switch>
        {/* Default */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        {/* Public routes */}
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgotpassword" exact component={Forgotpassword} />
        <Route path="/resetpassword/:userId/:token" exact component={Resetpassword} />

        {/* Protected layout */}
        <Route>
          {!isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <Paper elevation={0} style={{ minHeight: '100vh' }}>
              <Navbar />

              <Route path="/home" exact component={Home} />
              <Route path="/cars" exact component={Products} />
              <Route path="/booking/:carid" exact component={BookingCar} />
              <Route path="/my-bookings" exact component={UserBookings} />
              <Route path="/profile" exact component={Profile} />
              <ProtectedRoute path="/admin/cars/new" exact component={AdminCars} allowedRoles={['admin']} />
              <ProtectedRoute path="/admin/offers" exact component={AdminOffers} allowedRoles={['admin']} />
              <ProtectedRoute path="/admin/reports" exact component={AdminReports} allowedRoles={['admin']} />
            </Paper>
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
