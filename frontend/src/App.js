import Header from "../src/components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MyNotes from "./screens/MyNotes";
import AccessPage from "./screens/AccessPage";
import CreateNote from "./screens/CreateNote/CreateNote.js";
import SingleNote from "./screens/CreateNote/SingleNote.js";

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
        <Route path='/createnote' element={<CreateNote />} />
        <Route path='/note/:id' element={<SingleNote />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
