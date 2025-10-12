import './index.css';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { carImages } from '../../globalconstant';

const getRandomCarImage = () => {
  const randomIndex = Math.floor(Math.random() * carImages.length);
  return carImages[randomIndex];
};

const HotDealsSection = () => {
  const { explore } = useSelector((state) => state.carsReducer || { explore: [] });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Show top 5 hot deals
  const hotDeals = explore?.['topDeals'] ?? [];
  const HOT_DEALS_COUNT = 5;
  const hotDealsToShow = hotDeals.slice(0, HOT_DEALS_COUNT);

  if (!hotDealsToShow.length) return null; // nothing to show

  return (
    <Box sx={{ mt: 6, px: { xs: 2, sm: 4, md: 6 } }}>
      {/* Section Header */}
      <Box className="hot-deals-heading" mb={2}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={600} color="text.primary">
          Hot Deals
        </Typography>
      </Box>

      {/* Scrollable Hot Deals */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          flexWrap: 'nowrap',
          pb: 1,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 10,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        {hotDealsToShow.map((deal) => (
          <Card
            key={deal._id}
            sx={{
              width: { xs: 180, sm: 220, md: 250 },
              flexShrink: 0,
              borderRadius: 3,
              boxShadow: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              image={getRandomCarImage()}
              alt={deal.title}
              sx={{
                height: { xs: 100, sm: 120, md: 140 },
                objectFit: 'cover',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {deal.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {deal.discountType === 'flat'
                  ? `Flat ₹${deal.discountValue} OFF`
                  : `${deal.discountValue}% OFF`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HotDealsSection;
