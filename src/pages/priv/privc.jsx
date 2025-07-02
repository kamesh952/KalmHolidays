import React from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Link,
  Box,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { styled } from '@mui/system';

// First create base theme without self-references
const baseTheme = createTheme();

// Then create complete theme with responsive breakpoints
const theme = createTheme({
  typography: {
    fontFamily: "'Playfair Display', serif",
    h2: {
      color: '#003580',
      fontSize: '2.5rem',
      textAlign: 'center',
      [baseTheme.breakpoints.down('md')]: {
        fontSize: '2rem',
      },
      [baseTheme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
        lineHeight: 1.2,
      },
    },
    h3: {
      fontSize: '1.5rem',
      color: '#0357cc',
      [baseTheme.breakpoints.down('md')]: {
        fontSize: '1.3rem',
      },
      [baseTheme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
    body1: {
      fontSize: '1.2rem',
      color: '#555',
      fontFamily: "'Lora', serif",
      [baseTheme.breakpoints.down('md')]: {
        fontSize: '1.1rem',
      },
      [baseTheme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
    },
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '80%',
  margin: 'auto',
  padding: theme.spacing(4),
  fontFamily: "'Playfair Display', serif",
  [theme.breakpoints.down('md')]: {
    width: '90%',
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    padding: theme.spacing(2),
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  alignItems: 'flex-start',
  '& .MuiTypography-root': {
    fontSize: '1.2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const PrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const sections = [
    {
      title: "1. Introduction",
      content: "At Kalm Holidays, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website and services."
    },
    {
      title: "2. Information We Collect",
      items: [
        <span key="personal"><strong>Personal Information:</strong> Name, email, phone number, address, passport details (if required for visa processing), and payment details.</span>,
        <span key="booking"><strong>Booking Information:</strong> Travel details, preferences, and purchase history.</span>,
        <span key="technical"><strong>Technical Information:</strong> IP address, browser type, device information, and cookies.</span>,
        <span key="communication"><strong>Communication Data:</strong> Emails, chat messages, or customer support interactions.</span>
      ]
    },
    {
      title: "3. How We Use Your Information",
      items: [
        "To process your bookings and payments.",
        "To send booking confirmations, invoices, and travel-related updates.",
        "To improve user experience through personalized recommendations.",
        "To send promotional offers and newsletters (you can opt out anytime).",
        "To comply with legal and regulatory requirements."
      ]
    },
    {
      title: "4. How We Protect Your Information",
      items: [
        "We use SSL encryption to protect online transactions.",
        "We do not store full credit card details on our servers.",
        "Access to personal information is restricted to authorized employees only.",
        "We implement firewalls and secure data storage methods to prevent unauthorized access."
      ]
    },
    {
      title: "5. Sharing Your Information with Third Parties",
      content: "We do not sell your personal data. However, we may share your information with:",
      items: [
        <span key="travel"><strong>Travel Partners:</strong> Airlines, hotels, tour operators, and car rental companies to fulfill your bookings.</span>,
        <span key="payment"><strong>Payment Providers:</strong> Banks and payment processors for transaction security.</span>,
        <span key="legal"><strong>Legal Authorities:</strong> If required by law enforcement or government regulations.</span>
      ]
    },
    {
      title: "6. Use of Cookies",
      items: [
        "Cookies help us enhance your browsing experience.",
        "You can manage or disable cookies through your browser settings.",
        "We use cookies for analytics, advertising, and remembering your preferences."
      ]
    },
    {
      title: "7. Your Rights",
      items: [
        <span key="access"><strong>Access & Correction:</strong> You can request access to your personal data and request corrections if needed.</span>,
        <span key="deletion"><strong>Data Deletion:</strong> You may request us to delete your data, subject to legal obligations.</span>,
        <span key="marketing"><strong>Marketing Preferences:</strong> You can opt out of receiving promotional emails at any time.</span>
      ]
    },
    {
      title: "8. Changes to This Privacy Policy",
      content: "We may update this Privacy Policy periodically. Any significant changes will be notified via email or our website."
    },
    {
      title: "9. Contact Us",
      content: (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            If you have any questions or concerns about our Privacy Policy, please <Link href="/contact">contact us</Link>.
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <span>📞</span> <strong>+91 8680892898</strong>
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>📧</span> <strong>rkameshraj7@gmail.com</strong>
          </Typography>
        </Box>
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            mt: isMobile ? 2 : 4,
            mb: isMobile ? 3 : 5
          }}
        >
          Privacy Policy
        </Typography>

        {sections.map((section, index) => (
          <Box key={index} mt={isMobile ? 2 : 3}>
            <Typography variant="h3" component="h3">
              {section.title}
            </Typography>
            {section.content && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {section.content}
              </Typography>
            )}
            {section.items && (
              <List dense={isMobile}>
                {section.items.map((item, itemIndex) => (
                  <StyledListItem key={itemIndex}>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ component: 'div' }}
                    />
                  </StyledListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;