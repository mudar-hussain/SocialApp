import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { likeCommentAction, unLikeCommentAction } from "../../Redux/Comment/Action";
import { isCommentLikedByReqUser } from "../../Config/Logics";
import { URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const CommentCard = ({comment, timeDifference}) => {
  const {user} = useSelector((store) => store);
  const [isCommentLike, setIsCommentLike] = useState(isCommentLikedByReqUser(comment, user.reqUser.id));
  const [likesCount, setLikesCount] = useState(comment.likedByUsers?.length);
  const dispatch = useDispatch();


  console.log("Comment: ", comment);

  const handleCommentLike = () => {
    setIsCommentLike(true);
    setLikesCount(likesCount+1);
    dispatch(likeCommentAction(comment.id));
  };

  const handleCommentUnLike = () => {
    setIsCommentLike(false);
    setLikesCount(likesCount-1);
    dispatch(unLikeCommentAction(comment.id));
  };

  useEffect(() => {
   setIsCommentLike(isCommentLikedByReqUser(comment, user?.reqUser?.id)); 
   
  },[comment,user?.reqUser]);

  return (
    <div>
      <div className="flex items-center justify-between py-4 mr-2">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src={comment.user?.profileImage || URL_NO_PROFILE_IMAGE}
              alt={comment.user?.username}
            />
          </div>
          <div className="ml-2">
            <p>
              <span className="font-semibold">{comment.user?.username}</span>

              <span className="ml-2">{comment.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{timeDifference(comment.createdAt)}</span>
              <span className="ml-2">
          {likesCount > 0 ? (
            likesCount === 1 ? <p>{"1 Like"}</p>:
          <p>{`${likesCount} Likes`}</p>) : <></>}
              </span>
            </div>
          </div>
        </div>

        {isCommentLike ? (
          <AiFillHeart
            className="text-xs hover:opacity-50 cursor-pointer text-red-600"
            onClick={handleCommentUnLike}
          />
        ) : (
          <AiOutlineHeart
            className="text-xs hover:opacity-50 cursor-pointer"
            onClick={handleCommentLike}
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
