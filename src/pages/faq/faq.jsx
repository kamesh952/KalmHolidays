import React, { useState, useEffect, useRef } from 'react';
import Car from "../Home/car";
import FaqPage from "./faqc";
import TourismLoginSignup from "../Home/login";
import { useTheme, useMediaQuery } from '@mui/material';

const LoginModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      className="login-modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: visible ? 'blur(5px)' : 'blur(0px)',
        WebkitBackdropFilter: visible ? 'blur(5px)' : 'blur(0px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease'
      }}
    >
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          zIndex: 1001,
          width: isMobile ? '95%' : '100%',
          maxWidth: isMobile ? '100%' : '900px',
          padding: isMobile ? '10px' : '20px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.4)'
        }}
      >
        <TourismLoginSignup onClose={handleLoginSuccess} />
      </div>
    </div>
  );
};

function FAQ() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const currentUser = localStorage.getItem('currentLoggedInUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setUserName(user.username);
    }
    
    const handleUserLogin = () => {
      const loggedInUser = localStorage.getItem('currentLoggedInUser');
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
    
    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleLogout = () => {
    localStorage.removeItem('currentLoggedInUser');
    setIsLoggedIn(false);
    setUserName("");
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.backdropFilter = 'none';
    document.body.style.WebkitBackdropFilter = 'none';
    document.body.style.transform = 'translateZ(0)';
    
    setTimeout(() => {
      document.body.style.transform = '';
    }, 50);
  };
  
  useEffect(() => {
    window.openLoginModal = handleSignInClick;
    
    return () => {
      delete window.openLoginModal;
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isLoginModalOpen]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div style={{
        height: isMobile ? '300px' : '550px',
        overflow: 'hidden',
      }}>
        <Car />
      </div>
      <FaqPage />
      
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

export default FAQ;