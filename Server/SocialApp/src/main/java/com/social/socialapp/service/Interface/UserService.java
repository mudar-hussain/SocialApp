package com.social.socialapp.service.Interface;

import java.util.List;

import com.social.socialapp.dto.UserDto;
import com.social.socialapp.entities.User;
import com.social.socialapp.exceptions.UserException;

public interface UserService {

	public User saveRepoUser(User user) throws UserException;
	
	public User registerUser(User user) throws UserException;
	
	public User findUserById(Integer userId) throws UserException;
	
	public UserDto findUserDtoById(Integer userId) throws UserException;
	
	public User findUserByUsername(String username) throws UserException;
	
	public User findUserProfile(String token) throws UserException;
	
	public String followUser(Integer reqUserId, Integer followUserId) throws UserException;
	
	public String unFollowUser(Integer reqUserId, Integer followUserId) throws UserException;

	public List<UserDto> findUserByIds(List<Integer> userIds) throws UserException;

	public List<UserDto> searchUser(String query) throws UserException;

	public List<UserDto> suggestionUser(Integer userId) throws UserException;

	public User updateUserDetails(User updatedUser, User existingUser) throws UserException;
	
	
	
}
