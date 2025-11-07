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
import Login from './Pages/Login';
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

              {/* Event pages */}
              <Route path="/sports" element={<SportsEvent />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </div>
    </RecoilRoot>
  );
}
