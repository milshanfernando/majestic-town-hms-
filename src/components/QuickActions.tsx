import { useState } from "react";
import Button from "./Button";
import CheckInn from "./CheckInn";
import CheckOut from "./CheckOut";
import ReservationComponent from "./ReservationComponent";

const QuickActions = () => {
  const [tab, setTab] = useState("");
  return (
    <>
      <div className="flex justify-between">
        <h3 className=" font-semibold text-xl p-2 mb-2">Quick Actions</h3>
      </div>
      <div className=" flex gap-2 mb-2">
        <Button
          onClick={() => setTab("check-inn")}
          name="Check Inn"
          style={`btn ${
            tab == "check-inn"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }   px-2 p-1`}
        />
        <Button
          onClick={() => setTab("check-out")}
          name="Check Out"
          style={`btn ${
            tab == "check-out"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }   px-2 p-1`}
        />
        <Button
          onClick={() => setTab("res")}
          name="Reservation"
          style={`btn ${
            tab == "res"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }   px-2 p-1`}
        />
      </div>
      <div className=" py-4">
        {tab == "check-inn" && <CheckInn />}
        {tab == "check-out" && <CheckOut />}
        {tab == "res" && <ReservationComponent />}
      </div>
    </>
  );
};

export default QuickActions;
