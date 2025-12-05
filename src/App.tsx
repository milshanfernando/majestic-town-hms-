import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AddRoomFormik from "./pages/AddRoom";
import Reservations from "./pages/Reservations";
import Rooms from "./pages/Rooms";
import Dashboard from "./pages/Dashboard";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <>
      <main>
        <Dashboard />
      </main>
      <main>
        <Rooms />
      </main>
      <main>
        <Reservations />
      </main>
      <main>
        <AddRoomFormik />
      </main>
    </>
  );
};

export default App;
