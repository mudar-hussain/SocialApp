import React from "react";
import { URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const SuggestionCard = ({ user }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="w-9 h-9 rounded-full"
          src={
            user.profileImage ||
            URL_NO_PROFILE_IMAGE
          }
          alt={user.username}
        />
        <div className="ml-2">
          <p className="text-sm font-semibold">{user.username}</p>
          <p className="text-sm font-semibold opacity-70">Follows you</p>
        </div>
      </div>
      <p className="text-blue-700 text-sm font-semibold">Follow</p>
    </div>
  );
};

export default SuggestionCard;
