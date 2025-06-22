import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile } from "react-icons/bs";
import CommentCard from "./CommentCard";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import "./CommentModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  findPostCommentsAction,
} from "../../Redux/Comment/Action";
import { useParams } from "react-router-dom";
import { findPostByIdAction } from "../../Redux/Post/Action";
import { timeDifference } from "../../Config/Logics";
import { URL_IMAGE_BROKEN, URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const CommentModal = ({
  onClose,
  isOpen,
  isPostLiked,
  handlePostLike,
  isSaved,
  handleSavePost,
  handlePostUnLike,
  handleUnSavedPost,
  likesCount,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { comment, post } = useSelector((store) => store);

  useEffect(() => {
    if (postId) {
      dispatch(findPostByIdAction(postId));
      dispatch(findPostCommentsAction(postId));
    }
  }, [comment.createdComment, postId, comment.likeComment]);

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"lg"} />
          <ModalBody>
            <div className="flex h-[80vh] ">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full w-full"
                  src={post.singlePost?.postImage || URL_IMAGE_BROKEN}
                  alt=""
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          post.singlePost?.user?.profileImage ||
                          URL_NO_PROFILE_IMAGE
                        }
                        alt={post.singlePost?.user?.username}
                      />
                    </div>
                    <div className="ml-2">
                      <p>{post.singlePost?.user?.username}</p>
                    </div>
                  </div>
                  <div>{/* <BsThreeDots /> */}</div>
                </div>
                <hr />
                <div className="comment">
                  {comment.postComments?.map((item) => (
                    <CommentCard
                      comment={item}
                      timeDifference={timeDifference}
                    />
                  ))}
                </div>
                <div className="absolute bottom-0 w-[90%]">
                  {/* Post Footer Button */}
                  <div className="flex justify-between items-center py-2">
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

                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />

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
                          onClick={handleSavePost}
                        />
                      )}
                    </div>
                  </div>

                  {/* Post Like and comment info*/}
                  <div className="w-full py-2">
                    {likesCount > 0 ? <p>{`${likesCount} Likes`}</p> : <></>}
                    <p className="opacity-50 text-sm">
                      {timeDifference(post.singlePost?.createdAt)}
                    </p>
                  </div>

                  {/* Post comments */}
                  <div className="justify-between items-center">
                    <div className="flex items-center">
                      <BsEmojiSmile />
                      <input
                        className="commentInput ml-2"
                        type="text"
                        placeholder={
                          commentContent.length || "Add a comment..."
                        }
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const data = {
                              postId: postId,
                              data: {
                                content: commentContent,
                              },
                            };
                            dispatch(createCommentAction(data));
                            setCommentContent("");
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
