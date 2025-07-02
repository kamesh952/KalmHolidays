import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  useMediaQuery,
  useTheme,
  Link,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Import your components
import CarRentals from '../rent/rentc';
import FlightBookings from '../flight/flightbook';
import TrendingDestinations from './gal';
import ExploreSection from './explore';

// Property type data with component mapping
const propertyTypes = [
  {
    label: 'Car Rentals',
    image: 'https://sonasiyostravels.com/uploads/tenant/SONASIYOS/car-rentals1.webp',
    link: '/rentals',
    component: 'carRentals',
  },
  {
    label: 'Flight Bookings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Tarom.b737-700.yr-bgg.arp.jpg',
    link: '/flight',
    component: 'flightBookings',
  },
  {
    label: 'Trending Destination',
    image: 'https://thenational.shorthandstories.com/25-places-to-visit-2025-travel/assets/AkRz4IWLcQ/covers-frame-0ms-1920x1080.jpg',
    link: '/trending-destinations',
    component: 'trendingDestinations',
  },
  {
    label: 'Explore In India',
    image: 'https://stateexpressindia.com/wp-content/uploads/2024/01/india_tour_packages.webp',
    link: '/india-tours',
    component: 'indiaTours',
  },
];

const PropertySection = ({ enableNavigation = true, useRouting = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // State for component navigation
  const [activeComponent, setActiveComponent] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  // Handle click based on navigation type
  const handlePropertyClick = (property) => {
    if (enableNavigation && !useRouting) {
      setActiveComponent(property.component);
    }
    // If useRouting is true, the Link component will handle navigation
  };

  // Render specific component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'carRentals':
        return <CarRentals />;
      case 'flightBookings':
        return <FlightBookings />;
      case 'trendingDestinations':
        return <TrendingDestinations />;
      case 'indiaTours':
        return <ExploreSection />;
      default:
        return null;
    }
  };

  // Back to main view
  const handleBackClick = () => {
    setActiveComponent(null);
  };

  // If showing a specific component
  if (activeComponent && enableNavigation && !useRouting) {
    return (
     <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
  <Box sx={{ p: 2 }}>
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={handleBackClick}
      sx={{
        mb: 2,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        color: '#000', // Default color
        '&:hover': {
          color: '#1976d2', // You can choose any bold or primary color
          fontWeight: 700,
          backgroundColor: 'transparent', // optional: prevent default MUI hover bg
        },
      }}
    >
      Back to Services
    </Button>
  </Box>
  {renderActiveComponent()}
</Box>

    );
  }

  // Mobile UI Component
  const MobileView = () => (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ 
        backgroundColor: '#ffffff', 
        px: '5%', 
        py: '30px',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Typography
        variant="h6"
        component={motion.div}
        variants={itemVariants}
        sx={{
          fontSize: '1.5rem',
          color: '#000000',
          textAlign: 'left',
          mb: 2,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        }}
      >
        Services
      </Typography>

      <Box 
        component={motion.div}
        sx={{ 
          display: 'flex',
          gap: '15px',
          overflowX: 'auto',
          paddingBottom: '10px',
          scrollSnapType: 'x mandatory',
        }}
      >
        {propertyTypes.map((property, index) => {
          const Component = useRouting ? Link : Box;
          const componentProps = useRouting 
            ? { 
                href: property.link,
                underline: "none",
                sx: {
                  scrollSnapAlign: 'start',
                  minWidth: '150px',
                  textDecoration: 'none',
                }
              }
            : {
                sx: {
                  scrollSnapAlign: 'start',
                  minWidth: '150px',
                  cursor: enableNavigation ? 'pointer' : 'default',
                },
                onClick: enableNavigation ? () => handlePropertyClick(property) : undefined
              };

          return (
            <Component 
              key={index}
              {...componentProps}
            >
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  component={motion.div}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                  }}
                >
                  <Box
                    component="img"
                    src={property.image}
                    alt={property.label}
                    sx={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    mt: '8px',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    color: theme.palette.text.primary,
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {property.label}
                </Typography>
              </motion.div>
            </Component>
          );
        })}
      </Box>
    </Box>
  );

  // Desktop UI Component
  const DesktopView = () => (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ 
        backgroundColor: '#ffffff', 
        px: { xs: '5%', md: '8%', lg: '10%' },
        py: { xs: '30px', md: '50px' },
        maxWidth: '1600px',
        margin: '0 auto'
      }}
    >
      <Typography
        variant="h6"
        component={motion.div}
        variants={itemVariants}
        sx={{
          fontSize: { xs: '1.5rem', md: '1.75rem', lg: '2rem' },
          color: '#000000',
          textAlign: 'left',
          mb: { xs: 2, md: 3 },
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        }}
      >
        Stays
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        component={motion.div}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: { xs: '15px', md: '20px' },
        }}
      >
        {propertyTypes.map((property, index) => {
          const Component = useRouting ? Link : Box;
          const componentProps = useRouting 
            ? { 
                href: property.link,
                underline: "none",
                sx: {
                  textDecoration: 'none',
                }
              }
            : {
                sx: {
                  cursor: enableNavigation ? 'pointer' : 'default',
                },
                onClick: enableNavigation ? () => handlePropertyClick(property) : undefined
              };

          return (
            <Grid item key={index} xs={6} sm={4} md={3}>
              <Component {...componentProps}>
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.99 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      aspectRatio: '1/0.8',
                    }}
                  >
                    <Box
                      component="img"
                      src={property.image}
                      alt={property.label}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '14px', sm: '15px', md: '16px', lg: '18px' },
                      mt: { xs: '8px', md: '12px' },
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      color: theme.palette.text.primary,
                      width: '100%',
                      textAlign: 'center',
                      px: '8px',
                    }}
                  >
                    {property.label}
                  </Typography>
                </motion.div>
              </Component>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default PropertySection;