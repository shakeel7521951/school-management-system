import React from "react";
import AnnouncementCard from "./AnnouncementCard";

const AnnouncementList = ({ announcements }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <ul className="space-y-5">
        {announcements.map((a, index) => (
          <AnnouncementCard key={a.id} announcement={a} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementList;
