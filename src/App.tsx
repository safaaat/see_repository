import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  const [height, setHeight] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home addHeight={setHeight} />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <Footer height={height} />
      </Router>
    </>
  );
}

export default App;
