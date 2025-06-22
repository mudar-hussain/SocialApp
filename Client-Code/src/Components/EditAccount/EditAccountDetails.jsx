import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileAction,
  updateUserDetailsAction,
} from "../../Redux/User/Action";
import { useFormik } from "formik";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import ChangeProfileImageModal from "./ChangeProfileImageModal";
import { URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const EditAccountDetails = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
  });
  useEffect(() => {
    dispatch(getUserProfileAction());
  });

  useEffect(() => {
    console.log("reqUser: ", user.reqUser);
    const newValue = {};
    for (let item in initialValues) {
      if (user.reqUser && user.reqUser[item]) {
        newValue[item] = user.reqUser[item];
      }
    }
    console.log("new Value: ", newValue);
    formik.setValues(newValue);
  }, [user.reqUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    onsubmit: (values) => {
      const data = {
        data: {
          ...values,
          id: user.reqUser?.id,
        },
      };
      dispatch(updateUserDetailsAction(data));
      toast({
        title: "Account updated...",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    if(selectedFile){
      const image = await uploadToCloudinary(selectedFile);
      setImageFile(image);
      const data = {
        data: {
          image,
          id: user.reqUser?.id,
        },
      };
      dispatch(updateUserDetailsAction(data));

    }

    onClose();
  }

  return (
    <div className="border rounded-md p-10 lg:px-40">
      <div className="flex pb-7">
        <div className="w-[15%]">
          <img
            className="w-8 h-8 rounded-full"
            src={
              imageFile ||
              user.reqUser?.profileImage ||
              URL_NO_PROFILE_IMAGE
            }
            alt=""
          />
        </div>

        <div>
          <p>{user.reqUser?.username}</p>
          <p
            onClick={onOpen}
            className="font-bold text-blue-800 cursor-pointer"
          >
            Change Profile Photo
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="6">

            {/* Name */}
          <FormControl className="flex" id="name">
            <FormLabel className="w-[15%]">Name</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Name"
                className="w-full"
                type="text"
                {...formik.getFieldProps("name")}
              />
              <FormHelperText className="text-xs">
                Help perple discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </FormHelperText>
              <FormHelperText className="text-xs">
                You can only change your name twice within 14 days
              </FormHelperText>
            </div>
          </FormControl>
          
          {/* UserName */}
          <FormControl className="flex" id="username">
            <FormLabel className="w-[15%]">Username</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Username"
                className="w-full"
                type="text"
                {...formik.getFieldProps("username")}
              />
              <FormHelperText className="text-xs">
                In most cases, you'll be able to change your usename back to
                old one for another 14 days. Learn more
              </FormHelperText>
            </div>
          </FormControl>
          
          {/* Website */}
          <FormControl className="flex" id="website">
            <FormLabel className="w-[15%]">Website</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Website"
                className="w-full"
                type="text"
                {...formik.getFieldProps("website")}
              />
              <FormHelperText className="text-xs">
                Editing your links is only available on mobile. Visit the 
                SocialApp and edit your profile to change the websites in
                your bio.
              </FormHelperText>
            </div>
          </FormControl>
          
          {/* Bio */}
          <FormControl className="flex" id="bio">
            <FormLabel className="w-[15%]">Bio</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Bio"
                className="w-full"
                type="text"
                {...formik.getFieldProps("bio")}
              />
            </div>
          </FormControl>

          <div className="py-10">
            <p className="font-bold text-sm">Personal Information</p>
            <p className="text-xs">
              Provide your personal information even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </p>
          </div>
          
          {/* Email */}
          <FormControl className="flex" id="email">
            <FormLabel className="w-[15%]">Email</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Email"
                className="w-full"
                type="email"
                {...formik.getFieldProps("email")}
              />
            </div>
          </FormControl>
          
          {/* Mobile */}
          <FormControl className="flex" id="mobile">
            <FormLabel className="w-[15%]">Phone</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Phone"
                className="w-full"
                type="tel"
                {...formik.getFieldProps("mobile")}
              />
            </div>
          </FormControl>
          
          {/* Gender */}
          <FormControl className="flex" id="gender">
            <FormLabel className="w-[15%]">Gender</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Gender"
                className="w-full"
                type="text"
                {...formik.getFieldProps("gender")}
              />
            </div>
          </FormControl>




          <div>
            <Button colorScheme="blue" type="submit" className="">
              Submit
            </Button>
          </div>
        </Stack>
      </form>

            <ChangeProfileImageModal 
              handleProfileImageChange={handleProfileImageChange}
              isOpen = {isOpen}
              onClose = {onClose}
              onOpen = {onOpen}
            
            />

    </div>
  );
};

export default EditAccountDetails;
