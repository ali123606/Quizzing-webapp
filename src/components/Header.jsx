import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Quiz App</h1>
      <nav>
        <Link to="/" className="mx-4">Quiz Creator</Link>
        <Link to="/image-solver" className="mx-4">Image Solver</Link>
      </nav>
    </header>
  );
};

export default Header;
