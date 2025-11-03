import { Box, Typography, Card, CardContent, Button, Container, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function DestinationsSection() {
  const navigate = useNavigate();
  const destinations = [
    { 
      city: "Mumbai", 
      country: "India", 
      price: "₹4,999", 
      image: "🏙️", 
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tag: "Popular",
      discount: "20% OFF"
    },
    { 
      city: "Dubai", 
      country: "UAE", 
      price: "₹12,999", 
      image: "🏜️", 
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tag: "Trending",
      discount: "15% OFF"
    },
    { 
      city: "Singapore", 
      country: "Singapore", 
      price: "₹15,999", 
      image: "🌃", 
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tag: "Hot Deal",
      discount: "30% OFF"
    }
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      py: 12,
      background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated decorative elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Chip 
            label="✈️ EXPLORE THE WORLD" 
            sx={{ 
              mb: 3,
              mx: 'auto',
              display: 'flex',
              width: 'fit-content',
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              color: '#1976d2',
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 2
            }} 
          />
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Popular Destinations
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 700, mx: "auto", mb: 8, fontSize: '1.1rem' }}
          >
            Explore our most loved routes with special offers and unbeatable prices
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 5 }}>
          {destinations.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.03, y: -15 }}
            >
              <Card sx={{ 
                borderRadius: 4, 
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                position: 'relative',
                background: 'white',
                "&:hover": {
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                  "& .dest-image": {
                    transform: 'scale(1.15)'
                  },
                  "& .book-btn": {
                    background: dest.gradient,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 10px 30px ${dest.gradient.includes('667eea') ? 'rgba(102, 126, 234, 0.4)' : 'rgba(240, 147, 251, 0.4)'}`
                  }
                }
              }}>
                {/* Discount Badge */}
                <Box sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 2,
                  bgcolor: '#ff4444',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 12px rgba(255, 68, 68, 0.4)'
                }}>
                  {dest.discount}
                </Box>

                {/* Tag Badge */}
                <Box sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  color: '#1976d2',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  border: '1px solid rgba(25, 118, 210, 0.3)'
                }}>
                  {dest.tag}
                </Box>

                {/* Image Section with Gradient Overlay */}
                <Box sx={{ 
                  background: dest.gradient,
                  height: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 120,
                  position: "relative",
                  overflow: 'hidden'
                }}>
                  <motion.div
                    className="dest-image"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      transition: 'transform 0.5s ease'
                    }}
                  >
                    {dest.image}
                  </motion.div>

                  {/* Animated plane icon */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 20,
                      right: 20
                    }}
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FlightIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.6)' }} />
                  </motion.div>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1a1a1a' }}>
                    {dest.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    📍 {dest.country}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        Starting from
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ 
                        background: dest.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {dest.price}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <TrendingDownIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                      <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 600 }}>
                        Best Price
                      </Typography>
                    </Box>
                  </Box>

                  <Button 
                    className="book-btn"
                    variant="contained" 
                    fullWidth
                    onClick={() => navigate('/book')}
                    sx={{ 
                      background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
                    }}
                  >
                    Book Now →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
