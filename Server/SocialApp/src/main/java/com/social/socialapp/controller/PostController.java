package com.social.socialapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.socialapp.constant.SecurityConstant;
import com.social.socialapp.dto.PostDto;
import com.social.socialapp.entities.Post;
import com.social.socialapp.entities.User;
import com.social.socialapp.exceptions.PostException;
import com.social.socialapp.exceptions.UserException;
import com.social.socialapp.response.MessageResponse;
import com.social.socialapp.service.Interface.PostService;
import com.social.socialapp.service.Interface.UserService;

@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService postService;	
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<PostDto> createPostHandler(@RequestBody Post post,
			@RequestHeader(SecurityConstant.JWT_TOKEN_HEADER) String token) throws UserException{
		User user = userService.findUserProfile(token);
		PostDto createdPost = postService.createPost(post, user.getId());
		
		return ResponseEntity.ok(createdPost);	
		
	}
	
	@GetMapping("/all/{userId}")
	public ResponseEntity<List<PostDto>> findPostByUserIdHandler(@PathVariable("userId") Integer userId) throws UserException{
			
		List<PostDto> posts = postService.findPostByUserId(userId);
		
		return ResponseEntity.ok(posts);
		
		
	} 
	
	@GetMapping("/following/{userIds}")
	public ResponseEntity<List<PostDto>> findAllPostByUserIdsHandler(@PathVariable("userIds") List<Integer> userIds) throws PostException, UserException{
			
		List<PostDto> posts = postService.findAllPostByUserIds(userIds);
		
		return ResponseEntity.ok(posts);
		
		
	}
	
	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> findPostByIdHandler(@PathVariable("postId") Integer postId) throws PostException{
		
		PostDto post = postService.findPostDtoById(postId);
		
		return ResponseEntity.ok(post);
	}
	
	@GetMapping("/savedposts/{postIds}")
	public ResponseEntity<List<PostDto>> findAllPostByPostIdsHandler(@PathVariable("postIds") List<Integer> postIds) throws PostException{
			
		List<PostDto> posts = postService.findAllPostDtoByIds(postIds);
		
		return ResponseEntity.ok(posts);
		
		
	} 
	
	
	@DeleteMapping("/delete/{postId}")
	public ResponseEntity<MessageResponse> deletePostHandler(@PathVariable("postId") Integer postId, 
			@RequestHeader(SecurityConstant.JWT_TOKEN_HEADER) String token) throws UserException, PostException{
		
		User user = userService.findUserProfile(token);
		
		String message = postService.deletePost(postId, user.getId()); 
		
		MessageResponse messageResponse = new MessageResponse(message);
		
		return new ResponseEntity<MessageResponse>(messageResponse, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/like/{postId}")
	public ResponseEntity<PostDto> likePostHandler(@PathVariable("postId") Integer postId, @RequestHeader(SecurityConstant.JWT_TOKEN_HEADER) String token) throws PostException, UserException{
		
		User user = userService.findUserProfile(token);
		
		PostDto likedPost = postService.likePost(postId, user.getId());
		
		return ResponseEntity.ok(likedPost);
	}
	
	@PutMapping("/unlike/{postId}")
	public ResponseEntity<PostDto> unLikePostHandler(@PathVariable("postId") Integer postId, @RequestHeader(SecurityConstant.JWT_TOKEN_HEADER) String token) throws PostException, UserException{
		
		User user = userService.findUserProfile(token);
		
		PostDto unlikedPost = postService.unlikePost(postId, user.getId()); 
		
		return ResponseEntity.ok(unlikedPost);
	}
	
	@PutMapping("/saved/{postId}")
	public ResponseEntity<MessageResponse> savedPostHandler(@PathVariable("postId") Integer postId, @RequestHeader(SecurityConstant.JWT_TOKEN_HEADER) String token) throws UserException, PostException{
		
		User user = userService.findUserProfile(token);
		
		String message = postService.savePost(postId, user.getId()); 
		
		MessageResponse messageResponse = new MessageResponse(message);
		
		return new ResponseEntity<MessageResponse>(messageResponse, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/unsaved/{postId}")
	public ResponseEntity<MessageResponse> unSavedPostHandler(@PathVariable("postId") Integer postId, @RequestHeader(SecurityConstant.JWT_TOKEN_HEADER) String token) throws UserException, PostException{
		
		User user = userService.findUserProfile(token);
		
		String message = postService.unsavePost(postId, user.getId()); 
		
		MessageResponse messageResponse = new MessageResponse(message);
		
		return new ResponseEntity<MessageResponse>(messageResponse, HttpStatus.ACCEPTED);
	}
	
	
	
	
	
}








