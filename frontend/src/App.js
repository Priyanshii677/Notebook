import Header from "../src/components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import "./css/bootstrap.min.css";
function App() {
  return (
    <div className='App'>
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
