import { haveToCheckIn, haveToCheckOut } from "../utility/functions";
import type { AllocatedRoom } from "../utility/types";

type Props = {
  data: AllocatedRoom[];
};

const Table = ({ data }: Props) => {
  return (
    <div className="relative overflow-x-auto bg-white shadow-xs rounded-2xl">
      <table className="w-full text-xs text-left rtl:text-right text-body">
        <thead className="text-xs text-body border-b border-gray-300">
          <tr>
            <th scope="col" className="px-6 py-2 font-medium">
              Guest Name
            </th>
            <th scope="col" className="px-6 py-2 font-medium">
              Room
            </th>
            <th scope="col" className="px-6 py-2 font-medium">
              Type
            </th>
            <th scope="col" className="px-6 py-2 font-medium">
              Check In
            </th>
            <th scope="col" className="px-6 py-2 font-medium">
              Check Out
            </th>
            <th scope="col" className="px-6 py-2 font-medium">
              Due Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(
            (
              { room, type, guestName, checkIn, checkOut, dueAmount, status },
              index
            ) => (
              <tr
                className={` ${
                  data.length == index + 1 ? "" : "border-b"
                }   border-gray-300 hover:bg-gray-100 `}
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-heading whitespace-nowrap"
                >
                  {guestName}
                </th>
                <td className="px-6 py-2">{room}</td>
                <td className="px-6 py-2">{type}</td>
                <td className="px-6 py-2 whitespace-nowrap">{checkIn}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {" "}
                  <span
                    className={`${
                      haveToCheckOut(status, checkOut)
                        ? "bg-yellow-600 text-white px-2 rounded-full "
                        : haveToCheckIn(status, checkIn) &&
                          "bg-green-600 text-white px-2 rounded-full "
                    } `}
                  >
                    {" "}
                    {checkOut}
                  </span>
                </td>
                <td className="px-6 py-2">{dueAmount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
