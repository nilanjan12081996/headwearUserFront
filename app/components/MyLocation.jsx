"use client";

import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const MyLocation = () => {
  const [location, setLocation] = useState("Detecting location...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await res.json();

          const address = data.address;

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.state ||
            "";

          const state = address.state || "";
          const country = address.country || "";

          setLocation(`${city}, ${state}, ${country}`);
        } catch (error) {
          setLocation("Unable to detect location");
        }
      },
      () => {
        setLocation("Permission denied");
      }
    );
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-gray-300 min-w-0">
      <IoLocationOutline className="text-[#ed1c24] text-sm shrink-0" />
      <span className="text-xs truncate">
        <span className="hidden sm:inline">Location: </span>
        {location}
      </span>
    </div>
  );
};

export default MyLocation;