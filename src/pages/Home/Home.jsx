import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Home.css';
import HeroSection from '../../components/Hero/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { exploreBookings } from '../../redux/actions/exploreactions';
import HotDealsSection from '../../components/HotDealsSection';

const DashboardHome = () => {
  const history = useHistory();
  const handleBookNow = () => {
    history.push('/cars');
  };

  const dispatch = useDispatch();
  const { explore = {} } = useSelector((state) => state.carsReducer || {});
  const featuredCars = explore.featuredCars ?? [];

  useEffect(() => {
    dispatch(exploreBookings());
  }, [dispatch]);

  return (
    <>
      <HeroSection
        headline="Welcome back, John!"
        subtext="Ready for your next adventure?"
        ctaText="Start Booking"
        onCtaClick={handleBookNow}
      />
      <div className="dashboard-container">
        {/* Quick‑Search */}
        <section className="section quick-search">
          <input type="text" placeholder="Pickup city or airport" />
          <input type="date" />
          <button className="btn-primary">Find Cars</button>
        </section>

        {/* Quick Actions */}
        <section className="section actions">
          <button className="action-btn" onClick={() => history.push('/cars')}>
            + New Reservation
          </button>
          <button className="action-btn" onClick={() => history.push('/my-bookings')}>
            🚗 My Bookings
          </button>
          <button className="action-btn">💳 Payment Methods</button>
          <button className="action-btn">🛠 Support</button>
        </section>

        {/* Hot Deals */}
        <HotDealsSection />

        {/* Explore Cars */}
        <section className="section cars">
          <div className="section-header">
            <h2>Explore Cars</h2>
            <span className="underline" />
          </div>

          <div className="cars-grid">
            {featuredCars.map((car) => (
              <NavLink key={car._id} to={`/cars?filter=${car.segment}`} className="car-card">
                <div className="carback" style={{ backgroundImage: `url(${car.image})` }} />
                <div className="car-info">
                  <h3>
                    {/* {car.manufacturer} {car.model} */}
                    {car.segment}
                  </h3>
                  <p>From ₹{car.rentPerHour}/hour</p>
                </div>
              </NavLink>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardHome;
