package com.social.socialapp.service.Interface;

import java.util.List;

import com.social.socialapp.dto.CommentDto;
import com.social.socialapp.entities.Comment;
import com.social.socialapp.exceptions.CommentException;
import com.social.socialapp.exceptions.PostException;
import com.social.socialapp.exceptions.UserException;

public interface CommentService {

	
	public Comment saveRepoComment(Comment comment) throws CommentException;
	
	public CommentDto createComment(Integer userId, Integer postId, Comment comment) throws UserException, PostException;
	
	public Comment findCommentById(Integer commentId) throws CommentException;
	
	public CommentDto findCommentDtoById(Integer commentId) throws CommentException;
	
	public List<CommentDto> findAllCommentDtoByPostId(Integer postId) throws PostException;

	public CommentDto likeComment(Integer userId, Integer commentId) throws UserException, CommentException;

	public CommentDto unlikeComment(Integer userId, Integer commentId) throws UserException, CommentException;
	
	
}
