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
  useMediaQuery
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

  // Initialize state with values from localStorage or defaults
  const [tripType, setTripType] = useState(() => {
    const saved = localStorage.getItem('flightSearch_tripType');
    return saved || 'round-trip';
  });
  
  const [cabinClass, setCabinClass] = useState(() => {
    const saved = localStorage.getItem('flightSearch_cabinClass');
    return saved || 'economy';
  });
  
  const [fromAirport, setFromAirport] = useState(() => {
    const saved = localStorage.getItem('flightSearch_fromAirport');
    return saved || 'DEL';
  });
  
  const [toAirport, setToAirport] = useState(() => {
    const saved = localStorage.getItem('flightSearch_toAirport');
    return saved || 'BOM';
  });
  
  const [departureDate, setDepartureDate] = useState(() => {
    const saved = localStorage.getItem('flightSearch_departureDate');
    return saved || '';
  });
  
  const [returnDate, setReturnDate] = useState(() => {
    const saved = localStorage.getItem('flightSearch_returnDate');
    return saved || '';
  });
  
  const [passengers, setPassengers] = useState(() => {
    const saved = localStorage.getItem('flightSearch_passengers');
    return saved ? parseInt(saved) : 1;
  });
  
  const [swapAirports, setSwapAirports] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('flightSearch_tripType', tripType);
  }, [tripType]);
  
  useEffect(() => {
    localStorage.setItem('flightSearch_cabinClass', cabinClass);
  }, [cabinClass]);
  
  useEffect(() => {
    localStorage.setItem('flightSearch_fromAirport', fromAirport);
  }, [fromAirport]);
  
  useEffect(() => {
    localStorage.setItem('flightSearch_toAirport', toAirport);
  }, [toAirport]);
  
  useEffect(() => {
    localStorage.setItem('flightSearch_departureDate', departureDate);
  }, [departureDate]);
  
  useEffect(() => {
    localStorage.setItem('flightSearch_returnDate', returnDate);
  }, [returnDate]);
  
  useEffect(() => {
    localStorage.setItem('flightSearch_passengers', passengers.toString());
  }, [passengers]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Actual search implementation would go here
    console.log({
      tripType,
      cabinClass,
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      passengers
    });
  };

  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    setSwapAirports(!swapAirports);
  };

  const airports = [
    { code: 'DEL', name: 'Delhi (DEL)' },
    { code: 'BOM', name: 'Mumbai (BOM)' },
    { code: 'BLR', name: 'Bengaluru (BLR)' },
    { code: 'MAA', name: 'Chennai (MAA)' },
    { code: 'HYD', name: 'Hyderabad (HYD)' },
    { code: 'CCU', name: 'Kolkata (CCU)' },
  ];

  // Styles
  const styles = {
    container: {
      py: isMobile ? 3 : 4,
      px: isMobile ? 2 : 3,
    },
    paper: {
      p: isMobile ? 2 : 4,
      borderRadius: 3,
      background: '#ffffff'
    },
    heading: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: 700,
      color: '#2A3440',
      mb: 1,
      fontFamily: 'Poppins, sans-serif',
    },
    subheading: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: 400,
      color: '#5A6B7D',
      mb: 3,
      fontFamily: 'Poppins, sans-serif',
    },
    radioGroup: {
      display: 'flex',
      gap: isMobile ? 1 : 2,
      mb: 3,
      flexWrap: 'wrap',
    },
    radioLabel: {
      '& .MuiTypography-root': {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        fontSize: isMobile ? '0.85rem' : '0.95rem',
      },
    },
    formLayout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
      gap: isMobile ? 2 : 3,
      mb: 3,
    },
    airportFields: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 48px 1fr' : '1fr 56px 1fr',
      gap: 1,
      gridColumn: '1 / -1',
      alignItems: 'center',
    },
    swapButton: {
      minWidth: 'auto',
      height: 48,
      borderRadius: '12px',
      backgroundColor: '#F0F4F8',
      '&:hover': {
        backgroundColor: '#E0E8F0',
      },
    },
    formControl: {
      width: '100%',
      '& .MuiInputLabel-root': {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
      },
      '& .MuiInputBase-root': {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
      },
    },
    select: {
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        '& fieldset': {
          borderColor: '#E0E8F0',
        },
        '&:hover fieldset': {
          borderColor: '#B7C4D1',
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
        },
      },
    },
    searchButton: {
      px: 6,
      py: 2,
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
      borderRadius: '12px',
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
      '&:hover': {
        background: 'linear-gradient(90deg, #1D4ED8 0%, #1E40AF 100%)',
        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
        transform: 'translateY(-2px)',
      },
      transition: 'all 0.3s ease',
      width: isMobile ? '100%' : 'auto',
    },
    inputAdornment: {
      color: theme.palette.primary.main,
      mr: 1,
    },
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography sx={styles.heading}>
          Find and book your perfect flight
        </Typography>
        
        <Typography sx={styles.subheading}>
          Compare prices across airlines and book with confidence
        </Typography>
        
        <RadioGroup
          row
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          sx={styles.radioGroup}
        >
          <FormControlLabel
            value="round-trip"
            control={<Radio color="primary" size="small" />}
            label="Round trip"
            sx={styles.radioLabel}
          />
          <FormControlLabel
            value="one-way"
            control={<Radio color="primary" size="small" />}
            label="One way"
            sx={styles.radioLabel}
          />
          <FormControlLabel
            value="multi-city"
            control={<Radio color="primary" size="small" />}
            label="Multi-city"
            sx={styles.radioLabel}
          />
        </RadioGroup>

        <Box component="form" onSubmit={handleSearch}>
          <Box sx={styles.formLayout}>
            {/* Airport Fields */}
            <Box sx={styles.airportFields}>
              <FormControl sx={styles.formControl}>
                <TextField
                  select
                  fullWidth
                  size="medium"
                  label="From"
                  value={fromAirport}
                  onChange={(e) => setFromAirport(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={styles.inputAdornment}>
                        <FlightTakeoffIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
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
                sx={styles.swapButton}
                onClick={handleSwapAirports}
              >
                <SwapHorizIcon fontSize="small" />
              </Button>

              <FormControl sx={styles.formControl}>
                <TextField
                  select
                  fullWidth
                  size="medium"
                  label="To"
                  value={toAirport}
                  onChange={(e) => setToAirport(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={styles.inputAdornment}>
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Box>

            {/* Departure Date */}
            <FormControl sx={styles.formControl}>
              <TextField
                fullWidth
                size="medium"
                type="date"
                label="Departure date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                InputLabelProps={{ 
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={styles.inputAdornment}>
                      <DateRangeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={styles.textField}
              />
            </FormControl>

            {/* Return Date (conditionally rendered) */}
            {tripType === 'round-trip' && (
              <FormControl sx={styles.formControl}>
                <TextField
                  fullWidth
                  size="medium"
                  type="date"
                  label="Return date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  InputLabelProps={{ 
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={styles.inputAdornment}>
                        <DateRangeIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                />
              </FormControl>
            )}

            {/* Passengers & Class */}
            <FormControl sx={styles.formControl}>
              <TextField
                fullWidth
                size="medium"
                type="number"
                label="Passengers"
                value={passengers}
                onChange={(e) => setPassengers(Math.max(1, e.target.value))}
                InputProps={{
                  inputProps: { min: 1 },
                  startAdornment: (
                    <InputAdornment position="start" sx={styles.inputAdornment}>
                      <PersonIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={styles.textField}
              />
            </FormControl>

            <FormControl sx={styles.formControl}>
              <TextField
                select
                fullWidth
                size="medium"
                label="Cabin class"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={styles.inputAdornment}>
                      <ArrowDropDownIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ ...styles.textField, ...styles.select }}
              >
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="premium">Premium Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="first">First Class</MenuItem>
              </TextField>
            </FormControl>
          </Box>

          <Box sx={{ textAlign: isMobile ? 'center' : 'right', mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={styles.searchButton}
            >
              Book Flights
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default FlightSearch;