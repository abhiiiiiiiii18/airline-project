import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export default function FooterSection() {
  return (
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
  );
}
