import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuizCreator from "./pages/QuizCreator";
import ImageSolver from "./pages/ImageSolver";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <div className=''>
        <Routes>
          <Route path='/' element={<QuizCreator />} />
          <Route path='/quizpage' element={<QuizPage />} />
          <Route path='/image-solver' element={<ImageSolver />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
