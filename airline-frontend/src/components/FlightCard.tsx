import { Card, CardContent, Typography, Button, CardActions, Divider } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import type { FlightCardProps } from "../types/FlightCard";

export default function FlightCard({
  airline,
  from,
  to,
  departure,
  arrival,
  price,
}: FlightCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {airline}
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography
          variant="body1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FlightTakeoffIcon fontSize="small" /> {from} — <FlightLandIcon fontSize="small" /> {to}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Departure: {departure}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Arrival: {arrival}
        </Typography>

        <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
          ₹{price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}
