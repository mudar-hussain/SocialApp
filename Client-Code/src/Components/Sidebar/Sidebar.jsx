import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { menu } from "./SidebarConfig.js";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "../Post/CreatePostModal";
import SearchComponents from "../Search/SearchComponents";
import { useSelector } from "react-redux";
import { URL_SOCIAL_APP_LOGO } from "../../Config/Constants.js";


const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {user} = useSelector(store=>store);

  const handleTabClick = (title) => {
    setActiveTab(title);
    if (activeTab === "Profile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (activeTab === "Home") {
      navigate("/");
    }else if(activeTab=== "Create"){
      onOpen();
    }

    // if(activeTab === "Search"){
    //   setIsSearchVisible(true);
    // }else{
    //   setIsSearchVisible(false);
    // }
  };

  return (
    <div className="sticky top-0 h-[100vh] flex">
      <div className={`flex flex-col justify-between h-full ${activeTab==="Search"?"px-3":"px-10"}`}>
        <div>
          {/* Icon image */}
        {activeTab!=="Search" && <div className="pt-10">
          <img
            className="w-40"
            src={URL_SOCIAL_APP_LOGO}
            alt="Social App"
          />
        </div>}

          {/* Sidebar Menus */}
          <div className="mt-10">
            {menu.map((item) => (
              <div
                onClick={() => handleTabClick(item.title)}
                className="flex items-center mb-5 cursor-pointer text-lg"
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                {activeTab!=="Search" && <p
                  className={`${activeTab === item.title ? "font-bold" : "font-semibold"}`}
                >
                  {item.title}
                </p>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center cursor-pointer pb-10">
          <IoReorderThreeOutline className="text-2xl" />
          {activeTab!=="Search" && <p className="ml-5">More</p>}
        </div>
      </div>
      
      <ChakraProvider>
        <CreatePostModal onClose={onClose} isOpen={isOpen}/>
      </ChakraProvider>
        {activeTab==="Search"  && <SearchComponents/>}
    </div>
  );
};

export default Sidebar;
