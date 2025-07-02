import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Snackbar,
  Alert,
  Divider,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import LuggageIcon from '@mui/icons-material/Luggage';
import EventIcon from '@mui/icons-material/Event';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import '@fontsource/poppins';

const MyBookings = () => {
  const [destinationBookings, setDestinationBookings] = useState([]);
  const [formBookings, setFormBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load all bookings from local storage
  const loadBookings = () => {
    try {
      // Load destination bookings
      const storedDestinations = localStorage.getItem('bookedDestinations');
      const destinations = storedDestinations ? JSON.parse(storedDestinations) : [];
      
      // Load form bookings
      const storedFormBookings = localStorage.getItem('bookingResponse');
      const forms = storedFormBookings ? [JSON.parse(storedFormBookings)] : [];
      
      // Load flight bookings
      const storedFlightBookings = localStorage.getItem('flightBookings');
      const flights = storedFlightBookings ? JSON.parse(storedFlightBookings) : [];
      
      setDestinationBookings(destinations);
      setFormBookings(forms);
      setFlightBookings(flights);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setSnackbarMessage("Error loading bookings. Please try refreshing the page.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    loadBookings();
    
    // Listen for booking updates from other components
    const handleBookingsUpdate = () => {
      loadBookings();
    };
    
    window.addEventListener('bookingsUpdated', handleBookingsUpdate);
    
    return () => {
      window.removeEventListener('bookingsUpdated', handleBookingsUpdate);
    };
  }, []);

  // Handle cancel booking
  const handleCancelBooking = (booking, type) => {
    try {
      if (type === 'destination') {
        const updatedBookings = destinationBookings.filter(
          item => item.bookingId !== booking.bookingId && item.id !== booking.id
        );
        localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
        setDestinationBookings(updatedBookings);
      } else if (type === 'form') {
        localStorage.removeItem('bookingResponse');
        setFormBookings([]);
      } else if (type === 'flight') {
        const updatedBookings = flightBookings.filter(
          item => item.bookingId !== booking.bookingId
        );
        localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
        setFlightBookings(updatedBookings);
      }
      
      window.dispatchEvent(new CustomEvent('bookingsUpdated'));
      setSnackbarMessage(`Booking cancelled successfully!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setSnackbarMessage("Error cancelling booking. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Format booking date
  const formatBookingDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return "Unknown date";
    }
  };

  // Format time
  const formatTime = (dateString) => {
    try {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    } catch (error) {
      return "";
    }
  };

  // Combine all bookings
  const allBookings = [
    ...destinationBookings.map(b => ({ ...b, type: 'destination' })),
    ...formBookings.map(b => ({ ...b, type: 'form' })),
    ...flightBookings.map(b => ({ ...b, type: 'flight' }))
  ];

  return (
    <Box
      sx={{
        padding: { xs: '30px 16px', sm: '40px 24px', md: '50px 5%' },
        backgroundColor: '#f8f9fa',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#000000',
          textAlign: 'left',
          margin: '20px 0',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', sm: '2.2rem' }
        }}
      >
        My Bookings
      </Typography>

      {allBookings.length === 0 ? (
        <Card
          sx={{
            padding: '30px',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6">No bookings found</Typography>
          <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
            Start exploring our trending destinations and book your next adventure!
          </Typography>
        </Card>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            padding: '20px 0',
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fit, minmax(350px, 1fr))',
            },
            gap: '20px',
          }}
        >
          {allBookings.map((booking) => (
            <Card
              key={booking.bookingId || booking.id || `flight-${booking.fromAirport}-${booking.toAirport}`}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {/* Header with booking type */}
              <Box sx={{ 
                p: 2, 
                backgroundColor: booking.type === 'flight' ? '#1976d2' : 
                              booking.type === 'destination' ? '#4caf50' : '#9c27b0',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {booking.type === 'flight' ? 'Flight Booking' : 
                   booking.type === 'destination' ? 'Tour Package' : 'Hotel Booking'}
                </Typography>
                <Chip 
                  label={booking.type === 'flight' ? 'Flight' : 
                        booking.type === 'destination' ? 'Tour' : 'Hotel'} 
                  color="default"
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Box>

              {booking.type === 'flight' ? (
                <CardContent sx={{ p: 3 }}>
                  {/* Flight route */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {booking.fromAirport}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatTime(booking.departureDate)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', px: 2 }}>
                      <SwapHorizIcon sx={{ color: 'text.secondary' }} />
                      <Typography variant="caption" display="block" color="text.secondary">
                        {booking.tripType === 'round-trip' ? 'Round trip' : 'One way'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {booking.toAirport}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.tripType === 'round-trip' && formatTime(booking.returnDate)}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Flight details */}
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        <EventIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Departure:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatBookingDate(booking.departureDate)}
                      </Typography>
                    </Box>

                    {booking.tripType === 'round-trip' && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          <EventIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Return:
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {formatBookingDate(booking.returnDate)}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        <AirlineSeatReclineExtraIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Passengers:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {booking.passengers} {booking.passengers > 1 ? 'people' : 'person'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        <LuggageIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Class:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {booking.cabinClass.charAt(0).toUpperCase() + booking.cabinClass.slice(1)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              ) : booking.type === 'destination' ? (
                <>
                  {booking.img && (
                    <Box sx={{ height: '200px', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={booking.img}
                        alt={booking.label}
                        sx={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </Box>
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {booking.label}
                    </Typography>
                    
                    <Stack spacing={1.5} sx={{ my: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Booking ID:
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {booking.bookingId || booking.id}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Booked on:
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {booking.bookingDate ? formatBookingDate(booking.bookingDate) : "Recent booking"}
                        </Typography>
                      </Box>
                      
                      {booking.price && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Price:
                          </Typography>
                          <Typography variant="body2" fontWeight={500} color="primary">
                            {booking.price}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </>
              ) : (
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {booking.destination}
                  </Typography>
                  
                  <Stack spacing={1.5} sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Location:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {booking.location}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Check-in:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatBookingDate(booking.checkIn)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Check-out:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatBookingDate(booking.checkOut)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Guests:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {booking.adults}, {booking.children}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              )}

              {/* Cancel button */}
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleCancelBooking(booking, booking.type)}
                  sx={{
                    backgroundColor: '#ff3366',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#e91e63',
                    },
                  }}
                >
                  Cancel Booking
                </Button>
              </Box>
            </Card>
          ))}
        </Grid>
      )}

      {/* Snackbar for notifications */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyBookings;