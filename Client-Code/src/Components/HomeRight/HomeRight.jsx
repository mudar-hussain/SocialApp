import React from "react";
import SuggestionCard from "./SuggestionCard";
import { URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const HomeRight = ({ reqUser, users }) => {
    console.log("In HomeRight: users: ", users);
    return (
        <div className="">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            <img
                                className="w-12 h-12 rounded-full"
                                src={
                                    reqUser.profileImage || 
                                    URL_NO_PROFILE_IMAGE    
                                }
                                alt={reqUser.username}
                            />
                        </div>
                        <div className="ml-2">
                            <p>{reqUser.name}</p>
                            <p className="opacity-70">{reqUser.username}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-blue-700 font-semibold">Switch</p>
                    </div>
                </div>
                <div className="space-y-4 mt-5">
                    {users.map((item) => (
                        <SuggestionCard user={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeRight;
