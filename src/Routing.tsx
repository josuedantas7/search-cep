// react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// context
import { AddressProvider } from './context/AddressContex'

// components
import Notifier from "./components/Notifier/Notifier";
import { Header } from "./components/Header/Header";

// pages
import Home from './pages/Home';
import AddressList from "./pages/AddressList";
import NotFound from "./pages/NotFound";

export default function Routing() {
  return (
    <Router>
      <AddressProvider>
      <Header/>
      <Notifier/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista-de-enderecos" element={<AddressList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AddressProvider>
    </Router>
  );
}