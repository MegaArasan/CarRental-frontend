import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import "./Home.css";
import HeroSection from "../../components/Hero/Hero";
import car from "../../assets/Ford-Mustang.png"

const DashboardHome = ({ userName, nextBooking }) =>  {
  const history = useHistory();
  const handleBookNow = () => {
    history.push("/cars")
  };

  const hotDeals = [
    {
      id: 1,
      title: "SUV Weekend Sale – 25% Off",
      link: "/cars?type=SUV&discount=25",
      image: "../../assets/Ford-Mustang.png",
    },
    {
      id: 2,
      title: "Tesla Model 3 Rentals",
      link: "/cars?model=Tesla3",
      image: "../../assets/Ford-Mustang.png",
    },
    {
      id: 3,
      title: "Free GPS Add‑on Today!",
      link: "/addons?gps=true",
      image: "../../assets/Ford-Mustang.png",
    },
  ];

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
            <button className="action-btn" onClick={()=>history.push("/cars")}>+ New Reservation</button>
            <button className="action-btn" onClick={()=>history.push("/my-bookings")}>🚗 My Bookings</button>
            <button className="action-btn">💳 Payment Methods</button>
            <button className="action-btn">🛠 Support</button>
          </section>

          {/* Hot Deals */}
          <section className="section promos">
            <h2>Hot Deals</h2>
            <div className="promos-grid">
              {hotDeals.map((deal) => (
                <NavLink key={deal.id} to={deal.link} className="promo-card">
                  <div className="promo-img-wrapper">
                    <img
                      src={car}
                      alt={deal.title}
                      className="promo-img"
                    />
                  </div>
                  <div className="promo-text">{deal.title}</div>
                </NavLink>
              ))}
            </div>
          </section>

          {/* Explore Cars */}
          <section className="section cars">
            <h2>Explore Cars</h2>
            <div className="cars-grid">
              {["Sedan","SUV","Compact","Luxury"].map((type) => (
                <NavLink key={type} to={`/cars?filter=${type}`} className="car-card">
                  <div className="carback" style={{ backgroundImage: `url(/images/${type.toLowerCase()}.jpg)` }} />
                  <div className="car-info">
                    <h3>{type}</h3>
                    <p>From ₹2,000/day</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </section>
        </div>
     </>

)
};

export default DashboardHome;
