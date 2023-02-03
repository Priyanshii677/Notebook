import Header from "../src/components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes";
import "./css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <LandingPage /> */}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/mynotes' element={<MyNotes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
