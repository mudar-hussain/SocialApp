import React, { useEffect } from "react";
import ProfileUserDetals from "../../Components/ProfileComponents/ProfileUserDetals";
import UserPostSection from "../../Components/ProfileComponents/UserPostSection";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isFollowing, isReqUser } from "../../Config/Logics";
import {
  findUserByUsernameAction,
} from "../../Redux/User/Action";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  console.log("In Profile: user: ", user);

  // const jwtToken = localStorage.getItem("token");
  // useEffect(()=>{
  //   if (jwtToken) {
  //     dispatch(getUserProfileAction(jwtToken));
  // }
  // },[jwtToken])

  // useEffect(()=>{
  //   if(user.reqUser === null){
  //     navigate("/login");
  //   }else{
  //   let savedPostIds = [];
  //   if (user.reqUser && user.reqUser.savedPosts?.length)
  //     savedPostIds = user.reqUser?.savedPosts;

  //   console.log("In Profile: savedPostIds: ", savedPostIds);
  //   if (savedPostIds.length > 0) {
  //     const data = {
  //       jwtToken: jwtToken,
  //       postIds: savedPostIds,
  //     };
  //     dispatch(findAllSavedPostAction(data));
  //   }
  // }
  // },[user.reqUser])


  

  const { username } = useParams();
  console.log("In Profile: username: ", username);
  useEffect(()=>{
    if (username) {
      dispatch(findUserByUsernameAction(username));
    }
  },[username])
  
  let isRequser = true;
  let isFollowed = true;
  if(user.findByUsername?.id){
    isRequser = isReqUser(user.reqUser?.id, user.findByUsername?.id);
    isFollowed = isFollowing(user.reqUser, user.findByUsername);
  }

  // console.log("In Profile: username: ", username);

  // useEffect(() => {
  //   const data = {
  //     jwtToken: jwtToken,
  //     username: username,
  //   };
  //   //dispatch(getUserProfileAction(jwtToken));
  //   dispatch(findUserByUsernameAction(data));
  //   isRequser = isReqUser(user.reqUser?.id, user.findByUsername?.id);
  // }, [username]);

  return (
    <div className="px-20">
      <div>
        <ProfileUserDetals
          user={isRequser ? user.reqUser : user.findByUsername}
          isFollowing={isFollowed}
          isRequser={isRequser}
        />
      </div>
      <div>
        <UserPostSection
          userPosts={
            isRequser ? user.reqUser?.posts : user.findByUsername?.posts
          }
          userSavedPosts={
            isRequser ? user.userSavedPost : []
          }
          isRequser={isRequser}
        />
      </div>
    </div>
  );
}

export default Profile;
