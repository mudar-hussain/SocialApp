import React from 'react'
import { useNavigate } from 'react-router-dom'
import { URL_NO_PROFILE_IMAGE } from '../../Config/Constants';

const StoryCircle = ({ user }) => {
  const navigate=useNavigate();

  const handleStoryNavigate=()=>{
    navigate(`/story/${user.id}`);
  }

  return (
    <div onClick={handleStoryNavigate} className='flex cursor-pointer flex-col items-center'>
        <img className='w-16 h-16 rounded-full' 
      src={user.profileImage || 
            URL_NO_PROFILE_IMAGE 
      }
        alt={user.username} />
        <p>{user.username}</p>
    </div>
  )
}

export default StoryCircle