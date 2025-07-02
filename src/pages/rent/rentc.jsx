import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';

// Icons
const DirectionsCarIcon = ({ size = '16px' }) => (
  <svg style={{ width: size, height: size, marginRight: '4px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
    <circle cx="7.5" cy="14.5" r="1.5"/>
    <circle cx="16.5" cy="14.5" r="1.5"/>
  </svg>
);

const HeartIcon = ({ filled, size = '24px' }) => (
  <svg 
    style={{ 
      width: size, 
      height: size, 
      fill: filled ? '#ff3366' : 'none',
      stroke: 'white',
      strokeWidth: filled ? '1' : '2',
      transition: 'all 0.2s ease'
    }} 
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CarRental = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const tabsRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if tabs are overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (tabsRef.current) {
        setIsOverflowing(tabsRef.current.scrollWidth > tabsRef.current.clientWidth);
      }
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Load data from localStorage
  const loadData = () => {
    try {
      const storedBookings = localStorage.getItem('bookedDestinations');
      const storedWishlist = localStorage.getItem('wishlistDestinations');
      setBookings(storedBookings ? JSON.parse(storedBookings) : []);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
    
    const handleStorageChange = () => loadData();
    window.addEventListener('bookingsUpdated', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('bookingsUpdated', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  // Sample data with all categories
  const data = {
    popular: [
      { id: 'p1', location: 'New Delhi', carType: 'SUV', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '₹2,500/day' },
      { id: 'p2', location: 'Mumbai', carType: 'Sedan', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '₹2,000/day' },
      { id: 'p3', location: 'Bangalore', carType: 'Hatchback', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', price: '₹1,800/day' },
      { id: 'p4', location: 'Chennai', carType: 'SUV', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', price: '₹2,300/day' },
      { id: 'p5', location: 'Goa', carType: 'Convertible', image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg', price: '₹3,200/day' },
      { id: 'p6', location: 'Jaipur', carType: 'SUV', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg', price: '₹2,400/day' },
    ],
    carTypes: [
      { id: 'c1', name: 'Economy', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', priceFrom: '₹1,500/day' },
      { id: 'c2', name: 'Sedan', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', priceFrom: '₹2,000/day' },
      { id: 'c3', name: 'SUV', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', priceFrom: '₹2,500/day' },
      { id: 'c4', name: 'Luxury', image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg', priceFrom: '₹5,000/day' },
      { id: 'c5', name: 'Convertible', image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg', priceFrom: '₹6,000/day' },
      { id: 'c6', name: 'Electric', image: 'https://images.pexels.com/photos/3727457/pexels-photo-3727457.jpeg', priceFrom: '₹3,000/day' },
    ],
    companies: [
      { id: 'r1', name: 'Zoomcar', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', rating: '4.2★', price: '₹1,800/day' },
      { id: 'r2', name: 'Revv', image: 'https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg', rating: '4.0★', price: '₹1,900/day' },
      { id: 'r3', name: 'Avis', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', rating: '4.5★', price: '₹2,200/day' },
      { id: 'r4', name: 'Myles', image: 'https://images.pexels.com/photos/358210/pexels-photo-358210.jpeg', rating: '3.9★', price: '₹1,750/day' },
      { id: 'r5', name: 'Hertz', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', rating: '4.3★', price: '₹2,100/day' },
      { id: 'r6', name: 'Savaari', image: 'https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg', rating: '4.1★', price: '₹1,950/day' },
    ],
    bestRates: [
      { id: 'b1', name: 'Delhi NCR', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', priceFrom: '₹1,200/day', label: 'Car in Delhi NCR', description: 'Best rates for Delhi and NCR region' },
      { id: 'b2', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', priceFrom: '₹1,400/day', label: 'Car in Mumbai', description: 'Affordable car rentals throughout Mumbai' },
      { id: 'b3', name: 'Bangalore', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', priceFrom: '₹1,300/day', label: 'Car in Bangalore', description: 'Special rates for Bangalore city travel' },
      { id: 'b4', name: 'Chennai', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', priceFrom: '₹1,250/day', label: 'Car in Chennai', description: 'Competitive prices in Chennai area' },
      { id: 'b5', name: 'Hyderabad', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg', priceFrom: '₹1,350/day', label: 'Car in Hyderabad', description: 'Discounted rates in Hyderabad' },
      { id: 'b6', name: 'Kolkata', image: 'https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg', priceFrom: '₹1,150/day', label: 'Car in Kolkata', description: 'Lowest rates guaranteed in Kolkata' },
    ],
    airports: [
      { id: 'a1', name: 'Delhi Airport (DEL)', location: 'New Delhi', image: 'https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg', priceFrom: '₹1,700/day' },
      { id: 'a2', name: 'Mumbai Airport (BOM)', location: 'Mumbai', image: 'https://images.pexels.com/photos/358228/pexels-photo-358228.jpeg', priceFrom: '₹1,800/day' },
      { id: 'a3', name: 'Bangalore Airport (BLR)', location: 'Bangalore', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', priceFrom: '₹1,600/day' },
      { id: 'a4', name: 'Chennai Airport (MAA)', location: 'Chennai', image: 'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg', priceFrom: '₹1,550/day' },
      { id: 'a5', name: 'Hyderabad Airport (HYD)', location: 'Hyderabad', image: 'https://images.pexels.com/photos/1309647/pexels-photo-1309647.jpeg', priceFrom: '₹1,650/day' },
      { id: 'a6', name: 'Kolkata Airport (CCU)', location: 'Kolkata', image: 'https://images.pexels.com/photos/1309645/pexels-photo-1309645.jpeg', priceFrom: '₹1,500/day' },
    ]
  };

  const getActiveData = () => data[activeTab] || [];

  const isItemBooked = (id) => bookings.some(booking => booking.id === id);
  const isItemInWishlist = (id) => wishlist.some(item => item.id === id);

  const handleBookCar = (item) => {
    const booking = {
      ...item,
      bookingId: `B${Date.now()}`,
      bookingDate: new Date().toISOString(),
      label: item.location || item.name
    };

    const updatedBookings = [...bookings, booking];
    localStorage.setItem('bookedDestinations', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setSnackbarMessage(`${booking.label} booked successfully!`);
    setShowSnackbar(true);
    window.dispatchEvent(new Event('bookingsUpdated'));
    
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const toggleWishlist = (item, e) => {
    e?.stopPropagation();
    const wishlistItem = {
      id: item.id,
      label: item.location || item.name,
      img: item.image,
      price: item.price || item.priceFrom
    };

    let updatedWishlist;
    if (isItemInWishlist(item.id)) {
      updatedWishlist = wishlist.filter(i => i.id !== item.id);
      setSnackbarMessage(`${wishlistItem.label} removed from wishlist`);
    } else {
      updatedWishlist = [...wishlist, wishlistItem];
      setSnackbarMessage(`${wishlistItem.label} added to wishlist`);
    }

    localStorage.setItem('wishlistDestinations', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    setShowSnackbar(true);
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  // Scroll tabs horizontally
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '16px' : '24px',
      fontFamily: "'Poppins', sans-serif"
    },
    title: {
      fontSize: isMobile ? '22px' : '28px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#333'
    },
    subtitle: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#666',
      marginBottom: isMobile ? '16px' : '24px'
    },
    tabsContainer: {
      position: 'relative',
      marginBottom: '24px'
    },
    scrollButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      background: 'rgba(255,255,255,0.8)',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #ddd',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      '&:hover': {
        background: '#f5f5f5'
      }
    },
    scrollButtonLeft: {
      left: '-15px'
    },
    scrollButtonRight: {
      right: '-15px'
    },
    tabs: {
  display: 'flex',
  overflowX: 'auto',
  gap: '8px',
  paddingBottom: '16px',
  marginBottom: '8px',
  scrollbarWidth: 'thin',
  scrollbarColor: '#999 #f5f5f5', // ← Firefox: thumb gray, track light

  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f5f5f5',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#999', // ← Chrome: gray thumb
    borderRadius: '10px',
  },


    },
    tab: (active) => ({
      padding: '8px 16px',
      borderRadius: '20px',
      background: active ? '#e6f2fc' : 'transparent',
      color: active ? '#0078d4' : '#333',
      border: `1px solid ${active ? '#0078d4' : 'transparent'}`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      flexShrink: 0,
      transition: 'all 0.3s ease',
      '&:hover': {
        background: active ? '#d4e7fa' : '#f5f5f5'
      }
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px'
    },
    card: {
      position: 'relative',
      height: '220px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer'
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      '&:hover': {
        transform: 'scale(1.1)'
      }
    },
    heartButton: (active) => ({
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: active ? 'rgba(255, 51, 102, 0.8)' : 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      '&:hover': {
        background: active ? 'rgba(255, 51, 102, 0.9)' : 'rgba(0, 0, 0, 0.5)'
      }
    }),
    cardContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
      color: 'white'
    },
    snackbar: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#4CAF50',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center'
    },
    closeButton: {
      marginLeft: '16px',
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Top car rentals in India
      </h1>
      
      <p style={styles.subtitle}>
        Explore car rental options across India
      </p>

      <div style={styles.tabsContainer}>
        {isOverflowing && !isMobile && (
          <button 
            style={{ ...styles.scrollButton, ...styles.scrollButtonLeft }}
            onClick={() => scrollTabs('left')}
            aria-label="Scroll tabs left"
          >
            &lt;
          </button>
        )}
        
        <div ref={tabsRef} style={styles.tabs}>
          {Object.entries({
            popular: 'Popular Locations',
            carTypes: 'Car Types',
            companies: 'Rental Companies',
            bestRates: 'Best Rates',
            airports: 'Airport Pickups'
          }).map(([tab, label]) => (
            <div 
              key={tab} 
              style={styles.tab(activeTab === tab)}
              onClick={() => setActiveTab(tab)}
            >
              {label}
            </div>
          ))}
        </div>
        
        {isOverflowing && !isMobile && (
          <button 
            style={{ ...styles.scrollButton, ...styles.scrollButtonRight }}
            onClick={() => scrollTabs('right')}
            aria-label="Scroll tabs right"
          >
            &gt;
          </button>
        )}
      </div>

      <div style={styles.grid}>
        {getActiveData().map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={item.image}
                alt={item.location || item.name}
                style={styles.cardImage}
              />
            </div>
            <button 
              style={styles.heartButton(isItemInWishlist(item.id))}
              onClick={(e) => toggleWishlist(item, e)}
              aria-label={isItemInWishlist(item.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <HeartIcon filled={isItemInWishlist(item.id)} size="20px" />
            </button>
            <div style={styles.cardContent}>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px' }}>{item.location || item.name}</h3>
              {item.carType && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <DirectionsCarIcon />
                  <span style={{ fontSize: '14px' }}>{item.carType}</span>
                </div>
              )}
              {item.rating && (
                <div style={{ marginBottom: '8px', fontSize: '14px' }}>{item.rating}</div>
              )}
              <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                {item.price || item.priceFrom}
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '8px',
                  background: isItemBooked(item.id) ? '#888' : '#2874f0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isItemBooked(item.id) ? 'default' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onClick={() => !isItemBooked(item.id) && handleBookCar(item)}
                disabled={isItemBooked(item.id)}
              >
                {isItemBooked(item.id) ? 'Booked' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSnackbar && (
        <motion.div
          style={styles.snackbar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {snackbarMessage}
          <button 
            onClick={() => setShowSnackbar(false)}
            style={styles.closeButton}
            aria-label="Close notification"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CarRental;