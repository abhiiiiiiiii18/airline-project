import { Box, Typography, Card, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    { icon: "⏰", title: "On-Time Guarantee", desc: "98% on-time performance rate", color: "#4ECDC4" },
    { icon: "🛡️", title: "Safe & Secure", desc: "Top safety ratings worldwide", color: "#FF6B9D" },
    { icon: "💼", title: "Extra Baggage", desc: "Generous baggage allowance", color: "#FFE66D" },
    { icon: "🎧", title: "24/7 Support", desc: "We're here whenever you need", color: "#A8E6CF" }
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      py: 12,
      background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 50%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated Background Shapes */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
            Why Choose SkyWings?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 700, mx: "auto", mb: 8, fontSize: '1.1rem' }}
          >
            Experience world-class service with our commitment to safety, comfort, and punctuality
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4 }}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
            >
              <Card sx={{ 
                p: 4, 
                textAlign: "center", 
                height: "100%",
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderTop: `4px solid ${feature.color}`,
                borderRadius: 4,
                cursor: "pointer",
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: 'relative',
                overflow: 'hidden',
                "&:hover": {
                  boxShadow: `0 20px 60px ${feature.color}40`,
                  transform: 'translateY(-15px)'
                },
                "&::before": {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${feature.color}, ${feature.color}aa)`,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease'
                },
                "&:hover::before": {
                  transform: 'scaleX(1)'
                }
              }}>
                {/* Icon with animated glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5
                  }}
                >
                  <Box sx={{ 
                    fontSize: 70, 
                    mb: 3,
                    filter: `drop-shadow(0 8px 16px ${feature.color}60)`,
                    transition: 'all 0.3s ease'
                  }}>
                    {feature.icon}
                  </Box>
                </motion.div>

                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#1a1a1a', mb: 1.5 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.desc}
                </Typography>

                {/* Decorative corner accent */}
                <Box sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${feature.color}30 0%, transparent 70%)`,
                  transition: 'all 0.4s ease'
                }} />
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
