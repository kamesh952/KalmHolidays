import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  TextField, 
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  Container,
  FormControl,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const FlightSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Initialize state
  const [tripType, setTripType] = useState('round-trip');
  const [cabinClass, setCabinClass] = useState('economy');
  const [fromAirport, setFromAirport] = useState('DEL');
  const [toAirport, setToAirport] = useState('BOM');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const airports = [
    { code: 'DEL', name: 'Delhi (DEL)' },
    { code: 'BOM', name: 'Mumbai (BOM)' },
    { code: 'BLR', name: 'Bengaluru (BLR)' },
    { code: 'MAA', name: 'Chennai (MAA)' },
    { code: 'HYD', name: 'Hyderabad (HYD)' },
    { code: 'CCU', name: 'Kolkata (CCU)' },
  ];

  // Initialize flight bookings in localStorage
  useEffect(() => {
    if (!localStorage.getItem('flightBookings')) {
      localStorage.setItem('flightBookings', JSON.stringify([]));
    }
  }, []);

  const handleFlightBooking = (e) => {
    e.preventDefault();
    
    const newFlightBooking = {
      bookingId: `FL-${Date.now()}`,
      type: 'flight',
      tripType,
      cabinClass,
      fromAirport: airports.find(a => a.code === fromAirport)?.name || fromAirport,
      toAirport: airports.find(a => a.code === toAirport)?.name || toAirport,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : null,
      passengers,
      bookedOn: new Date().toISOString(),
      price: `$${Math.floor(100 + Math.random() * 900)}` // Example price
    };

    const existingBookings = JSON.parse(localStorage.getItem('flightBookings') || []);
    const updatedBookings = [...existingBookings, newFlightBooking];
    
    localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
    window.dispatchEvent(new CustomEvent('bookingsUpdated'));

    setSnackbarMessage('Flight booked successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    // Reset form
    setDepartureDate('');
    setReturnDate('');
  };

  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  // Styles
  const styles = {
    container: {
      py: isMobile ? 3 : 4,
      px: isMobile ? 2 : 3,
    },
    paper: {
      p: isMobile ? 2 : 4,
      borderRadius: 3,
      background: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: 700,
      mb: 1,
      fontFamily: 'Poppins, sans-serif',
    },
    formLayout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
      gap: isMobile ? 2 : 3,
      mb: 3,
    },
    searchButton: {
      px: 6,
      py: 2,
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '12px',
      background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
      '&:hover': {
        background: 'linear-gradient(90deg, #1D4ED8 0%, #1E40AF 100%)',
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography sx={styles.heading}>
          Book Your Flight
        </Typography>

        <Box component="form" onSubmit={handleFlightBooking}>
          <Box sx={styles.formLayout}>
            {/* Airport Fields */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr 48px 1fr' : '1fr 56px 1fr',
              gap: 1,
              gridColumn: '1 / -1',
              alignItems: 'center',
            }}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="From"
                  value={fromAirport}
                  onChange={(e) => setFromAirport(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <Button 
                variant="outlined" 
                onClick={handleSwapAirports}
                sx={{ minWidth: 'auto', height: 48 }}
              >
                <SwapHorizIcon />
              </Button>

              <FormControl fullWidth>
                <TextField
                  select
                  label="To"
                  value={toAirport}
                  onChange={(e) => setToAirport(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Box>

            {/* Dates */}
            <TextField
              fullWidth
              type="date"
              label="Departure"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            {tripType === 'round-trip' && (
              <TextField
                fullWidth
                type="date"
                label="Return"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {/* Passengers & Class */}
            <TextField
              fullWidth
              type="number"
              label="Passengers"
              value={passengers}
              onChange={(e) => setPassengers(Math.max(1, e.target.value))}
              InputProps={{
                inputProps: { min: 1 },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              fullWidth
              label="Class"
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ArrowDropDownIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium">Premium Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First Class</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={styles.searchButton}
            >
              Book Flight
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FlightSearch;