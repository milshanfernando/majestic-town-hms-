import { useState } from "react";
import GuestDetails from "../components/GuestDetails";
import GuestList from "../components/GuestList";

export default function GuestPage() {
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-6 tracking-wide text-gray-800">
        Guest Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Guest List */}
        <div className="md:col-span-1">
          <GuestList onSelect={(id) => setSelectedGuest(id)} />
        </div>

        {/* Guest Details */}
        <div className="md:col-span-2">
          {selectedGuest ? (
            <GuestDetails guestId={selectedGuest} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
              Select a guest to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
