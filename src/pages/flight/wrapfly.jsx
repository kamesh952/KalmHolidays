import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const WrapFly = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
    palette: {
      primary: {
        main: "#0078d4",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `,
      },
    },
  });

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [activeTab, setActiveTab] = useState("popular");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const tabsRef = useRef(null);

  // Data arrays
  const popularRoutes = [
    {
      id: "pr1",
      from: "Chennai",
      to: "Delhi",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹4,999",
      description:
        "Explore the capital city with its rich history and vibrant culture.",
    },
    {
      id: "pr2",
      from: "Chennai",
      to: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹5,299",
      description:
        "Visit the financial capital of India with its beautiful coastline.",
    },
    {
      id: "pr3",
      from: "Chennai",
      to: "Bangkok",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹15,899",
      description:
        "Experience Thailand's bustling capital with stunning temples and vibrant street life.",
    },
    {
      id: "pr4",
      from: "Chennai",
      to: "Bangalore",
      image: "bang.jpg",
      price: "₹2,599",
      description:
        "Visit the Silicon Valley of India with pleasant weather and beautiful gardens.",
    },
    {
      id: "pr5",
      from: "Chennai",
      to: "Dubai",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹18,999",
      description:
        "Discover the ultramodern architecture and luxury shopping experience.",
    },
    {
      id: "pr6",
      from: "Chennai",
      to: "London",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹48,999",
      description:
        "Explore the historic capital with its iconic landmarks and rich culture.",
    },
  ];

  const cities = [
    {
      id: "c1",
      name: "New Delhi",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹4,999",
      description:
        "India's capital territory with historic monuments and vibrant markets.",
    },
    {
      id: "c2",
      name: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹5,299",
      description:
        "The financial capital with beaches, colonial architecture, and Bollywood.",
    },
    {
      id: "c3",
      name: "Bangkok",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹15,899",
      description:
        "Thailand's vibrant capital with ornate shrines and lively street life.",
    },
    {
      id: "c4",
      name: "Bangalore",
      image: "bang.jpg",
      price: "₹2,599",
      description:
        "The IT hub of India with pleasant climate and beautiful parks.",
    },
    {
      id: "c5",
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹18,999",
      description:
        "A luxury destination with futuristic architecture and shopping malls.",
    },
    {
      id: "c6",
      name: "Panaji",
      image:
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹3,999",
      description:
        "Goa's charming capital with Portuguese-era buildings and relaxed vibes.",
    },
  ];

  const countries = [
    {
      id: "co1",
      name: "Japan",
      image:
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹45,999",
      description:
        "Land of the rising sun with unique blend of tradition and modernity.",
    },
    {
      id: "co2",
      name: "Egypt",
      image:
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹32,999",
      description:
        "Ancient civilization with magnificent pyramids and rich history.",
    },
    {
      id: "co3",
      name: "Italy",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹38,999",
      description: "Home to art, architecture, and delicious cuisine.",
    },
    {
      id: "co4",
      name: "Malaysia",
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹18,999",
      description:
        "A diverse country with modern cities, rainforests, and beautiful islands.",
    },
    {
      id: "co5",
      name: "Thailand",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹15,899",
      description:
        "Famous for tropical beaches, opulent palaces, and ancient ruins.",
    },
    {
      id: "co6",
      name: "Australia",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹62,999",
      description:
        "Down under with unique wildlife, stunning beaches, and vibrant cities.",
    },
  ];

  const regions = [
    {
      id: "r1",
      name: "Maharashtra",
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹5,299",
      description:
        "Western Indian state known for its caves, beaches, and metropolitan cities.",
    },
    {
      id: "r2",
      name: "Bangkok Province",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹15,899",
      description:
        "Central Thai province surrounding the vibrant capital city.",
    },
    {
      id: "r3",
      name: "Karnataka",
      image: "bang.jpg",
      price: "₹2,599",
      description:
        "Southern Indian state with ancient ruins, beaches, and tech hubs.",
    },
    {
      id: "r4",
      name: "Dubai Emirate",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹18,999",
      description: "UAE's most populous emirate known for modern luxury.",
    },
    {
      id: "r5",
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹3,999",
      description:
        "India's smallest state with beaches, nightlife, and Portuguese heritage.",
    },
    {
      id: "r6",
      name: "Greater London",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "₹48,999",
      description: "Metropolitan region encompassing the UK's capital city.",
    },
  ];

  const airports = [
    {
      id: "a1",
      name: "Indira Gandhi International Airport (DEL)",
      location: "New Delhi",
      image:
        "https://www.tripbeam.ca/blog/wp-content/uploads/2022/12/Overview-of-the-Indira-Gandhi-International-airport-in-Delhi.jpg",
      price: "₹4,999",
      description:
        "India's busiest airport with modern terminals and excellent connectivity.",
    },
    {
      id: "a2",
      name: "Chhatrapati Shivaji International Airport (BOM)",
      location: "Mumbai",
      image:
        "https://worldarchitecture.org/cdnimgfiles/extuploadc/openthechhatrapatishivajiinternation.jpg",
      price: "₹5,299",
      description:
        "Award-winning airport with state-of-the-art terminals in Mumbai.",
    },
    {
      id: "a3",
      name: "Kempegowda International Airport (BLR)",
      location: "Bangalore",
      image:
        "https://www.dutyfreehunter.com/blog/wp-content/uploads/2022/11/AviewoftheKempegowdaInternationalAirportterminal-768x497.jpg",
      price: "₹2,599",
      description:
        "Modern airport serving Silicon Valley of India with efficient services.",
    },
    {
      id: "a4",
      name: "Chennai International Airport (MAA)",
      location: "Chennai",
      image:
        "https://www.airport-technology.com/wp-content/uploads/sites/14/2023/06/Feature-Image-Chennai-International-Airports-New-Integrated-Terminal-Building-T2.jpg",
      price: "₹1,999",
      description:
        "Major international gateway to South India with new integrated terminal.",
    },
    {
      id: "a5",
      name: "Rajiv Gandhi International Airport (HYD)",
      location: "Hyderabad",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRccP8URwPg32dYA4oy8j3v1qOe4PLpCbLx5w&s",
      price: "₹3,499",
      description:
        "Modern airport serving Hyderabad with excellent passenger experience.",
    },
    {
      id: "a6",
      name: "Netaji Subhash Chandra Bose International Airport (CCU)",
      location: "Kolkata",
      image: "https://i.ytimg.com/vi/Um4LwB_pbss/maxresdefault.jpg",
      price: "₹4,599",
      description: "Major hub serving eastern India with modern facilities.",
    },
  ];

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlistDestinations");
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }

    const storedBookings = localStorage.getItem("bookedDestinations");
    if (storedBookings) {
      try {
        setBookedDestinations(JSON.parse(storedBookings));
      } catch (error) {
        console.error("Error parsing bookings:", error);
      }
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "popular":
        return popularRoutes;
      case "cities":
        return cities;
      case "countries":
        return countries;
      case "regions":
        return regions;
      case "airports":
        return airports;
      default:
        return popularRoutes;
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case "popular":
        return "Popular Routes";
      case "cities":
        return "Popular Cities";
      case "countries":
        return "Popular Countries";
      case "regions":
        return "Popular Regions";
      case "airports":
        return "Major Airports";
      default:
        return "Popular Destinations";
    }
  };

  const isInWishlist = (itemId) => wishlist.some((item) => item.id === itemId);
  const isBooked = (itemId) =>
    bookedDestinations.some((item) => item.id === itemId);

  const handleAddToWishlist = (item, event) => {
    event.stopPropagation();
    const updatedWishlist = isInWishlist(item.id)
      ? wishlist.filter((wishItem) => wishItem.id !== item.id)
      : [...wishlist, item];

    setWishlist(updatedWishlist);
    localStorage.setItem(
      "wishlistDestinations",
      JSON.stringify(updatedWishlist)
    );
    setSnackbarMessage(
      `${isInWishlist(item.id) ? "Removed from" : "Added to"} wishlist`
    );
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleBookDestination = (item, event) => {
    event.stopPropagation();
    if (isBooked(item.id)) {
      setSnackbarMessage("Already booked");
      setSnackbarSeverity("info");
      setOpenSnackbar(true);
      return;
    }

    const booking = {
      ...item,
      bookingDate: new Date().toISOString(),
      bookingId: `BK-${Math.floor(Math.random() * 1000000)}`,
    };

    const updatedBookings = [...bookedDestinations, booking];
    setBookedDestinations(updatedBookings);
    localStorage.setItem("bookedDestinations", JSON.stringify(updatedBookings));
    setSnackbarMessage("Booked successfully!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const renderDestinations = () => {
    const gridColumns = isSmallScreen
      ? "1fr"
      : isMediumScreen
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)";

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: 2,
          p: 1,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {getActiveData().map((item, index) => (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              height: isSmallScreen ? 150 : 180,
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              width: "100%",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
              }}
              image={item.image}
              alt={item.name || `${item.from} to ${item.to}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            />

            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: "rgba(0, 120, 212, 0.9)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: isSmallScreen ? "0.7rem" : "0.8rem",
              }}
            >
              {item.price}
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                onClick={(e) => handleAddToWishlist(item, e)}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
                  padding: isSmallScreen ? "6px" : "8px",
                }}
              >
                {isInWishlist(item.id) ? (
                  <FavoriteIcon
                    sx={{
                      color: "#ff3366",
                      fontSize: isSmallScreen ? "1rem" : "1.25rem",
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      color: "#ff3366",
                      fontSize: isSmallScreen ? "1rem" : "1.25rem",
                    }}
                  />
                )}
              </IconButton>

              <IconButton
                onClick={(e) => handleBookDestination(item, e)}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
                  padding: isSmallScreen ? "6px" : "8px",
                }}
              >
                {isBooked(item.id) ? (
                  <BookmarkAddedIcon
                    sx={{
                      color: "#0078d4",
                      fontSize: isSmallScreen ? "1rem" : "1.25rem",
                    }}
                  />
                ) : (
                  <BookmarkAddIcon
                    sx={{
                      color: "#0078d4",
                      fontSize: isSmallScreen ? "1rem" : "1.25rem",
                    }}
                  />
                )}
              </IconButton>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: isSmallScreen ? 1 : 2,
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                color: "white",
              }}
            >
              {item.from && item.to ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ fontSize: isSmallScreen ? "0.875rem" : "1rem" }}
                  >
                    {item.from}
                  </Typography>
                  <ArrowRightAltIcon
                    sx={{ mx: 1, fontSize: isSmallScreen ? "1rem" : "1.25rem" }}
                  />
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ fontSize: isSmallScreen ? "0.875rem" : "1rem" }}
                  >
                    {item.to}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    fontSize: isSmallScreen ? "0.875rem" : "1rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name || item.label}
                </Typography>
              )}
              {item.location && (
                <Typography
                  variant="body2"
                  sx={{ fontSize: isSmallScreen ? "0.75rem" : "0.875rem" }}
                >
                  {item.location}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: { xs: 2, sm: 3 },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb: 1,
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            lineHeight: 1.2,
          }}
        >
          Top flights from India
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
          }}
        >
          Explore destinations you can reach from India and start making new
          plans
        </Typography>

        <Box
          sx={{
            width: "100%",
            mb: 4,
            overflowX: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#999 transparent", // Firefox
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#999", // Chrome/Edge/Safari
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#777", // Optional darker shade on hover
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              pb: 1,
              width: "max-content",
            }}
          >
            {["popular", "cities", "countries", "regions", "airports"].map(
              (tab) => (
                <Button
                  key={tab}
                  sx={{
                    mr: 2,
                    py: 1,
                    px: { xs: 2, sm: 3 },
                    minWidth: "max-content",
                    textTransform: "none",
                    borderRadius: "50px",
                    color: activeTab === tab ? "#0078d4" : "inherit",
                    backgroundColor:
                      activeTab === tab ? "#e6f2fc" : "transparent",
                    border:
                      activeTab === tab
                        ? "1px solid #0078d4"
                        : "1px solid transparent",
                    "&:hover": {
                      backgroundColor:
                        activeTab === tab ? "#e6f2fc" : "#f5f5f5",
                      borderColor: activeTab === tab ? "#0078d4" : "#e0e0e0",
                    },
                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.875rem" },
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === "popular" && "Popular routes"}
                  {tab === "cities" && "Cities"}
                  {tab === "countries" && "Countries"}
                  {tab === "regions" && "Regions"}
                  {tab === "airports" && "Airports"}
                </Button>
              )
            )}
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          {getSectionTitle()}
        </Typography>

        {renderDestinations()}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%", maxWidth: "400px" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default WrapFly;
