import { Box, Typography, Card, Container, Avatar, Rating, Chip } from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Alice Johnson",
      rating: 5,
      text: "Absolutely incredible service! The flight was smooth, staff were friendly, and everything was on time. Will definitely fly again!",
      color: "#FF6B9D",
      role: "Business Traveler"
    },
    {
      name: "Bob Martinez",
      rating: 5,
      text: "Best airline experience I've had in years. Comfortable seats, great entertainment system, and the booking process was seamless.",
      color: "#4ECDC4",
      role: "Frequent Flyer"
    },
    {
      name: "Charlie Wong",
      rating: 4,
      text: "Great value for money! Professional crew and clean aircraft. The only minor issue was a slight delay, but they handled it well.",
      color: "#FFE66D",
      role: "Tourist"
    },
    {
      name: "Diana Patel",
      rating: 5,
      text: "Flying with this airline made my business trip stress-free. Premium service at reasonable prices. Highly recommended!",
      color: "#A8E6CF",
      role: "Corporate Executive"
    }
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      py: 12,
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated Background Decorations */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
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
            label="⭐ CUSTOMER REVIEWS" 
            sx={{ 
              mb: 3,
              mx: 'auto',
              display: 'flex',
              width: 'fit-content',
              bgcolor: 'rgba(255, 193, 7, 0.15)',
              color: '#f57c00',
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
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 700, mx: "auto", mb: 8, fontSize: '1.1rem' }}
          >
            Join thousands of satisfied travelers who trust SkyWings for their journey
          </Typography>
        </motion.div>
        
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 4
        }}>
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.12,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <Card sx={{ 
                p: 3.5, 
                borderRadius: 4, 
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderTop: `4px solid ${review.color}`,
                position: "relative",
                overflow: "visible",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                "&:hover": {
                  boxShadow: `0 20px 60px ${review.color}40`,
                  borderColor: review.color
                }
              }}>
                {/* Floating Quote Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: 20,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${review.color}, ${review.color}dd)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 8px 20px ${review.color}50`,
                    border: '3px solid white'
                  }}
                >
                  <FormatQuoteIcon sx={{ color: "white", fontSize: 24 }} />
                </Box>

                {/* Star Rating - Top */}
                <Box sx={{ mb: 2.5 }}>
                  <Rating 
                    value={review.rating} 
                    readOnly 
                    size="medium"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: review.color
                      }
                    }}
                  />
                </Box>

                {/* Review Text */}
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontStyle: "italic",
                    position: "relative",
                    flexGrow: 1,
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '0.95rem'
                  }}
                >
                  {review.text}
                </Typography>

                {/* Avatar & Info Section */}
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  pt: 2.5,
                  borderTop: `1px solid ${review.color}30`
                }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: review.color, 
                        width: 56, 
                        height: 56,
                        mr: 2,
                        boxShadow: `0 4px 15px ${review.color}40`,
                        border: '3px solid white'
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                  </motion.div>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1a1a1a' }}>
                      {review.name}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: review.color,
                      fontWeight: 600,
                      fontSize: '0.8rem'
                    }}>
                      {review.role}
                    </Typography>
                  </Box>

                  {/* Verified Badge */}
                  <Box sx={{
                    bgcolor: `${review.color}20`,
                    color: review.color,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    ✓ Verified
                  </Box>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box sx={{ 
            mt: 10,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            textAlign: 'center'
          }}>
            {[
              { value: '50K+', label: 'Happy Customers', color: '#FF6B9D' },
              { value: '4.9/5', label: 'Average Rating', color: '#4ECDC4' },
              { value: '98%', label: 'Satisfaction Rate', color: '#FFE66D' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Box sx={{
                  p: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${stat.color}15, transparent)`,
                  border: `2px solid ${stat.color}30`
                }}>
                  <Typography variant="h3" fontWeight="bold" sx={{ 
                    color: stat.color,
                    mb: 1
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
