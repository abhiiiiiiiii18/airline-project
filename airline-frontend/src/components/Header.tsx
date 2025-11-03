import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesAnchor, setServicesAnchor] = useState<null | HTMLElement>(null);
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    // Clear any auth tokens/session data
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    // Redirect to home page
    navigate('/');
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchor(event.currentTarget);
  };

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchor(event.currentTarget);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setServicesAnchor(null);
    setAccountAnchor(null);
    setLanguageAnchor(null);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Book Flights", href: "/book" },
    { label: "My Bookings", href: "/bookings" },
    { label: "Check-In", href: "/profile" }
  ];

  const services = [
    { label: "In-Flight Services", action: () => { navigate('/services/inflight'); handleClose(); } },
    { label: "Baggage Information", action: () => { navigate('/services/baggage'); handleClose(); } },
    { label: "Special Assistance", action: () => { navigate('/services/assistance'); handleClose(); } },
    { label: "Lounge Access", action: () => { navigate('/services/lounge'); handleClose(); } },
    { label: "Travel Insurance", action: () => { navigate('/services/insurance'); handleClose(); } },
    { label: "Seat Selection", action: () => { navigate('/services/seats'); handleClose(); } }
  ];

  const accountOptions = [
    { label: "My Profile", action: () => { navigate('/profile'); handleClose(); } },
    { label: "My Trips", action: () => { navigate('/bookings'); handleClose(); } },
    { label: "Rewards Program", action: handleClose },
    { label: "Settings", action: handleClose },
    { label: "Logout", action: handleLogout }
  ];

  const languages = ["English", "Hindi", "Spanish", "French"];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FlightTakeoffIcon color="primary" />
          Airline
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} component="a" href={item.href}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem component="button">
          <ListItemText primary="Services" />
        </ListItem>
        {services.map((service) => (
          <ListItem key={service.label} component="button" sx={{ pl: 4 }} onClick={service.action}>
            <ListItemText primary={service.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <AppBar 
          position="fixed" 
          sx={{ 
            bgcolor: "rgba(255, 255, 255, 0.95)", 
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
            color: "text.primary"
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FlightTakeoffIcon sx={{ fontSize: 32, color: "primary.main" }} />
                </motion.div>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  SkyWings
                </Typography>
              </Box>
            </motion.div>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    color="inherit" 
                    href={item.href}
                    sx={{ 
                      mx: 0.5,
                      fontWeight: 500,
                      position: "relative",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "white"
                      },
                      transition: "all 0.3s ease"
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              {/* Services Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  color="inherit"
                  onClick={handleServicesClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ 
                    mx: 0.5,
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white"
                    }
                  }}
                >
                  Services
                </Button>
                <Menu
                  anchorEl={servicesAnchor}
                  open={Boolean(servicesAnchor)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: { mt: 1, minWidth: 200 }
                  }}
                >
                  {services.map((service) => (
                    <MenuItem key={service.label} onClick={service.action}>
                      {service.label}
                    </MenuItem>
                  ))}
                </Menu>
              </motion.div>
            </Box>

            {/* Right Side Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Language Selector */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  color="inherit" 
                  onClick={handleLanguageClick}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <LanguageIcon />
                </IconButton>
              </motion.div>
              <Menu
                anchorEl={languageAnchor}
                open={Boolean(languageAnchor)}
                onClose={handleClose}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} onClick={handleClose}>
                    {lang}
                  </MenuItem>
                ))}
              </Menu>

              {/* Notifications */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  color="inherit"
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </motion.div>

              {/* Account */}
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <IconButton 
                  color="inherit" 
                  onClick={handleAccountClick}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <Avatar sx={{ width: 35, height: 35, bgcolor: "primary.main" }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </motion.div>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={handleClose}
                PaperProps={{
                  sx: { mt: 1, minWidth: 180 }
                }}
              >
                {accountOptions.map((option) => (
                  <MenuItem key={option.label} onClick={option.action}>
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" }
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <Toolbar />
    </>
  );
}