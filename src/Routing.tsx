// react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// context
import { AddressProvider } from './context/AddressContex'

// pages
import Home from './pages/Home';
import Notifier from "./components/Notifier/Notifier";

export default function Routing() {
  return (
    <Router>
      <AddressProvider>
      <Notifier/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AddressProvider>
    </Router>
  );
}