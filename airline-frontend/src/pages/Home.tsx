import { Box, Typography, Card, CardContent, TextField, Button, Container, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";

export default function Home() {
  const reviews = [
    {
      name: "Alice Johnson",
      rating: 5,
      text: "Absolutely incredible service! The flight was smooth, staff were friendly, and everything was on time. Will definitely fly again!",
      color: "#FF6B9D"
    },
    {
      name: "Bob Martinez",
      rating: 5,
      text: "Best airline experience I've had in years. Comfortable seats, great entertainment system, and the booking process was seamless.",
      color: "#4ECDC4"
    },
    {
      name: "Charlie Wong",
      rating: 4,
      text: "Great value for money! Professional crew and clean aircraft. The only minor issue was a slight delay, but they handled it well.",
      color: "#FFE66D"
    },
    {
      name: "Diana Patel",
      rating: 5,
      text: "Flying with this airline made my business trip stress-free. Premium service at reasonable prices. Highly recommended!",
      color: "#A8E6CF"
    }
  ];

  return (
    <Box className="w-full flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <Box
        className="w-full min-h-screen bg-cover bg-center relative flex items-center justify-end overflow-hidden"
        style={{ backgroundImage: `url('/images/hero-airline.jpg')` }}
      >
        {/* Animated Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 text-white/20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FlightTakeoffIcon sx={{ fontSize: 80 }} />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-40 text-white/10"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FlightTakeoffIcon sx={{ fontSize: 60 }} />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          className="absolute left-10 md:left-20 top-1/3 z-10 text-white max-w-xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Fly Beyond
            <motion.span
              className="block text-blue-400"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Expectations
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Your journey starts here. Experience luxury in the skies.
          </motion.p>
        </motion.div>

        {/* Flight Search Card */}
        <motion.div
          initial={{ x: 300, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.02 }}
          className="relative z-10 mr-10 max-sm:mr-0 max-sm:mx-4"
        >
          <Card sx={{ 
            minWidth: 300, 
            maxWidth: 400, 
            p: 3, 
            borderRadius: 3, 
            boxShadow: 6,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)"
          }}>
            <CardContent>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Search Flights ✈️
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <TextField fullWidth label="From" margin="normal" />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <TextField fullWidth label="To" margin="normal" />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <TextField
                  fullWidth
                  label="Departure Date"
                  type="date"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <TextField
                  fullWidth
                  label="Return Date"
                  type="date"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FlightTakeoffIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Search
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* WHY CHOOSE US SECTION */}
      <Container sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{ mb: 2 }}>
            Why Choose SkyWings?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
          >
            Experience world-class service with our commitment to safety, comfort, and punctuality
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4 }}>
          {[
            { icon: "⏰", title: "On-Time Guarantee", desc: "98% on-time performance rate", color: "#4ECDC4" },
            { icon: "🛡️", title: "Safe & Secure", desc: "Top safety ratings worldwide", color: "#FF6B9D" },
            { icon: "💼", title: "Extra Baggage", desc: "Generous baggage allowance", color: "#FFE66D" },
            { icon: "🎧", title: "24/7 Support", desc: "We're here whenever you need", color: "#A8E6CF" }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <Card sx={{ 
                p: 3, 
                textAlign: "center", 
                height: "100%",
                background: `linear-gradient(135deg, ${feature.color}15 0%, white 100%)`,
                border: `2px solid ${feature.color}30`,
                borderRadius: 3,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}>
                <Box sx={{ 
                  fontSize: 60, 
                  mb: 2,
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* FEATURED DESTINATIONS SECTION */}
      <Box sx={{ bgcolor: "grey.50", py: 10 }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{ mb: 2 }}>
              Popular Destinations
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
            >
              Explore our most loved routes with special offers
            </Typography>
          </motion.div>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
            {[
              { city: "Mumbai", country: "India", price: "₹4,999", image: "🏙️", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
              { city: "Dubai", country: "UAE", price: "₹12,999", image: "🏜️", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
              { city: "Singapore", country: "Singapore", price: "₹15,999", image: "🌃", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
            ].map((dest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card sx={{ 
                  borderRadius: 3, 
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 8
                  }
                }}>
                  <Box sx={{ 
                    background: dest.gradient,
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 100,
                    position: "relative"
                  }}>
                    {dest.image}
                  </Box>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {dest.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {dest.country}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ mb: 2 }}>
                      From {dest.price}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{ 
                        background: dest.gradient,
                        "&:hover": {
                          opacity: 0.9
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* HOW IT WORKS SECTION */}
      <Container sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{ mb: 2 }}>
            Book Your Flight in 4 Easy Steps
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
          >
            Simple, fast, and secure booking process
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 3, position: "relative" }}>
          {/* Connection Line */}
          <Box sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "60px",
            left: "12.5%",
            right: "12.5%",
            height: "4px",
            background: "linear-gradient(90deg, #4ECDC4, #FF6B9D, #FFE66D, #A8E6CF)",
            borderRadius: 2,
            zIndex: 0
          }} />

          {[
            { step: "1", title: "Search Flights", desc: "Enter your travel details", icon: "🔍", color: "#4ECDC4" },
            { step: "2", title: "Select Flight", desc: "Choose your preferred option", icon: "✈️", color: "#FF6B9D" },
            { step: "3", title: "Enter Details", desc: "Fill passenger information", icon: "📝", color: "#FFE66D" },
            { step: "4", title: "Confirm & Pay", desc: "Secure payment and fly!", icon: "✅", color: "#A8E6CF" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              style={{ zIndex: 1 }}
            >
              <Box sx={{ textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Box sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 2,
                    boxShadow: `0 8px 20px ${item.color}40`,
                    position: "relative"
                  }}>
                    <Typography sx={{ fontSize: 50 }}>
                      {item.icon}
                    </Typography>
                    <Box sx={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      bgcolor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: 18,
                      color: item.color,
                      boxShadow: 2
                    }}>
                      {item.step}
                    </Box>
                  </Box>
                </motion.div>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* REVIEWS SECTION */}
      <Box sx={{ bgcolor: "grey.100", py: 10, overflow: "hidden" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{ mb: 6 }}>
              What Our Customers Say
            </Typography>
          </motion.div>
          
          <Box className="flex overflow-x-auto space-x-6 py-4 px-2">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                className="min-w-[320px]"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  boxShadow: 3,
                  background: `linear-gradient(135deg, ${review.color}15 0%, white 100%)`,
                  border: `2px solid ${review.color}30`,
                  position: "relative",
                  overflow: "visible",
                  height: "100%"
                }}>
                  {/* Decorative Corner */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: review.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 2
                    }}
                  >
                    <StarIcon sx={{ color: "white", fontSize: 20 }} />
                  </Box>

                  {/* Avatar */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: review.color, 
                        width: 56, 
                        height: 56,
                        mr: 2,
                        boxShadow: 2
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.name}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>

                  {/* Review Text */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontStyle: "italic",
                      position: "relative",
                      pl: 2,
                      "&::before": {
                        content: '"""',
                        position: "absolute",
                        left: -5,
                        top: -10,
                        fontSize: 40,
                        color: review.color,
                        opacity: 0.3
                      }
                    }}
                  >
                    {review.text}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FOOTER SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ 
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white", 
          py: 8 
        }}>
          <Container>
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: 4,
              mb: 4
            }}>
              {/* Company Info */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <FlightTakeoffIcon sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    SkyWings
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  Your trusted partner for safe, comfortable, and affordable air travel across the globe.
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {["📘", "🐦", "📷", "💼"].map((icon, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.3)"
                        }
                      }}>
                        {icon}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>

              {/* Quick Links */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Quick Links
                </Typography>
                {["Book a Flight", "Manage Booking", "Flight Status", "Check-In Online", "Travel Guide"].map((link) => (
                  <Typography 
                    key={link}
                    variant="body2" 
                    sx={{ 
                      mb: 1, 
                      opacity: 0.9,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        opacity: 1,
                        paddingLeft: "8px"
                      }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>

              {/* Services */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Services
                </Typography>
                {["In-Flight Services", "Baggage Info", "Special Assistance", "Corporate Travel", "Group Bookings", "Cargo Services"].map((service) => (
                  <Typography 
                    key={service}
                    variant="body2" 
                    sx={{ 
                      mb: 1, 
                      opacity: 0.9,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        opacity: 1,
                        paddingLeft: "8px"
                      }
                    }}
                  >
                    {service}
                  </Typography>
                ))}
              </Box>

              {/* Contact Info */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Contact Us
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
                  <Box>📞</Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    +91 1800-123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
                  <Box>✉️</Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    support@skywings.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "flex-start" }}>
                  <Box>📍</Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Sky Tower, Aviation Hub<br />
                    New Delhi, India - 110037
                  </Typography>
                </Box>
                <Box sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.2)"
                }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    📱 Download Our App
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Box sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: "rgba(255,255,255,0.2)",
                      borderRadius: 1,
                      fontSize: 11,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)"
                      }
                    }}>
                      🍎 iOS
                    </Box>
                    <Box sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: "rgba(255,255,255,0.2)",
                      borderRadius: 1,
                      fontSize: 11,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)"
                      }
                    }}>
                      🤖 Android
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Bottom Bar */}
            <Box sx={{ 
              borderTop: "1px solid rgba(255,255,255,0.2)", 
              pt: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2
            }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                &copy; 2025 SkyWings Airlines. All rights reserved.
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((link) => (
                  <Typography 
                    key={link}
                    variant="body2" 
                    sx={{ 
                      opacity: 0.8,
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                      "&:hover": {
                        opacity: 1
                      }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
}