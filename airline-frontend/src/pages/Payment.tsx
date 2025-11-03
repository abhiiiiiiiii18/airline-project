import { useState } from "react";

interface PaymentProps {
  bookingData?: {
    flightNumber: string;
    airline: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    date: string;
    seats: string[];
    basePrice: number;
    seatCharges: number;
    totalPrice: number;
  };
}

export default function Payment({ bookingData }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingId] = useState(`SW${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Default booking data if not provided
  const booking = bookingData || {
    flightNumber: "AI-2156",
    airline: "Air India",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    departure: "06:00",
    arrival: "08:30",
    date: "2025-10-23",
    seats: ["12A", "12B"],
    basePrice: 5999,
    seatCharges: 0,
    totalPrice: 5999
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!passengerName || !email || !phone) {
      alert("Please fill in all passenger details");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert("Please fill in all card details");
        return;
      }
    } else {
      if (!upiId) {
        alert("Please enter UPI ID");
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  if (paymentSuccess) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ maxWidth: "800px", width: "100%", background: "white", borderRadius: "24px", padding: "48px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          {/* Success Animation */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ 
              width: "120px", 
              height: "120px", 
              borderRadius: "50%", 
              background: "linear-gradient(135deg, #10b981, #059669)", 
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)",
              animation: "successPop 0.6s ease-out"
            }}>
              <span style={{ fontSize: "64px", color: "white" }}>✓</span>
            </div>
          </div>

          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" }}>
            Payment Successful! 🎉
          </h1>
          <p style={{ fontSize: "18px", color: "#64748b", marginBottom: "32px" }}>
            Your booking has been confirmed. Get ready for your journey!
          </p>

          {/* Booking Details Card */}
          <div style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", borderRadius: "16px", padding: "32px", marginBottom: "32px", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "24px", borderBottom: "2px solid #e5e7eb" }}>
              <div>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>Booking ID</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1e40af" }}>{bookingId}</div>
              </div>
              <div style={{ padding: "12px 24px", background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "12px", color: "white", fontWeight: "bold" }}>
                CONFIRMED
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Passenger Name</div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{passengerName}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Email</div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{email}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Phone</div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{phone}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Payment Method</div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{paymentMethod === "card" ? "Credit/Debit Card" : "UPI"}</div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" }}>Flight Details</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Airline</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{booking.airline}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Flight Number</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{booking.flightNumber}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", padding: "16px", background: "#f8fafc", borderRadius: "8px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b" }}>{booking.departure}</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>{booking.from}</div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>{booking.date}</div>
                  <div style={{ width: "100%", height: "2px", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }} />
                  <div style={{ fontSize: "20px", marginTop: "4px" }}>✈️</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b" }}>{booking.arrival}</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>{booking.to}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "#f8fafc", borderRadius: "8px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Seats</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{booking.seats.join(", ")}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Total Paid</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#10b981" }}>₹{booking.totalPrice.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: "16px", background: "#fef3c7", borderRadius: "12px", fontSize: "14px", color: "#92400e" }}>
              <strong>📧 Confirmation Email Sent!</strong> Check your email for your e-ticket and booking details.
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button
              style={{ padding: "16px 32px", background: "linear-gradient(135deg, #1e40af, #7c3aed)", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => window.print()}
            >
              🖨️ Print Ticket
            </button>
            <button
              style={{ padding: "16px 32px", background: "#f1f5f9", color: "#1e40af", border: "2px solid #e5e7eb", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => alert("Download feature coming soon!")}
            >
              📥 Download PDF
            </button>
          </div>
        </div>

        <style>{`
          @keyframes successPop {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
      {/* Navigation */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "16px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "28px" }}>✈️</span>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e40af", margin: 0 }}>SkyWings</h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
              <span style={{ fontWeight: "600", color: "#10b981" }}>Flight Selected</span>
            </div>
            <div style={{ width: "60px", height: "2px", background: "#10b981" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
              <span style={{ fontWeight: "600", color: "#10b981" }}>Seats Selected</span>
            </div>
            <div style={{ width: "60px", height: "2px", background: "#3b82f6" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#3b82f6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>3</div>
              <span style={{ fontWeight: "600", color: "#3b82f6" }}>Payment</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "24px" }}>
          {/* Payment Form */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "24px" }}>
                Passenger Details
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="John Doe"
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "24px" }}>
                Payment Method
              </h2>

              {/* Payment Method Toggle */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
                <button
                  onClick={() => setPaymentMethod("card")}
                  style={{
                    flex: 1,
                    padding: "16px",
                    border: paymentMethod === "card" ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                    borderRadius: "12px",
                    background: paymentMethod === "card" ? "#eff6ff" : "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: paymentMethod === "card" ? "#1e40af" : "#64748b"
                  }}
                >
                  💳 Card
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  style={{
                    flex: 1,
                    padding: "16px",
                    border: paymentMethod === "upi" ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                    borderRadius: "12px",
                    background: paymentMethod === "upi" ? "#eff6ff" : "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: paymentMethod === "upi" ? "#1e40af" : "#64748b"
                  }}
                >
                  📱 UPI
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="JOHN DOE"
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", textTransform: "uppercase" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setExpiryDate(value);
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                        CVV *
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        maxLength={3}
                        style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === "upi" && (
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", marginBottom: "16px" }}
                  />
                  <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", fontSize: "14px", color: "#64748b" }}>
                    <strong>Supported UPI Apps:</strong> Google Pay, PhonePe, Paytm, BHIM
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b", marginBottom: "20px" }}>
                Booking Summary
              </h3>

              <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>Flight Details</div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b" }}>{booking.airline}</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>{booking.flightNumber}</div>
                </div>
                <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "8px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>From</span>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>{booking.from}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>To</span>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>{booking.to}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>Date</span>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>{booking.date}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Time</span>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>{booking.departure} - {booking.arrival}</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Seats</span>
                  <span style={{ fontWeight: "600", color: "#1e293b" }}>{booking.seats.join(", ")}</span>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ color: "#64748b" }}>Base Fare</span>
                  <span style={{ fontWeight: "600", color: "#1e293b" }}>₹{booking.basePrice.toLocaleString()}</span>
                </div>
                {booking.seatCharges > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#64748b" }}>Seat Charges</span>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>+₹{booking.seatCharges.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ color: "#64748b" }}>Taxes & Fees</span>
                  <span style={{ fontWeight: "600", color: "#1e293b" }}>₹{Math.round(booking.totalPrice * 0.12).toLocaleString()}</span>
                </div>
                <div style={{ height: "1px", background: "#e5e7eb", margin: "16px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b" }}>Total Amount</span>
                  <span style={{ fontSize: "28px", fontWeight: "bold", color: "#1e40af" }}>
                    ₹{Math.round(booking.totalPrice * 1.12).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  marginBottom: "16px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(30,64,175,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Pay ₹{Math.round(booking.totalPrice * 1.12).toLocaleString()}
              </button>

              <div style={{ padding: "12px", background: "#fef3c7", borderRadius: "8px", fontSize: "12px", color: "#92400e", textAlign: "center" }}>
                🔒 Your payment is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}