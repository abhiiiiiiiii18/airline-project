import { useState } from "react";

interface Seat {
  id: string;
  row: number;
  column: string;
  type: "economy" | "premium" | "business";
  status: "available" | "selected" | "occupied";
  price: number;
  features?: string[];
}

export default function SeatSelection() {
  const flightInfo = {
    flightNumber: "AI-2156",
    airline: "Air India",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    departure: "06:00",
    arrival: "08:30",
    date: "2025-10-23",
    basePrice: 5999,
    aircraft: "Boeing 737-800"
  };

  // Generate seats layout
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const columns = ["A", "B", "C", "D", "E", "F"];
    
    // Business Class (Rows 1-3)
    for (let row = 1; row <= 3; row++) {
      for (let col of ["A", "C", "D", "F"]) {
        seats.push({
          id: `${row}${col}`,
          row,
          column: col,
          type: "business",
          status: Math.random() > 0.7 ? "occupied" : "available",
          price: 8000,
          features: ["Extra Legroom", "Priority Boarding", "Premium Meal"]
        });
      }
    }

    // Premium Economy (Rows 4-8)
    for (let row = 4; row <= 8; row++) {
      for (let col of columns) {
        seats.push({
          id: `${row}${col}`,
          row,
          column: col,
          type: "premium",
          status: Math.random() > 0.6 ? "occupied" : "available",
          price: 2000,
          features: ["Extra Legroom", "Priority Boarding"]
        });
      }
    }

    // Economy Class (Rows 9-30)
    for (let row = 9; row <= 30; row++) {
      for (let col of columns) {
        seats.push({
          id: `${row}${col}`,
          row,
          column: col,
          type: "economy",
          status: Math.random() > 0.5 ? "occupied" : "available",
          price: 0
        });
      }
    }

    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === "occupied") return;

    setSeats(prevSeats =>
      prevSeats.map(s =>
        s.id === seatId
          ? { ...s, status: s.status === "selected" ? "available" : "selected" }
          : s
      )
    );

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === "occupied") return "#cbd5e1";
    if (seat.status === "selected") return "#3b82f6";
    
    switch (seat.type) {
      case "business": return "#8b5cf6";
      case "premium": return "#f59e0b";
      case "economy": return "#10b981";
      default: return "#10b981";
    }
  };

  const totalPrice = seats
    .filter(s => s.status === "selected")
    .reduce((sum, s) => sum + s.price, 0) + flightInfo.basePrice;

  const selectedSeatDetails = seats.filter(s => s.status === "selected");

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
      {/* Navigation */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "16px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "28px" }}>✈️</span>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e40af", margin: 0 }}>SkyWings</h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
              <span style={{ fontWeight: "600", color: "#10b981" }}>Flight Selected</span>
            </div>
            <div style={{ width: "60px", height: "2px", background: "#3b82f6" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#3b82f6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>2</div>
              <span style={{ fontWeight: "600", color: "#3b82f6" }}>Select Seats</span>
            </div>
            <div style={{ width: "60px", height: "2px", background: "#e5e7eb" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e5e7eb", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>3</div>
              <span style={{ fontWeight: "600", color: "#94a3b8" }}>Payment</span>
            </div>
          </div>
        </div>

        {/* Flight Info Card */}
        <div style={{ background: "white", borderRadius: "16px", padding: "24px", marginBottom: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 8px 0" }}>
                Select Your Seats
              </h2>
              <p style={{ color: "#64748b", margin: 0 }}>
                {flightInfo.airline} • {flightInfo.flightNumber} • {flightInfo.aircraft}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>
                {flightInfo.from} → {flightInfo.to}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b" }}>
                {flightInfo.departure} - {flightInfo.arrival}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px" }}>
          {/* Seat Map */}
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            {/* Legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "32px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#10b981" }} />
                <span style={{ fontSize: "14px", color: "#64748b" }}>Economy</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#f59e0b" }} />
                <span style={{ fontSize: "14px", color: "#64748b" }}>Premium</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#8b5cf6" }} />
                <span style={{ fontSize: "14px", color: "#64748b" }}>Business</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#cbd5e1" }} />
                <span style={{ fontSize: "14px", color: "#64748b" }}>Occupied</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#3b82f6" }} />
                <span style={{ fontSize: "14px", color: "#64748b" }}>Selected</span>
              </div>
            </div>

            {/* Plane Front */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <div style={{ width: "400px", height: "60px", background: "linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 100%)", borderRadius: "100px 100px 0 0", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #a5b4fc" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold", color: "#4338ca" }}>✈️ FRONT</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div style={{ maxHeight: "600px", overflowY: "auto", padding: "0 20px" }}>
              {/* Business Class */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ textAlign: "center", marginBottom: "16px", padding: "8px", background: "linear-gradient(135deg, #f3e8ff, #e9d5ff)", borderRadius: "8px" }}>
                  <span style={{ fontWeight: "bold", color: "#7c3aed" }}>BUSINESS CLASS</span>
                </div>
                {[1, 2, 3].map(row => (
                  <div key={row} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ width: "30px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#64748b" }}>{row}</span>
                    {["A", "C"].map(col => {
                      const seat = seats.find(s => s.id === `${row}${col}`);
                      return seat ? (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "8px",
                            background: getSeatColor(seat),
                            border: "2px solid white",
                            cursor: seat.status === "occupied" ? "not-allowed" : "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "12px",
                            transition: "transform 0.2s",
                            boxShadow: seat.status === "selected" ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none"
                          }}
                          onMouseOver={(e) => seat.status !== "occupied" && (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          {seat.column}
                        </button>
                      ) : null;
                    })}
                    <div style={{ width: "60px" }} />
                    {["D", "F"].map(col => {
                      const seat = seats.find(s => s.id === `${row}${col}`);
                      return seat ? (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "8px",
                            background: getSeatColor(seat),
                            border: "2px solid white",
                            cursor: seat.status === "occupied" ? "not-allowed" : "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "12px",
                            transition: "transform 0.2s",
                            boxShadow: seat.status === "selected" ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none"
                          }}
                          onMouseOver={(e) => seat.status !== "occupied" && (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          {seat.column}
                        </button>
                      ) : null;
                    })}
                  </div>
                ))}
              </div>

              {/* Premium Economy */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ textAlign: "center", marginBottom: "16px", padding: "8px", background: "linear-gradient(135deg, #fef3c7, #fde68a)", borderRadius: "8px" }}>
                  <span style={{ fontWeight: "bold", color: "#d97706" }}>PREMIUM ECONOMY</span>
                </div>
                {[4, 5, 6, 7, 8].map(row => (
                  <div key={row} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ width: "30px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#64748b" }}>{row}</span>
                    {["A", "B", "C"].map(col => {
                      const seat = seats.find(s => s.id === `${row}${col}`);
                      return seat ? (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            background: getSeatColor(seat),
                            border: "2px solid white",
                            cursor: seat.status === "occupied" ? "not-allowed" : "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "11px",
                            transition: "transform 0.2s",
                            boxShadow: seat.status === "selected" ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none"
                          }}
                          onMouseOver={(e) => seat.status !== "occupied" && (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          {seat.column}
                        </button>
                      ) : null;
                    })}
                    <div style={{ width: "30px" }} />
                    {["D", "E", "F"].map(col => {
                      const seat = seats.find(s => s.id === `${row}${col}`);
                      return seat ? (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            background: getSeatColor(seat),
                            border: "2px solid white",
                            cursor: seat.status === "occupied" ? "not-allowed" : "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "11px",
                            transition: "transform 0.2s",
                            boxShadow: seat.status === "selected" ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none"
                          }}
                          onMouseOver={(e) => seat.status !== "occupied" && (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          {seat.column}
                        </button>
                      ) : null;
                    })}
                  </div>
                ))}
              </div>

              {/* Economy Class */}
              <div>
                <div style={{ textAlign: "center", marginBottom: "16px", padding: "8px", background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", borderRadius: "8px" }}>
                  <span style={{ fontWeight: "bold", color: "#059669" }}>ECONOMY CLASS</span>
                </div>
                {Array.from({ length: 22 }, (_, i) => i + 9).map(row => (
                  <div key={row} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ width: "30px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#64748b" }}>{row}</span>
                    {["A", "B", "C"].map(col => {
                      const seat = seats.find(s => s.id === `${row}${col}`);
                      return seat ? (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "6px",
                            background: getSeatColor(seat),
                            border: "2px solid white",
                            cursor: seat.status === "occupied" ? "not-allowed" : "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "10px",
                            transition: "transform 0.2s",
                            boxShadow: seat.status === "selected" ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none"
                          }}
                          onMouseOver={(e) => seat.status !== "occupied" && (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          {seat.column}
                        </button>
                      ) : null;
                    })}
                    <div style={{ width: "30px" }} />
                    {["D", "E", "F"].map(col => {
                      const seat = seats.find(s => s.id === `${row}${col}`);
                      return seat ? (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "6px",
                            background: getSeatColor(seat),
                            border: "2px solid white",
                            cursor: seat.status === "occupied" ? "not-allowed" : "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "10px",
                            transition: "transform 0.2s",
                            boxShadow: seat.status === "selected" ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none"
                          }}
                          onMouseOver={(e) => seat.status !== "occupied" && (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          {seat.column}
                        </button>
                      ) : null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" }}>
                Booking Summary
              </h3>

              <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px" }}>Selected Seats</div>
                {selectedSeatDetails.length > 0 ? (
                  selectedSeatDetails.map(seat => (
                    <div key={seat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#f8fafc", borderRadius: "8px", marginBottom: "8px" }}>
                      <div>
                        <div style={{ fontWeight: "bold", color: "#1e293b" }}>Seat {seat.id}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", textTransform: "capitalize" }}>{seat.type}</div>
                        {seat.features && (
                          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>
                            {seat.features.join(" • ")}
                          </div>
                        )}
                      </div>
                      <div style={{ fontWeight: "bold", color: "#1e40af" }}>
                        {seat.price > 0 ? `+₹${seat.price}` : "Included"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>💺</div>
                    <div style={{ fontSize: "14px" }}>No seats selected</div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ color: "#64748b" }}>Base Fare</span>
                  <span style={{ fontWeight: "600", color: "#1e293b" }}>₹{flightInfo.basePrice.toLocaleString()}</span>
                </div>
                {selectedSeatDetails.filter(s => s.price > 0).length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#64748b" }}>Seat Charges</span>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>
                      +₹{selectedSeatDetails.reduce((sum, s) => sum + s.price, 0).toLocaleString()}
                    </span>
                  </div>
                )}
                <div style={{ height: "1px", background: "#e5e7eb", margin: "16px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b" }}>Total</span>
                  <span style={{ fontSize: "24px", fontWeight: "bold", color: "#1e40af" }}>
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: selectedSeats.length === 0 ? "#e5e7eb" : "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  if (selectedSeats.length > 0) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(30,64,175,0.3)";
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => {
                  if (selectedSeats.length > 0) {
                    alert(`Proceeding to payment for seats: ${selectedSeats.join(", ")}\nTotal: ₹${totalPrice.toLocaleString()}`);
                  }
                }}
              >
                Continue to Payment →
              </button>

              <div style={{ marginTop: "16px", padding: "12px", background: "#fef3c7", borderRadius: "8px", fontSize: "12px", color: "#92400e" }}>
                <strong>💡 Tip:</strong> Window seats (A, F) and aisle seats (C, D) are popular choices!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}