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
  Stack,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import LuggageIcon from '@mui/icons-material/Luggage';
import EventIcon from '@mui/icons-material/Event';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// Create a theme with Poppins as the default font
const poppinsTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    allVariants: {
      fontFamily: '"Poppins", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
});

const MyBookings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [destinationBookings, setDestinationBookings] = useState([]);
  const [formBookings, setFormBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load all bookings from local storage
  const loadBookings = () => {
    try {
      // Load destination bookings (hotels/tours)
      const storedDestinations = localStorage.getItem('bookedDestinations');
      const destinations = storedDestinations ? JSON.parse(storedDestinations) : [];
      
      // Load form bookings (hotel forms)
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

  // Combine all bookings with their types
  const allBookings = [
    ...destinationBookings.map(b => ({ ...b, type: 'destination' })),
    ...formBookings.map(b => ({ ...b, type: 'form' })),
    ...flightBookings.map(b => ({ ...b, type: 'flight' }))
  ];

  // Styles
  const styles = {
    container: {
      p: isMobile ? 3 : 4,
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    heading: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: 700,
      mb: 2,
    },
    emptyState: {
      p: 4,
      textAlign: 'center',
      borderRadius: 3,
      backgroundColor: '#fff',
      boxShadow: theme.shadows[2]
    },
    bookingCard: {
      backgroundColor: '#fff',
      borderRadius: 3,
      boxShadow: theme.shadows[2],
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4]
      },
    },
    flightHeader: {
      backgroundColor: theme.palette.primary.main,
    },
    hotelHeader: {
      backgroundColor: theme.palette.secondary.main,
    },
    tourHeader: {
      backgroundColor: '#4caf50',
    },
    cancelButton: {
      backgroundColor: '#ff3366',
      '&:hover': {
        backgroundColor: '#e91e63',
      },
    }
  };

  return (
    <ThemeProvider theme={poppinsTheme}>
      <Box sx={styles.container}>
        <Typography variant="h4" sx={styles.heading}>
          My Bookings
        </Typography>

        {allBookings.length === 0 ? (
          <Card sx={styles.emptyState}>
            <Typography variant="h6" gutterBottom>
              No bookings found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Start exploring our services to book your next adventure!
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {allBookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.bookingId || booking.id || `flight-${Date.now()}`}>
                <Card sx={styles.bookingCard}>
                  {/* Card Header */}
                  <Box sx={[
                    booking.type === 'flight' && styles.flightHeader,
                    booking.type === 'form' && styles.hotelHeader,
                    booking.type === 'destination' && styles.tourHeader,
                    { p: 2, color: '#fff', display: 'flex', justifyContent: 'space-between' }
                  ]}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {booking.type === 'flight' ? 'Flight Booking' : 
                       booking.type === 'form' ? 'Hotel Booking' : 'Tour Package'}
                    </Typography>
                    <Chip 
                      label={booking.type === 'flight' ? 'Flight' : 
                            booking.type === 'form' ? 'Hotel' : 'Tour'} 
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.2)', 
                        color: '#fff',
                      }}
                    />
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ p: 3 }}>
                    {booking.type === 'flight' ? (
                      <>
                        {/* Flight Route */}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 3
                        }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight={700}>
                              {booking.fromAirport}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatTime(booking.departureDate)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ textAlign: 'center' }}>
                            <SwapHorizIcon sx={{ color: 'text.secondary' }} />
                            <Typography variant="caption" display="block" color="text.secondary">
                              {booking.tripType === 'round-trip' ? 'Round trip' : 'One way'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight={700}>
                              {booking.toAirport}
                            </Typography>
                            {booking.tripType === 'round-trip' && (
                              <Typography variant="body2" color="text.secondary">
                                {formatTime(booking.returnDate)}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Flight Details */}
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
                      </>
                    ) : booking.type === 'form' ? (
                      <>
                        {/* Hotel Booking Details */}
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          {booking.destination}
                        </Typography>
                        
                        <Stack spacing={2}>
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
                              {booking.adults} adults, {booking.children} children
                            </Typography>
                          </Box>
                        </Stack>
                      </>
                    ) : (
                      <>
                        {/* Tour Package Details */}
                        {booking.img && (
                          <CardMedia
                            component="img"
                            image={booking.img}
                            alt={booking.label}
                            sx={{ 
                              width: '100%', 
                              height: 160,
                              objectFit: 'cover',
                              mb: 2,
                              borderRadius: 2
                            }}
                          />
                        )}
                        
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          {booking.label}
                        </Typography>
                        
                        <Stack spacing={2}>
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
                      </>
                    )}
                  </CardContent>

                  {/* Cancel Button */}
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleCancelBooking(booking, booking.type)}
                      sx={styles.cancelButton}
                    >
                      Cancel Booking
                    </Button>
                  </Box>
                </Card>
              </Grid>
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
    </ThemeProvider>
  );
};

export default MyBookings; 