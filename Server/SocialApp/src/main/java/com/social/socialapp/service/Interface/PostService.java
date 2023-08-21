package com.social.socialapp.service.Interface;

import java.util.List;

import com.social.socialapp.dto.PostDto;
import com.social.socialapp.entities.Post;
import com.social.socialapp.exceptions.PostException;
import com.social.socialapp.exceptions.UserException;

public interface PostService {

	public Post saveRepoPost(Post post) throws PostException;
	
	public PostDto createPost(Post post, Integer userId) throws UserException;
	
	public String deletePost(Integer postId, Integer userId) throws UserException, PostException;
	
	public Post findPostById(Integer postId) throws PostException;
	
	public PostDto findPostDtoById(Integer postId) throws PostException;
	
	public List<PostDto> findAllPostDtoByIds(List<Integer> postIds) throws PostException;
	
	public List<PostDto> findPostByUserId(Integer userId) throws UserException;
	
	public List<PostDto> findAllPostByUserIds(List<Integer> userIds) throws UserException, PostException;
	
	public String savePost(Integer postId, Integer userId) throws UserException, PostException;
	
	public String unsavePost(Integer postId, Integer userId) throws UserException, PostException;
	
	public PostDto likePost(Integer postId, Integer userId) throws UserException, PostException;
	
	public PostDto unlikePost(Integer postId, Integer userId) throws UserException, PostException;
	
	
	
}
