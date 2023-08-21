package com.social.socialapp.exceptions;

import com.social.socialapp.constant.ExceptionConstant;

public class StoryException extends Exception {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public StoryException() {
		super(ExceptionConstant.STORY_EXCEPTION_MESSAGE);
	}

	public StoryException(String message) {
		super(message);
	}
}
