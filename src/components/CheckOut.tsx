import Button from "./Button";

const CheckOut = () => {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex gap-2">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Search by name"
          className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
        />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Search by Room"
          className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
        />
        <Button name="Search" style={`bg-blue-600 text-white px-2 p-1`} />
      </div>
      <div className="flex">
        <div className="bg-white p-2 px-5 w-4/5 rounded-[10px] flex gap-2">
          <h3 className="text-sm font-semibold flex-3">Jone Doe</h3>
          <h3 className="text-sm font-semibold flex-3">MS01</h3>
          <h3 className="text-sm font-semibold flex-3">DEC 01 : 14:30:12</h3>
        </div>
      </div>
      <hr className="my-2 border border-blue-200" />
      <div>
        <h3 className=" font-semibold">Service List</h3>

        <div className="flex justify-between">
          <h3>Room cost</h3>
          <h3>AED 180</h3>
        </div>
        <div className="flex justify-between">
          <h3>Extra water bottle</h3>
          <h3>AED 5</h3>
        </div>
      </div>

      <hr className="my-2 border border-blue-200" />

      <div className="flex justify-between">
        <h3>Total Cost</h3>
        <h3>AED 185</h3>
      </div>

      <hr className="my-2 border border-blue-200" />

      <div className="flex justify-end gap-2">
        <Button
          name="Print Summary"
          style={`bg-blue-600 text-white px-2 p-1`}
        />
        <Button name="Proceed" style={`bg-blue-600 text-white px-2 p-1`} />
      </div>
    </div>
  );
};

export default CheckOut;
