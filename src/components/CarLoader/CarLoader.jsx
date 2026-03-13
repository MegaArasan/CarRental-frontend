import './CarLoader.css';

const CarLoader = ({ text = 'Loading your ride…' }) => {
  return (
    <div className="car-loader-wrapper">
      <div className="road">
        <div className="car">
          <div className="car-body" />
          <div className="wheel wheel-left" />
          <div className="wheel wheel-right" />
        </div>
      </div>
      <div className="car-loader-text">{text}</div>
    </div>
  );
};

export default CarLoader;
