import React, { useRef, useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
  Tooltip,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExploreIcon from '@mui/icons-material/Explore';
import '@fontsource/poppins'; // Import Poppins font

const destinations = [
  { 
    id: 'dest-1',
    img: 'tamil.jpg', 
    name: 'Tamil Nadu', 
    properties: '1000+ property',
    price: '₹1,499/night',
    label: 'Tamil Nadu',
    description: 'Explore the cultural heritage of Tamil Nadu',
    tags: ['Temples', 'Beaches', 'Heritage']
  },
  { 
    id: 'dest-2',
    img: 'tajmahal.jpg', 
    name: 'New Delhi', 
    properties: '2,919 properties',
    price: '₹2,499/night',
    label: 'New Delhi',
    description: 'Visit the historical monuments in the capital',
    tags: ['Historical', 'Capital', 'Shopping']
  },
  { 
    id: 'dest-3',
    img: 'var.jpg', 
    name: 'Varanasi', 
    properties: '554 properties',
    price: '₹1,299/night',
    label: 'Varanasi',
    description: 'Experience the spiritual city on the banks of Ganges',
    tags: ['Spiritual', 'Ganges', 'Pilgrimage']
  },
  { 
    id: 'dest-4',
    img: 'Mumbai.jpg', 
    name: 'Mumbai', 
    properties: '1,652 properties',
    price: '₹3,499/night',
    label: 'Mumbai',
    description: 'Explore the city that never sleeps',
    tags: ['Bollywood', 'Nightlife', 'Gateway of India']
  },
  { 
    id: 'dest-5',
    img: 'A-Beautiful-Beach-in-Goa-1024x683-1.jpg', 
    name: 'Goa', 
    properties: '5,251 properties',
    price: '₹2,999/night',
    label: 'Goa',
    description: 'Enjoy beaches and nightlife in this coastal paradise',
    tags: ['Beaches', 'Nightlife', 'Portuguese']
  },
  { 
    id: 'dest-6',
    img: 'bang.jpg', 
    name: 'Bangalore', 
    properties: '2,044 properties',
    price: '₹2,299/night',
    label: 'Bangalore',
    description: 'Visit the garden city and tech hub of India',
    tags: ['Tech', 'Gardens', 'Pubs']
  },
  { 
    id: 'dest-7',
    img: 'jai.jpg', 
    name: 'Jaipur', 
    properties: '1,500 properties',
    price: '₹1,899/night',
    label: 'Jaipur',
    description: 'Discover the pink city and its royal heritage',
    tags: ['Heritage', 'Palaces', 'Shopping']
  },
  { 
    id: 'dest-8',
    img: 'https://c.ndtvimg.com/2025-03/7ndi40jo_hyderabad-_625x300_11_March_25.jpg', 
    name: 'Hyderabad', 
    properties: '3,000 properties',
    price: '₹1,999/night',
    label: 'Hyderabad',
    description: 'Experience the perfect blend of tradition and modernity',
    tags: ['Biryani', 'Pearls', 'IT']
  },
  { 
    id: 'dest-9',
    img: 'kasmir.png', 
    name: 'Kashmir', 
    properties: '3,000 properties',
    price: '₹3,999/night',
    label: 'Kashmir',
    description: 'Visit the paradise on earth with stunning landscapes',
    tags: ['Mountains', 'Lakes', 'Adventure']
  },
  { 
    id: 'dest-10',
    img: 'Munnar.jpg', 
    name: 'Munnar', 
    properties: '700 properties',
    price: '₹2,199/night',
    label: 'Munnar',
    description: 'Explore the beautiful hill station with tea plantations',
    tags: ['Tea', 'Hills', 'Nature']
  },
];

const DestinationCard = styled('div')(({ theme, ismobile }) => ({
  flex: '0 0 auto',
  width: ismobile === 'true' ? '150px' : '180px',
  textAlign: 'center',
  margin: '0 4px',
  fontFamily: 'Poppins, sans-serif',
  position: 'relative',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: ismobile === 'true' ? 'none' : 'scale(1.02)',
  },
}));

const DestinationImage = styled('img')(({ theme, ismobile }) => ({
  width: '100%',
  height: ismobile === 'true' ? '100px' : '120px',
  objectFit: 'cover',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: ismobile === 'true' ? 'none' : 'scale(1.03)',
  },
}));

const ActionIconsContainer = styled(Box)(({ theme, ismobile }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  flexDirection: ismobile === 'true' ? 'row' : 'column',
  padding: '2px',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '0 12px 0 12px',
  opacity: ismobile === 'true' ? 1 : 0,
  transition: 'opacity 0.3s ease',
  '.destination-card:hover &': {
    opacity: 1,
  },
}));

const ExploreSection = () => {
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [wishlist, setWishlist] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });
  const [bookings, setBookings] = useState(() => {
    try {
      const storedBookings = localStorage.getItem('bookedDestinations');
      return storedBookings ? JSON.parse(storedBookings) : [];
    } catch (error) {
      console.error("Error loading bookings from localStorage:", error);
      return [];
    }
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showScrollButtons, setShowScrollButtons] = useState(true);

  // Check scroll position to show/hide navigation buttons
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      if (container.scrollWidth <= container.clientWidth) {
        setShowScrollButtons(false);
      } else {
        setShowScrollButtons(true);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Check if destination is in wishlist
  const isInWishlist = (destId) => {
    return wishlist.some(item => item.id === destId);
  };

  // Check if destination is booked
  const isBooked = (destId) => {
    return bookings.some(item => item.id === destId);
  };

  // Toggle wishlist
  const handleToggleWishlist = (destination, event) => {
    event.stopPropagation();
    
    let updatedWishlist;
    if (isInWishlist(destination.id)) {
      updatedWishlist = wishlist.filter(item => item.id !== destination.id);
      setSnackbarMessage(`${destination.name} removed from wishlist`);
    } else {
      updatedWishlist = [...wishlist, destination];
      setSnackbarMessage(`${destination.name} added to wishlist`);
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { wishlist: updatedWishlist } 
    }));
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  // Toggle booking
  const handleToggleBooking = (destination, event) => {
    event.stopPropagation();
    
    let updatedBookings;
    if (isBooked(destination.id)) {
      updatedBookings = bookings.filter(item => item.id !== destination.id);
      setSnackbarMessage(`Booking for ${destination.name} cancelled`);
    } else {
      const newBooking = {
        ...destination,
        bookingDate: new Date().toISOString(),
        bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
      };
      updatedBookings = [...bookings, newBooking];
      setSnackbarMessage(`${destination.name} booked successfully!`);
    }
    
    setBookings(updatedBookings);
    localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
    
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { 
      detail: { bookings: updatedBookings } 
    }));
    
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const scrollContainer = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  // Mobile-specific touch handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Left swipe
      scrollContainer(200);
    }

    if (touchStart - touchEnd < -50) {
      // Right swipe
      scrollContainer(-200);
    }
  };

  return (
    <Box sx={{ 
      px: isMobile ? 1 : 4,
      py: isMobile ? 2 : 4,
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      backgroundColor: 'background.paper',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: isMobile ? 1 : 3,
      }}>
        <Typography 
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ 
            fontWeight: 'bold',
            fontSize: isMobile ? '1.25rem' : '2rem',
            color: 'text.primary',
            fontFamily: 'Poppins, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {isMobile && <ExploreIcon fontSize="inherit" color="primary" />}
          Explore India
        </Typography>
        
        {!isMobile && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Swipe to explore more destinations
          </Typography>
        )}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
      }}>
        {showScrollButtons && !isMobile && (
          <IconButton
            onClick={() => scrollContainer(-300)}
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: -20,
              zIndex: 1,
              backgroundColor: 'white',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              display: isMobile ? 'none' : 'flex',
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        <Box
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            display: 'flex',
            gap: isMobile ? 0.5 : 1,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            py: 1,
            px: isMobile ? 0 : 2,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={index} 
              className="destination-card"
              ismobile={isMobile.toString()}
            >
              <Box sx={{ 
                position: 'relative',
                p: isMobile ? 0 : 0.5,
              }}>
                <DestinationImage 
                  src={destination.img} 
                  alt={destination.name}
                  ismobile={isMobile.toString()}
                />
                
                {/* Action icons - always visible on mobile */}
                <ActionIconsContainer ismobile={isMobile.toString()}>
                  <Tooltip title={isInWishlist(destination.id) ? "Remove from wishlist" : "Add to wishlist"}>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleToggleWishlist(destination, e)}
                      sx={{ 
                        padding: '2px',
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                        }
                      }}
                    >
                      {isInWishlist(destination.id) ? 
                        <FavoriteIcon fontSize="small" sx={{ color: '#ff3366' }} /> : 
                        <FavoriteBorderIcon fontSize="small" sx={{ color: '#555' }} />
                      }
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title={isBooked(destination.id) ? "Cancel booking" : "Book now"}>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleToggleBooking(destination, e)}
                      sx={{ 
                        padding: '2px',
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                        }
                      }}
                    >
                      {isBooked(destination.id) ? 
                        <BookmarkIcon fontSize="small" sx={{ color: '#2874f0' }} /> : 
                        <BookmarkBorderIcon fontSize="small" sx={{ color: '#555' }} />
                      }
                    </IconButton>
                  </Tooltip>
                </ActionIconsContainer>
              </Box>
              <Box sx={{ 
                textAlign: 'left',
                px: isMobile ? 0.5 : 1,
                mt: 0.5,
              }}>
                <Typography 
                  variant={isMobile ? 'body2' : 'body1'}
                  sx={{ 
                    fontWeight: 'bold', 
                    fontFamily: 'Poppins, sans-serif',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {destination.name}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                  }}
                >
                  {destination.properties}
                </Typography>
                
                {!isMobile && (
                  <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {destination.tags.slice(0, 2).map((tag, i) => (
                      <Chip 
                        key={i}
                        label={tag}
                        size="small"
                        sx={{
                          fontSize: '0.6rem',
                          height: '20px',
                          bgcolor: 'rgba(0, 0, 0, 0.05)',
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </DestinationCard>
          ))}
        </Box>

        {showScrollButtons && !isMobile && (
          <IconButton
            onClick={() => scrollContainer(300)}
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: -20,
              zIndex: 1,
              backgroundColor: 'white',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              display: isMobile ? 'none' : 'flex',
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>
      
      {/* Mobile swipe indicator */}
      {isMobile && (
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1,
            color: 'text.secondary',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <ChevronLeftIcon fontSize="small" />
          <span style={{ margin: '0 4px' }}>Swipe to explore</span>
          <ChevronRightIcon fontSize="small" />
        </Typography>
      )}
      
      {/* Notification Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ 
          vertical: isMobile ? 'top' : 'bottom', 
          horizontal: 'center' 
        }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExploreSection;