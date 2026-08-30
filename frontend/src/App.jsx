import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TopNavBar from "./components/Navbar";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Services from "./pages/Services";
import ContactForm from "./components/ContactForm";
import WhatsAppWidget from "./components/SocialWidgets";
import { LanguageProvider } from "./context/LanguageContext";
import AdminCMS from "./pages/Admin";
import { ContentProvider } from "./context/ContentProvider";
import Footer from "./components/Footer";

function AppLayout() {
  const location = useLocation();

  const isAdminPage = location.pathname === "/binesAdmin";

  return (
    <>
      {!isAdminPage && <TopNavBar />}
      {!isAdminPage && <WhatsAppWidget />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/binesAdmin" element={<AdminCMS />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <ContentProvider>
          <AppLayout />
        </ContentProvider>
      </LanguageProvider>
    </Router>
  );
}
