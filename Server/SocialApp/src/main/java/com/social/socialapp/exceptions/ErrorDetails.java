package com.social.socialapp.exceptions;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class ErrorDetails {

	private String message;
	private String details;
	private LocalDateTime timestamp;
	
}
