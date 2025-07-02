import React, { useState, useEffect, useRef } from "react";
import Car from "../Home/car";
import Content from "./main";
import TourismLoginSignup from "../Home/login";
import "@fontsource/poppins"; // Import Poppins font
import { styled, useTheme, useMediaQuery } from "@mui/material";
import { IconButton, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { padding } from "@mui/system";

// Styled components for better organization
const UserWelcomeContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  color: theme.palette.common.white,
  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  color: theme.palette.common.white,
  backgroundColor: "rgba(255,255,255,0.2)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
    fontSize: "0.8rem",
    minWidth: "auto",
  },
}));

const CarContainer = styled("div")(({ theme }) => ({
  height: "550px",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    height: "450px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "350px",
  },
}));

// Modal component with responsive improvements
const LoginModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === modalOverlayRef.current) {
      setVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const handleLoginSuccess = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      ref={modalOverlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: visible ? "blur(5px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(5px)" : "blur(0px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease, backdrop-filter 0.3s ease",
        padding: isMobile ? "1rem" : "2rem",
      }}
    >
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          zIndex: 1001,
          width: "100%",
          maxWidth: isMobile ? "100%" : "900px",
          maxHeight: isMobile ? "90vh" : "auto",
          overflowY: "auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.4)",
          borderRadius: isMobile ? "0" : "8px",
        }}
      >
        <TourismLoginSignup onClose={handleLoginSuccess} />
      </div>
    </div>
  );
};

function History() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const currentUser = localStorage.getItem("currentLoggedInUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setUserName(user.username);
    }

    const handleUserLogin = () => {
      const loggedInUser = localStorage.getItem("currentLoggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setIsLoggedIn(true);
        setUserName(user.username);
        closeLoginModal();
      }
    };

    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setUserName("");
    };

    window.addEventListener("userLoggedIn", handleUserLogin);
    window.addEventListener("userLoggedOut", handleUserLogout);

    return () => {
      window.removeEventListener("userLoggedIn", handleUserLogin);
      window.removeEventListener("userLoggedOut", handleUserLogout);
    };
  }, []);

  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleLogout = () => {
    localStorage.removeItem("currentLoggedInUser");
    setIsLoggedIn(false);
    setUserName("");
    window.dispatchEvent(new CustomEvent("userLoggedOut"));
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = "auto";
    document.body.style.backdropFilter = "none";
    document.body.style.WebkitBackdropFilter = "none";
    document.body.style.transform = "translateZ(0)";

    setTimeout(() => {
      document.body.style.transform = "";
    }, 50);
  };

  useEffect(() => {
    window.openLoginModal = handleSignInClick;

    return () => {
      delete window.openLoginModal;
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isLoginModalOpen) {
        closeLoginModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isLoginModalOpen]);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* User welcome or login button - now properly positioned */}
      <UserWelcomeContainer>
        {isLoggedIn ? (
          <>
            <WelcomeText variant="body1">Welcome, {userName}</WelcomeText>
            <IconButton
              onClick={handleLogout}
              size={isMobile ? "small" : "medium"}
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </>
        ) : (
          <LoginButton
            variant="contained"
            startIcon={<AccountCircleIcon />}
            onClick={handleSignInClick}
            size={isMobile ? "small" : "medium"}
          >
            Sign In
          </LoginButton>
        )}
      </UserWelcomeContainer>

      <div
        style={{
          height: "550px",
          overflow: "hidden",
        }}
      >
        <Car />
      </div>
      <Content
        style={{
          padding: "0 24px 24px", // top 0, left & right 24px, bottom 24px
          overflow: "hidden",
        }}
      />

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

export default History;
