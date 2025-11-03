import { Box, Typography, Container, Chip } from "@mui/material";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    { step: "1", title: "Search Flights", desc: "Enter your travel details and find the best flights", icon: "🔍", color: "#4ECDC4" },
    { step: "2", title: "Select Flight", desc: "Choose your preferred option from available flights", icon: "✈️", color: "#FF6B9D" },
    { step: "3", title: "Enter Details", desc: "Fill passenger information securely", icon: "📝", color: "#FFE66D" },
    { step: "4", title: "Confirm & Pay", desc: "Complete secure payment and receive confirmation", icon: "✅", color: "#A8E6CF" }
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      py: 12,
      background: 'linear-gradient(180deg, #f8fafc 0%, #dbeafe 50%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 12,
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
            label="📋 BOOKING PROCESS" 
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
              background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Book Your Flight in 4 Easy Steps
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 700, mx: "auto", mb: 8, fontSize: '1.1rem' }}
          >
            Simple, fast, and secure booking process designed for your convenience
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4, position: "relative" }}>
          {/* Animated Connection Line */}
          <Box sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "80px",
            left: "12.5%",
            right: "12.5%",
            height: "6px",
            background: "linear-gradient(90deg, #4ECDC4 0%, #FF6B9D 33%, #FFE66D 66%, #A8E6CF 100%)",
            borderRadius: 3,
            zIndex: 0,
            "&::before": {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              animation: 'shimmer 3s infinite'
            },
            "@keyframes shimmer": {
              "0%": { transform: 'translateX(-100%)' },
              "100%": { transform: 'translateX(100%)' }
            }
          }} />

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 100 }}
              style={{ zIndex: 1 }}
            >
              <Box sx={{ textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Box sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 3,
                    boxShadow: `0 15px 40px ${item.color}50`,
                    position: "relative",
                    border: '4px solid white',
                    transition: 'all 0.3s ease',
                    "&:hover": {
                      boxShadow: `0 20px 50px ${item.color}70`,
                    },
                    "&::before": {
                      content: '""',
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${item.color}40, transparent)`,
                      zIndex: -1
                    }
                  }}>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.5
                      }}
                    >
                      <Typography sx={{ fontSize: 70 }}>
                        {item.icon}
                      </Typography>
                    </motion.div>

                    {/* Step Number Badge */}
                    <Box sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: 22,
                      color: item.color,
                      boxShadow: `0 4px 15px ${item.color}40`,
                      border: `3px solid ${item.color}`
                    }}>
                      {item.step}
                    </Box>
                  </Box>
                </motion.div>

                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#1a1a1a', mb: 1.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, px: 1 }}>
                  {item.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Box sx={{ 
            mt: 8, 
            textAlign: 'center',
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(13, 71, 161, 0.1) 100%)',
            border: '2px dashed rgba(25, 118, 210, 0.3)'
          }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: '#1976d2' }}>
              Ready to start your journey?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Book now and experience hassle-free travel with SkyWings
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
