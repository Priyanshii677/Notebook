import Header from "../src/components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes";
import AccessPage from "./screens/AccessPage";
import "./css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <LandingPage /> */}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/mynotes' element={<MyNotes />} />
        <Route path='/access' element={<AccessPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
