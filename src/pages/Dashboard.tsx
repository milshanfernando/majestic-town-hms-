import { useGSAP } from "@gsap/react";
import Button from "../components/Button";
import Card from "../components/Card";
// import CheckInn from "../components/CheckInn";
import Table from "../components/Table";
import gsap from "gsap";
import { useState } from "react";
const Dashboard = () => {
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
        width: "auto",
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
    <section className="relative h-dvh flex gap-2">
      <div className="grow-10 flex gap-2 h-full items-stretch">
        <div className="bg-gray-100 rounded-2xl w-full flex-5 p-5 flex flex-col gap-2">
          <h3 className=" font-semibold text-xl p-2">
            Majestic Town - 401 (Overview)
          </h3>
          <div className="bg-white rounded-2xl grid grid-cols-2 gap-2 p-2">
            <Card
              title={"Check Inns"}
              icon={
                "https://img.icons8.com/glyph-neue/64/FFFFFF/door-sensor-checked.png"
              }
              precentage={25}
              growUp={true}
              count={34}
              bgColor="bg-green-100"
              iconBgColor="bg-green-700"
            />
            <Card
              title={"Check Outs"}
              icon={
                "https://img.icons8.com/ios-filled/100/FFFFFF/pull-door.png"
              }
              precentage={23}
              growUp={false}
              count={11}
              bgColor="bg-red-100"
              iconBgColor="bg-red-700"
            />
            <Card
              title={"Available Rooms"}
              icon={"https://img.icons8.com/glyph-neue/64/FFFFFF/bed.png"}
              precentage={29}
              growUp={false}
              count={21}
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
              count={12}
              bgColor="bg-yellow-100"
              iconBgColor="bg-yellow-700"
            />
          </div>
        </div>
        <div className=" bg-gray-100 rounded-2xl w-full flex-7 flex flex-col gap-2 p-5">
          <h3 className=" font-semibold text-xl p-2">Guest List</h3>
          <Table />
          {/* <div className="bg-white rounded-2xl grid grid-cols-2 gap-2 p-2">

          </div> */}
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
        <div className="flex justify-between">
          <h3 className=" font-semibold text-xl p-2 mb-2">Quick Actions</h3>
        </div>
        <div className=" flex gap-2 mb-2">
          <Button
            name="Check Inn"
            style="btn bg-green-600 text-white px-2 p-1"
          />
          <Button name="Check Out" style="btn bg-red-600 text-white px-2 p-1" />
          <Button
            name="Reservation"
            style="btn bg-yellow-600 text-white px-2 p-1"
          />
        </div>
        <div className=" py-5">{/* <CheckInn /> */}</div>
      </div>
    </section>
  );
};

export default Dashboard;
