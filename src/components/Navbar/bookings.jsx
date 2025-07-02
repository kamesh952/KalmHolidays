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
  ThemeProvider,
  Container
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const MyBookings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
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

  // Responsive grid sizing for MUI Grid v2
  const getGridSize = () => ({
    xs: 12,        // Mobile: 1 card per row
    sm: 6,         // Tablet: 2 cards per row
    md: 4,         // Desktop: 3 cards per row
    lg: 4,         // Large desktop: 3 cards per row
    xl: 3          // Extra large: 4 cards per row
  });

  // Styles
  const styles = {
    container: {
      py: isMobile ? 3 : isDesktop ? 6 : 4,
      px: isMobile ? 2 : 3,
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    innerContainer: {
      maxWidth: isDesktop ? '1400px' : '100%',
      margin: '0 auto'
    },
    heading: {
      fontSize: isMobile ? '1.8rem' : isDesktop ? '3rem' : '2.2rem',
      fontWeight: 700,
      mb: isMobile ? 2 : isDesktop ? 4 : 3,
      textAlign: isMobile ? 'left' : 'center',
      color: '#1a1a1a'
    },
    emptyState: {
      p: isMobile ? 3 : isDesktop ? 8 : 6,
      textAlign: 'center',
      borderRadius: 3,
      backgroundColor: '#fff',
      boxShadow: theme.shadows[2],
      maxWidth: isDesktop ? '600px' : '100%',
      margin: '0 auto'
    },
    emptyStateTitle: {
      fontSize: isMobile ? '1.2rem' : isDesktop ? '1.8rem' : '1.5rem',
      mb: 2
    },
    emptyStateText: {
      fontSize: isMobile ? '0.9rem' : isDesktop ? '1.1rem' : '1rem'
    },
    bookingCard: {
      backgroundColor: '#fff',
      borderRadius: isDesktop ? 4 : 3,
      boxShadow: theme.shadows[2],
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: isDesktop ? 'translateY(-8px)' : 'translateY(-4px)',
        boxShadow: isDesktop ? theme.shadows[8] : theme.shadows[4]
      },
    },
    cardHeader: {
      p: isMobile ? 2 : 3,
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cardHeaderTitle: {
      fontSize: isMobile ? '1rem' : isDesktop ? '1.2rem' : '1.1rem',
      fontWeight: 600
    },
    cardContent: {
      p: isMobile ? 2 : isDesktop ? 4 : 3,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    flightRoute: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      gap: isMobile ? 1 : 0
    },
    routeCity: {
      textAlign: 'center',
      minWidth: isMobile ? '45%' : 'auto'
    },
    routeCityCode: {
      fontSize: isMobile ? '1.2rem' : isDesktop ? '1.8rem' : '1.4rem',
      fontWeight: 700,
      mb: 0.5
    },
    routeTime: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: 'text.secondary'
    },
    routeIcon: {
      textAlign: 'center',
      px: 1,
      order: isMobile ? 3 : 0,
      width: isMobile ? '100%' : 'auto',
      mt: isMobile ? 1 : 0
    },
    detailsStack: {
      spacing: isMobile ? 1.5 : 2,
      mt: 'auto'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: isMobile ? 'wrap' : 'nowrap'
    },
    detailLabel: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: 'text.secondary',
      display: 'flex',
      alignItems: 'center',
      mb: isMobile ? 0.5 : 0
    },
    detailValue: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: 500,
      textAlign: 'right'
    },
    hotelTitle: {
      fontSize: isMobile ? '1.1rem' : isDesktop ? '1.4rem' : '1.2rem',
      fontWeight: 700,
      mb: 2
    },
    cardMedia: {
      width: '100%',
      height: isMobile ? 140 : isDesktop ? 200 : 160,
      objectFit: 'cover',
      mb: 2,
      borderRadius: 2
    },
    cancelButtonContainer: {
      p: isMobile ? 2 : 3,
      pt: 0,
      mt: 'auto'
    },
    cancelButton: {
      backgroundColor: '#ff3366',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      py: isMobile ? 1 : 1.5,
      '&:hover': {
        backgroundColor: '#e91e63',
        transform: 'translateY(-1px)'
      },
      transition: 'all 0.2s ease-in-out'
    },
    flightHeader: {
      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    },
    hotelHeader: {
      background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
    },
    tourHeader: {
      background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
    }
  };

  return (
    <ThemeProvider theme={poppinsTheme}>
      <Box sx={styles.container}>
        <Container maxWidth={false} sx={styles.innerContainer}>
          <Typography variant="h4" sx={styles.heading}>
            My Bookings
          </Typography>

          {allBookings.length === 0 ? (
            <Card sx={styles.emptyState}>
              <Typography variant="h6" sx={styles.emptyStateTitle} gutterBottom>
                No bookings found
              </Typography>
              <Typography variant="body1" sx={styles.emptyStateText} color="text.secondary">
                Start exploring our services to book your next adventure!
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={isMobile ? 2 : isDesktop ? 4 : 3}>
              {allBookings.map((booking) => (
                <Grid item xs={getGridColumns()} key={booking.bookingId || booking.id || `flight-${Date.now()}`}>
                  <Card sx={styles.bookingCard}>
                    {/* Card Header */}
                    <Box sx={[
                      booking.type === 'flight' && styles.flightHeader,
                      booking.type === 'form' && styles.hotelHeader,
                      booking.type === 'destination' && styles.tourHeader,
                      styles.cardHeader
                    ]}>
                      <Typography variant="subtitle1" sx={styles.cardHeaderTitle}>
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
                          fontSize: isMobile ? '0.7rem' : '0.75rem'
                        }}
                      />
                    </Box>

                    {/* Card Content */}
                    <CardContent sx={styles.cardContent}>
                      {booking.type === 'flight' ? (
                        <>
                          {/* Flight Route */}
                          <Box sx={styles.flightRoute}>
                            <Box sx={styles.routeCity}>
                              <Typography variant="h6" sx={styles.routeCityCode}>
                                {booking.fromAirport}
                              </Typography>
                              <Typography variant="body2" sx={styles.routeTime}>
                                {formatTime(booking.departureDate)}
                              </Typography>
                            </Box>
                            
                            <Box sx={styles.routeIcon}>
                              <SwapHorizIcon sx={{ color: 'text.secondary', fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                              <Typography variant="caption" display="block" color="text.secondary">
                                {booking.tripType === 'round-trip' ? 'Round trip' : 'One way'}
                              </Typography>
                            </Box>
                            
                            <Box sx={styles.routeCity}>
                              <Typography variant="h6" sx={styles.routeCityCode}>
                                {booking.toAirport}
                              </Typography>
                              {booking.tripType === 'round-trip' && (
                                <Typography variant="body2" sx={styles.routeTime}>
                                  {formatTime(booking.returnDate)}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* Flight Details */}
                          <Stack sx={styles.detailsStack}>
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                <EventIcon fontSize="small" sx={{ mr: 1 }} />
                                Departure:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {formatBookingDate(booking.departureDate)}
                              </Typography>
                            </Box>

                            {booking.tripType === 'round-trip' && (
                              <Box sx={styles.detailRow}>
                                <Typography variant="body2" sx={styles.detailLabel}>
                                  <EventIcon fontSize="small" sx={{ mr: 1 }} />
                                  Return:
                                </Typography>
                                <Typography variant="body2" sx={styles.detailValue}>
                                  {formatBookingDate(booking.returnDate)}
                                </Typography>
                              </Box>
                            )}

                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                <AirlineSeatReclineExtraIcon fontSize="small" sx={{ mr: 1 }} />
                                Passengers:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {booking.passengers} {booking.passengers > 1 ? 'people' : 'person'}
                              </Typography>
                            </Box>

                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                <LuggageIcon fontSize="small" sx={{ mr: 1 }} />
                                Class:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {booking.cabinClass.charAt(0).toUpperCase() + booking.cabinClass.slice(1)}
                              </Typography>
                            </Box>
                          </Stack>
                        </>
                      ) : booking.type === 'form' ? (
                        <>
                          {/* Hotel Booking Details */}
                          <Typography variant="h6" sx={styles.hotelTitle} gutterBottom>
                            {booking.destination}
                          </Typography>
                          
                          <Stack sx={styles.detailsStack}>
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                Location:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {booking.location}
                              </Typography>
                            </Box>
                            
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                Check-in:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {formatBookingDate(booking.checkIn)}
                              </Typography>
                            </Box>
                            
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                Check-out:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {formatBookingDate(booking.checkOut)}
                              </Typography>
                            </Box>
                            
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                Guests:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
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
                              sx={styles.cardMedia}
                            />
                          )}
                          
                          <Typography variant="h6" sx={styles.hotelTitle} gutterBottom>
                            {booking.label}
                          </Typography>
                          
                          <Stack sx={styles.detailsStack}>
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                Booking ID:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {booking.bookingId || booking.id}
                              </Typography>
                            </Box>
                            
                            <Box sx={styles.detailRow}>
                              <Typography variant="body2" sx={styles.detailLabel}>
                                Booked on:
                              </Typography>
                              <Typography variant="body2" sx={styles.detailValue}>
                                {booking.bookingDate ? formatBookingDate(booking.bookingDate) : "Recent booking"}
                              </Typography>
                            </Box>
                            
                            {booking.price && (
                              <Box sx={styles.detailRow}>
                                <Typography variant="body2" sx={styles.detailLabel}>
                                  Price:
                                </Typography>
                                <Typography variant="body2" sx={[styles.detailValue, { color: 'primary.main' }]}>
                                  {booking.price}
                                </Typography>
                              </Box>
                            )}
                          </Stack>
                        </>
                      )}
                    </CardContent>

                    {/* Cancel Button */}
                    <Box sx={styles.cancelButtonContainer}>
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
        </Container>

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