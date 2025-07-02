import React, { useState, useEffect, useRef } from 'react';
import Car from "../Home/car"; // Adjust the path based on your actual structure
import FlightSearch from './flightbook';
import TourismLoginSignup from "../Home/login"; 
import PopFly from "./popfly";
import WrapFly from "./wrapfly";

// Simplified CSS for minimal animations
const styles = `
  /* Simple fade-in animation */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.6s ease-in-out forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  /* Simple slide-up animation */
  .slide-up {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.5s ease-out forwards;
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Modal animations */
  .modal-fade-in {
    animation: modalFadeIn 0.3s ease-out;
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Simple animation component that only triggers once on mount
const SimpleAnimation = ({ children, type = 'fade-in', delay = 0 }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={shouldAnimate ? type : ''}>
      {children}
    </div>
  );
};

// Modal component for the login form with minimal animations
const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="login-modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className="modal-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          zIndex: 1001, 
          width: '100%', 
          maxWidth: '900px'
        }}
      >
        <TourismLoginSignup onClose={onClose} />
      </div>
    </div>
  );
};

function Flight() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check for logged in user on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentLoggedInUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setUserName(user.username);
    }
    
    // Listen for login/logout events
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

  // Function to handle sign in button click from Navbar
  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentLoggedInUser');
    setIsLoggedIn(false);
    setUserName("");
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Add the handleSignInClick function to the window object
  useEffect(() => {
    window.openLoginModal = handleSignInClick;
    
    return () => {
      delete window.openLoginModal;
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Add ESC key event listener to close modal
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
    <div>
      <style>{styles}</style>
      
     

      {/* Car component with simple fade-in */}
      <div style={{
        height: '550px',
        overflow: 'hidden',
      }}>
        <SimpleAnimation type="fade-in">
          <Car />
        </SimpleAnimation>
      </div>
      
      {/* Components with minimal staggered animations */}
      <SimpleAnimation type="slide-up" delay={100}>
        <FlightSearch />
      </SimpleAnimation>
      
      <SimpleAnimation type="slide-up" delay={200}>
        <PopFly />
      </SimpleAnimation>
      
      <SimpleAnimation type="slide-up" delay={300}>
        <WrapFly />
      </SimpleAnimation>
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}

export default Flight;