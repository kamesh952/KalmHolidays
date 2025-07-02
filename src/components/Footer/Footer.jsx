import React from 'react';
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  Link,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

// Custom styled components with enhanced responsive design
const NewsletterSection = styled(Box)(({ theme }) => ({
  background: '#87cdff',
  color: '#003366',
  textAlign: 'center',
  padding: theme.spacing(3, 2),
  fontFamily: "'Playfair Display', serif",
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5, 2),
  },
}));

const FooterInfoSection = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  color: '#003366',
  padding: theme.spacing(4, 0),
  fontFamily: "'Playfair Display', serif",
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const FooterBottomSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 0),
  background: '#87cdff',
  color: '#003366',
  fontFamily: "'Playfair Display', serif",
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: '#ffffff',
    height: '44px',
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
      height: '50px',
      fontSize: '16px',
    },
    '& fieldset': {
      borderColor: '#003366',
    },
    '&:hover fieldset': {
      borderColor: '#003366',
    },
  },
  margin: theme.spacing(1, 0),
  '& input': {
    padding: '12px 16px',
    [theme.breakpoints.up('sm')]: {
      padding: '14px 16px',
    },
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  background: '#003366',
  color: '#ffffff',
  borderRadius: '25px',
  padding: theme.spacing(1.2, 2.5),
  fontFamily: "'Playfair Display', serif",
  textTransform: 'none',
  fontSize: '14px',
  height: '44px',
  minWidth: '120px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.8, 3.8),
    fontSize: '16px',
    height: '50px',
    minWidth: '140px',
  },
  '&:hover': {
    background: '#005bb5',
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  color: '#003366',
  textDecoration: 'none',
  fontFamily: "'Playfair Display', serif",
  fontSize: '14px',
  padding: theme.spacing(1, 0),
  display: 'inline-block',
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 1.5),
    fontSize: '16px',
  },
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#003366',
  marginRight: theme.spacing(1),
  transition: 'transform 0.3s ease',
  padding: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
  '&:hover': {
    transform: 'scale(1.2)',
    backgroundColor: 'transparent',
  },
}));

// Responsive Typography component
const ResponsiveTypography = styled(Typography)(({ theme, variant }) => ({
  fontFamily: "'Playfair Display', serif",
  ...(variant === 'h6' && {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.25rem',
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },
  }),
  ...(variant === 'body2' && {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
  }),
  ...(variant === 'h5' && {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      marginBottom: theme.spacing(1.5),
    },
  }),
  ...(variant === 'subtitle1' && {
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  }),
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  return (
    <Box 
      component="footer" 
      sx={{ 
        fontFamily: "'Playfair Display', serif",
        padding: 0,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Newsletter Section */}
      <NewsletterSection>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="center" spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} sm="auto">
              <EmailIcon sx={{ 
                fontSize: isMobile ? '2rem' : '2.5rem',
                mb: isMobile ? 1 : 0 
              }} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box textAlign="center">
                <ResponsiveTypography variant="h6">
                  Get Updates & More
                </ResponsiveTypography>
                <ResponsiveTypography variant="body2">
                  Thoughtful thoughts to your inbox
                </ResponsiveTypography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
              <Box 
                display="flex" 
                flexDirection={isMobile ? 'column' : 'row'} 
                alignItems="center" 
                gap={isMobile ? 1.5 : 2}
                sx={{ py: isMobile ? 1 : 2 }}
              >
                <StyledTextField
                  placeholder="Your Email"
                  variant="outlined"
                  size="medium"
                  fullWidth={isMobile}
                  sx={{ 
                    minWidth: isMobile ? 'auto' : '200px',
                    flex: isMobile ? 'none' : 1 
                  }}
                  inputProps={{ 
                    style: { 
                      fontFamily: "'Playfair Display', serif",
                      fontSize: isMobile ? '14px' : '16px'
                    } 
                  }}
                />
                <SubscribeButton variant="contained" fullWidth={isMobile}>
                  SUBSCRIBE
                </SubscribeButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </NewsletterSection>

      {/* Footer Info Section */}
      <FooterInfoSection>
        <Container maxWidth="lg">
          <Grid container spacing={isMobile ? 3 : 4} justifyContent="space-between">
            {/* Corporate Office */}
            <Grid item xs={12} sm={6} md={3}>
              <ResponsiveTypography variant="h6">
                Corporate Office
              </ResponsiveTypography>
              <ResponsiveTypography variant="body2" sx={{ mb: 2 }}>
                Gandhi St,<br />
                Melpattampakkam,<br />
                Panruti,<br />
                Cuddalore-607104<br />
                TamilNadu, India.
              </ResponsiveTypography>
              <ResponsiveTypography variant="h6" sx={{ mt: isMobile ? 2 : 3 }}>
                Call Us
              </ResponsiveTypography>
              <ResponsiveTypography variant="body2">
                +91 8680892898
              </ResponsiveTypography>
            </Grid>

            {/* Head Office */}
            <Grid item xs={12} sm={6} md={3}>
              <ResponsiveTypography variant="h6">
                Head Office
              </ResponsiveTypography>
              <ResponsiveTypography variant="body2" sx={{ mb: 2 }}>
                Kalm Holidays Pvt LTD,<br />
                No.1, Gemini Parsn,<br />
                Kodambakkam High Road,<br />
                Nungambakkam, Chennai – 600006<br />
                Tamilnadu, India.
              </ResponsiveTypography>
              <ResponsiveTypography variant="h6" sx={{ mt: isMobile ? 2 : 3 }}>
                Email Us
              </ResponsiveTypography>
              <ResponsiveTypography variant="body2">
                rkameshraj7@gmail.com
              </ResponsiveTypography>
            </Grid>

            {/* Our Branches */}
            <Grid item xs={12} sm={6} md={3}>
              <ResponsiveTypography variant="h6">
                Our Branches
              </ResponsiveTypography>
              <Grid container spacing={isMobile ? 0 : 1}>
                <Grid item xs={6}>
                  <List dense disablePadding>
                    {['Mumbai', 'Hyderabad', 'Bangalore', 'Chennai', 'Coimbatore', 'Erode', 'Madurai'].map((city) => (
                      <ListItem key={city} disablePadding sx={{ pb: 0.5 }}>
                        <ResponsiveTypography variant="body2">{city}</ResponsiveTypography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List dense disablePadding>
                    {['Trichy', 'Salem', 'Kochi', 'Vellore', 'Pondicherry', 'Nagercoil', 'Kanyakumari'].map((city) => (
                      <ListItem key={city} disablePadding sx={{ pb: 0.5 }}>
                        <ResponsiveTypography variant="body2">{city}</ResponsiveTypography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>

            {/* Follow Us */}
            <Grid item xs={12} sm={6} md={3}>
              <ResponsiveTypography variant="h6">
                Follow Us
              </ResponsiveTypography>
              <Box sx={{ 
                mt: 1.5,
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap'
              }}>
                <SocialIcon 
                  href="https://www.facebook.com/rkamesh.kamesh.754/" 
                  target="_blank" 
                  aria-label="Facebook"
                >
                  <FacebookIcon sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }} />
                </SocialIcon>
                <SocialIcon 
                  href="https://www.instagram.com/kameshcrush96/" 
                  target="_blank" 
                  aria-label="Instagram"
                >
                  <InstagramIcon sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }} />
                </SocialIcon>
                <SocialIcon 
                  href="https://github.com/kamesh952" 
                  target="_blank" 
                  aria-label="GitHub"
                >
                  <GitHubIcon sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }} />
                </SocialIcon>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FooterInfoSection>

      {/* Footer Bottom Section */}
      <FooterBottomSection>
        <Container maxWidth="lg">
          <ResponsiveTypography 
            variant="body2" 
            sx={{ 
              mb: isMobile ? 1.5 : 2,
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }}
          >
            Copyright © 2025 by Kalm Holidays Pvt Ltd. All Rights Reserved.
          </ResponsiveTypography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : isTablet ? 'column' : 'row', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: isMobile ? 1 : isTablet ? 1.5 : 0,
              py: 1,
              flexWrap: 'wrap'
            }}
          >
            <NavLink href="/privacy">Privacy Policy</NavLink>
            <NavLink href="/terms">Terms & Conditions</NavLink>
            <NavLink href="/cancel">Cancellation & Refund Policy</NavLink>
          </Box>
        </Container>
      </FooterBottomSection>
    </Box>
  );
};

export default Footer;