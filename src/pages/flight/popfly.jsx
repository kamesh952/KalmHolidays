import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
  styled,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

// Add Poppins font import
const PoppinsFontImport = () => {
  return (
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    </style>
  );
};

// Custom styled components to match the original design
const NavTab = styled(Button)(({ theme, active }) => ({
  fontFamily: "'Poppins', sans-serif",
  padding: "10px 15px",
  border: active ? "2px solid #0071c2" : "none",
  borderRadius: "15px",
  background: "white",
  cursor: "pointer",
  fontSize: { xs: "14px", sm: "16px" },
  display: "flex",
  gap: "5px",
  transition: "background 0.1s, color 0.3s",
  color: active ? "#0071c2" : "inherit",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#ebebeb",
  },
}));

const DestinationCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  width: { xs: "180px", sm: "210px", md: "230px" },
  flexShrink: 0,
  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  marginRight: "10px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  padding: "10px 0",
  display: "flex",
  gap: "15px",
  overflowX: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "#ccc #f5f5f5",
  justifyContent: "flex-start",
  maxWidth: "100%",
  margin: "0 auto",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f5f5f5",
    margin: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#ccc",
    borderRadius: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
  },
}));

// ActionButton styled component for booking and wishlist buttons
const ActionButton = styled(Button)(({ theme, color }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.75rem",
  borderRadius: "4px",
  padding: "4px 8px",
  minWidth: "auto",
  backgroundColor: color === "primary" ? "#0071c2" : "#fff",
  color: color === "primary" ? "#fff" : "#ff3366",
  border: color === "primary" ? "none" : "1px solid #ff3366",
  "&:hover": {
    backgroundColor:
      color === "primary" ? "#005b9f" : "rgba(255, 51, 102, 0.1)",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.8rem",
    padding: "6px 10px",
  },
}));

// Destination data with added prices and descriptions
const destinations = {
  outdoors: [
    {
      id: "dom1",
      title: "Chennai To Hyderabad",
      image: "hyderabad.jpg",
      distance: "267 km away",
      price: "₹5,499",
      description:
        "Explore the historic city of Hyderabad with its famous Charminar and delicious Biryani.",
    },
    {
      id: "dom2",
      title: "Pondicherry To Chennai",
      image:
        "https://www.alphonsostories.com/AlphonSoStoriesImages/BlogImage/Pondicherry--The-Yellow-City-lg-cov.jpg",
      distance: "424 km away",
      price: "₹3,999",
      description:
        "Enjoy the metropolitan city of Chennai with its beautiful Marina beach and cultural heritage.",
    },
    {
      id: "dom3",
      title: "Chennai To New Delhi",
      image:
        "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltb40e4ae46ae8b7a8/6764158b989c5365fad4fabe/iStock-1148435553-Header_Mobile.jpg?format=webp&auto=avif&quality=60&crop=1%3A1&width=425",
      distance: "431 km away",
      price: "₹7,899",
      description:
        "Visit the capital city with iconic landmarks like Red Fort and India Gate.",
    },
    {
      id: "dom4",
      title: "Goa To Chennai",
      image: "goaai.jpg",
      distance: "438 km away",
      price: "₹6,299",
      description:
        "Travel from the beaches of Goa to the vibrant city of Chennai.",
    },
    {
      id: "dom5",
      title: "Chennai To Agra",
      image: "tajmahal.jpg",
      distance: "482 km away",
      price: "₹8,999",
      description:
        "See the magnificent Taj Mahal and explore the historic city of Agra.",
    },
    {
      id: "dom6",
      title: "Chennai To Bombay",
      image: "bommbay.jpg",
      distance: "66 km away",
      price: "₹6,599",
      description:
        "Experience the bustling city life of Mumbai, the financial capital of India.",
    },
  ],
  city: [
    {
      id: "int1",
      title: "India To USA",
      image: "BACK2.jpg",
      distance: "14 Apr - 30 Apr",
      price: "₹72,499",
      description:
        "Explore diverse landscapes and cultures across the United States of America.",
    },
    {
      id: "int2",
      title: "India to UK",
      image: "BACK3.jpg",
      distance: "18 Apr - 30 Apr",
      price: "₹65,999",
      description:
        "Visit London and the beautiful countryside of the United Kingdom.",
    },
    {
      id: "int3",
      title: "India To Singapore",
      image: "velang.jpg",
      distance: "20 Apr - 28 Apr",
      price: "₹29,999",
      description:
        "Experience the modern city-state with its amazing architecture and cuisine.",
    },
    {
      id: "int4",
      title: "India To Maldives",
      image: "gallery (2).jpg",
      distance: "16 Apr - 22 Apr",
      price: "₹35,499",
      description:
        "Relax on pristine beaches and experience luxury resorts in the Maldives.",
    },
    {
      id: "int5",
      title: "India To Thailand",
      image:
        "https://www.vmcdn.ca/f/files/via/images/tourism/thailand-travel-advisory-vancouver-flights-january-2025.jpg;w=960",
      distance: "19 Apr - 27 Apr",
      price: "₹26,999",
      description:
        "Discover the rich culture, beautiful beaches and delicious food of Thailand.",
    },
    {
      id: "int6",
      title: "India To Canada",
      image: "RESORTS.jpg",
      distance: "15 Apr - 29 Apr",
      price: "₹78,999",
      description:
        "Explore the natural beauty of Canada from Toronto to Vancouver.",
    },
    {
      id: "int7",
      title: "India To Paris",
      image: "paris.jpg",
      distance: "17 Apr - 25 Apr",
      price: "₹59,999",
      description:
        "Discover the romantic city of Paris with its iconic Eiffel Tower and Louvre Museum.",
    },
    {
      id: "int8",
      title: "India To Australia",
      image: "australia.jpg",
      distance: "13 Apr - 27 Apr",
      price: "₹85,999",
      description:
        "Experience the unique wildlife and stunning landscapes of Australia.",
    },
    {
      id: "int9",
      title: "India To Dubai",
      image: "duabi.jpg",
      distance: "22 Apr - 30 Apr",
      price: "₹32,999",
      description:
        "Visit the futuristic city of Dubai with its towering skyscrapers and luxury shopping.",
    },
  ],
};

export default function PopFly() {
  const [activeCategory, setActiveCategory] = useState("outdoors");
  const [wishlist, setWishlist] = useState([]);
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Load wishlist and bookings from local storage
  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem("wishlistDestinations");
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist:", error);
        }
      }
    };

    const loadBookings = () => {
      const storedBookings = localStorage.getItem("bookedDestinations");
      if (storedBookings) {
        try {
          setBookedDestinations(JSON.parse(storedBookings));
        } catch (error) {
          console.error("Error parsing bookings:", error);
        }
      }
    };

    loadWishlist();
    loadBookings();

    // Set up event listeners for updates from other components
    window.addEventListener("wishlistUpdated", loadWishlist);
    window.addEventListener("bookingsUpdated", loadBookings);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
      window.removeEventListener("bookingsUpdated", loadBookings);
    };
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Function to check if a destination is in wishlist
  const isInWishlist = (destId) => {
    return wishlist.some((item) => item.id === destId);
  };

  // Function to check if a destination is booked
  const isDestinationBooked = (destId) => {
    return bookedDestinations.some((booking) => booking.id === destId);
  };

  // Add to wishlist function
  const addToWishlist = (destination) => {
    // Check if already in wishlist
    if (isInWishlist(destination.id)) {
      setSnackbarMessage("This destination is already in your wishlist!");
      setSnackbarSeverity("info");
      setOpenSnackbar(true);
      return;
    }

    // Format destination object for wishlist
    const wishlistItem = {
      id: destination.id,
      label: destination.title,
      img: destination.image,
      price: destination.price,
      description: destination.description,
    };

    const updatedWishlist = [...wishlist, wishlistItem];
    setWishlist(updatedWishlist);
    localStorage.setItem(
      "wishlistDestinations",
      JSON.stringify(updatedWishlist)
    );

    // Trigger event for other components to update
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: { wishlist: updatedWishlist },
      })
    );

    setSnackbarMessage(`${destination.title} added to wishlist!`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  // Remove from wishlist function
  const removeFromWishlist = (destination) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== destination.id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem(
      "wishlistDestinations",
      JSON.stringify(updatedWishlist)
    );

    // Trigger event for other components to update
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: { wishlist: updatedWishlist },
      })
    );

    setSnackbarMessage(`${destination.title} removed from wishlist`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  // Book destination function
  const bookDestination = (destination) => {
    // Check if already booked
    if (isDestinationBooked(destination.id)) {
      setSnackbarMessage("This flight is already booked!");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    // Format destination for booking
    const booking = {
      id: destination.id,
      label: destination.title,
      img: destination.image,
      price: destination.price,
      bookingDate: new Date().toISOString(),
      bookingId: `BK-${Math.floor(Math.random() * 1000000)}`,
    };

    const updatedBookings = [...bookedDestinations, booking];
    setBookedDestinations(updatedBookings);
    localStorage.setItem("bookedDestinations", JSON.stringify(updatedBookings));

    // Trigger an event for other components to update
    window.dispatchEvent(
      new CustomEvent("bookingsUpdated", {
        detail: { bookings: updatedBookings },
      })
    );

    setSnackbarMessage(
      `Your flight to ${destination.title} has been booked successfully!`
    );
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "light",
        padding: { xs: "30px 3%", sm: "40px 4%", md: "50px 5%" },
      }}
    >
      <PoppinsFontImport />
      <Container
        maxWidth="xl"
        sx={{ padding: { xs: "0 10px", sm: "0 20px", md: "0 30px" } }}
      >
        <Box
          sx={{
            marginLeft: { xs: "0px", sm: "20px", md: "70px" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              marginBottom: "10px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
            }}
          >
            Find Popular Flights Near You
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "20px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Big Offers on International and Domestic Flights
          </Typography>

          <Box
            className="nav-bar"
            sx={{
              display: "flex",
              gap: { xs: "8px", sm: "10px" },
              marginBottom: "20px",
              flexWrap: { xs: "nowrap", sm: "wrap" }, // Don't wrap on mobile
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
              justifyContent: { xs: "center", sm: "flex-start" },
              overflowX: { xs: "auto", sm: "visible" }, // Optional: horizontal scroll on mobile
            }}
          >
            <NavTab
              active={activeCategory === "outdoors" ? 1 : 0}
              onClick={() => handleCategoryChange("outdoors")}
              startIcon={
                <HomeIcon sx={{ fontSize: { xs: "16px", sm: "24px" } }} />
              }
              sx={{
                fontSize: { xs: "12px", sm: "16px" },
                whiteSpace: "nowrap",
              }} // Prevent wrapping inside tab
            >
              Domestic
            </NavTab>

            <NavTab
              active={activeCategory === "city" ? 1 : 0}
              onClick={() => handleCategoryChange("city")}
              startIcon={
                <PublicIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />
              }
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                whiteSpace: "nowrap",
              }}
            >
              International
            </NavTab>
          </Box>
        </Box>

        <Box
          className="container-wrapper"
          sx={{
            padding: 0,
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CardsContainer>
            {destinations[activeCategory].map((destination, index) => (
              <DestinationCard
                key={index}
                sx={{
                  width: {
                    xs: "140px",
                    sm: "190px",
                    md: "230px",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height={isMobile ? 120 : 150}
                    image={destination.image}
                    alt={destination.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(0, 113, 194, 0.85)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "0 0 0 8px",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    {destination.price}
                  </Box>
                  <IconButton
                    onClick={() =>
                      isInWishlist(destination.id)
                        ? removeFromWishlist(destination)
                        : addToWishlist(destination)
                    }
                    sx={{
                      position: "absolute",
                      top: "5px",
                      left: "5px",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      padding: "4px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    {isInWishlist(destination.id) ? (
                      <FavoriteIcon
                        sx={{ color: "#ff3366", fontSize: "1.2rem" }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ color: "#ff3366", fontSize: "1.2rem" }}
                      />
                    )}
                  </IconButton>
                </Box>
                <CardContent
                  sx={{
                    padding: { xs: "6px 0", sm: "8px 0" },
                  }}
                >
                  <Typography
                    className="destination-title"
                    sx={{
                      fontWeight: "bold",
                      marginTop: "5px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    }}
                  >
                    {destination.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                      color: "#666",
                      marginBottom: "10px",
                    }}
                  >
                    {destination.distance}
                  </Typography>

                  {/* Book Now Button */}
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={<FlightTakeoffIcon />}
                    onClick={() => bookDestination(destination)}
                    disabled={isDestinationBooked(destination.id)}
                    sx={{
                      backgroundColor: isDestinationBooked(destination.id)
                        ? "#ccc"
                        : "#0071c2",
                      color: "#fff",
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      padding: "4px 8px",
                      textTransform: "none",
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: "4px",
                      marginTop: "4px",
                      "&:hover": {
                        backgroundColor: "#005b9f",
                      },
                      "&.Mui-disabled": {
                        color: "#fff",
                      },
                    }}
                  >
                    {isDestinationBooked(destination.id)
                      ? "Already Booked"
                      : "Book Now"}
                  </Button>
                </CardContent>
              </DestinationCard>
            ))}
          </CardsContainer>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
