import React from 'react'
import { useNavigate } from 'react-router-dom'
import { URL_NO_PROFILE_IMAGE } from "../../Config/Constants";

const SearchUserCard = ({ user }) => {

  const navigate= useNavigate();

  return (
    <div onClick={()=> navigate(`/${user.username}`)} className='py-2 cursor-pointer'>
        <div className='flex items-center'>
            <img className='w-9 h-9 rounded-full' 
            src={
              user.profileImage || 
              URL_NO_PROFILE_IMAGE
            }
            alt={user.username}
            />

            <div className='ml-3'>
                <p>{user.name}</p>
                <p className='opacity-70'>{user.username}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchUserCard