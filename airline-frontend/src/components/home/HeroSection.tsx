import { Box, Typography, Card, CardContent, TextField, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function HeroSection() {
  return (
    <Box
      className="w-full min-h-screen relative flex items-center justify-between overflow-hidden"
      style={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1976d2 75%, #42a5f5 100%)'
      }}
    >
      {/* Animated Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.9) 0%, rgba(13, 71, 161, 0.85) 30%, rgba(1, 87, 155, 0.9) 60%, rgba(66, 165, 245, 0.8) 100%)'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          backgroundSize: ['100% 100%', '200% 200%', '100% 100%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated Mesh Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(66, 165, 245, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(13, 71, 161, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(25, 118, 210, 0.3) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated Geometric Patterns */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(100, 200, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 35%)
          `,
          backgroundSize: '100% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Moving Light Rays */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(66, 165, 245, 0.08) 50%, transparent 70%)
          `,
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Elements - Enhanced */}
      <motion.div
        className="absolute top-20 left-20 max-md:hidden"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Box sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <FlightTakeoffIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>
      </motion.div>

      <motion.div
        className="absolute top-40 right-32 max-lg:hidden"
        animate={{ 
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Box sx={{
          padding: '16px 24px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <LocalOfferIcon sx={{ color: '#ffd700' }} />
          <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
            Special Offers
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-40 max-lg:hidden"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -8, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <Box sx={{
          padding: '12px 20px',
          borderRadius: '12px',
          background: 'rgba(76, 175, 80, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <TrendingUpIcon sx={{ color: '#4caf50' }} />
          <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
            98% On-Time
          </Typography>
        </Box>
      </motion.div>

      {/* Particles Effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.6)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Hero Text - Left Side - Enhanced */}
      <motion.div
        className="relative z-10 text-white flex-1 flex items-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ paddingLeft: "5%", maxWidth: "50%" }}
      >
        <div>
          {/* Floating Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Chip
              icon={<LocalOfferIcon sx={{ color: '#ffd700 !important' }} />}
              label="Limited Time Offer - Save 30%"
              sx={{
                background: 'rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.5)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '13px',
                padding: '8px 4px',
                mb: 3,
                '& .MuiChip-icon': {
                  color: '#ffd700'
                }
              }}
            />
          </motion.div>

          <motion.h1
            className="font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: '1.1',
              textShadow: "3px 3px 6px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)"
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Fly Beyond
            </span>
            <motion.span
              className="block"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{ 
                background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 50%, #2196f3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: "none"
              }}
            >
              Expectations
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl xl:text-2xl max-w-md mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            style={{ 
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
              lineHeight: '1.6'
            }}
          >
            Your journey starts here. Experience luxury, comfort, and world-class service in the skies.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}
          >
            {[
              { number: '500+', label: 'Destinations' },
              { number: '98%', label: 'On-Time' },
              { number: '5M+', label: 'Happy Travelers' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #ffffff 0%, #64b5f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: '1'
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      mt: 0.5
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Flight Search Card - Right Side - Enhanced */}
      <motion.div
        initial={{ x: 300, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="relative z-20"
        style={{ paddingRight: "5%", maxWidth: "45%" }}
      >
        <Card sx={{ 
          width: "100%",
          maxWidth: 480,
          p: { xs: 2, md: 3 }, 
          borderRadius: 4, 
          boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.35)",
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
            borderRadius: '16px 16px 0 0'
          }
        }}>
          <CardContent sx={{ padding: { xs: "16px", md: "28px" } }}>
            {/* Header with Icon */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Box sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                }}>
                  <FlightTakeoffIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h5" 
                    fontWeight="800" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.2
                    }}
                  >
                    Find Your Flight
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                    Best prices guaranteed
                  </Typography>
                </Box>
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <TextField 
                fullWidth 
                label="From" 
                placeholder="Enter departure city"
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "rgba(245, 247, 250, 0.8)",
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)'
                    }
                  }
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <TextField 
                fullWidth 
                label="To" 
                placeholder="Enter destination"
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "rgba(245, 247, 250, 0.8)",
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)'
                    }
                  }
                }}
              />
            </motion.div>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{ flex: 1 }}
              >
                <TextField
                  fullWidth
                  label="Departure"
                  type="date"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(245, 247, 250, 0.8)",
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)'
                      }
                    }
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6 }}
                style={{ flex: 1 }}
              >
                <TextField
                  fullWidth
                  label="Return"
                  type="date"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(245, 247, 250, 0.8)",
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)'
                      }
                    }
                  }}
                />
              </motion.div>
            </Box>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="contained"
                startIcon={<FlightTakeoffIcon />}
                fullWidth
                sx={{ 
                  mt: 3,
                  py: 2,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  textTransform: 'none',
                  boxShadow: "0 8px 25px rgba(25, 118, 210, 0.35)",
                  background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)",
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s'
                  },
                  "&:hover": {
                    boxShadow: "0 12px 40px rgba(25, 118, 210, 0.45)",
                    background: "linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%)",
                    '&::before': {
                      left: '100%'
                    }
                  }
                }}
              >
                Search Flights
              </Button>
            </motion.div>

            {/* Quick Links */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                Popular Routes
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['DEL-BOM', 'BLR-HYD', 'DEL-GOA'].map((route, idx) => (
                  <Chip
                    key={idx}
                    label={route}
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                      border: '1px solid rgba(25, 118, 210, 0.2)',
                      fontWeight: '600',
                      fontSize: '11px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.2) 0%, rgba(66, 165, 245, 0.2) 100%)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
