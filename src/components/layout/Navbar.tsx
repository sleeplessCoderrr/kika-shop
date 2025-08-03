import { Link } from "@tanstack/react-router";
import Heading from "../typography/Heading";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <header className="mb-6 w-3/4 flex flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
            <Heading
                content="Kika Store"
                size="medium"
                align="center"
                className="font-bold text-gray-900"
            />
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