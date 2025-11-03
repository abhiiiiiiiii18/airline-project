import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Services from "./pages/Services";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Flights />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Profile />} />
        <Route path="/services/:serviceType" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;