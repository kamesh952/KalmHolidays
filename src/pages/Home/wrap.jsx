import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Card, 
  CardMedia, 
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TerrainIcon from '@mui/icons-material/Terrain';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

// Add Poppins font import
const PoppinsFontImport = () => {
  return (
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    </style>
  );
};

// Custom styled components
const NavTab = (props) => {
  const { active, onClick, startIcon, children } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Button
      onClick={onClick}
      startIcon={isMobile ? null : startIcon}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        padding: isMobile ? '8px 12px' : '10px 15px',
        border: active ? '2px solid #0071c2' : 'none',
        borderRadius: '15px',
        background: 'white',
        cursor: 'pointer',
        fontSize: isMobile ? '14px' : '16px',
        display: 'flex',
        gap: '5px',
        transition: 'background 0.1s, color 0.3s',
        color: active ? '#0071c2' : 'inherit',
        fontWeight: 'bold',
        minWidth: 'auto',
        '&:hover': {
          backgroundColor: '#ebebeb',
        },
      }}
    >
      {isMobile ? React.cloneElement(startIcon, { sx: { fontSize: '18px' } }) : children}
    </Button>
  );
};

const DestinationCard = (props) => {
  const { destination, onBook, onWishlist, isWishlisted, isBooked } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        width: isMobile ? '160px' : '230px',
        flexShrink: 0,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: isMobile ? '6px' : '10px',
        marginRight: '10px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={isMobile ? '100' : '150'}
          image={destination.image}
          alt={destination.title}
          sx={{ objectFit: 'cover', borderRadius: '4px' }}
        />
        
        {/* Wishlist Button */}
        <IconButton
          onClick={() => onWishlist(destination)}
          sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ color: '#ff3366', fontSize: isMobile ? '16px' : '20px' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#ff3366', fontSize: isMobile ? '16px' : '20px' }} />
          )}
        </IconButton>
        
        {/* Book Button */}
        <Button
          variant="contained"
          startIcon={isBooked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
          disabled={isBooked}
          onClick={() => onBook(destination)}
          sx={{
            position: 'absolute',
            fontFamily: "'Poppins', sans-serif",
            bottom: '4px',
            right: '4px',
            backgroundColor: isBooked ? '#7cb342' : '#0071c2',
            fontSize: isMobile ? '0.65rem' : '0.75rem',
            padding: isMobile ? '2px 4px' : '4px 8px',
            minWidth: 'auto',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: isBooked ? '#7cb342' : '#00508c',
            },
            '&.Mui-disabled': {
              backgroundColor: '#7cb342',
              color: 'white',
            }
          }}
        >
          {isBooked ? 'Booked' : isMobile ? '' : 'Book'}
        </Button>
      </Box>
      <CardContent sx={{ padding: isMobile ? '4px 0' : '8px 0' }}>
        <Typography className="destination-title" sx={{ 
          fontWeight: 'bold', 
          marginTop: '5px',
          fontFamily: "'Poppins', sans-serif",
          fontSize: isMobile ? '14px' : '16px',
        }}>
          {destination.title}
        </Typography>
        <Typography sx={{ 
          fontFamily: "'Poppins', sans-serif",
          fontSize: isMobile ? '12px' : '14px',
        }}>
          {destination.distance}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CardsContainer = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      {...props}
      sx={{
        padding: '10px 0',
        display: 'flex',
        gap: isMobile ? '8px' : '15px',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#ccc #f5f5f5',
        justifyContent: 'flex-start',
        width: '100%',
        margin: '0 auto',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f5f5f5',
          margin: isMobile ? '0' : '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#ccc',
          borderRadius: '10px',
        },
      }}
    />
  );
};

// Destination data
const destinations = {
  outdoors: [
    { id: 'out1', title: 'Yercaud', image: 'yercaud.jpg', distance: '267 km away', price: '₹3,999' },
    { id: 'out2', title: 'Coonoor', image: 'coonor.jpg', distance: '424 km away', price: '₹4,499' },
    { id: 'out3', title: 'Ooty', image: 'ooty.jpg', distance: '431 km away', price: '₹5,299' },
    { id: 'out4', title: 'Kodaikanal', image: 'Kodaikanal.jpg', distance: '438 km away', price: '₹4,799' },
    { id: 'out5', title: 'Kalpetta', image: 'kalpetta.jpg', distance: '482 km away', price: '₹3,699' },
    { id: 'out6', title: 'Kanchipuram', image: 'kanchi.webp', distance: '66 km away', price: '₹2,499' },
  ],
  city: [
    { id: 'city1', title: 'Bangalore', image: 'bang.jpg', distance: '289 km away', price: '₹4,299' },
    { id: 'city2', title: 'Chennai', image: 'chenai.jpg', distance: '7 km away', price: '₹2,999' },
    { id: 'city3', title: 'Kumbakonam', image: 'kumba.jpg', distance: '256 km away', price: '₹3,599' },
    { id: 'city4', title: 'Thanjavur', image: 'TANJORE.jpg', distance: '282 km away', price: '₹3,299' },
    { id: 'city5', title: 'Mumbai', image: 'Mumbai.jpg', distance: '2052 km away', price: '₹6,999' },
  ],
  romance: [
    { id: 'rom1', title: 'Udaipur', image: 'udaip.jpg', distance: 'Royal City of Lakes', price: '₹7,499' },
    { id: 'rom2', title: 'Goa', image: 'goa.jpg', distance: 'Romantic Beach Vibes', price: '₹8,999' },
    { id: 'rom3', title: 'Munnar', image: 'munnarlove.avif', distance: 'Misty Tea Gardens', price: '₹6,299' },
    { id: 'rom4', title: 'Alleppey', image: 'alleypey.jpg', distance: 'Houseboat Getaways', price: '₹5,999' },
    { id: 'rom5', title: 'Shimla', image: 'shimla.avif', distance: 'Snowy Mountain Retreat', price: '₹8,499' },
  ],
  beach: [
    { id: 'beach1', title: 'Mahabalipuram', image: 'mahabali.jpg', distance: '53 km away', price: '₹3,299' },
    { id: 'beach2', title: 'Puducherry', image: 'pondy.webp', distance: '137 km away', price: '₹4,499' },
    { id: 'beach3', title: 'Velanganni', image: 'velang.jpg', distance: '272 km away', price: '₹3,999' },
    { id: 'beach4', title: 'Rameswaram', image: 'ramesh.webp', distance: '436 km away', price: '₹4,699' },
    { id: 'beach5', title: 'Goa', image: 'A-Beautiful-Beach-in-Goa-1024x683-1.jpg', distance: '436 km away', price: '₹8,999' },
  ],
  mountain: [
    { id: 'mount1', title: 'Manali', image: 'manali.jpg', distance: '532 km away', price: '₹7,799' },
    { id: 'mount2', title: 'Shimla', image: 'shimlam.avif', distance: '615 km away', price: '₹8,499' },
    { id: 'mount3', title: 'Darjeeling', image: 'dar.jpg', distance: '687 km away', price: '₹9,299' },
    { id: 'mount4', title: 'Tawang', image: 'Tawang-Tour-Package-Event-Photo.jpg', distance: 'Breathtaking monasteries & snow-clad mountains', price: '₹12,999' },
    { id: 'mount5', title: 'Auli', image: 'auli.jpg', distance: "India's top skiing destination", price: '₹10,499' },
    { id: 'mount6', title: 'Chopta', image: 'chopta.jpg', distance: 'Mini Switzerland of India', price: '₹8,999' },
  ],
};

// Main component
export default function EnhancedDestinations() {
  const [activeCategory, setActiveCategory] = useState('outdoors');
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Load wishlist and bookings from localStorage on component mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlistDestinations');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
        
        const savedBookings = localStorage.getItem('bookedDestinations');
        if (savedBookings) {
          setBookings(JSON.parse(savedBookings));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };
    
    loadSavedData();
    
    // Set up event listeners
    const handleWishlistUpdate = () => loadSavedData();
    const handleBookingsUpdate = () => loadSavedData();
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('bookingsUpdated', handleBookingsUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('bookingsUpdated', handleBookingsUpdate);
    };
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Check if a destination is in wishlist
  const isInWishlist = (destId) => {
    return wishlist.some(item => 
      (item.id === destId) || 
      // Also check if title matches (for backward compatibility)
      (item.label && destinations[activeCategory].some(d => d.id === destId && d.title === item.label))
    );
  };

  // Check if a destination is booked
  const isBooked = (destId) => {
    return bookings.some(item => 
      (item.id === destId) || 
      // Also check if title matches (for backward compatibility)
      (item.label && destinations[activeCategory].some(d => d.id === destId && d.title === item.label))
    );
  };

  // Handle adding to wishlist
  const handleToggleWishlist = (destination) => {
    try {
      const destAlreadyInWishlist = isInWishlist(destination.id);
      let updatedWishlist;
      
      if (destAlreadyInWishlist) {
        // Remove from wishlist
        updatedWishlist = wishlist.filter(item => 
          !(item.id === destination.id || 
            (item.label && item.label === destination.title))
        );
        setSnackbarMessage(`${destination.title} removed from wishlist`);
      } else {
        // Format destination for wishlist
        const wishlistItem = {
          id: destination.id,
          label: destination.title,
          img: destination.image,
          description: `A wonderful destination ${destination.distance} from your location.`,
          price: destination.price
        };
        
        // Add to wishlist
        updatedWishlist = [...wishlist, wishlistItem];
        setSnackbarMessage(`${destination.title} added to wishlist`);
      }
      
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
      
      // Trigger event for other components
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
        detail: { wishlist: updatedWishlist } 
      }));
      
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating wishlist:', error);
      setSnackbarMessage('Failed to update wishlist. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // Handle booking a destination
  const handleBookDestination = (destination) => {
    try {
      if (isBooked(destination.id)) {
        setSnackbarMessage(`${destination.title} is already booked!`);
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
        return;
      }
      
      // Format destination for booking
      const bookingItem = {
        id: destination.id,
        label: destination.title,
        img: destination.image,
        price: destination.price,
        bookingDate: new Date().toISOString(),
        bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
      };
      
      const updatedBookings = [...bookings, bookingItem];
      setBookings(updatedBookings);
      localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
      
      // Trigger event for other components
      window.dispatchEvent(new CustomEvent('bookingsUpdated', { 
        detail: { bookings: updatedBookings } 
      }));
      
      setSnackbarMessage(`${destination.title} booked successfully!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error booking destination:', error);
      setSnackbarMessage('Failed to book destination. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ 
      fontFamily: "'Poppins', sans-serif", 
      fontWeight: 'light', 
      padding: isMobile ? '20px 10px' : '50px 5%',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <PoppinsFontImport />
      <Container maxWidth="xl" sx={{ padding: isMobile ? '0' : 'inherit' }}>
        <Box sx={{ marginLeft: { xs: '0px', sm: '70px' } }}>
          <Typography variant={isMobile ? "h5" : "h4"} component="h2" sx={{ 
            marginBottom: '10px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: isMobile ? '1.5rem' : '2.125rem',
          }}>
            Quick and easy trip planner
          </Typography>
          
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif", 
            marginBottom: '20px',
            fontSize: isMobile ? '14px' : '16px',
          }}>
            Pick a vibe and explore the top destinations in India
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: isMobile ? '6px' : '10px', 
            marginBottom: '20px',
            flexWrap: 'wrap',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 'bold',
            overflowX: isMobile ? 'auto' : 'visible',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            paddingBottom: isMobile ? '10px' : '0',
          }}>
            <NavTab
              active={activeCategory === 'outdoors'}
              onClick={() => handleCategoryChange('outdoors')}
              startIcon={<DirectionsBikeIcon />}
            >
              Outdoors
            </NavTab>
            
            <NavTab
              active={activeCategory === 'city'}
              onClick={() => handleCategoryChange('city')}
              startIcon={<LocationCityIcon />}
            >
              City
            </NavTab>
            
            <NavTab
              active={activeCategory === 'romance'}
              onClick={() => handleCategoryChange('romance')}
              startIcon={<FavoriteIcon />}
            >
              Romance
            </NavTab>
            
            <NavTab
              active={activeCategory === 'beach'}
              onClick={() => handleCategoryChange('beach')}
              startIcon={<BeachAccessIcon />}
            >
              Beach
            </NavTab>
            
            <NavTab
              active={activeCategory === 'mountain'}
              onClick={() => handleCategoryChange('mountain')}
              startIcon={<TerrainIcon />}
            >
              Mountain
            </NavTab>
          </Box>
        </Box>
        
        <Box sx={{ 
          padding: 0, 
          overflowX: 'auto', 
          display: 'flex', 
          justifyContent: 'center',
          width: '100%',
        }}>
          <CardsContainer>
            {destinations[activeCategory].map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onWishlist={handleToggleWishlist}
                onBook={handleBookDestination}
                isWishlisted={isInWishlist(destination.id)}
                isBooked={isBooked(destination.id)}
              />
            ))}
          </CardsContainer>
        </Box>
      </Container>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: isMobile ? '90%' : '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}