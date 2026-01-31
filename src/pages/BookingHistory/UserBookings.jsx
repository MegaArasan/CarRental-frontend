import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../redux/actions/bookingActions';
import moment from 'moment';
import { Typography, Card, Box, CircularProgress } from '@mui/material';

function UserBookings() {
  const dispatch = useDispatch();

  const { bookings = sampleBookings, loading } = useSelector((state) => state.bookingsReducer);

  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <Box minHeight="70vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: '#c62828' }} />
      </Box>
    );
  }

  /* -------------------- EMPTY STATE -------------------- */
  if (!bookings.length) {
    return (
      <Box
        minHeight="60vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom>
          No booking history
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start booking your first ride 🚗
        </Typography>
      </Box>
    );
  }

  const myBookings = bookings.filter((booking) => booking?.user === user?._id);

  /* -------------------- MAIN UI -------------------- */
  return (
    <section>
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 3, fontWeight: 600 }}>
        My Bookings
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} px={2}>
        {myBookings.map((booking) => (
          <Card
            key={booking._id}
            sx={{
              width: 260,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Car Image */}
            <Box height={140} bgcolor="#f3f4f6">
              <img
                src={booking?.car?.image}
                alt={booking?.car?.name}
                width="100%"
                height="140"
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Booking Details */}
            <Box p={1.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                {booking?.car?.name || 'Car'}
              </Typography>

              <Typography variant="body2">
                Total hours: <b>{booking.totalHours}</b>
              </Typography>

              <Typography variant="body2">
                Rent / hour: <b>₹{booking?.car?.rentPerHour}</b>
              </Typography>

              <Typography variant="body2">
                Total amount: <b>₹{Math.round(booking.totalAmount)}</b>
              </Typography>

              <Box mt={1}>
                <Typography variant="caption" display="block">
                  From: <b>{booking.bookedTimeSlots?.from}</b>
                </Typography>

                <Typography variant="caption" display="block">
                  To: <b>{booking.bookedTimeSlots?.to}</b>
                </Typography>

                <Typography variant="caption" display="block">
                  Booked on: <b>{moment(booking.createdAt).format('MMM DD, YYYY')}</b>
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </section>
  );
}

export default UserBookings;

export const sampleBookings = [
  {
    _id: 'bk_001',
    user: 'user_123',
    totalHours: 5,
    totalAmount: 2500,
    createdAt: '2026-01-29T10:30:00.000Z',
    bookedTimeSlots: {
      from: 'Jan 30 2026 10:00',
      to: 'Jan 30 2026 15:00',
    },
    car: {
      _id: 'car_001',
      name: 'Honda City ZX',
      rentPerHour: 500,
      image:
        'https://images.unsplash.com/photo-1605559424843-9f6a44b4a5b5',
    },
  },
  {
    _id: 'bk_002',
    user: 'user_123',
    totalHours: 3,
    totalAmount: 1800,
    createdAt: '2026-01-25T07:15:00.000Z',
    bookedTimeSlots: {
      from: 'Jan 26 2026 09:30',
      to: 'Jan 26 2026 12:30',
    },
    car: {
      _id: 'car_002',
      name: 'Hyundai Creta SX',
      rentPerHour: 600,
      image:
        'https://images.unsplash.com/photo-1619682817481-e994891cd1f5',
    },
  },
  {
    _id: 'bk_003',
    user: 'user_123',
    totalHours: 8,
    totalAmount: 4800,
    createdAt: '2026-01-20T05:45:00.000Z',
    bookedTimeSlots: {
      from: 'Jan 21 2026 08:00',
      to: 'Jan 21 2026 16:00',
    },
    car: {
      _id: 'car_003',
      name: 'Toyota Innova Crysta',
      rentPerHour: 600,
      image:
        'https://images.unsplash.com/photo-1583267741293-7c1f0c5d4b1f',
    },
  },
];
