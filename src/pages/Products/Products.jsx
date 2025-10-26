import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars, getAllMakeModel } from '../../redux/actions/carsAction';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  InputAdornment,
  Container,
  Paper,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useHistory } from 'react-router-dom';
import './Product.css'; // External styling

// --- Hero Section ---
const HeroSection = ({ onBookNowClick }) => (
  <Box className="hero-container">
    <Box
      component="img"
      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600"
      alt="Luxury car"
      className="hero-bg"
    />
    <Box className="hero-content">
      <Typography variant="h2" className="hero-title">
        Find Your Perfect Ride
      </Typography>
      <Typography variant="h5" className="hero-subtitle">
        Explore, Compare & Book from our exclusive collection 🚗✨
      </Typography>
      <Button
        variant="contained"
        color="warning"
        size="large"
        sx={{ borderRadius: 3, px: 5, py: 1.5, fontWeight: 600 }}
        onClick={onBookNowClick}
      >
        Browse Cars
      </Button>
    </Box>
  </Box>
);

// --- Main Home Component ---
function Products() {
  const history = useHistory();
  const dispatch = useDispatch();

  // Redux slices
  const { cars, loading: carsLoading } = useSelector((state) => state.carsReducer);
  const { makeModel = {}, loading: makeModelLoading = false } = useSelector(
    (state) => state.carsReducer || {}
  );

  const manufacturers = makeModel.manufacturers || [];
  const models = makeModel.models || {};

  // Local UI state
  const [search, setSearch] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Fetch cars + make-model on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      history.push('/');
      return;
    }
    dispatch(getAllCars());
    dispatch(getAllMakeModel());
  }, [dispatch, history]);

  // Filter cars dynamically
  const filteredCars = useMemo(() => {
    const baseCars = cars.cars || []; // changed from cars?.cars
    return baseCars.filter((car) => {
      const matchesSearch = car.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchesManu = selectedManufacturer ? car.manufacturer === selectedManufacturer : true;
      const matchesModel = selectedModel ? car.model === selectedModel : true;
      return matchesSearch && matchesManu && matchesModel;
    });
  }, [cars, search, selectedManufacturer, selectedModel]);

  // Models to show in the Model dropdown (memoized)
  const filteredModels = useMemo(() => {
    if (!selectedManufacturer) return [];
    return models[selectedManufacturer] || [];
  }, [models, selectedManufacturer]);

  // UX: when manufacturer changes, reset model selection
  useEffect(() => {
    setSelectedModel(''); // reset model on manuf change
  }, [selectedManufacturer]);

  const filterRef = useRef(null);
  const scrollToFilters = () => filterRef.current?.scrollIntoView({ behavior: 'smooth' });

  const isFilterLoading = makeModelLoading;

  return (
    <Container maxWidth="xl" className="home-container">
      <HeroSection onBookNowClick={scrollToFilters} />

      {/* Filters */}
      <Paper ref={filterRef} className="filter-box" elevation={5}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search car name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Manufacturer */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              label="Manufacturer"
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              disabled={isFilterLoading}
            >
              <MenuItem value="">All Manufacturers</MenuItem>
              {manufacturers.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Model */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              label="Model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isFilterLoading || !selectedManufacturer}
            >
              <MenuItem value="">All Models</MenuItem>
              {filteredModels.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Car Listings */}
      <Typography variant="h4" className="section-title">
        Featured Rentals
      </Typography>

      {carsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <Grid item key={car._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="car-card">
                  {index < 3 && (
                    <Chip
                      icon={<LocalOfferIcon />}
                      label="Popular"
                      color="warning"
                      size="small"
                      className="popular-badge"
                    />
                  )}
                  <CardMedia component="img" height="180" image={car.image} alt={car.name} />
                  <CardContent>
                    <Typography variant="h6" className="car-name">
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="car-details">
                      {car.manufacturer} — {car.model}
                    </Typography>
                  </CardContent>
                  <Box className="car-price">₹{car.rentPerHour}</Box>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color="warning"
                      onClick={() => history.push(`/booking/${car._id}`)}
                      sx={{ borderRadius: 2, fontWeight: 600 }}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
              <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                No cars found.
              </Typography>
              <Typography color="text.secondary">Try adjusting your search filters.</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default Products;
