package com.social.socialapp.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StoryDto {

	@Id
	private Integer id;
	
	@NotNull
	private String storyImage;
	private String caption;
	private LocalDateTime timestamp;
	
	private UserDto user;
	
	private List<UserDto> likedByUsers = new ArrayList<>();
}
