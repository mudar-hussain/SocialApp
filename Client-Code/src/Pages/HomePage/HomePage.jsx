import React, { useEffect, useState } from "react";
import StoryCircle from "../../Components/Story/StoryCircle";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { findUserPostAction } from "../../Redux/Post/Action";
// import { getUserProfileAction } from "../../Redux/User/Action";
import { findFollowingUserStory } from "../../Redux/Story/Action";

const HomePage = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  // const jwtToken = localStorage.getItem("token");
  // if(jwtToken){
  //   dispatch(getUserProfileAction(jwtToken));
  // }
  // useEffect(() => {
  //   if (jwtToken) dispatch(getUserProfileAction(jwtToken));
  // }, [dispatch]);

  const { user, post, story } = useSelector((store) => store);
  const [userIds, setUserIds] = useState([user.reqUser?.id]);

  console.log("In HomePage: user: ", user);
  console.log("In HomePage: post: ", post);
  console.log("In HomePage: story: ", story);

  useEffect(() => {
    console.log("user: ", user.reqUser);
    const newIds = user.reqUser?.following?.map((u) => u.id);
    console.log("1. newIds: ", newIds);
    if (newIds === null || newIds === undefined || newIds.length === 0) {
      setUserIds([user.reqUser?.id]);
      console.log("2. userIds: ", userIds);
    } else {
      setUserIds([user.reqUser?.id, ...newIds]);
      console.log("3. userIds: ", userIds);
    }
  }, [user.reqUser]);

  useEffect(() => {
    
    dispatch(findUserPostAction(userIds));
    dispatch(findFollowingUserStory(userIds));
  }, [userIds, post.createdPost, post.deletedPost]);

  return (
    <div>
      <div className="flex mt-10 w-[100%] justify-center">
        <div className="w-[54%] px-10">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
            <StoryCircle user={user.reqUser} />
            {story.followingStories.map((item) => (
              <StoryCircle user={item.user} />
            ))}
          </div>
          <div className="space-y-10 w-full mt-10">
            {post.userPost.length > 0 &&
              post.userPost.map((item) => <PostCard post={item} />)}
          </div>
        </div>
        <div className="w-[30%]">
          <HomeRight reqUser={user.reqUser} users={user.suggestionUser} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
