import type { FlightCardProps } from "../types/FlightCard";
import FlightCard from "../components/FlightCard";
import { Container, Typography, Box } from "@mui/material";

const flights: FlightCardProps[] = [
  { airline: "IndiGo", from: "Kolkata", to: "Delhi", departure: "10:30 AM", arrival: "1:00 PM", price: 4500 },
  { airline: "Air India", from: "Mumbai", to: "Bangalore", departure: "2:00 PM", arrival: "4:30 PM", price: 5200 },
  { airline: "SpiceJet", from: "Chennai", to: "Hyderabad", departure: "6:45 PM", arrival: "8:15 PM", price: 3000 },
];

export default function Flights() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Available Flights
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {flights.map((flight, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 300px", // responsive: min width 300px
              maxWidth: "350px",
            }}
          >
            <FlightCard {...flight} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
