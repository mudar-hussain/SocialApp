package com.social.socialapp.service.Implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social.socialapp.constant.ExceptionConstant;
import com.social.socialapp.dto.StoryDto;
import com.social.socialapp.dto.UserDto;
import com.social.socialapp.entities.Story;
import com.social.socialapp.entities.User;
import com.social.socialapp.exceptions.StoryException;
import com.social.socialapp.exceptions.UserException;
import com.social.socialapp.repository.StoryRepository;
import com.social.socialapp.service.Interface.DtoUtil;
import com.social.socialapp.service.Interface.StoryService;
import com.social.socialapp.service.Interface.UserService;

@Service
public class StoryServiceImpl implements StoryService {

	@Autowired
	private StoryRepository storyRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private DtoUtil dtoUtil;



	@Override
	public Story saveRepoStory(Story story) throws StoryException {

		return storyRepository.save(story);
	}


	
	@Override
	public StoryDto createStory(Story story, Integer userId) throws UserException {
		
		User user = userService.findUserById(userId);
		
		// add timestamp
		story.setTimestamp(LocalDateTime.now());
		story.setUser(user);
		
//		user.getStories().add(story);
//		userService.saveRepoUser(user);
//		userRepository.save(user);

		storyRepository.save(story);
		
		//Prepare storyDto for response
		
		UserDto userDto = dtoUtil.mapUserToUserDto(user);
		StoryDto storyDto = dtoUtil.mapStoryToStoryDto(story, userDto);
		
//		storyDto.setUser(userDto);
//		storyDto.setLikedByUsers(userService.mapUsersToUserDtos(story.getLikedByUsers().stream().collect(Collectors.toList())));
		
		
		return storyDto;
	}

	@Override
	public List<StoryDto> findStoryByUserId(Integer userId) throws UserException, StoryException {
		
		User user = userService.findUserById(userId);
		
		List<Story> stories = storyRepository.findStoryByUserId(user.getId());

		
		
		return dtoUtil.mapStoriesToStoryDtos(stories, dtoUtil.mapUserToUserDto(user));
	}

	@Override
	public Story findStoryById(Integer storyId) throws StoryException {
		
		Optional<Story> story = storyRepository.findById(storyId);
		
		if(story.isEmpty()) {
			throw new StoryException();
		}
		
		return story.get();
	}

	@Override
	public StoryDto findStoryDtoById(Integer storyId) throws StoryException {
		
		Story story = this.findStoryById(storyId);
		
		
		return dtoUtil.mapStoryToStoryDto(story, null);
	}

	@Override
	public String deleteStory(Integer storyId, Integer userId) throws UserException, StoryException {
		
		Story story = this.findStoryById(storyId);
		
		User user = userService.findUserById(userId);
		
		if(!story.getUser().getId().equals(user.getId())) {
			throw new StoryException(ExceptionConstant.UNAUTHORIZED_MESSAGE);
		}
		
		storyRepository.deleteById(story.getId());
		
//		user.getStories().remove(story);
//		
//		userService.saveRepoUser(user);
		
		
		return "Story deleted successfully";
	}



	@Override
	public List<StoryDto> findAllStoryByUserIds(List<Integer> userIds) throws UserException, StoryException {
		
		List<Story> stories = storyRepository.findAllStoryByUserIds(userIds);

		return dtoUtil.mapStoriesToStoryDtos(stories, null);
	}










}