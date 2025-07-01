import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/home";
import About from "./pages/about/about";
import History from "./pages/history/history";
import Contact from "./pages/contact/contact";
import FAQ from "./pages/faq/faq";
import Cancel from "./pages/cancel/cancel";
import Terms from "./pages/terms/terms";
import Privacy from "./pages/priv/priv";
import Login from "./pages/Home/login";
import Flight from "./pages/flight/flight";
import Rent from "./pages/rent/rental";
import AdminDashboard from "./pages/admin/admin";
import NotFound from "./pages/NotFound/NotFound"; // Recommended: Add a 404 page

function App() {
  return (
    <Router basename="/">
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/flight" element={<Flight />} />
            <Route path="/rentals" element={<Rent />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Recommended: Add a catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;