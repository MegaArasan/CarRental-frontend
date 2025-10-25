import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsAction';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import './Product.css';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.carsReducer);

  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) history.push('/');
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    if (cars?.cars) setFilteredCars(cars.cars);
  }, [cars]);

  // Extract unique manufacturers and models for filters
  const manufacturers = useMemo(
    () => [...new Set(cars?.cars?.map((car) => car.manufacturer))],
    [cars]
  );
  const models = useMemo(() => [...new Set(cars?.cars?.map((car) => car.model))], [cars]);

  const handleFilter = () => {
    let result = cars?.cars || [];

    if (search) {
      result = result.filter((car) => car.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedManufacturer) {
      result = result.filter((car) => car.manufacturer === selectedManufacturer);
    }
    if (selectedModel) {
      result = result.filter((car) => car.model === selectedModel);
    }

    setFilteredCars(result);
  };

  useEffect(() => {
    handleFilter();
  }, [search, selectedManufacturer, selectedModel]);

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, minHeight: '90vh', backgroundColor: '#fafafa' }}>
      {/* --- Filter Section --- */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search car name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Manufacturer"
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {manufacturers.map((manu) => (
            <MenuItem key={manu} value={manu}>
              {manu}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {models.map((model) => (
            <MenuItem key={model} value={model}>
              {model}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* --- Cars Section --- */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredCars && filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Grid item key={car._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={car.image}
                    alt={car.name}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Manufacturer:</b> {car.manufacturer || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Model:</b> {car.model || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      <b>Rent Per Hour:</b> ₹{car.rentPerHour}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => history.push(`/booking/${car._id}`)}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" sx={{ mt: 5 }}>
              No cars found.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}

export default Home;
