package com.social.socialapp.service.Interface;

import java.util.List;

import com.social.socialapp.dto.CommentDto;
import com.social.socialapp.dto.PostDto;
import com.social.socialapp.dto.StoryDto;
import com.social.socialapp.dto.UserDto;
import com.social.socialapp.entities.Comment;
import com.social.socialapp.entities.Post;
import com.social.socialapp.entities.Story;
import com.social.socialapp.entities.User;

public interface DtoUtil {

	public UserDto mapUserToUserDto(User user);
	
	public List<UserDto> mapUsersToUserDtos(List<User> users);

	public StoryDto mapStoryToStoryDto(Story story, UserDto userDto);
	
	public List<StoryDto> mapStoriesToStoryDtos(List<Story> stories, UserDto userDto);

	public PostDto mapPostToPostDto(Post post, UserDto userDto);
	
	public List<PostDto> mapPostsToPostDtos(List<Post> posts, UserDto userDto);

	public CommentDto mapCommentToCommentDto(Comment comment, UserDto userDto, PostDto postDto);
	
	public List<CommentDto> mapCommentsToCommentDtos(List<Comment> comments, UserDto userDto, PostDto postDto);
}
