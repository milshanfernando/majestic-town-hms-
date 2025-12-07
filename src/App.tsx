import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
// import AddRoomFormik from "./pages/AddRoom";
// import Reservations from "./pages/Reservations";
// import Rooms from "./pages/Rooms";
import {
  Bed,
  Users,
  LayoutDashboard,
  CalendarCheck,
  Settings,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RoomsGrid from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import GuestPage from "./pages/Guests";
import GuestHistory from "./pages/GuestHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

gsap.registerPlugin(ScrollTrigger, SplitText);
const queryClient = new QueryClient();

const App = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useGSAP(() => {
    gsap.set("#menu", { xPercent: -100 });

    if (isOpenMenu) {
      gsap.to("#menu", { xPercent: 0, ease: "bounce.inOut" });
    }
  }, [isOpenMenu]);

  return (
    <QueryClientProvider client={queryClient}>
      <main className=" relative px-15">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomsGrid />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/guests" element={<GuestPage />} />
          <Route path="/guests-history" element={<GuestHistory />} />
        </Routes>
        <div
          onClick={() => setIsOpenMenu((prev) => !prev)}
          className="w-10 h-10 p-2 bg-blue-950 absolute top-5 left-5 z-20 rounded-full"
        >
          <img
            className=" object-contain "
            src="../public/images/icons8-menu-96.png"
            alt=""
          />
        </div>

        <div
          id="menu"
          className=" h-dvh fixed top-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200 p-6 flex flex-col"
        >
          <div className="flex flex-col h-dvh justify-between">
            {/* Menu */}
            <nav
              onClick={() => setIsOpenMenu((prev) => !prev)}
              className="flex flex-col gap-2 text-gray-700 font-medium mt-15"
            >
              <button className="flex items-center gap-3 px-4 py-3 text-lg rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all">
                <LayoutDashboard className="w-6 h-6" />
                <Link to="/">Dashboard</Link>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 text-lg rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all">
                <Bed className="w-6 h-6" />
                <Link to="/rooms">Rooms</Link>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 text-lg rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all">
                <Users className="w-6 h-6" />
                <Link to="/guests">Guests</Link>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 text-lg rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all">
                <CalendarCheck className="w-6 h-6" />
                <Link to="/reservations">Reserve Room</Link>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 text-lg rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all">
                <Users className="w-6 h-6" />
                <Link to="/guests-history">Guests History</Link>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 text-lg rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all">
                <Settings className="w-6 h-6" />
                Settings
              </button>
            </nav>

            {/* Logo */}
            <div className="flex items-center gap-3 my-10 ">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="/images/logo.jpg"
                alt="Logo"
              />
              <h3 className="text-3xl font-bold text-gray-800">GoHaus</h3>
            </div>
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default App;
