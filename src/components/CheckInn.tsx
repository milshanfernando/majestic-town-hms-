import { useFormik } from "formik";
import Button from "./Button";

const CheckInn = () => {
  const { handleBlur, handleChange, handleSubmit, values, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        id: "",
        roomType: "",
        email: "",
        phone: "",
        roomNo: "",
      },
      onSubmit: () => {
        resetForm();
      },
    });
  return (
    <>
      <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className=" uppercase text-xs font-semibold">
            Guest Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className=" uppercase text-xs font-semibold">
            ID/Passport No
          </label>
          <input
            id="id"
            name="id"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.id}
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className=" uppercase text-xs font-semibold">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className=" uppercase text-xs font-semibold">
            email address
          </label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className=" uppercase text-xs font-semibold">
            room type
          </label>
          <input
            id="roomType"
            name="roomType"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.roomType}
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="roomNo" className=" uppercase text-xs font-semibold">
            room number
          </label>
          <input
            id="roomNo"
            name="roomNo"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.roomNo}
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
          />
        </div>
        <div className=" col-span-2 flex  justify-end gap-2 py-2">
          <Button
            type="submit"
            name="Submit"
            style="bg-blue-600 text-white px-2 p-1 w-1/5"
          />
        </div>
      </form>
    </>
  );
};

export default CheckInn;
