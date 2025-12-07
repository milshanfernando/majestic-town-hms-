import { useGSAP } from "@gsap/react";
import Card from "../components/Card";
import Table from "../components/Table";
import gsap from "gsap";
import { useState } from "react";
import QuickActions from "../components/QuickActions";
import { useHotelStore } from "../utility/store";
import {
  getTodayAvailableCountWithoutReservation,
  getTodayCheckedIn,
  getTodayReservedRooms,
  getTodayStays,
  getTodayStaysCount,
  haveToCheckOutCount,
} from "../utility/functions";

export type GuestInRoom = {
  propertyId: number;
  room: number | null;
  type: string;
  guestName: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  dueAmount: number;
};

const Dashboard = () => {
  const allocatedRooms = useHotelStore((s) => s.allocatedRooms);
  const todaysRooms = getTodayStays(
    allocatedRooms,
    new Date().toLocaleDateString("en-CA")
  );

  const rooms = useHotelStore((state) => state.rooms);
  const todayInHouse = getTodayStaysCount(rooms);
  const todayReservations = getTodayReservedRooms(allocatedRooms);
  const todayAvailableRooms =
    getTodayAvailableCountWithoutReservation(rooms) - todayReservations;
  const haveToCheckoutToday = haveToCheckOutCount(allocatedRooms);

  const todayCheckedIn = getTodayCheckedIn(allocatedRooms);

  console.log(todaysRooms, allocatedRooms);

  const [isOpenQA, setIsOpenQA] = useState(false);
  useGSAP(() => {
    gsap.set("#qa", {
      width: "40px",
      height: "40px",
      opacity: 1,
    });

    gsap.set(".btn", { xPercent: 500, opacity: 0 });

    if (isOpenQA) {
      gsap.to("#qa", {
        opacity: 1,
        width: "600px",
        height: "auto",
        padding: "20px",
        ease: "bounce.out",
        duration: 0.3,
      });

      gsap.to(".btn", {
        stagger: 0.06,
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.3,
      });
    }
  }, [isOpenQA]);
  return (
    <section className="relative h-dvh flex md:flex-row flex-col gap-2">
      <div className="md:grow-10 flex flex-col md:flex-row gap-2 h-full md:items-stretch">
        <div className="bg-gray-100 rounded-2xl md:w-full md:flex-6 p-5 flex flex-col gap-2">
          <h3 className=" font-semibold text-sm uppercase p-2">
            Majestic Town - 401 (Overview)
          </h3>
          <div className="bg-white rounded-2xl flex md:flex-wrap gap-2 p-2">
            <Card
              title={"In-House"}
              icon={
                "https://img.icons8.com/glyph-neue/64/FFFFFF/door-sensor-checked.png"
              }
              precentage={25}
              growUp={true}
              count={todayInHouse}
              bgColor="bg-green-100"
              iconBgColor="bg-green-700"
            />
            <Card
              title={"Check-Out"}
              icon={
                "https://img.icons8.com/ios-filled/100/FFFFFF/pull-door.png"
              }
              precentage={23}
              growUp={false}
              count={haveToCheckoutToday}
              bgColor="bg-red-100"
              iconBgColor="bg-red-700"
            />
            <Card
              title={"Checked-In"}
              icon={
                "https://img.icons8.com/ios-filled/100/FFFFFF/checked--v1.png"
              }
              precentage={23}
              growUp={false}
              count={todayCheckedIn}
              bgColor="bg-purple-100"
              iconBgColor="bg-purple-700"
            />
            {/* <Card
              title={"Have Checked-In"}
              icon={
                "https://img.icons8.com/ios-filled/100/FFFFFF/break--v1.png"
              }
              precentage={23}
              growUp={false}
              count={todayCheckedIn}
              bgColor="bg-orange-100"
              iconBgColor="bg-orange-700"
            /> */}
            <Card
              title={"Available"}
              icon={"https://img.icons8.com/glyph-neue/64/FFFFFF/bed.png"}
              precentage={1}
              growUp={false}
              count={todayAvailableRooms}
              bgColor="bg-blue-100"
              iconBgColor="bg-blue-700"
            />
            <Card
              title={"Reserved rooms"}
              icon={
                "https://img.icons8.com/ios-filled/100/FFFFFF/calendar--v1.png"
              }
              precentage={34}
              growUp={true}
              count={todayReservations}
              bgColor="bg-yellow-100"
              iconBgColor="bg-yellow-700"
            />
          </div>
        </div>
        <div className=" bg-gray-100 rounded-2xl md:w-full md:flex-6 flex flex-col gap-2 p-5">
          <h3 className=" font-semibold text-sm uppercase p-2">Guest List</h3>

          {allocatedRooms && <Table data={todaysRooms} />}
        </div>
      </div>

      <div
        id="qa"
        className="absolute z-30 top-10 right-10 rounded-[20px] overflow-hidden bg-blue-300/30 backdrop-blur-sm border border-white "
      >
        <img
          className=" absolute right-0 top-0 w-[40px] h-auto"
          src={`${
            isOpenQA
              ? "https://img.icons8.com/fluency/48/cancel.png"
              : "https://img.icons8.com/color/96/plus--v1.png"
          }`}
          alt=""
          onClick={() => setIsOpenQA((prev) => !prev)}
        />
        <QuickActions />
      </div>
    </section>
  );
};

export default Dashboard;
