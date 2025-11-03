import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import SeatSelection from "./SeatSelection";
import Payment from "./Payment";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedFlight = location.state?.selectedFlight;
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  if (!selectedFlight) {
    return <Navigate to="/book" replace />;
  }

  const handleContinueToPayment = (data: any) => {
    setBookingData(data);
    setShowPayment(true);
  };

  if (showPayment && bookingData) {
    return <Payment bookingData={bookingData} />;
  }

  return <SeatSelection flightData={selectedFlight} onContinueToPayment={handleContinueToPayment} />;
}