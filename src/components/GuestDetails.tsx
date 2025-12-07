import { useHotelStore } from "../utility/store";

type Props = {
  guestId: string;
};
export default function GuestDetails({ guestId }: Props) {
  const guests = useHotelStore((state) => state.guests);
  const guest = guests.find((g) => g.id === guestId);

  if (!guest)
    return <p className="text-center text-gray-500">Guest not found</p>;

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
          {guest.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{guest.name}</h2>
          <p className="text-gray-500 text-sm">{guest.nationality}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="text-xs text-gray-400">ID / Passport</p>
          <p className="font-medium">{guest.id}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="text-xs text-gray-400">Phone</p>
          <p className="font-medium">{guest.phone}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="text-xs text-gray-400">Email</p>
          <p className="font-medium break-all">{guest.email}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="text-xs text-gray-400">Nationality</p>
          <p className="font-medium">{guest.nationality}</p>
        </div>
      </div>
    </div>
  );
}
