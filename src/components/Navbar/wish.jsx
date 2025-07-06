import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme with Poppins as the default font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
  },
});

const Wishlist = ({ onClose }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  
  const [wishlist, setWishlist] = useState([]);
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Load wishlist and bookings from local storage
  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist:", error);
        }
      }
    };

    const loadBookings = () => {
      const storedBookings = localStorage.getItem('bookedDestinations');
      if (storedBookings) {
        try {
          setBookedDestinations(JSON.parse(storedBookings));
        } catch (error) {
          console.error("Error parsing bookings:", error);
        }
      }
    };

    loadWishlist();
    loadBookings();

    // Set up event listeners
    window.addEventListener('wishlistUpdated', loadWishlist);
    window.addEventListener('bookingsUpdated', loadBookings);
    
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
      window.removeEventListener('bookingsUpdated', loadBookings);
    };
  }, []);

  const isDestinationBooked = (destId) => {
    return bookedDestinations.some(booking => booking.id === destId);
  };

  const removeFromWishlist = (destination) => {
    const updatedWishlist = wishlist.filter(item => item.id !== destination.id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { wishlist: updatedWishlist } 
    }));
    
    setSnackbarMessage(`${destination.label} removed from wishlist`);
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleBookDestination = (destination) => {
    if (isDestinationBooked(destination.id)) {
      setSnackbarMessage('This destination is already booked!');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    const booking = {
      ...destination,
      bookingDate: new Date().toISOString(),
      bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
    };

    const updatedBookings = [...bookedDestinations, booking];
    setBookedDestinations(updatedBookings);
    localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { detail: { bookings: updatedBookings } }));
    
    setSnackbarMessage('Destination booked successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleExplore = () => {
    if (onClose) {
      onClose();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '12px' : '24px',
          fontFamily: 'Poppins, sans-serif',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '16px' : '24px',
            padding: isMobile ? '0 4px' : '0'
          }}
        >
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              fontWeight: 700,
              color: '#2874f0',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              lineHeight: 1.2
            }}
          >
            My Wishlist
          </Typography>
          {onClose && (
            <IconButton 
              onClick={onClose} 
              aria-label="close"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                marginLeft: 'auto',
                padding: isMobile ? '4px' : '8px'
              }}
            >
              <CloseIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ 
          marginBottom: isMobile ? '16px' : '24px',
          borderColor: 'rgba(0, 0, 0, 0.12)'
        }} />
        
        {/* Empty State */}
        {wishlist.length === 0 ? (
          <Paper
            sx={{
              padding: isMobile ? '24px 16px' : '32px 24px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              margin: isMobile ? '0 4px' : '0'
            }}
          >
            <FavoriteIcon 
              sx={{ 
                fontSize: isMobile ? '48px' : '64px',
                color: '#e0e0e0',
                marginBottom: '16px'
              }} 
            />
            <Typography 
              variant={isMobile ? 'body1' : 'h6'} 
              color="textSecondary"
              sx={{
                marginBottom: '16px',
                fontSize: isMobile ? '1rem' : '1.25rem',
                fontWeight: 500
              }}
            >
              Your wishlist is empty
            </Typography>
            <Button
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              sx={{
                backgroundColor: '#2874f0',
                color: '#fff',
                padding: isMobile ? '8px 16px' : '10px 24px',
                fontSize: isMobile ? '0.875rem' : '1rem',
                fontWeight: 500,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1a65db'
                }
              }}
              onClick={handleExplore}
            >
              Explore Destinations
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)'
              },
              gap: isMobile ? 2 : 3,
              padding: isMobile ? '0 4px' : '0'
            }}
          >
            {wishlist.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%', // Ensures all cards have same height
                  '&:hover': {
                    transform: isMobile ? 'none' : 'translateY(-4px)',
                    boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : '0 6px 12px rgba(0,0,0,0.15)',
                  }
                }}
              >
                  {/* Image Section */}
                  <Box 
                    sx={{ 
                      position: 'relative',
                      width: '100%', 
                      height: isMobile ? '200px' : '240px', // Fixed height for consistency
                      overflow: 'hidden',
                      flexShrink: 0 // Prevents image from shrinking
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.img}
                      alt={item.label}
                      sx={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(40, 116, 240, 0.9)',
                        color: 'white',
                        padding: isMobile ? '4px 8px' : '6px 12px',
                        borderRadius: '0 0 0 8px',
                        fontWeight: 600,
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {item.price}
                    </Box>
                    <IconButton
                      onClick={() => removeFromWishlist(item)}
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: isMobile ? '4px' : '6px',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        }
                      }}
                    >
                      <FavoriteIcon 
                        fontSize={isMobile ? 'small' : 'medium'} 
                        sx={{ color: '#ff3366' }} 
                      />
                    </IconButton>
                  </Box>
                  
                  {/* Content Section */}
                  <CardContent 
                    sx={{ 
                      padding: isMobile ? '12px' : '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1, // Allows content to grow and fill space
                      '&:last-child': {
                        paddingBottom: isMobile ? '12px' : '16px'
                      }
                    }}
                  >
                    <Typography 
                      gutterBottom 
                      variant={isMobile ? 'subtitle1' : 'h6'}
                      sx={{
                        fontWeight: 600,
                        fontSize: isMobile ? '1rem' : '1.125rem',
                        marginBottom: isMobile ? '8px' : '12px',
                        lineHeight: 1.3,
                        color: '#333',
                        minHeight: isMobile ? '1.3rem' : '1.575rem' // Ensures consistent title height
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        marginBottom: isMobile ? '12px' : '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3, // Increased to 3 lines for better consistency
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: isMobile ? '0.8125rem' : '0.875rem',
                        lineHeight: 1.5,
                        flexGrow: 1, // Allows description to take up available space
                        minHeight: isMobile ? '3.65rem' : '3.9375rem' // 3 lines * line-height * font-size
                      }}
                    >
                      {item.description || 'No description available'}
                    </Typography>
                    
                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: isMobile ? '8px' : '12px',
                        marginTop: 'auto' // Pushes buttons to bottom
                      }}
                    >
                      <Button
                        variant="contained"
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                          backgroundColor: '#2874f0',
                          color: '#fff',
                          fontSize: isMobile ? '0.75rem' : '0.8125rem',
                          fontWeight: 500,
                          padding: isMobile ? '6px 12px' : '8px 16px',
                          borderRadius: '6px',
                          textTransform: 'none',
                          flex: 1,
                          '&:hover': {
                            backgroundColor: '#1a65db'
                          },
                          '&.Mui-disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e'
                          }
                        }}
                        onClick={() => handleBookDestination(item)}
                        disabled={isDestinationBooked(item.id)}
                      >
                        {isDestinationBooked(item.id) ? 'Already Booked' : 'Book Now'}
                      </Button>
                      <Button
                        variant="outlined"
                        size={isMobile ? 'small' : 'medium'}
                        onClick={() => removeFromWishlist(item)}
                        sx={{
                          borderColor: '#ff3366',
                          color: '#ff3366',
                          fontSize: isMobile ? '0.75rem' : '0.8125rem',
                          fontWeight: 500,
                          padding: isMobile ? '6px 12px' : '8px 16px',
                          borderRadius: '6px',
                          textTransform: 'none',
                          flex: 1,
                          '&:hover': {
                            borderColor: '#e61a4d',
                            backgroundColor: 'rgba(255, 51, 102, 0.05)'
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
            ))}
          </Box>
        )}
        
        {/* Notification Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            bottom: isMobile ? '72px' : '24px'
          }}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity={snackbarSeverity}
            sx={{ 
              width: '100%',
              maxWidth: isMobile ? 'calc(100% - 32px)' : '400px',
              fontSize: isMobile ? '0.875rem' : '1rem',
              alignItems: 'center',
              borderRadius: '8px',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Wishlist;