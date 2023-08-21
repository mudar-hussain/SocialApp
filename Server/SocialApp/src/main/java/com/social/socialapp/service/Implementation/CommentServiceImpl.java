package com.social.socialapp.service.Implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social.socialapp.dto.CommentDto;
import com.social.socialapp.entities.Comment;
import com.social.socialapp.entities.Post;
import com.social.socialapp.entities.User;
import com.social.socialapp.exceptions.CommentException;
import com.social.socialapp.exceptions.PostException;
import com.social.socialapp.exceptions.UserException;
import com.social.socialapp.repository.CommentRepository;
import com.social.socialapp.service.Interface.CommentService;
import com.social.socialapp.service.Interface.DtoUtil;
import com.social.socialapp.service.Interface.PostService;
import com.social.socialapp.service.Interface.UserService;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private DtoUtil dtoUtil;

	


	@Override
	public Comment saveRepoComment(Comment comment) throws CommentException {
		
		return commentRepository.save(comment);
	}

	@Override
	public CommentDto createComment(Integer userId, Integer postId, Comment comment) throws UserException, PostException {
		
		User user = userService.findUserById(userId);
		Post post = postService.findPostById(postId);

		
		comment.setUser(user);
		comment.setPost(post);
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment createdComment = commentRepository.save(comment);
		
//		post.getComments().add(createdComment);
//		
//		postService.saveRepoPost(post);
//		postRepository.save(post);
		
		return dtoUtil.mapCommentToCommentDto(createdComment, null, null);
	}

	@Override
	public Comment findCommentById(Integer commentId) throws CommentException {
		Optional<Comment> comment = commentRepository.findById(commentId);
		
		if(comment.isEmpty()) {
			throw new CommentException();
		}
		
		return comment.get();
	}

	@Override
	public CommentDto findCommentDtoById(Integer commentId) throws CommentException {

		Comment comment = this.findCommentById(commentId);
		
		return dtoUtil.mapCommentToCommentDto(comment, null, null);
	}

	@Override
	public List<CommentDto> findAllCommentDtoByPostId(Integer postId) throws PostException {
		Post post = postService.findPostById(postId);
		
		List<CommentDto> comments = dtoUtil.mapCommentsToCommentDtos(
				post.getComments().stream().collect(Collectors.toList()), null, null);
		
		return comments;
	}

	@Override
	public CommentDto likeComment(Integer userId, Integer commentId) throws UserException, CommentException {

		User user = userService.findUserById(userId);
		
		Comment comment = this.findCommentById(commentId);
		
		comment.getLikedByUsers().add(user);
		Comment updatedComment = commentRepository.save(comment);
		
		return dtoUtil.mapCommentToCommentDto(updatedComment, null, null);
		
	}

	@Override
	public CommentDto unlikeComment(Integer userId, Integer commentId) throws UserException, CommentException {

		User user = userService.findUserById(userId);
		
		Comment comment = this.findCommentById(commentId);

		comment.getLikedByUsers().remove(user);
		Comment updatedComment = commentRepository.save(comment);
		
		return dtoUtil.mapCommentToCommentDto(updatedComment, null, null);
	}



}
