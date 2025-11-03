import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import { motion } from "framer-motion";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccessibleIcon from "@mui/icons-material/Accessible";
import DeckIcon from "@mui/icons-material/Deck";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const Services: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();

  const serviceContent: Record<string, any> = {
    inflight: {
      title: "In-Flight Services",
      icon: <AirlineSeatReclineExtraIcon sx={{ fontSize: 60 }} />,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      description: "Enjoy premium amenities and comfort during your flight",
      features: [
        { icon: <RestaurantIcon />, title: "Gourmet Meals", desc: "Delicious meals prepared by top chefs" },
        { icon: <WifiIcon />, title: "Free Wi-Fi", desc: "Stay connected with complimentary high-speed internet" },
        { icon: <TvIcon />, title: "Entertainment", desc: "Latest movies, TV shows, and music" },
        { icon: <AirlineSeatReclineExtraIcon />, title: "Comfortable Seats", desc: "Extra legroom and reclining seats" }
      ],
      details: [
        "Complimentary beverages throughout the flight",
        "Hot meals on international flights",
        "Snacks and refreshments on domestic flights",
        "Special meal options (vegetarian, vegan, kosher, etc.)",
        "In-seat power outlets and USB ports",
        "Noise-cancelling headphones available"
      ]
    },
    baggage: {
      title: "Baggage Information",
      icon: <LuggageIcon sx={{ fontSize: 60 }} />,
      color: "#f57c00",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      description: "Everything you need to know about baggage allowances and policies",
      features: [
        { icon: <LuggageIcon />, title: "Carry-On", desc: "1 bag (7kg) + 1 personal item" },
        { icon: <LuggageIcon />, title: "Checked Baggage", desc: "Economy: 2x23kg, Business: 3x32kg" },
        { icon: <CheckCircleIcon />, title: "Free Allowance", desc: "Generous baggage allowances included" },
        { icon: <LocalOfferIcon />, title: "Extra Baggage", desc: "Purchase additional baggage online" }
      ],
      details: [
        "Carry-on dimensions: 55cm x 40cm x 20cm",
        "Personal item: laptop bag, purse, or small backpack",
        "Checked baggage dimensions: max 158cm (L+W+H)",
        "Sports equipment accepted with prior notice",
        "Musical instruments can be carried as hand baggage",
        "Liquids in carry-on: 100ml containers in 1L bag",
        "Power banks must be in carry-on luggage only"
      ]
    },
    assistance: {
      title: "Special Assistance",
      icon: <AccessibleIcon sx={{ fontSize: 60 }} />,
      color: "#388e3c",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      description: "We're here to make your journey comfortable and accessible",
      features: [
        { icon: <AccessibleIcon />, title: "Wheelchair Service", desc: "Complimentary wheelchair assistance" },
        { icon: <HealthAndSafetyIcon />, title: "Medical Support", desc: "Medical assistance available" },
        { icon: <RestaurantIcon />, title: "Dietary Needs", desc: "Special meal requests accommodated" },
        { icon: <CheckCircleIcon />, title: "Priority Boarding", desc: "Board first for convenience" }
      ],
      details: [
        "Request assistance at least 48 hours before departure",
        "Wheelchair available at airport and onboard",
        "Service animals welcome (documentation required)",
        "Medical equipment can be carried free of charge",
        "Trained staff to assist passengers with disabilities",
        "Accessible lavatories on all aircraft",
        "Escort services for unaccompanied minors",
        "Assistance with connecting flights"
      ]
    },
    lounge: {
      title: "Lounge Access",
      icon: <DeckIcon sx={{ fontSize: 60 }} />,
      color: "#7b1fa2",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      description: "Relax in luxury before your flight",
      features: [
        { icon: <RestaurantIcon />, title: "Fine Dining", desc: "Complimentary food and beverages" },
        { icon: <WifiIcon />, title: "High-Speed Wi-Fi", desc: "Stay productive or entertained" },
        { icon: <TvIcon />, title: "Business Center", desc: "Workstations and meeting rooms" },
        { icon: <DeckIcon />, title: "Shower Facilities", desc: "Freshen up before your flight" }
      ],
      details: [
        "Access with Business/First Class tickets",
        "Premium credit card holders eligible",
        "Day passes available for purchase",
        "Quiet zones for relaxation",
        "Kids play area in family lounges",
        "Premium bar with signature cocktails",
        "Massage chairs and spa services",
        "Flight information displays throughout lounge"
      ]
    },
    insurance: {
      title: "Travel Insurance",
      icon: <HealthAndSafetyIcon sx={{ fontSize: 60 }} />,
      color: "#d32f2f",
      gradient: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
      description: "Travel with peace of mind - comprehensive coverage for your journey",
      features: [
        { icon: <HealthAndSafetyIcon />, title: "Medical Coverage", desc: "Up to ₹50 lakh medical expenses" },
        { icon: <LuggageIcon />, title: "Lost Baggage", desc: "Compensation for lost/delayed baggage" },
        { icon: <CheckCircleIcon />, title: "Trip Cancellation", desc: "Get refund if you cancel" },
        { icon: <LocalOfferIcon />, title: "Low Premiums", desc: "Starting from ₹299 per trip" }
      ],
      details: [
        "24/7 emergency assistance worldwide",
        "Coverage for trip delays and cancellations",
        "Lost passport assistance",
        "Emergency evacuation coverage",
        "Personal liability protection",
        "Adventure sports coverage available",
        "COVID-19 coverage included",
        "Easy online claim process"
      ]
    },
    seats: {
      title: "Seat Selection",
      icon: <EventSeatIcon sx={{ fontSize: 60 }} />,
      color: "#0288d1",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      description: "Choose your perfect seat for a comfortable journey",
      features: [
        { icon: <EventSeatIcon />, title: "Extra Legroom", desc: "Emergency exit row seats available" },
        { icon: <CheckCircleIcon />, title: "Free Selection", desc: "Standard seats at no extra cost" },
        { icon: <RestaurantIcon />, title: "Window/Aisle", desc: "Pick your preferred seat type" },
        { icon: <LocalOfferIcon />, title: "Premium Seats", desc: "Upgrade to extra comfort seats" }
      ],
      details: [
        "Free seat selection for all passengers",
        "Premium seats: ₹500-₹2000 (extra legroom)",
        "Select seats during booking or later",
        "Families seated together when possible",
        "Exit row seats available (restrictions apply)",
        "Seats with extra recline available",
        "Window and aisle preferences honored",
        "Change seats anytime before check-in"
      ]
    }
  };

  const service = serviceContent[serviceType || "inflight"];

  if (!service) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 12, pb: 6 }}>
        <Container>
          <Typography variant="h4">Service not found</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pt: 12, pb: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                p: 3,
                borderRadius: "50%",
                background: service.gradient,
                color: "white",
                mb: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              {service.icon}
            </Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: service.color }}>
              {service.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
              {service.description}
            </Typography>
          </Box>
        </motion.div>

        {/* Features Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 4, mb: 6 }}>
          {service.features.map((feature: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-8px)"
                  }
                }}
              >
                <Box sx={{ color: service.color, mb: 2 }}>
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

        {/* Detailed Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Chip
                  label="DETAILS"
                  sx={{
                    background: service.gradient,
                    color: "white",
                    fontWeight: "bold",
                    mr: 2
                  }}
                />
                <Typography variant="h5" fontWeight="bold">
                  What You Need to Know
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <List>
                {service.details.map((detail: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  >
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: service.color }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={detail}
                        primaryTypographyProps={{
                          fontSize: "1rem"
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Box
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 3,
              background: service.gradient,
              color: "white",
              textAlign: "center"
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Need More Information?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Our customer service team is available 24/7 to assist you
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              📞 1800-123-4567 | ✉️ support@skywings.com
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
