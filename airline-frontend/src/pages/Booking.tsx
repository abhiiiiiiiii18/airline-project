import { useLocation, useNavigate } from "react-router-dom";
import SeatSelection from "./SeatSelection"; // adjust path based on your folder structure

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedFlight = location.state?.selectedFlight;

  if (!selectedFlight) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "16px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>⚠️ No flight selected</h2>
          <button 
            onClick={() => navigate('/book')}
            style={{ padding: "12px 24px", background: "#1e40af", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Go to Flight Search
          </button>
        </div>
      </div>
    );
  }

  return <SeatSelection flightData={selectedFlight} />;
}