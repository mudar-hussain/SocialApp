import React, { useEffect, useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiBookMarkLine, RiVideoAddLine } from "react-icons/ri";
import UserPostCard from "./UserPostCard";

function UserPostSection({ userPosts, userSavedPosts, isRequser }) {
  const [activeTab, setActiveTab] = useState("Post");
  console.log("In UserPostSection: userPosts: ", userPosts);
  console.log("In UserPostSection: userSavedPosts: ", userSavedPosts);

  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable></AiOutlineTable>,
      activeTab: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine></RiVideoAddLine>,
      activeTab: "",
    },
    {
      tab: "Saved",
      icon: <RiBookMarkLine></RiBookMarkLine>,
      activeTab: "",
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser></AiOutlineUser>,
      activeTab: "",
    },
  ];

  // useEffect(() => {

  //   if (user) {
  //     const data = {
  //       jwtToken: jwtToken,
  //       userId: user.id,
  //       postIds: user.savedPosts,
  //     };

  //     dispatch(reqUserPostAction(data));

  //     console.log("user.savedPost = ", user.savedPosts);

  //     dispatch(findAllPostAction(data));
  //   }
  // }, [user, post.createdPost, post.savedPost, post.unsavedPost]);

  return (
    <div>
      <div className="flex space-x-14 border-t relative ">
        {tabs.map((item) => (
          (item.tab !== "Saved" || isRequser) ?
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex item-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className="ml-1">{item.tab}</p>
          </div>
          :
          <></>
        ))}
      </div>
      <div className="flex flex-wrap">
        {activeTab === "Post"
          ? userPosts?.map((item) => <UserPostCard post={item} />)
          : userSavedPosts?.map((item) => <UserPostCard post={item} />)}
      </div>
    </div>
  );
}

export default UserPostSection;
