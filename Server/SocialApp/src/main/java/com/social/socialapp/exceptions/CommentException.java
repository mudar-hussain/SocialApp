package com.social.socialapp.exceptions;

import com.social.socialapp.constant.ExceptionConstant;

public class CommentException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public CommentException() {
		super(ExceptionConstant.COMMENT_EXCEPTION_MESSAGE);
	}
	
	public CommentException(String message) {
		super(message);
	}
}
