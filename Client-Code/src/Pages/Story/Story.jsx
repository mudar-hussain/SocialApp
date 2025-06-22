import React, { useEffect } from 'react'
import StoryViewer from '../../Components/Story/StoryViewer'
import { useParams } from 'react-router-dom'
import { findStoryByUserId } from '../../Redux/Story/Action';
import { useDispatch, useSelector } from 'react-redux';

const Story = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findStoryByUserId(userId));
    },[userId]);

    const { story } = useSelector((store) => store);

    console.log("In Story: story: ", story);

  return (
    <div>
        <StoryViewer stories={story.userStories} />
    </div>
  )
}

export default Story