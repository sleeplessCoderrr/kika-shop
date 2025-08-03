import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/layout/Navbar";

function App() {

  return (
    <div className="p-4 md:p-6 flex flex-col items-center bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <main className="mt-4 w-3/4 min-h-full items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default App
