import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/Action";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { URL_IMAGE_BROKEN } from "../../Config/Constants";

const CreatePostModal = ({ onClose, isOpen }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useSelector((store)=>store);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type.startsWith("image/") ||
        droppedFile.type.startsWith("video/"))
    ) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    setIsDragOver(true);
  };

  const handleOnChange = async (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      const imgUrl = await uploadToCloudinary(file);
      console.log("postImageUrl: ", imgUrl);
      setImageUrl(imgUrl);
      setFile(file);
      console.log("file: ", file);
    } else {
      setFile(null);
      alert("Please select an image or video");
    }
  };

  const handleCaptionChange = (event) => {
    if (event.target.value.length <= 2000) {
      setCaption(event.target.value);
    }
  };

  const handleCreatePost = () => {
    const data = {
      data: {
        location,
        postImage: imageUrl,
        caption,
      },
    };
    dispatch(createPostAction(data));
    onClose();
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Post</p>
            <Button
              className=""
              variant={"ghost"}
              size="sm"
              colorScheme={"blue"}
              onClick={handleCreatePost}
            >
              Share
            </Button>
          </div>
          <hr />
          <ModalCloseButton />
          <ModalBody>
            <div className="h-[70vh] justify-between pb-5 flex">
              <div className="w-[50%]">
                {!file && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="drag-drop h-full"
                  >
                    <div>
                      <FaPhotoVideo className="text-3xl" />
                      <p>Drag your photos or videos here</p>
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select from computer
                    </label>

                    <input
                      className="fileInput"
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      onChange={handleOnChange}
                    />
                  </div>
                )}

                {file && (
                  <img
                    className="max-h-full"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-[1px] border h-full"></div>

              <div className="w-[50%] px-2">
                <div className="flex items-center">
                  <img
                    className="w-7 h-7 rounded-full"
                    src={URL_IMAGE_BROKEN}
                    alt=""
                  />
                  <p className="font-semibold ml-4">{user?.reqUser?.username}</p>
                </div>
                <div className="mt-1">
                  <textarea
                    value={`${caption.length > 0 ? caption : ""}`}
                    placeholder="Write a caption..."
                    className="captionInput"
                    name="caption"
                    rows="8"
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <GrEmoji />
                  <p className="opacity-70">{caption?.length}/2000</p>
                </div>
                <hr />
                <div className="py-2 px-2 flex justify-between items-center">
                  <input
                    className="locationInput"
                    type="text"
                    placeholder="location"
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
