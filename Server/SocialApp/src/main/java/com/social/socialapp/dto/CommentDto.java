package com.social.socialapp.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Id;
import lombok.Data;

@Data
public class CommentDto {

	@Id
	private Integer id;
	 
	private String content;
	private LocalDateTime createdAt;
	
	private UserDto user;
	private PostDto post;
	
	private List<UserDto> likedByUsers = new ArrayList<>();
}
