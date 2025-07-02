import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import MyBookings from './bookings';
import Wishlist from './wish';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState('INR');
  const [currentFlag, setCurrentFlag] = useState('in');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // User profile states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // My Bookings states
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);

  // Wishlist states
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Refs for click outside detection
  const profileIconRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Check if viewport is mobile/tablet
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Check if user is logged in by checking local storage
  useEffect(() => {
    const checkUserLogin = () => {
      const storedUsers = localStorage.getItem('register user details');
      const currentUser = localStorage.getItem('currentLoggedInUser');
      
      if (storedUsers && currentUser) {
        try {
          const users = JSON.parse(storedUsers);
          const loggedInUser = JSON.parse(currentUser);
          
          const foundUser = users.find(
            user => user.username === loggedInUser.username && 
                   user.password === loggedInUser.password
          );
          
          if (foundUser) {
            setIsLoggedIn(true);
            setUserData(foundUser);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };
    
    checkUserLogin();
    window.addEventListener('userLoggedIn', checkUserLogin);
    
    return () => {
      window.removeEventListener('userLoggedIn', checkUserLogin);
    };
  }, []);
  
  // Check and update bookings count
  useEffect(() => {
    const updateBookingsCount = () => {
      const storedBookings = localStorage.getItem('bookedDestinations');
      if (storedBookings) {
        try {
          const bookings = JSON.parse(storedBookings);
          setBookingsCount(bookings.length);
        } catch (error) {
          console.error("Error parsing booked destinations:", error);
        }
      } else {
        setBookingsCount(0);
      }
    };
    
    updateBookingsCount();
    window.addEventListener('bookingsUpdated', updateBookingsCount);
    
    return () => {
      window.removeEventListener('bookingsUpdated', updateBookingsCount);
    };
  }, []);

  // Check and update wishlist count
  useEffect(() => {
    const updateWishlistCount = () => {
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      if (storedWishlist) {
        try {
          const wishlist = JSON.parse(storedWishlist);
          setWishlistCount(wishlist.length);
        } catch (error) {
          console.error("Error parsing wishlist destinations:", error);
        }
      } else {
        setWishlistCount(0);
      }
    };
    
    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);
    
    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
  const handleClickOutside = (event) => {
  const navbar = document.getElementById('navbar');
  
  // Close profile dropdown if clicked outside
  if (isProfileDropdownOpen && 
      profileIconRef.current && 
      !profileIconRef.current.contains(event.target)) {
    setIsProfileDropdownOpen(false);
  }
  
  if ((isNavOpen || isCountryDropdownOpen) && 
      navbar && 
      !navbar.contains(event.target)) {  // Removed the extra parenthesis
    setIsNavOpen(false);
    setActiveDropdown(null);
    setIsCountryDropdownOpen(false);
  }
};
  }, [isNavOpen, isProfileDropdownOpen, isCountryDropdownOpen]);

  // Add body scroll lock when menu is open
  useEffect(() => {
    if (isNavOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavOpen, isMobile]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isNavOpen) {
      setActiveDropdown(null);
      setIsCountryDropdownOpen(false);
    }
    // Close profile dropdown when toggling nav
    setIsProfileDropdownOpen(false);
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  const openModal = (e) => {
    e.preventDefault();
    if (window.openLoginModal) {
      window.openLoginModal();
    }
  };

  const changeCountry = (e, currency, countryCode) => {
    e.preventDefault();
    setCurrentCountry(currency);
    setCurrentFlag(countryCode);
    setIsCountryDropdownOpen(false);
  };

  const toggleCountryDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (index, e) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setActiveDropdown(activeDropdown === index ? null : index);
      setIsCountryDropdownOpen(false);
    }
  };

  const handleMenuItemClick = (e, index) => {
    if (isMobile) {
      e.preventDefault();
      toggleDropdown(index, e);
    }
  };

  const toggleProfileDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setActiveDropdown(null);
    setIsCountryDropdownOpen(false);
    // Close mobile nav when opening profile dropdown
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  const openProfileModal = (e) => {
    e.preventDefault();
    setShowProfileModal(true);
    setIsProfileDropdownOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    document.body.style.overflow = 'auto';
  };
  
  // My Bookings Modal functions
  const openBookingsModal = (e) => {
    e.preventDefault();
    setShowBookingsModal(true);
    setIsProfileDropdownOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBookingsModal = () => {
    setShowBookingsModal(false);
    document.body.style.overflow = 'auto';
  };

  // Wishlist Modal functions
  const openWishlistModal = (e) => {
    e.preventDefault();
    setShowWishlistModal(true);
    setIsProfileDropdownOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeWishlistModal = () => {
    setShowWishlistModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentLoggedInUser');
    setIsLoggedIn(false);
    setUserData(null);
    setIsProfileDropdownOpen(false);
    
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  };

  const getUserInitial = () => {
    if (userData && userData.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <>
      <link rel="icon" type="image/png" href="KALM(1)(1)(1).png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

      <div className="navbar" id="navbar" style={{ fontFamily: 'poppins, serif' }}>
        <div className="logo-container" onClick={navigateToHome}>
          <img src="/KALM(1)(1)(1).png" alt="KALM AI Logo" />
          <div className="logo">Kalm Holidays</div>
        </div>
        
        {/* Mobile view - Profile icon and hamburger positioned together */}
        <div className="mobile-controls">
          {isLoggedIn && isMobile && (
            <div 
              ref={profileIconRef}
              className="profile-icon-mobile" 
              onClick={toggleProfileDropdown}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#ffcc00',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                marginRight: '15px',
                zIndex: 1002,
                position: 'relative'
              }}
            >
              {getUserInitial()}
            </div>
          )}
          <div className="hamburger" onClick={toggleNav}>&#9776;</div>
        </div>
        
        {/* Navigation Items */}
        <ul className={`nav-items ${isNavOpen ? 'active' : ''}`} id="navItems">
          {/* Mobile user profile summary - Added at top of mobile menu when logged in */}
          {isLoggedIn && isMobile && (
            <li className="mobile-user-profile" style={{
              width: '100%',
              padding: '15px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              marginBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#ffcc00',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: '2px solid white'
                }}>
                  {getUserInitial()}
                </div>
                <div>
                  <div style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>{userData?.username}</div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px'
                  }}>{userData?.email}</div>
                </div>
              </div>
            </li>
          )}
          
          <li className="nav-item">
            <a href="/"><i className="fas fa-home"></i> Home</a>
          </li>
          <li className={`nav-item ${activeDropdown === 4 ? 'active' : ''}`}>
            <a href="#" onClick={(e) => handleMenuItemClick(e, 4)}>
              <i className="fas fa-building"></i> Company
              {isMobile && <span style={{ marginLeft: 'auto' }}>
                {activeDropdown === 4 ? '−' : '+'}
              </span>}
            </a>
            <div className="dropdown">
              <a href="/history">History</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact Us</a>
              <a href="/faq">FAQ</a>
            </div>
          </li>
          
          <li className="nav-item">
            <a href="/flight">
              <i className="fa fa-plane"></i> Flights
            </a>
          </li>
          <li className="nav-item">
            <a href="/rentals">
            <i className="fa fa-car"></i> Rentals
            </a>
          </li>
          
          {/* Country Selection Dropdown */}
          <li className={`nav-item country-selector ${isCountryDropdownOpen ? 'active' : ''}`}>
            <div className="selected-flag no-hover-line" onClick={toggleCountryDropdown}>
              <img 
                id="current-flag" 
                className="current-flag" 
                src={`https://flagcdn.com/w40/${currentFlag}.png`} 
                alt={currentFlag.toUpperCase()} 
              />
              <span id="current-country">{currentCountry}</span>
            </div>
            <div className={`country-dropdown ${isCountryDropdownOpen ? 'visible' : ''}`} id="country-dropdown">
              <a href="#" onClick={(e) => changeCountry(e, 'INR', 'in')}>
                <img className="flag-icon" src="https://flagcdn.com/w40/in.png" alt="India" /> India (INR)
              </a>
              <a href="#" onClick={(e) => changeCountry(e, 'USD', 'us')}>
                <img className="flag-icon" src="https://flagcdn.com/w40/us.png" alt="USA" /> United States (USD)
              </a>
              <a href="#" onClick={(e) => changeCountry(e, 'GBP', 'gb')}>
                <img className="flag-icon" src="https://flagcdn.com/w40/gb.png" alt="UK" /> United Kingdom (GBP)
              </a>
              <a href="#" onClick={(e) => changeCountry(e, 'AUD', 'au')}>
                <img className="flag-icon" src="https://flagcdn.com/w40/au.png" alt="Australia" /> Australia (AUD)
              </a>
              <a href="#" onClick={(e) => changeCountry(e, 'CAD', 'ca')}>
                <img className="flag-icon" src="https://flagcdn.com/w40/ca.png" alt="Canada" /> Canada (CAD)
              </a>
            </div>
          </li>  
          
          {/* Desktop Profile Icon/Sign In Button */}
          {!isMobile && (
            isLoggedIn ? (
              <div className={`nav-item profile-item ${isProfileDropdownOpen ? 'active' : ''}`}>
                <div 
                  className="profile-icon" 
                  onClick={toggleProfileDropdown}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffcc00',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    cursor: 'pointer',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {getUserInitial()}
                </div>
                <div className={`profile-dropdown ${isProfileDropdownOpen ? 'visible' : ''}`}>
                  {/* Profile dropdown content */}
                  <div className="user-info">
                    <div className="user-name">{userData?.username}</div>
                    <div className="user-email">{userData?.email}</div>
                  </div>
                  <a href="#" onClick={openProfileModal}>
                    <i className="fas fa-user" style={{marginRight: '10px'}}></i> My Profile
                  </a>
                  <a href="#" onClick={openBookingsModal}>
                    <i className="fas fa-suitcase" style={{marginRight: '10px'}}></i> My Bookings
                    {bookingsCount > 0 && (
                      <span style={{
                        background: '#ffcc00',
                        color: '#000',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px',
                        marginLeft: '5px',
                        fontWeight: 'bold'
                      }}>
                        {bookingsCount}
                      </span>
                    )}
                  </a>
                  <a href="#" onClick={openWishlistModal}>
                    <i className="fas fa-heart" style={{marginRight: '10px'}}></i> Wishlist
                    {wishlistCount > 0 && (
                      <span style={{
                        background: '#ffcc00',
                        color: '#000',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px',
                        marginLeft: '5px',
                        fontWeight: 'bold'
                      }}>
                        {wishlistCount}
                      </span>
                    )}
                  </a>
                  <a href="#" onClick={handleLogout} style={{color: '#ff3333'}}>
                    <i className="fas fa-sign-out-alt" style={{marginRight: '10px'}}></i> Logout
                  </a>
                </div>
              </div>
            ) : (
              <a
                href="#"
                onClick={openModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    backgroundColor: '#0077cc',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 32, color: '#ffffff' }} />
                </div>
                <span style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>Sign In</span>
              </a>
            )
          )}
          
          {/* User info at bottom of mobile menu for logged in users */}
          {isLoggedIn && isMobile && (
            <li style={{
              marginTop: 'auto',
              width: '100%',
              padding: '15px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <a href="#" onClick={openProfileModal} style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: '8px 0',
                  textDecoration: 'none'
                }}>
                  <i className="fas fa-user-circle" style={{marginRight: '10px'}}></i> My Profile
                </a>
                <a href="#" onClick={openBookingsModal} style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: '8px 0',
                  textDecoration: 'none'
                }}>
                  <i className="fas fa-suitcase" style={{marginRight: '10px'}}></i> My Bookings
                  {bookingsCount > 0 && (
                    <span style={{
                      background: '#ffcc00',
                      color: '#000',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '12px',
                      marginLeft: '5px',
                      fontWeight: 'bold'
                    }}>
                      {bookingsCount}
                    </span>
                  )}
                </a>
                <a href="#" onClick={openWishlistModal} style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: '8px 0',
                  textDecoration: 'none'
                }}>
                  <i className="fas fa-heart" style={{marginRight: '10px'}}></i> Wishlist
                  {wishlistCount > 0 && (
                    <span style={{
                      background: '#ffcc00',
                      color: '#000',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '12px',
                      marginLeft: '5px',
                      fontWeight: 'bold'
                    }}>
                      {wishlistCount}
                    </span>
                  )}
                </a>
                <a href="#" onClick={handleLogout} style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ffcc00',
                  padding: '8px 0',
                  textDecoration: 'none'
                }}>
                  <i className="fas fa-sign-out-alt" style={{marginRight: '10px'}}></i> Logout
                </a>
              </div>
            </li>
          )}
          
          {/* Sign in button at bottom of mobile menu for non-logged in users */}
          {!isLoggedIn && isMobile && (
            <li style={{
              marginTop: 'auto',
              width: '100%',
              padding: '15px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <a href="#" onClick={openModal} style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ffcc00',
                  padding: '8px 0',
                  textDecoration: 'none'
                }}>
                  <i className="fas fa-sign-in-alt" style={{marginRight: '10px'}}></i> Sign In
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
      
      {/* Dark overlay when mobile menu is open */}
      {isMobile && (
        <div 
          className={`mobile-menu-overlay ${isNavOpen ? 'active' : ''}`} 
          onClick={toggleNav}
        ></div>
      )}
      
      {/* Mobile Profile Dropdown - Positioned absolutely and controlled separately from hamburger menu */}
      {isLoggedIn && isMobile && isProfileDropdownOpen && (
        <div 
          ref={profileDropdownRef}
          style={{
            position: 'fixed',
            top: '70px',
            right: '10px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1001,
            minWidth: '250px',
          }}
        >
          <div className="user-info" style={{
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            textAlign: 'center'
          }}>
            <div className="user-name" style={{
              fontWeight: 'bold',
              color: '#0077cc',
              fontSize: '16px'
            }}>{userData?.username}</div>
            <div className="user-email" style={{
              fontSize: '14px',
              color: '#666',
              marginTop: '5px'
            }}>{userData?.email}</div>
          </div>
          <a href="#" onClick={openProfileModal} style={{
            display: 'block',
            padding: '12px 15px',
            textDecoration: 'none',
            color: '#333',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <i className="fas fa-user" style={{marginRight: '10px'}}></i> My Profile
          </a>
          <a href="#" onClick={openBookingsModal} style={{
            display: 'block',
            padding: '12px 15px',
            textDecoration: 'none',
            color: '#333',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <i className="fas fa-suitcase" style={{marginRight: '10px'}}></i> My Bookings
            {bookingsCount > 0 && (
              <span style={{
                background: '#ffcc00',
                color: '#000',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                marginLeft: '5px',
                fontWeight: 'bold'
              }}>
                {bookingsCount}
              </span>
            )}
          </a>
          <a href="#" onClick={openWishlistModal} style={{
            display: 'block',
            padding: '12px 15px',
            textDecoration: 'none',
            color: '#333',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <i className="fas fa-heart" style={{marginRight: '10px'}}></i> Wishlist
            {wishlistCount > 0 && (
              <span style={{
                background: '#ffcc00',
                color: '#000',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                marginLeft: '5px',
                fontWeight: 'bold'
              }}>
                {wishlistCount}
              </span>
            )}
          </a>
          <a href="#" onClick={handleLogout} style={{
            display: 'block',
            padding: '12px 15px',
            textDecoration: 'none',
            color: '#ff3333',
            borderRadius: '0 0 8px 8px',
          }}>
            <i className="fas fa-sign-out-alt" style={{marginRight: '10px'}}></i> Logout
          </a>
        </div>
      )}
      
      {/* Profile Modal */}
      {showProfileModal && (
        <div
          className="profile-modal-overlay"
          onClick={closeProfileModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
        >
          <div 
            className="profile-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '500px',
              padding: '20px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
            }}
          >
            <div className="profile-header" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div className="profile-avatar" style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ffcc00',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '24px',
                border: '3px solid #0077cc'
              }}>
                {getUserInitial()}
              </div>
              <div>
                <h2 style={{
                  margin: '0 0 5px 0',
                  color: '#0077cc',
                  fontSize: '22px'
                }}>
                  {userData?.username}
                </h2>
                <p style={{
                  margin: '0',
                  color: '#666',
                  fontSize: '16px'
                }}>
                  {userData?.email}
                </p>
              </div>
            </div>
            
            <div style={{
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              <h3 style={{
                margin: '0 0 10px 0',
                color: '#333',
                fontSize: '18px'
              }}>
                Account Details
              </h3>
              <div style={{
                display: 'flex',
                marginBottom: '8px'
              }}>
                <div style={{width: '120px', fontWeight: 'bold', color: '#555'}}>Username:</div>
                <div>{userData?.username}</div>
              </div>
              <div style={{
                display: 'flex',
                marginBottom: '8px'
              }}>
                <div style={{width: '120px', fontWeight: 'bold', color: '#555'}}>Email:</div>
                <div>{userData?.email}</div>
              </div>
              <div style={{
                display: 'flex',
                marginBottom: '8px'
              }}>
                <div style={{width: '120px', fontWeight: 'bold', color: '#555'}}>Member Since:</div>
                <div>
                  {userData?.registeredAt ? new Date(userData.registeredAt).toLocaleDateString() : 'Unknown'}
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button 
                onClick={closeProfileModal}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ff3333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* My Bookings Modal */}
      {showBookingsModal && (
        <div
          className="bookings-modal-overlay"
          onClick={closeBookingsModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
        >
          <div 
            className="bookings-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '95%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
            }}
          >
            <MyBookings onClose={closeBookingsModal} />
          </div>
        </div>
      )}
      
      {/* Wishlist Modal */}
      {showWishlistModal && (
        <div
          className="wishlist-modal-overlay"
          onClick={closeWishlistModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
        >
          <div 
            className="wishlist-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '95%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
            }}
          >
            <Wishlist onClose={closeWishlistModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;