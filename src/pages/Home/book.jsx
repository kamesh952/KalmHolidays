import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  FormControl,
  InputLabel, 
  MenuItem, 
  Select, 
  TextField,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';


// Styled components
const BookingFormContainer = styled(Box)(({ theme }) => ({
  background: '#fff',
  margin: '0',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  gap: '8px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '15px',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#007bff',
    },
    fontFamily: "'Poppins', serif",
    fontSize: '1.05rem',
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Playfair Display', serif",
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 150,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#007bff',
    },
    fontFamily: "'Poppins', serif",
    fontSize: '1.05rem',
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Playfair Display', serif",
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007bff',
  color: '#fff',
  border: '2px solid #ffffff',
  borderRadius: '8px',
  padding: '10px',
  fontFamily: "'Poppins', serif",
  fontSize: '1.05rem',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const BookingForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Initialize state with values from localStorage or defaults
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('bookingFormData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      location: '',
      destination: '',
      checkIn: '',
      checkOut: '',
      adults: '2 adults',
      children: '0 children',
      rooms: '1 room'
    };
  });

  // Extract individual form fields from formData
  const { location, destination, checkIn, checkOut, adults, children, rooms } = formData;

  // Store form data in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookingFormData', JSON.stringify(formData));
  }, [formData]);

  // Handle form field changes
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    
    // Store the response in localStorage
    localStorage.setItem('bookingResponse', JSON.stringify({
      ...formData,
      submittedAt: new Date().toISOString()
    }));
    
    // Handle form submission logic here
    // You could add success notification or redirect logic here
  };

  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 
    'Ahmedabad', 'Lucknow', 'Chandigarh', 'Indore', 'Bhopal', 'Surat', 'Coimbatore', 
    'Kochi', 'Visakhapatnam', 'Patna', 'Guwahati', 'Bhubaneswar', 'Thiruvananthapuram', 
    'Madurai', 'Vadodara', 'Nagpur', 'Agra', 'Varanasi', 'Prayagraj', 'Dehradun', 
    'Shimla', 'Manali', 'Goa', 'Udaipur', 'Jodhpur', 'Amritsar', 'Rishikesh', 
    'Haridwar', 'Ajmer', 'Mount Abu', 'Darjeeling', 'Shillong', 'Gangtok', 'Mysore', 
    'Ooty', 'Hampi', 'Alleppey', 'Kumarakom', 'Ranchi', 'Jamshedpur', 'Dhanbad'
  ];

  const destinations = [
    'Taj Mahal, Agra', 'Gateway of India, Mumbai', 'Qutub Minar, Delhi', 'Red Fort, Delhi', 
    'India Gate, Delhi', 'Charminar, Hyderabad', 'Marine Drive, Mumbai', 'Jaisalmer Fort, Jaisalmer', 
    'Golden Temple, Amritsar', 'Hawa Mahal, Jaipur', 'Amer Fort, Jaipur', 'Meenakshi Temple, Madurai', 
    'Backwaters, Alleppey', 'Sun Temple, Konark', 'Ajanta & Ellora Caves, Maharashtra', 
    'Lake Palace, Udaipur', 'Victoria Memorial, Kolkata', 'Jagannath Temple, Puri', 
    'Ranthambore National Park', 'Bandipur National Park', 'Dal Lake, Srinagar', 'Leh-Ladakh', 
    'Tea Gardens, Darjeeling', 'Gangtok Monasteries', 'Goa Beaches', 'Rishikesh Adventures', 
    'Manali Snow Points', 'Shimla Mall Road', 'Kodaikanal Lake', 'Coorg Coffee Plantations'
  ];

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <BookingFormContainer component="form" onSubmit={handleSubmit}>
      <StyledFormControl fullWidth={isMobile}>
        <InputLabel id="location-label">Your Location</InputLabel>
        <Select
          labelId="location-label"
          id="location"
          value={location}
          label="Your Location"
          onChange={handleChange('location')}
          required
        >
          <MenuItem value="" disabled><em>Your Location</em></MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl fullWidth={isMobile}>
        <InputLabel id="destination-label">Destination</InputLabel>
        <Select
          labelId="destination-label"
          id="destination"
          value={destination}
          label="Destination"
          onChange={handleChange('destination')}
          required
        >
          <MenuItem value="" disabled><em>Destination</em></MenuItem>
          {destinations.map((dest) => (
            <MenuItem key={dest} value={dest}>{dest}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledTextField
        label="Check-in"
        type="date"
        value={checkIn}
        onChange={handleChange('checkIn')}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: today }}
        required
        fullWidth={isMobile}
      />

      <StyledTextField
        label="Check-out"
        type="date"
        value={checkOut}
        onChange={handleChange('checkOut')}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: checkIn || today }}
        required
        fullWidth={isMobile}
      />

      <StyledFormControl fullWidth={isMobile}>
        <InputLabel id="adults-label">Adults</InputLabel>
        <Select
          labelId="adults-label"
          id="adults"
          value={adults}
          label="Adults"
          onChange={handleChange('adults')}
        >
          <MenuItem value="1 adult">1 adult</MenuItem>
          <MenuItem value="2 adults">2 adults</MenuItem>
          <MenuItem value="3 adults">3 adults</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledFormControl fullWidth={isMobile}>
        <InputLabel id="children-label">Children</InputLabel>
        <Select
          labelId="children-label"
          id="children"
          value={children}
          label="Children"
          onChange={handleChange('children')}
        >
          <MenuItem value="0 children">0 children</MenuItem>
          <MenuItem value="1 child">1 child</MenuItem>
          <MenuItem value="2 children">2 children</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledFormControl fullWidth={isMobile}>
        <InputLabel id="rooms-label">Rooms</InputLabel>
        <Select
          labelId="rooms-label"
          id="rooms"
          value={rooms}
          label="Rooms"
          onChange={handleChange('rooms')}
        >
          <MenuItem value="1 room">1 room</MenuItem>
          <MenuItem value="2 rooms">2 rooms</MenuItem>
          <MenuItem value="3 rooms">3 rooms</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledButton 
        type="submit" 
        variant="contained" 
        fullWidth={isMobile}
        startIcon={<SearchIcon />}
      >
        Book Hotels
      </StyledButton>
    </BookingFormContainer>
  );
};

export default BookingForm;