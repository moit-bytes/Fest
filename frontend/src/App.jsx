import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Footer from "./Components/Footer";
import RegisterPage from "./Components/RegisterPage";
import "./App.css";
import Navbar from './Components/Navbar';
import StarfieldBackground from './Background/StartfieldBackground';
import AboutEternia from './Components/AboutEternia';
import AboutEterniaLogo from './Components/AboutEterniaLogo';
import VideoLogoComponent from './Components/VideoLogoComponent';
import Cards from './Components/Cards';
import EventHighlights from './Components/EventHighlights';

import ExpirePayment from './Components/ExpirePayment';
import PaymentTable from './Components/PaymentTable';
import Terms from './Pages/Terms';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import SportsEvent from './Pages/Events/SportsEvent';
import Literary from './Pages/Events/Literary';
import Informal from './Pages/Events/Informal';
import Creative from './Pages/Events/Creative';
import Esports from './Pages/Events/Esports';
import Login from './Pages/Login';
import EventPaymentTable from './Components/EventPaymentTable';
import Cultural from './Pages/Events/Cultural';
import SpecialEvents from './Components/SpecialEvents';
export default function App() {
  return (
    <RecoilRoot>
      <div className="font-inter bg-[url('/pattern.png')] bg-cover text-slate-100">
        <Router>
          {/* <Header /> */}
          <main className="pt-24">
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <StarfieldBackground />
                    <Navbar />
                    <VideoLogoComponent />
                    <AboutEternia />
                    <AboutEterniaLogo />
                    <EventHighlights />
                    <SpecialEvents />
                    <Cards />
                    <RegisterPage />
                  </>
                }
              />

              {/* Register Page */}
              <Route path="/login" element={<Login />} />
              <Route path="/expire" element={<ExpirePayment />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              {/* Data Page */}
              <Route path="/data" element={<PaymentTable />} />
              <Route path="/eventData" element={<EventPaymentTable />} />

              {/* Event pages */}
              <Route path="/sports" element={<SportsEvent />} />
              <Route path="/literary" element={<Literary />} />
              <Route path="/informal" element={<Informal />} />
              <Route path="/esports" element={<Esports />} />
              <Route path="/creative" element={<Creative />} />
              <Route path="/cultural" element={<Cultural />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </div>
    </RecoilRoot>
  );
}
