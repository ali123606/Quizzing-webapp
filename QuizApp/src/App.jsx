import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuizCreator from "./pages/QuizCreator";
import ImageSolver from "./pages/ImageSolver";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto my-6">
        <Routes>
          <Route path="/" element={<QuizCreator />} />
          <Route path="/image-solver" element={<ImageSolver />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
