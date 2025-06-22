import React from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { URL_NO_PROFILE_IMAGE } from "../../Config/Constants";


function ProfileUserDetals({ user, isFollowing, isRequser}) {

const navigate = useNavigate();


  return (
    <div className="py-10 w-full border-bottom">
      <div className="flex items-center">
        <div className="w-[15%]">
          <img
            className="w-32 h-32 rounded-full"
            src={
                          user?.profileImage ||
                          URL_NO_PROFILE_IMAGE 
                          
                        }
                        alt={user?.username}
          />
        </div>

        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>{user?.username}</p>
            <button onClick={()=> navigate("/account/edit")}>Edit Profile</button>
            <TbCircleDashed></TbCircleDashed>
          </div>
          <div className="flex space-x-10 items-center">
            <div>
              <span className="font-semibold mr-2">{user?.posts?.length}</span>
              <span>posts</span>
            </div>
            <div>
              <span className="font-semibold mr-2">{user?.followers?.length}</span>
              <span>follower</span>
            </div>
            <div>
              <span className="font-semibold mr-2">{user?.following?.length}</span>
              <span>following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="font-thin text-sm">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserDetals;
