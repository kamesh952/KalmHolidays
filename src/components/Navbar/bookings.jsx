import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Alert,
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import TourIcon from '@mui/icons-material/Map';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

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

  const loadBookings = () => {
    try {
      const storedDestinations = localStorage.getItem('bookedDestinations');
      const destinations = storedDestinations ? JSON.parse(storedDestinations) : [];
      
      const storedFormBookings = localStorage.getItem('bookingResponse');
      const forms = storedFormBookings ? [JSON.parse(storedFormBookings)] : [];
      
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
    
    const handleBookingsUpdate = () => {
      loadBookings();
    };
    
    window.addEventListener('bookingsUpdated', handleBookingsUpdate);
    
    return () => {
      window.removeEventListener('bookingsUpdated', handleBookingsUpdate);
    };
  }, []);

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

  const formatBookingDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return "Unknown date";
    }
  };

  const formatTime = (dateString) => {
    try {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    } catch (error) {
      return "";
    }
  };

  const allBookings = [
    ...destinationBookings.map(b => ({ ...b, type: 'destination' })),
    ...formBookings.map(b => ({ ...b, type: 'form' })),
    ...flightBookings.map(b => ({ ...b, type: 'flight' }))
  ].sort((a, b) => {
    const dateA = a.bookingDate || a.departureDate || a.checkIn;
    const dateB = b.bookingDate || b.departureDate || b.checkIn;
    return new Date(dateB) - new Date(dateA);
  });

  const isOddCount = allBookings.length % 2 !== 0;
  const lastItemIsWide = isOddCount && allBookings.length > 2;

  const getBookingItemStyle = (index) => {
    if (isMobile) return { width: '100%' };
    
    if (allBookings.length === 1) {
      return { 
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      };
    }
    
    if (allBookings.length === 2) {
      return { 
        width: 'calc(50% - 12px)',
        maxWidth: '400px'
      };
    }
    
    if (lastItemIsWide && index === allBookings.length - 1) {
      return {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      };
    }
    
    return {
      width: 'calc(50% - 12px)',
      maxWidth: '400px'
    };
  };

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
      color: theme.palette.text.primary,
    },
    emptyState: {
      p: 4,
      textAlign: 'center',
      borderRadius: 3,
      backgroundColor: '#fff',
      boxShadow: theme.shadows[2],
      width: '100%',
    },
    bookingsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      justifyContent: allBookings.length <= 2 ? 'center' : 'flex-start',
    },
    bookingCard: {
      backgroundColor: '#fff',
      borderRadius: 3,
      boxShadow: theme.shadows[2],
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: isMobile ? 'auto' : '600px',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4]
      },
    },
    wideCard: {
      backgroundColor: '#fff',
      borderRadius: 3,
      boxShadow: theme.shadows[2],
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      minHeight: isMobile ? 'auto' : '300px',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4]
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
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
      mt: 'auto'
    },
    cardMedia: {
      width: '100%', 
      height: 160,
      objectFit: 'cover',
      mb: 2,
      borderRadius: 2
    },
    wideCardMedia: {
      width: '40%',
      height: 'auto',
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 160
      }
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1
    },
    detailLabel: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      fontSize: '0.875rem'
    },
    detailValue: {
      fontWeight: 500,
      fontSize: '0.875rem'
    },
    icon: {
      fontSize: '1rem',
      mr: 1,
      color: theme.palette.text.secondary
    },
    bookingTitle: {
      fontSize: '1.1rem',
      fontWeight: 700,
      mb: 2,
      display: 'flex',
      alignItems: 'center'
    },
    titleIcon: {
      mr: 1,
      fontSize: '1.2rem'
    },
    cardContent: {
      p: 3,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    wideCardContent: {
      p: 3,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      width: '60%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    detailsContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  };

  const getBookingIcon = (type) => {
    switch(type) {
      case 'flight': return <FlightIcon sx={styles.titleIcon} />;
      case 'form': return <HotelIcon sx={styles.titleIcon} />;
      case 'destination': return <TourIcon sx={styles.titleIcon} />;
      default: return null;
    }
  };

  const renderBookingCard = (booking, isWide = false) => {
    return (
      <Card sx={isWide ? styles.wideCard : styles.bookingCard}>
        {/* Card Header */}
        <Box sx={[
          booking.type === 'flight' && styles.flightHeader,
          booking.type === 'form' && styles.hotelHeader,
          booking.type === 'destination' && styles.tourHeader,
          { 
            p: 2, 
            color: '#fff', 
            display: 'flex', 
            justifyContent: 'space-between',
            ...(isWide && { width: '100%' })
          }
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
        <CardContent sx={isWide ? styles.wideCardContent : styles.cardContent}>
          {/* Booking Image */}
          {booking.type === 'destination' && booking.img && (
            <CardMedia
              component="img"
              image={booking.img}
              alt={booking.label}
              sx={isWide ? styles.wideCardMedia : styles.cardMedia}
            />
          )}

          {/* Booking Title */}
          <Typography variant="h6" sx={styles.bookingTitle}>
            {getBookingIcon(booking.type)}
            {booking.type === 'flight' 
              ? `${booking.fromAirport} to ${booking.toAirport}`
              : booking.type === 'form'
                ? booking.destination
                : booking.label}
          </Typography>

          <Box sx={styles.detailsContainer}>
            <Stack spacing={2}>
              {/* Booking ID */}
              <Box sx={styles.detailRow}>
                <Typography sx={styles.detailLabel}>
                  <EventIcon sx={styles.icon} />
                  Booking ID:
                </Typography>
                <Typography sx={styles.detailValue}>
                  {booking.bookingId || booking.id || 'N/A'}
                </Typography>
              </Box>

              {/* Dates Section */}
              {booking.type === 'flight' ? (
                <>
                  <Box sx={styles.detailRow}>
                    <Typography sx={styles.detailLabel}>
                      <EventIcon sx={styles.icon} />
                      Departure:
                    </Typography>
                    <Typography sx={styles.detailValue}>
                      {formatBookingDate(booking.departureDate)}
                    </Typography>
                  </Box>
                  {booking.tripType === 'round-trip' && (
                    <Box sx={styles.detailRow}>
                      <Typography sx={styles.detailLabel}>
                        <EventIcon sx={styles.icon} />
                        Return:
                      </Typography>
                      <Typography sx={styles.detailValue}>
                        {formatBookingDate(booking.returnDate)}
                      </Typography>
                    </Box>
                  )}
                </>
              ) : booking.type === 'form' ? (
                <>
                  <Box sx={styles.detailRow}>
                    <Typography sx={styles.detailLabel}>
                      <EventIcon sx={styles.icon} />
                      Check-in:
                    </Typography>
                    <Typography sx={styles.detailValue}>
                      {formatBookingDate(booking.checkIn)}
                    </Typography>
                  </Box>
                  <Box sx={styles.detailRow}>
                    <Typography sx={styles.detailLabel}>
                      <EventIcon sx={styles.icon} />
                      Check-out:
                    </Typography>
                    <Typography sx={styles.detailValue}>
                      {formatBookingDate(booking.checkOut)}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box sx={styles.detailRow}>
                  <Typography sx={styles.detailLabel}>
                    <EventIcon sx={styles.icon} />
                    Booked on:
                  </Typography>
                  <Typography sx={styles.detailValue}>
                    {booking.bookingDate ? formatBookingDate(booking.bookingDate) : "Recent booking"}
                  </Typography>
                </Box>
              )}

              {/* Location/Route Section */}
              {booking.type === 'flight' ? (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 2
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={700}>
                      {booking.fromAirport}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(booking.departureDate)}
                    </Typography>
                  </Box>
                  
                  <SwapHorizIcon sx={{ color: 'text.secondary' }} />
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={700}>
                      {booking.toAirport}
                    </Typography>
                    {booking.tripType === 'round-trip' && (
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(booking.returnDate)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box sx={styles.detailRow}>
                  <Typography sx={styles.detailLabel}>
                    <LocationOnIcon sx={styles.icon} />
                    {booking.type === 'form' ? 'Location' : 'Destination'}:
                  </Typography>
                  <Typography sx={styles.detailValue}>
                    {booking.type === 'form' 
                      ? booking.location 
                      : booking.type === 'destination' 
                        ? booking.destination 
                        : 'N/A'}
                  </Typography>
                </Box>
              )}

              {/* People/Passengers Section */}
              <Box sx={styles.detailRow}>
                <Typography sx={styles.detailLabel}>
                  <AirlineSeatReclineExtraIcon sx={styles.icon} />
                  {booking.type === 'flight' ? 'Passengers' : 'Guests'}:
                </Typography>
                <Typography sx={styles.detailValue}>
                  {booking.type === 'flight'
                    ? `${booking.passengers} ${booking.passengers > 1 ? 'people' : 'person'}`
                    : booking.type === 'form'
                      ? `${booking.adults} adults, ${booking.children} children`
                      : booking.people
                        ? `${booking.people} people`
                        : 'N/A'}
                </Typography>
              </Box>

              {/* Class/Room Type */}
              {booking.type === 'flight' ? (
                <Box sx={styles.detailRow}>
                                   <Typography sx={styles.detailLabel}>
                    Class:
                  </Typography>
                  <Typography sx={styles.detailValue}>
                    {booking.class || 'Economy'}
                  </Typography>
                </Box>
              ) : booking.type === 'form' ? (
                <Box sx={styles.detailRow}>
                  <Typography sx={styles.detailLabel}>
                    Room Type:
                  </Typography>
                  <Typography sx={styles.detailValue}>
                    {booking.roomType || 'Standard'}
                  </Typography>
                </Box>
              ) : null}

              {/* Price Section */}
              <Box sx={styles.detailRow}>
                <Typography sx={styles.detailLabel}>
                  Total Price:
                </Typography>
                <Typography sx={{ ...styles.detailValue, color: theme.palette.primary.main }}>
                  {booking.price 
                    ? `$${booking.price.toLocaleString()}` 
                    : booking.amount 
                      ? `$${booking.amount.toLocaleString()}` 
                      : 'N/A'}
                </Typography>
              </Box>
            </Stack>

            {/* Cancel Button */}
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={styles.cancelButton}
              onClick={() => handleCancelBooking(booking, booking.type)}
              fullWidth
            >
              Cancel Booking
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <ThemeProvider theme={poppinsTheme}>
      <Box sx={styles.container}>
        <Typography variant="h1" sx={styles.heading}>
          My Bookings
        </Typography>
        
        {allBookings.length === 0 ? (
          <Box sx={styles.emptyState}>
            <Typography variant="h6" gutterBottom>
              No Bookings Yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You haven't made any bookings yet. Start exploring and book your next adventure!
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.bookingsContainer}>
            {allBookings.map((booking, index) => (
              <Box 
                key={booking.bookingId || booking.id || index} 
                sx={getBookingItemStyle(index)}
              >
                {renderBookingCard(
                  booking, 
                  lastItemIsWide && index === allBookings.length - 1
                )}
              </Box>
            ))}
          </Box>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
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