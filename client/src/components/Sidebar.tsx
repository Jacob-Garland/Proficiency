import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Friend {
  id: string;
  username: string;
  profilePic?: string;
}

interface SidebarProps {
  friends: Friend[];
}

const Sidebar: React.FC<SidebarProps> = ({ friends }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 shadow-md p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {isOpen ? "◀" : "▶"}
      </button>

      {/* Friends List */}
      {isOpen && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Friends</h3>
          <ul className="mt-2 space-y-2">
            {friends.map((friend) => (
              <li key={friend.id} className="flex items-center space-x-2">
                <img
                  src={friend.profilePic || "/default-profile.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <Link
                  to={`/profile/${friend.id}`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
                >
                  {friend.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;