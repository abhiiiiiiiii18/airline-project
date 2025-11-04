import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { flightAPI } from "../services/api";


interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  originalPrice?: number;
  availableSeats: number;
  aircraft: string;
  flightClass: string;
  stops: number;
  amenities: string[];
  rating: number;
  reviews: number;
}

interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  flightClass: string;
}

export default function FlightSearch() {
   const navigate = useNavigate();
  const departureDateRef = useRef<HTMLInputElement>(null);
  const returnDateRef = useRef<HTMLInputElement>(null);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    flightClass: "Economy",
    
  });
  
  const [showResults, setShowResults] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"price" | "departure" | "duration" | "rating">("price");
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all flights on component mount
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await flightAPI.getAll();
      
      // Transform backend data to match frontend format
      const transformedFlights = response.data.map((flight: any) => ({
        id: flight.id,
        flightNumber: flight.flight_number,
        airline: flight.airline,
        from: flight.from_airport.split('(')[0].trim(),
        fromCode: flight.from_airport.match(/\(([^)]+)\)/)?.[1] || '',
        to: flight.to_airport.split('(')[0].trim(),
        toCode: flight.to_airport.match(/\(([^)]+)\)/)?.[1] || '',
        departure: new Date(flight.departure_time).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        arrival: new Date(flight.arrival_time).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        duration: calculateDuration(flight.departure_time, flight.arrival_time),
        price: parseFloat(flight.price),
        availableSeats: flight.available_seats,
        aircraft: "Boeing 737",
        flightClass: "Economy",
        stops: 0,
        amenities: ["WiFi", "Meals", "Entertainment"],
        rating: 4.5,
        reviews: 100
      }));
      
      setAllFlights(transformedFlights);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr.getTime() - dep.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleDepartureDateClick = () => {
    if (departureDateRef.current) {
      departureDateRef.current.showPicker();
    }
  };

  const handleReturnDateClick = () => {
    if (returnDateRef.current) {
      returnDateRef.current.showPicker();
    }
  };

  const getFilteredFlights = () => {
    return allFlights.filter((flight) => {
      const matchesFrom = !searchParams.from || 
        flight.from.toLowerCase().includes(searchParams.from.toLowerCase()) ||
        flight.fromCode.toLowerCase().includes(searchParams.from.toLowerCase());
      
      const matchesTo = !searchParams.to || 
        flight.to.toLowerCase().includes(searchParams.to.toLowerCase()) ||
        flight.toCode.toLowerCase().includes(searchParams.to.toLowerCase());
      
      return matchesFrom && matchesTo;
    });
  };

  const sortedFlights = [...getFilteredFlights()].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "departure") return a.departure.localeCompare(b.departure);
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleSearch = async () => {
    if (searchParams.from && searchParams.to && searchParams.departureDate) {
      setShowResults(true);
      setLoading(true);
      
      try {
        // Try to search with API
        const response = await flightAPI.search({
          from: searchParams.from,
          to: searchParams.to,
          date: searchParams.departureDate
        });
        
        if (response.data.length > 0) {
          const transformedFlights = response.data.map((flight: any) => ({
            id: flight.id,
            flightNumber: flight.flight_number,
            airline: flight.airline,
            from: flight.from_airport.split('(')[0].trim(),
            fromCode: flight.from_airport.match(/\(([^)]+)\)/)?.[1] || '',
            to: flight.to_airport.split('(')[0].trim(),
            toCode: flight.to_airport.match(/\(([^)]+)\)/)?.[1] || '',
            departure: new Date(flight.departure_time).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
            arrival: new Date(flight.arrival_time).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
            duration: calculateDuration(flight.departure_time, flight.arrival_time),
            price: parseFloat(flight.price),
            availableSeats: flight.available_seats,
            aircraft: "Boeing 737",
            flightClass: "Economy",
            stops: 0,
            amenities: ["WiFi", "Meals", "Entertainment"],
            rating: 4.5,
            reviews: 100
          }));
          setAllFlights(transformedFlights);
        }
      } catch (error) {
        console.error('Error searching flights:', error);
        // Fallback to client-side filtering
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleSelectFlight = (flight: Flight) => {
  navigate('/booking', { state: { selectedFlight: flight } });
};

  const getAirlineLogo = (airline: string) => {
    const logos: Record<string, string> = {
      "Air India": "🔴",
      "IndiGo": "🔵",
      "SpiceJet": "🟠",
      "Vistara": "🟣",
    };
    return logos[airline] || "✈️";
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
      {/* Navigation Bar */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "16px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "28px" }}>✈️</span>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e40af", margin: 0 }}>SkyWings</h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Search Form */}
        {!showResults && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
                Book Your Flight
              </h2>
              <p style={{ color: "#64748b", fontSize: "18px" }}>Search and compare thousands of flights</p>
            </div>

            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", padding: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    From
                  </label>
                  <input
                    type="text"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
                    placeholder="City or airport"
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    To
                  </label>
                  <input
                    type="text"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="City or airport"
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    Departure Date
                  </label>
                  <input
                    ref={departureDateRef}
                    type="date"
                    value={searchParams.departureDate}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
                    onClick={handleDepartureDateClick}
                    min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", cursor: "pointer" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    Return Date (Optional)
                  </label>
                  <input
                    ref={returnDateRef}
                    type="date"
                    value={searchParams.returnDate}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                    onClick={handleReturnDateClick}
                    min={searchParams.departureDate || new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", cursor: "pointer" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    Passengers
                  </label>
                  <select
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, passengers: Number(e.target.value) }))}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    Class
                  </label>
                  <select
                    value={searchParams.flightClass}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, flightClass: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "16px", boxSizing: "border-box" }}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)", color: "white", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Search Flights
              </button>
            </div>
          </div>
        )}

        {/* Flight Results */}
        {showResults && (
          <div>
            {/* Header */}
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: "24px", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 8px 0" }}>
                    {searchParams.from} → {searchParams.to}
                  </h2>
                  <p style={{ color: "#64748b", margin: 0 }}>
                    {searchParams.departureDate} • {searchParams.passengers} Passenger{searchParams.passengers > 1 ? "s" : ""} • {sortedFlights.length} flights found
                  </p>
                </div>
                <button
                  onClick={() => setShowResults(false)}
                  style={{ padding: "12px 24px", background: "#f1f5f9", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", color: "#1e40af" }}
                >
                  ← Modify Search
                </button>
              </div>

              {/* Sort Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e5e7eb", flexWrap: "wrap" }}>
                <span style={{ fontWeight: "600", color: "#64748b", display: "flex", alignItems: "center" }}>Sort by:</span>
                {[
                  { value: "price", label: "Cheapest", icon: "💰" },
                  { value: "departure", label: "Earliest", icon: "🕐" },
                  { value: "duration", label: "Fastest", icon: "⚡" },
                  { value: "rating", label: "Best Rated", icon: "⭐" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    style={{
                      padding: "8px 16px",
                      background: sortBy === option.value ? "#1e40af" : "#f1f5f9",
                      color: sortBy === option.value ? "white" : "#64748b",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    {option.icon} {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flights List */}
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✈️</div>
                  <div style={{ fontSize: "18px", color: "#64748b", fontWeight: "600" }}>Searching for flights...</div>
                </div>
              </div>
            ) : sortedFlights.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sortedFlights.map((flight) => (
                  <div
                    key={flight.id}
                    style={{ background: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: "24px", transition: "all 0.3s" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {flight.originalPrice && (
                      <div style={{ display: "inline-block", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", marginBottom: "16px" }}>
                        🔥 Save ₹{(flight.originalPrice - flight.price).toLocaleString()}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
                      {/* Airline Info */}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: "200px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #dbeafe, #e0e7ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                          {getAirlineLogo(flight.airline)}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", margin: "0 0 4px 0" }}>
                            {flight.airline}
                          </h3>
                          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 4px 0" }}>{flight.flightNumber}</p>
                          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{flight.aircraft}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <span style={{ color: "#eab308" }}>{"⭐".repeat(Math.floor(flight.rating))}</span>
                            <span style={{ fontSize: "12px", color: "#64748b" }}>
                              {flight.rating} ({flight.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Flight Times */}
                      <div style={{ display: "flex", alignItems: "center", gap: "24px", flex: 1, justifyContent: "center", minWidth: "300px" }}>
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 4px 0" }}>{flight.departure}</p>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "#64748b", margin: "0 0 4px 0" }}>{flight.fromCode}</p>
                          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{flight.from}</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px" }}>
                          <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px 0", fontWeight: "600" }}>{flight.duration}</p>
                          <div style={{ width: "120px", height: "2px", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", position: "relative" }}>
                            <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", fontSize: "20px" }}>✈️</div>
                          </div>
                          <p style={{ fontSize: "11px", color: "#10b981", margin: "8px 0 0 0", fontWeight: "600", background: "#d1fae5", padding: "2px 8px", borderRadius: "12px" }}>
                            Non-stop
                          </p>
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: "0 0 4px 0" }}>{flight.arrival}</p>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "#64748b", margin: "0 0 4px 0" }}>{flight.toCode}</p>
                          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{flight.to}</p>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div style={{ textAlign: "right", minWidth: "180px" }}>
                        {flight.originalPrice && (
                          <p style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "line-through", margin: "0 0 4px 0" }}>
                            ₹{flight.originalPrice.toLocaleString()}
                          </p>
                        )}
                        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#1e40af", margin: "0 0 4px 0" }}>
                          ₹{flight.price.toLocaleString()}
                        </p>
                        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0" }}>{flight.flightClass}</p>

                        <button
                          onClick={() => handleSelectFlight(flight)}
                          style={{ width: "100%", padding: "12px 24px", background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(30,64,175,0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          Select Flight →
                        </button>

                        <p style={{ fontSize: "12px", color: flight.availableSeats < 20 ? "#ef4444" : "#10b981", margin: "8px 0 0 0", fontWeight: "600" }}>
                          {flight.availableSeats < 20 ? "⚠️" : "✅"} {flight.availableSeats} seats left
                        </p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e5e7eb", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {flight.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          style={{ padding: "6px 12px", background: "#f1f5f9", borderRadius: "6px", fontSize: "13px", color: "#475569", fontWeight: "500" }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: "white", borderRadius: "16px", padding: "60px", textAlign: "center" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
                <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>No flights found</h3>
                <p style={{ color: "#64748b", marginBottom: "24px" }}>Try adjusting your search criteria</p>
                <button
                  onClick={() => setShowResults(false)}
                  style={{ padding: "12px 32px", background: "#1e40af", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}
                >
                  ← Modify Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}