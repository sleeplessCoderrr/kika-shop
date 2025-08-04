import logoLight from "@/assets/kika-light.png";
import logoDark from "@/assets/kika-dark.png";
import { Link } from "@tanstack/react-router";
import Heading from "../typography/Heading";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <header className="mb-6 w-3/4 flex flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
            <div className="flex flex-row gap-6 justify-center items-center">
                <img
                    src={document.documentElement.classList.contains("dark") ? logoDark : logoLight}
                    alt="Kika Store Logo"
                    className="h-10 w-10 mb-2"
                />
                <Heading
                    content="Kika Store"
                    size="small"
                    align="center"
                    className="font-bold text-gray-900"
                />
            </div>
        </Link>
        <nav>
            <ul className="flex justify-center space-x-4">
                <Link to="/cart">
                    <ShoppingCart />
                </Link>
            </ul>
        </nav>
    </header>
  );
}

export default Navbar;