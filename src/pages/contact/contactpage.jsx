import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, useMediaQuery } from '@mui/material';
import { Phone, Email } from '@mui/icons-material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme that doesn't affect global styles
const theme = createTheme({
  typography: {
    fontFamily: [
      'Playfair Display',
      'serif'
    ].join(','),
    h2: {
      fontSize: '2.5rem',
      color: '#003580',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    body1: {
      fontSize: '1.125rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', serif",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
          '@media (max-width:600px)': {
            padding: '16px',
            '&:last-child': {
              paddingBottom: '16px',
            },
          },
        },
      },
    },
  },
});

const OfficeCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  background: 'white',
  borderRadius: '10px',
  boxShadow: '6px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '350px',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    minHeight: '280px',
    maxWidth: '100%',
  },
}));

const ContactLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: '#ff8c00',
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '10px',
  fontFamily: "'Playfair Display', serif",
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Poppins', serif",
  background: '#0357cc',
  color: 'rgb(255, 255, 255)',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'block',
  width: '100%',
  marginTop: 'auto',
  fontSize: '0.9rem',
  '&:hover': {
    background: '#e0a800',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    fontSize: '0.85rem',
  },
}));

const BranchesPage = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const branches = [
    {
      city: 'MUMBAI',
      address: 'The Boardroom Modi House, 1st Floor, Near Fun Republic, Mumbai, India – 400058.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'HYDERABAD',
      address: '108, Workafella, Opp to Taj Deccan Hotel, Hyderabad, India – 500082.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'BANGALORE',
      address: 'Novel Tech Park, Opposite 1 MG Mall, Bangalore, India – 560042.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'CHENNAI',
      address: 'No.1, Gemini Parson Complex, Kodambakkam High Road, Chennai, India – 600006.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'COIMBATORE',
      address: '2nd Floor, Diwan Bahadur Road, Coimbatore, India – 641002.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    },
    {
      city: 'ERODE',
      address: 'No. 84/1, Perundurai Road, Opposite to Collectorate, Erode, India – 638011.',
      phone: '+91 9940882200',
      email: 'kalmholidays45@gmail.com'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        backgroundColor: '#f9f9f9',
        padding: isSmallScreen ? '15px' : '20px',
      }}>
        <Typography variant="h2" sx={{ 
          textAlign: 'center',
          marginBottom: isSmallScreen ? '20px' : '40px',
          padding: isSmallScreen ? '0 10px' : '0',
        }}>
          Branches Over the State
        </Typography>
        
        <Grid container spacing={isSmallScreen ? 2 : 3} sx={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          marginBottom: isSmallScreen ? '30px' : '60px',
          justifyContent: 'center',
          padding: isSmallScreen ? '0 10px' : '0',
        }}>
          {branches.map((branch, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <OfficeCard>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" sx={{ 
                    marginBottom: '10px',
                  }}>
                    {branch.city}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: '#555', 
                    marginBottom: '5px',
                  }}>
                    {branch.address}
                  </Typography>
                  <ContactLink href={`tel:${branch.phone}`}>
                    <Phone sx={{ 
                      verticalAlign: 'middle', 
                      marginRight: '5px',
                      fontSize: isSmallScreen ? '1rem' : 'inherit',
                    }} />
                    {branch.phone}
                  </ContactLink>
                  <ContactLink href={`mailto:${branch.email}`}>
                    <Email sx={{ 
                      verticalAlign: 'middle', 
                      marginRight: '5px',
                      fontSize: isSmallScreen ? '1rem' : 'inherit',
                    }} />
                    {branch.email}
                  </ContactLink>
                </CardContent>
                <Box sx={{ padding: isSmallScreen ? '0 16px 16px' : '0 24px 24px' }}>
                  <StyledButton variant="contained">
                    OFFICE DETAILS
                  </StyledButton>
                </Box>
              </OfficeCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default BranchesPage;