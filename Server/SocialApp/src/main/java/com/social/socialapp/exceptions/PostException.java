package com.social.socialapp.exceptions;

import com.social.socialapp.constant.ExceptionConstant;

public class PostException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public PostException() {
		super(ExceptionConstant.POST_EXCEPTION_MESSAGE);
	}
	
	public PostException(String message) {
		super(message);
	}
}
