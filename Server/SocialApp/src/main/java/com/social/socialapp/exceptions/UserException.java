package com.social.socialapp.exceptions;

import com.social.socialapp.constant.ExceptionConstant;

public class UserException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserException() {
		super(ExceptionConstant.USER_EXCEPTION_MESSAGE);
	}

	public UserException(String message) {
		super(message);
	}

}
