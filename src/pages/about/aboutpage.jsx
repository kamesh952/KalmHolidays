import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  IconButton,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

// Custom styling with enhanced mobile responsiveness
const StyledContainer = styled(Container)(({ theme }) => ({
  width: '90%',
  margin: 'auto',
  padding: '20px 10px',
  [theme.breakpoints.up('sm')]: {
    width: '85%',
    padding: '20px',
  },
  [theme.breakpoints.up('md')]: {
    width: '80%',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  color: '#003580',
  fontSize: '1.8em',
  textAlign: 'center',
  marginBottom: '16px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.2em',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5em',
    textAlign: 'left',
  },
}));

const SectionText = styled(Typography)(({ theme }) => ({
  fontSize: '1em',
  color: '#555',
  fontFamily: '"Playfair Display", serif',
  lineHeight: 1.6,
  textAlign: 'justify',
  marginBottom: '16px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.1em',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2em',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginTop: '30px',
  fontFamily: '"Playfair Display", serif',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '30px',
  },
  [theme.breakpoints.up('md')]: {
    gap: '40px',
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '350px',
  height: '250px',
  objectFit: 'cover',
  fontFamily: '"Playfair Display", serif',
  borderRadius: '8px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '300px',
    height: '280px',
  },
  [theme.breakpoints.up('md')]: {
    width: '500px',
    height: '300px',
  },
}));

const MissionVisionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  marginTop: '40px',
  fontFamily: '"Playfair Display", serif',
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start',
  },
}));

const CeoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '900px',
  margin: '40px auto',
  fontFamily: '"Playfair Display", serif',
  gap: '20px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: '40px',
  },
}));

const CeoLeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  fontFamily: '"Playfair Display", serif',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '200px',
}));

const CeoImage = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  fontFamily: '"Playfair Display", serif',
  borderRadius: '50%',
  objectFit: 'cover',
  transition: 'transform 0.5s',
  [theme.breakpoints.up('sm')]: {
    width: '180px',
    height: '180px',
  },
  [theme.breakpoints.up('md')]: {
    width: '200px',
    height: '200px',
  },
}));

const CeoContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: '"Playfair Display", serif',
  maxWidth: '600px',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

const TeamSection = styled(Box)(({ theme }) => ({
  padding: '60px 0',
  fontFamily: '"Playfair Display", serif',
  marginTop: '40px',
  [theme.breakpoints.up('md')]: {
    padding: '100px 0',
  },
}));

const TeamGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '30px',
  fontFamily: '"Playfair Display", serif',
  marginTop: '30px',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginTop: '50px',
  },
}));

const TeamMember = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  fontFamily: '"Playfair Display", serif',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: '35px',
  height: '35px',
  margin: '0 5px',
  backgroundColor: '#f8f9fa',
  color: '#2a2a72',
  '&:hover': {
    backgroundColor: '#ffa400',
    transform: 'translateY(-3px)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '40px',
    height: '40px',
    margin: '0 8px',
  },
}));

const MemberInfo = styled(CardContent)(({ theme }) => ({
  padding: '20px 15px',
  fontFamily: '"Playfair Display", serif',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: '25px',
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  fontFamily: '"Playfair Display", serif',
  marginTop: '40px',
  paddingBottom: '20px',
  justifyItems: 'center',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '25px',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  width: '280px',
  height: '140px',
  border: '4px solid #FFC107',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.0em',
  fontWeight: 'bold',
  fontFamily: '"Playfair Display", serif',
  position: 'relative',
  transition: 'transform 0.5s',
  transformStyle: 'preserve-3d',
  cursor: 'pointer',
  '&:hover': {
    transform: 'rotateY(180deg)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '200px',
    height: '150px',
    border: '5px solid #FFC107',
  },
}));

const StatFront = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  fontFamily: '"Playfair Display", serif',
  [theme.breakpoints.up('sm')]: {
    padding: '20px',
  },
}));

const StatBack = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '4px solid #FFC107',
  borderRadius: '8px',
  fontFamily: '"Playfair Display", serif',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  background: 'black',
  color: 'white',
  transform: 'rotateY(180deg)',
  fontSize: '0.9em',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    border: '5px solid #FFC107',
    padding: '20px',
    fontSize: '1em',
  },
}));

function HistoryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Add Google Fonts to document head
  React.useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;500;700&family=Lora:wght@400;700&family=Raleway:wght@300;400;700&display=swap';
    document.head.appendChild(link1);
    
    return () => {
      if (document.head.contains(link1)) {
        document.head.removeChild(link1);
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Mr. Rajendran",
      position: "Co-Founder & CEO",
      description: "Passionate about creating seamless travel experiences worldwide.",
      image: "https://img.freepik.com/premium-photo/candid-shot-businessman-writing-sign-document-office-ceo-manager-work-space-meetings_141345-2974.jpg"
    },
    {
      name: "Mr. Ravi Varman",
      position: "Head of Operations",
      description: "Ensuring every journey is smooth and stress-free.",
      image: "https://as1.ftcdn.net/v2/jpg/02/94/62/14/1000_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg"
    },
    {
      name: "Mr. Kannan",
      position: "Travel Consultant",
      description: "Expert in crafting personalized vacation experiences.",
      image: "https://tse1.mm.bing.net/th/id/OIP.ydIb5N45qtLb4wiMe2_GLAAAAA?rs=1&pid=ImgDetMain"
    }
  ];

  const stats = [
    { front: "1000+", label: "Partners", back: "We collaborate with over 1000 partners to provide the best travel experience." },
    { front: "2k+", label: "Properties", back: "We have a wide range of 2000+ properties to make your stay comfortable." },
    { front: "300k+", label: "Destinations", back: "Discover more than 300,000 destinations worldwide with us." },
    { front: "40k+", label: "Booking", back: "We have successfully completed over 40,000 bookings for our customers." }
  ];

  return (
    <StyledContainer>
      {/* Our Story Section */}
      <Box sx={{ mb: 4 }}>
        <SectionTitle variant="h2">Our Story</SectionTitle>
        <SectionText>
          Established in 1968, Kalm Holidays is entirely owned and managed by Sangam Group of Hotels. The Sangam Group is recognized as one of the largest hotel chains in Tamil Nadu. Along with the Group, Kalm Holidays is striving hard for ultimate success and innovation.
        </SectionText>
        <SectionText>
          We are an ISO 9001: 2008 certified company that aims to set clear goals, fix priorities, and organize resources effectively. Kalm Holidays enables you to discover new destinations and offer unique travel ideas.
        </SectionText>
      </Box>
      
      {/* Images Section */}
      <ImageContainer>
        <StyledImage src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop" alt="Camera Lens" />
        <StyledImage src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop" alt="Vintage Compass" />
      </ImageContainer>
      
      {/* Mission & Vision Section */}
      <MissionVisionContainer>
        <Box>
          <SectionTitle variant="h3" sx={{ fontSize: isMobile ? '1.5em' : isTablet ? '1.8em' : '2em' }}>
            Our Mission
          </SectionTitle>
          <SectionText>
            Kalm Holidays is a fully integrated travel company that offers comprehensive solutions for business and leisure travelers worldwide. We aim to satisfy client requirements with ultimate transparency and cost-effectiveness.
          </SectionText>
        </Box>
        <Box>
          <SectionTitle variant="h3" sx={{ fontSize: isMobile ? '1.5em' : isTablet ? '1.8em' : '2em' }}>
            Our Vision
          </SectionTitle>
          <SectionText>
            Our team is striving to become a world-class travel company and industry leader in the near future. We focus on a customer-centric approach to gain recognition among worldwide clients and craft extraordinary moments for you.
          </SectionText>
        </Box>
      </MissionVisionContainer>
      
      <Divider sx={{ my: 4 }} />
      
      {/* CEO Section */}
      <CeoContainer>
        <CeoLeftSection>
          <CeoImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Mr. Kamesh" />
          <Typography sx={{ 
            fontWeight: 'bold', 
            marginTop: '10px',
            fontFamily: '"Playfair Display", serif',
            fontSize: isMobile ? '1.1em' : '1.2em'
          }}>
            Mr. Kamesh
          </Typography>
          <Typography sx={{ 
            color: 'gray', 
            marginBottom: '20px',
            fontFamily: '"Playfair Display", serif',
            fontSize: isMobile ? '0.9em' : '1em'
          }}>
            Founder & CEO
          </Typography>
        </CeoLeftSection>
        
        <CeoContent>
          <SectionTitle variant="h3" sx={{ 
            fontSize: isMobile ? '1.5em' : isTablet ? '1.8em' : '2em',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
              textAlign: 'left',
            }
          }}>
            CEO's Note
          </SectionTitle>
          <SectionText sx={{ 
            fontStyle: 'italic', 
            color: '#555',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
              textAlign: 'left',
            }
          }}>
            "KALM Holidays was founded with a vision of excellence and a passion for travel. 
            With a dedicated team and unwavering commitment, we have built this company step by step. 
            Today, our reputation is built upon trust, exceptional service, and years of dedicated customer support. 
            KALM Holidays continues to set new standards in the travel industry, making every journey unforgettable."
          </SectionText>
        </CeoContent>
      </CeoContainer>
      
      {/* Team Section */}
      <TeamSection>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontSize: isMobile ? '1.2rem' : isTablet ? '1.5rem' : '1.9rem',
                color: '#666',
                mb: 1
              }}
            >
              Our Travel Experts
            </Typography>
            <SectionTitle variant="h2">Meet The Kalm Holidays Team</SectionTitle>
            <Divider sx={{ width: '50px', margin: '20px auto', height: '2px', backgroundColor: '#ffa400' }} />
          </Box>
          
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMember key={index}>
                <Box 
                  className="team-member-container"
                  sx={{ 
                    position: 'relative',
                    height: isMobile ? '180px' : '200px',
                    overflow: 'hidden',
                    '&:hover .member-social': {
                      bottom: 0,
                    },
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <Box
                    className="member-social"
                    sx={{
                      position: 'absolute',
                      bottom: isMobile ? '-50px' : '-60px',
                      left: 0,
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      background: 'linear-gradient(to top, rgba(42, 42, 114, 0.9), transparent)',
                      padding: isMobile ? '15px 0' : '20px 0',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <StyledIconButton>
                      <LinkedInIcon />
                    </StyledIconButton>
                    <StyledIconButton>
                      <TwitterIcon />
                    </StyledIconButton>
                    <StyledIconButton>
                      <EmailIcon />
                    </StyledIconButton>
                  </Box>
                </Box>
                <MemberInfo>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontFamily: '"Playfair Display", serif', 
                      fontSize: isMobile ? '1.1rem' : '1.3rem', 
                      marginBottom: '5px',
                      fontWeight: 600
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#ffa400', 
                      fontWeight: 600, 
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      fontFamily: '"Playfair Display", serif', 
                      marginBottom: '10px' 
                    }}
                  >
                    {member.position}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#6c757d', 
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      fontFamily: '"Playfair Display", serif',
                      lineHeight: 1.4
                    }}
                  >
                    {member.description}
                  </Typography>
                </MemberInfo>
              </TeamMember>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>
      
      {/* Stats Section */}
      <StatsContainer>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatFront>
              <Typography 
                variant="h6" 
                sx={{  
                  fontFamily: '"Playfair Display", serif',
                  fontSize: isMobile ? '1.3em' : '1.5em',
                  fontWeight: 'bold'
                }}
              >
                {stat.front}
              </Typography>
              <Typography 
                sx={{  
                  fontFamily: '"Playfair Display", serif',
                  fontSize: isMobile ? '0.9em' : '1em'
                }}
              >
                {stat.label}
              </Typography>
            </StatFront>
            <StatBack>
              <Typography 
                sx={{  
                  fontFamily: '"Playfair Display", serif',
                  fontSize: isMobile ? '0.8em' : '0.9em',
                  lineHeight: 1.3
                }}
              >
                {stat.back}
              </Typography>
            </StatBack>
          </StatCard>
        ))}
      </StatsContainer>
    </StyledContainer>
  );
}

export default HistoryPage;