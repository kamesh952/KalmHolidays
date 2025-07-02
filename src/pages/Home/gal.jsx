import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

const destinations = [
  { id: 1, img: 'swit.webp', label: 'Switzerland - Snowy Peaks', price: '₹1,02,000' },
  { id: 2, img: 'japan.jpg', label: 'Japan - Cherry Blossoms', price: '₹1,27,500' },
  { id: 3, img: 'duabi.jpg', label: 'Dubai - Luxury Redefined', price: '₹1,53,000' },
  { id: 4, img: 'egypt.jpg', label: 'Egypt - Ancient Wonders', price: '₹80,750' },
  { id: 5, img: 'italy.jpg', label: 'Italy - Cultural Delight', price: '₹93,500' },
  { id: 6, img: 'australia.jpg', label: 'Australia - Scenic Coastlines', price: '₹1,87,000' },
  { id: 7, img: 'thialan.avif', label: 'Thailand - Beach Paradise', price: '₹72,250' },
  { id: 8, img: 'malaysia.jpg', label: 'Malaysia - Urban Adventures', price: '₹76,500' },
  { id: 9, img: 'swit.avif', label: 'Switzerland-Land of Joy', price: '₹1,10,500' },
  { id: 10, img: 'spain.jpg', label: 'Spain - Acheive Your Dreams', price: '₹76,500' },
  { id: 11, img: 'germany.jpeg', label: 'Germany-A Land Of Techs', price: '₹1,10,500' },
  { id: 12, img: 'china.jpg', label: 'China-A Competitor to India', price: '₹1,10,500' },
];

const TrendingDestinations = () => {
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const loadBookings = () => {
      const storedBookings = localStorage.getItem('bookedDestinations');
      if (storedBookings) {
        try {
          setBookedDestinations(JSON.parse(storedBookings));
        } catch (error) {
          console.error("Error parsing booked destinations:", error);
        }
      }
    };

    loadBookings();
    window.addEventListener('bookingsUpdated', loadBookings);
    return () => window.removeEventListener('bookingsUpdated', loadBookings);
  }, []);
  
  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist destinations:", error);
        }
      }
    };
    
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  const isDestinationBooked = (destId) => bookedDestinations.some(booking => booking.id === destId);
  const isInWishlist = (destId) => wishlist.some(item => item.id === destId);

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
    window.dispatchEvent(new CustomEvent('bookingsUpdated'));
    
    setSnackbarMessage('Destination booked successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };
  
  const toggleWishlist = (destination) => {
    let updatedWishlist;
    
    if (isInWishlist(destination.id)) {
      updatedWishlist = wishlist.filter(item => item.id !== destination.id);
      setSnackbarMessage(`${destination.label} removed from wishlist!`);
    } else {
      updatedWishlist = [...wishlist, destination];
      setSnackbarMessage(`${destination.label} added to wishlist!`);
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{
      padding: { xs: '20px', sm: '50px 5%' },
      backgroundColor: '#f4f4f4',
      fontFamily: '"Poppins", sans-serif',
    }}>
      <Typography
        variant="h6"
        sx={{
          color: '#000000',
          textAlign: 'left',
          fontSize: { xs: '1.5rem', sm: '2rem' },
          margin: { xs: '0 0 15px 0', sm: '0 0 20px 0' },
          fontWeight: 700,
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        Trending Destinations
      </Typography>
      
      <Grid container sx={{
        padding: { xs: '0', sm: '0 0 20px 0' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(300px, 1fr))' },
        gap: { xs: '15px', sm: '20px' },
      }}>
        {destinations.map((dest) => (
          <Card key={dest.id} sx={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            padding: { xs: '12px', sm: '10px' },
            transition: 'transform 0.2s ease-in-out',
            display: { xs: 'flex', sm: 'block' },
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: { xs: 'center', sm: 'stretch' },
            '&:hover': { transform: 'scale(1.03)' },
          }}>
            <Box sx={{ 
              height: { xs: '100px', sm: '220px' },
              width: { xs: '100px', sm: '100%' },
              minWidth: { xs: '100px', sm: 'auto' },
              overflow: 'hidden',
              position: 'relative',
              borderRadius: { xs: '8px', sm: '0' },
              margin: { xs: '0 12px 0 0', sm: '0' },
            }}>
              <CardMedia
                component="img"
                image={dest.img}
                alt={dest.label}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton 
                onClick={() => toggleWishlist(dest)}
                sx={{
                  position: 'absolute',
                  top: { xs: '4px', sm: '10px' },
                  right: { xs: '4px', sm: '10px' },
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  padding: { xs: '4px', sm: '8px' },
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                {isInWishlist(dest.id) ? (
                  <FavoriteIcon sx={{ color: '#ff3366', fontSize: { xs: '18px', sm: '24px' } }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#555', fontSize: { xs: '18px', sm: '24px' } }} />
                )}
              </IconButton>
            </Box>
            
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: { xs: '8px 0 0 0', sm: '15px' },
              flex: 1,
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'stretch' },
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: { xs: '8px', sm: '10px' },
              }}>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  fontWeight: 600,
                  lineHeight: { xs: '1.2', sm: '1.4' },
                  marginBottom: { xs: '4px', sm: '0' },
                  fontFamily: '"Poppins", sans-serif',
                }}>
                  {dest.label}
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  color: '#2874f0',
                  fontWeight: 700,
                  fontFamily: '"Poppins", sans-serif',
                }}>
                  {dest.price}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                onClick={() => handleBookDestination(dest)}
                disabled={isDestinationBooked(dest.id)}
                sx={{
                  backgroundColor: isDestinationBooked(dest.id) ? '#cccccc' : '#2874f0',
                  color: '#fff',
                  padding: { xs: '6px 12px', sm: '10px' },
                  borderRadius: '8px',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  textTransform: 'none',
                  width: { xs: '100%', sm: '100%' },
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: isDestinationBooked(dest.id) ? '#cccccc' : '#ffc107', // Yellow hover
                  },
                  transition: 'background-color 0.3s ease',
                }}
              >
                {isDestinationBooked(dest.id) ? 'Booked' : 'Book Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%',
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrendingDestinations;