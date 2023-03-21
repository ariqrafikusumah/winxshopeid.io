import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda";
import NavbarTop from "./components/NavbarTop";
import FooterBot from "./components/FooterBot";
import NotFound from "./pages/NotFound";
import Dashboard from "./admin/Dashboard";
import FreeFire from "./admin/Freefire";
import Mobilelegend from "./admin/Mobilelegend";
import Mobilelegends from "./pages/order/Mobilelegends";
import Category from "./admin/Category";
import Login from "./auth/Login";
import Freefire from "./pages/order/Freefire";
import TermsAndCondition from "./pages/TermAndCondition";
import Tentang from "./pages/Tentang";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Qris from "./admin/Qris";
import 'react-bootstrap';
import Bank from "./admin/Bank";
import Ewallet from "./admin/Ewallet";
import Pubgmobile from "./pages/order/Pubgmobile";
import PubgMobile from "./admin/Pubgmobile";
import HiggsDomino from "./admin/Higgsdomino";
import Higgsdomino from "./pages/order/Higgsdomino";
import Genshinimpact from "./admin/Genshinimpact";
import GenshinImpact from "./pages/order/Genshinimpact";
import BannerSetting from "./admin/BannerSetting";
import PopUp from "./admin/PopUp";
import Daftalayanan from "./pages/Daftalayanan";
import WhatsappSetting from "./admin/WhatsappSetting";
import Valorant from "./pages/order/Valorant";
import ValorantAdmin from "./admin/Valorant";
import ApiGames from "./admin/Apigames";
import Youtube from "./pages/order/Youtube";
import Netflix from "./pages/order/Netflix";
import YoutubeAdmin from "./admin/Youtube";

function App() {
  return (
    <Router>
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/Terms" element={<TermsAndCondition />} />
        <Route path="/Tentang" element={<Tentang />} />
        <Route path="/daftar-layanan" element={<Daftalayanan />} />
        <Route path="/admin/whatsapp-setting" element={<WhatsappSetting />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin/banner-setting" element={<BannerSetting />} />
        <Route path="/admin/pop-up" element={<PopUp />} />
        <Route path="/admin/qris" element={<Qris />} />
        <Route path="/admin/bank" element={<Bank />} />
        <Route path="/admin/e-wallet" element={<Ewallet />} />
        <Route path="/order/free-fire" element={<Freefire />} />
        <Route path="/admin/free-fire" element={<FreeFire/>} />
        <Route path="/order/pubg-mobile" element={<Pubgmobile/>} />
        <Route path="/admin/pubg-mobile" element={<PubgMobile/>} />
        <Route path="/admin/higgs-domino" element={<HiggsDomino/>} />
        <Route path="/order/higgs-domino" element={<Higgsdomino/>} />
        <Route path="/admin/genshin-impact" element={<Genshinimpact/>} />
        <Route path="/order/genshin-impact" element={<GenshinImpact/>} />
        <Route path="/admin/dashboard-admin" element={<Dashboard />} />
        <Route path="/admin/category-game" element={<Category />} />
        <Route path="/admin/mobile-legend" element={<Mobilelegend />} />
        <Route path="/order/mobile-legends" element={<Mobilelegends />} />
        <Route path="/order/valorant" element={<Valorant />} />
        <Route path="/order/youtube" element={<Youtube />} />
        <Route path="/admin/youtube" element={<YoutubeAdmin />} />
        <Route path="/order/netflix" element={<Netflix />} />
        <Route path="/admin/valorant" element={<ValorantAdmin />} />
        <Route path="/admin/api" element={<ApiGames />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterBot />
    </Router>
  );
}

export default App;
