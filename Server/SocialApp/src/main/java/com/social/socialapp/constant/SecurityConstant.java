package com.social.socialapp.constant;

import java.util.concurrent.TimeUnit;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

@Service
public class SecurityConstant {

	
	public static final SignatureAlgorithm JWT_TOKEN_SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;
	
	private static final SecretKey SECRET_KEY = Keys.secretKeyFor(JWT_TOKEN_SIGNATURE_ALGORITHM);

	private static final String JWT_SECRET = Encoders.BASE64.encode(SECRET_KEY.getEncoded());

	public static final SecretKey JWT_KEY = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
	
	public static final long JWT_TOKEN_VALIDITY = TimeUnit.MINUTES.toMillis(150);
	
	public static final String JWT_TOKEN_HEADER = "Authorization";

}
