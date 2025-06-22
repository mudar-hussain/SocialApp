import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import "./PostCard.css";
import CommentModal from "../Comment/CommentModal";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  savedPostAction,
  unLikePostAction,
  unSavedPostAction,
} from "../../Redux/Post/Action";
import {
  isPostLikedByReqUser,
  isPostSavedByReqUser,
} from "../../Config/Logics";
import { useNavigate } from "react-router-dom";
import { URL_IMAGE_BROKEN, URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const PostCard = ({ post }) => {
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(
    isPostLikedByReqUser(post, user.reqUser?.id)
  );
  const [likesCount, setLikesCount] = useState(post.likedByUsers?.length);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [isSaved, setIsSaved] = useState(
    isPostSavedByReqUser(user.reqUser, post.id)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handlePostLike = () => {
    setIsPostLiked(true);
    dispatch(likePostAction(post?.id));
    setLikesCount(likesCount + 1);
  };
  const handlePostUnLike = () => {
    setIsPostLiked(false);
    dispatch(unLikePostAction(post?.id));
    setLikesCount(likesCount - 1);
  };
  const handleSavedPost = () => {
    setIsSaved(true);
    dispatch(savedPostAction(post?.id));
  };
  const handleUnSavedPost = () => {
    setIsSaved(false);
    dispatch(unSavedPostAction(post?.id));
  };
  const handleOpenCommentModal = () => {
    navigate(`/comment/${post.id}`);
    onOpen();
  };
  const handleCloseCommentModal = () => {
    navigate(`/`);
    onClose();
  };

  useEffect(() => {
    setIsPostLiked(isPostLikedByReqUser(post, user.reqUser?.id));
    setIsSaved(isPostSavedByReqUser(user.reqUser, post.id));
    setCommentsCount(post.commentsCount);
    setLikesCount(post.likedByUsers?.length);
  }, [post, user.reqUser]);

  return (
    <div>
      <div className="border rounded-md w-full">
        {/* Post Header */}
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={post.singlePost?.user?.profileImage || URL_NO_PROFILE_IMAGE}
              alt={post.singlePost?.user?.username}
            />
            <div className="pl-2">
              <p className="font-semibold text-sm">{post.user?.username}</p>
              <p className="font-thin text-sm">{post.location}</p>
            </div>
          </div>
          <div className="cursor-pointer dropdown">
            <BsThreeDots className="dots" onClick={handleClick} />
            <div className="dropdown-content">
              {showDropdown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Post Image */}
        <div className="w-full">
          <img
            className="w-full"
            src={post?.postImage || URL_IMAGE_BROKEN}
            alt=""
          />
        </div>

        {/* Post Footer Button */}
        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLiked ? (
              <AiFillHeart
                className="text-xl hover:opacity-50 cursor-pointer text-red-600"
                onClick={handlePostUnLike}
              />
            ) : (
              <AiOutlineHeart
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}

            <FaRegComment
              className="text-xl hover:opacity-50 cursor-pointer"
              onClick={handleOpenCommentModal}
            />

            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div>
            {isSaved ? (
              <BsBookmarkFill
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handleUnSavedPost}
              />
            ) : (
              <BsBookmark
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handleSavedPost}
              />
            )}
          </div>
        </div>

        {/* Post Like and comment info*/}
        <div className="w-full px-5 py-2">
          {likesCount > 0 ? <p>{`${likesCount} Likes`}</p> : <></>}
          {commentsCount > 0 ? (
            commentsCount === 1 ? (
              <p
                className="opacity-50 py-2 cursor-pointer"
                onClick={handleOpenCommentModal}
              >
                {`View 1 comment`}
              </p>
            ) : (
              <p
                className="opacity-50 py-2 cursor-pointer"
                onClick={handleOpenCommentModal}
              >
                {`View all ${commentsCount} comments`}
              </p>
            )
          ) : (
            <></>
            // <p></p>
          )}
        </div>

        {/* Post comments */}
        <div className="border border-t w-full">
          <div className="flex w-full items-center px-5">
            <BsEmojiSmile />
            <input
              className="commentInput"
              type=" text"
              placeholder="Add a comment..."
              onClick={handleOpenCommentModal}
              onChange={handleOpenCommentModal}
              value=""
            />
          </div>
        </div>
      </div>

      <CommentModal
        isOpen={isOpen}
        onClose={handleCloseCommentModal}
        handleSavePost={handleSavedPost}
        handleUnSavedPost={handleUnSavedPost}
        isPostLiked={isPostLiked}
        handlePostLike={handlePostLike}
        handlePostUnLike={handlePostUnLike}
        isSaved={isSaved}
        likesCount={likesCount}
      />
    </div>
  );
};

export default PostCard;
