import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import '@fontsource/great-vibes';         // Great Vibes
import '@fontsource/dancing-script';      // Dancing Script
import '@fontsource/playfair-display';    // Playfair Display

// Styled Components
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  maxHeight: '900px',
  minHeight: '400px',
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]: { maxHeight: '800px' },
  [theme.breakpoints.down('md')]: { maxHeight: '600px' },
  [theme.breakpoints.down('sm')]: { maxHeight: '500px', minHeight: '300px' },
  [theme.breakpoints.down('xs')]: { maxHeight: '400px', minHeight: '250px' },
}));

const CarouselSlide = styled(Box)(({ active, direction }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: active ? 1 : 0,
  transition: 'opacity 1.2s ease, transform 1.2s ease',
  transform: active 
    ? 'scale(1)' 
    : direction === 'next' 
      ? 'scale(1.1)' 
      : direction === 'prev' 
        ? 'scale(0.9)' 
        : 'scale(1)',
  zIndex: active ? 1 : 0,
}));

const VideoContainer = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'white',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
  padding: '0 20px',
  boxSizing: 'border-box',
});

const CarouselTitle = styled(Typography)(({ theme, fontFamily, active, delayedAnimation }) => ({
  fontSize: '4.5rem',
  color: '#FFD700',
  fontFamily: fontFamily || 'Great Vibes, cursive',
  opacity: 0,
  transform: 'translateY(-20px)',
  animation: active 
    ? `fadeInDown 1.2s forwards ${delayedAnimation ? '0.8s' : '0.3s'}` 
    : 'none',
  '@keyframes fadeInDown': {
    '0%': { opacity: 0, transform: 'translateY(-30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  [theme.breakpoints.down('lg')]: { fontSize: '4rem' },
  [theme.breakpoints.down('md')]: { fontSize: '3.5rem' },
  [theme.breakpoints.down('sm')]: { fontSize: '2.5rem' },
  [theme.breakpoints.down('xs')]: { fontSize: '2rem' },
}));

const CarouselDescription = styled(Typography)(({ theme, fontFamily, active, delayedAnimation }) => ({
  fontSize: '2.5rem',
  marginTop: '1rem',
  maxWidth: '90%',
  color: '#FFFAFA',
  fontFamily: fontFamily || 'Dancing Script, cursive',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: active 
    ? `fadeInUp 1.2s forwards ${delayedAnimation ? '1s' : '0.6s'}` 
    : 'none',
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  [theme.breakpoints.down('lg')]: { fontSize: '2rem' },
  [theme.breakpoints.down('md')]: { fontSize: '1.8rem' },
  [theme.breakpoints.down('sm')]: { fontSize: '1.4rem' },
  [theme.breakpoints.down('xs')]: { fontSize: '1.2rem', marginTop: '0.5rem' },
}));

const NavButton = styled(IconButton)(({ theme, direction }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: direction === 'left' ? '20px' : 'auto',
  right: direction === 'right' ? '20px' : 'auto',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(15px)',
  color: 'white',
  padding: '8px',
  borderRadius: '12px',
  zIndex: 10,
  '&:hover': {
    background: 'rgba(134, 134, 134, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px',
    left: direction === 'left' ? '10px' : 'auto',
    right: direction === 'right' ? '10px' : 'auto',
  },
}));

const SlideIndicators = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 5,
  gap: '8px',
});

const IndicatorDot = styled(Box)(({ active }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: active ? '#FFD700' : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

const ProgressBar = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  backgroundColor: '#FFD700',
  zIndex: 5,
  transition: 'width 0.1s linear',
});

export const Car = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const slideIntervalRef = useRef(null);
  const videoRefs = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = [
    {
      type: 'video',
      src: "2.mp4",
      title: "Navigate the world",
      description: "Let the sounds of nature and breathtaking landscapes captivate you.",
      titleFont: "'Great Vibes', cursive",
      descFont: "'Dancing Script', cursive",
      duration: 15000,
      delayedAnimation: true
    },
    {
      type: 'video',
      src: "1.mp4",
      title: "Live the Life Joyfully",
      description: "Experience the breathtaking beauty of unspoiled nature and luxury.",
      titleFont: "'Satisfy', cursive",
      descFont: "'Sacramento', cursive",
      duration: 15000,
      delayedAnimation: true
    },
    {
      type: 'video',
      src: "3.mp4",
      title: "Experiences the Adventures",
      description: "Experience the vibrant energy and dazzling lights of the city.",
      titleFont: "'Parisienne', cursive",
      descFont: "'Alex Brush', cursive",
      duration: 15000,
    },
    {
      type: 'video',
      src: "4.mp4",
      title: "Explore the Unexplored",
      description: "Journey to places where adventure meets serenity.",
      titleFont: "'Playfair Display', serif",
      descFont: "'Petit Formal Script', cursive",
      duration: 15000,
    },
    {
      type: 'video',
      src: "5.mp4",
      title: "Loves the Nature",
      description: "Immerse yourself in sun-kissed beaches and crystal-clear waters.",
      titleFont: "'Pinyon Script', cursive",
      descFont: "'Playfair Display', serif",
      duration: 15000,
      delayedAnimation: true
    },
  ];

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script&family=Playfair+Display&family=Sacramento&family=Parisienne&family=Alex+Brush&family=Satisfy&family=Pinyon+Script&family=Petit+Formal+Script&display=swap';
    document.head.appendChild(fontLink);
    return () => document.head.removeChild(fontLink);
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      
      // Try to play all videos after user interaction
      videoRefs.current.forEach(video => {
        if (video) {
          video.play().catch(e => console.warn('Video play failed:', e));
        }
      });
    };
    
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const showSlide = (index, direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setTimeout(() => {
      setCurrentSlide((index + slides.length) % slides.length);
      setIsAnimating(false);
    }, 50);
  };

  const nextSlide = () => showSlide(currentSlide + 1, 'next');
  const prevSlide = () => showSlide(currentSlide - 1, 'prev');

  const startAutoSlide = () => {
    stopAutoSlide();
    const currentDuration = slides[currentSlide].duration;
    slideIntervalRef.current = setTimeout(() => {
      nextSlide();
    }, currentDuration);
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) clearTimeout(slideIntervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentSlide]);

  useEffect(() => {
    const handleVideoPlay = async (videoEl) => {
      if (!videoEl) return;
      
      try {
        await videoEl.play();
        setIsVideoPlaying(true);
      } catch (err) {
        console.warn('Video play failed:', err);
        setIsVideoPlaying(false);
        
        // If autoplay fails, add a play button overlay or other fallback
      }
    };

    const slide = slides[currentSlide];
    if (slide.type === 'video') {
      const videoIndex = slides.slice(0, currentSlide).filter(s => s.type === 'video').length;
      const videoEl = videoRefs.current[videoIndex];
      
      if (videoEl) {
        videoEl.currentTime = 0;
        
        if (userInteracted) {
          handleVideoPlay(videoEl);
        } else {
          // Even if user hasn't interacted, try to play muted (should work)
          videoEl.muted = true;
          handleVideoPlay(videoEl).catch(e => console.warn('Muted autoplay failed:', e));
        }
      }
    }
  }, [currentSlide, userInteracted]);

  useEffect(() => {
    const duration = slides[currentSlide].duration;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 50);
    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [currentSlide]);

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    // You could add fallback image or other error handling here
  };

  return (
    <CarouselContainer onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
      {slides.map((slide, index) => (
        <CarouselSlide key={index} active={index === currentSlide} direction={slideDirection}>
          {slide.type === 'video' ? (
            <VideoContainer
              muted
              loop
              playsInline
              ref={(el) => {
                const videoIndex = slides.slice(0, index).filter(s => s.type === 'video').length;
                videoRefs.current[videoIndex] = el;
              }}
              onError={handleVideoError}
            >
              <source src={slide.src} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoContainer>
          ) : null}
          <Overlay>
            <CarouselTitle
              variant="h1"
              fontFamily={slide.titleFont}
              active={index === currentSlide}
              delayedAnimation={slide.delayedAnimation}
            >
              {slide.title}
            </CarouselTitle>
            <CarouselDescription
              variant="body1"
              fontFamily={slide.descFont}
              active={index === currentSlide}
              delayedAnimation={slide.delayedAnimation}
            >
              {slide.description}
            </CarouselDescription>
          </Overlay>
        </CarouselSlide>
      ))}
      <ProgressBar sx={{ width: `${progress}%` }} />
      <NavButton direction="left" onClick={prevSlide}>
        <ChevronLeftIcon fontSize={isMobile ? 'medium' : 'large'} />
      </NavButton>
      <NavButton direction="right" onClick={nextSlide}>
        <ChevronRightIcon fontSize={isMobile ? 'medium' : 'large'} />
      </NavButton>
      <SlideIndicators>
        {slides.map((_, index) => (
          <IndicatorDot
            key={index}
            active={index === currentSlide}
            onClick={() => showSlide(index, index > currentSlide ? 'next' : 'prev')}
          />
        ))}
      </SlideIndicators>
    </CarouselContainer>
  );
};

export default Car;