import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">FitHub</span>
          </Link>
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-white hover:text-pink-200 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/workouts"
              className="text-white hover:text-pink-200 transition-colors"
            >
              Workouts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
