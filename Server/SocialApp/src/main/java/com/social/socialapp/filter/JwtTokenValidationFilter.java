package com.social.socialapp.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.social.socialapp.constant.SecurityConstant;
import com.social.socialapp.security.JwtTokenUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class JwtTokenValidationFilter extends OncePerRequestFilter {

	
//	private JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
	private JwtTokenUtil jwtTokenUtil;
	
//	private UserDetailsService userDetailsService = new JwtUserDetailsService();
	private UserDetailsService userDetailsService;
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		ServletContext servletContext = request.getServletContext();
        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        
		if(jwtTokenUtil==null){
			jwtTokenUtil = webApplicationContext.getBean(JwtTokenUtil.class);
        }
		
		if(userDetailsService == null) {
			userDetailsService = webApplicationContext.getBean(UserDetailsService.class);
		}

		// 1. Read token from Authorization header
		String token = request.getHeader(SecurityConstant.JWT_TOKEN_HEADER);
		
		if(token != null) {
			try {
				token = token.substring(7);
				System.out.println("Received Token: " + token);
				
				//2. Do validation
				String username = jwtTokenUtil.getUsernameFromToken(token);
				System.out.println("Extracted username from token: " + username);
				
				//username should not be empty and context-auth must be empty
				if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
					
					//3. Database user details
					UserDetails usr = userDetailsService.loadUserByUsername(username);
					
					//4. Validate token
					boolean isValid = jwtTokenUtil.validateToken(token, usr);

					//if valid then generate security context
					if(isValid) {
						
						//5. Create authentication token
						UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
								new UsernamePasswordAuthenticationToken(username, usr.getPassword(),usr.getAuthorities());
						
						
						usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
						
						//final object stored in security context with user details(username, password)
						SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
					}
					
				}
				
			} catch (Exception e) {
				e.printStackTrace();
//				throw new BadCredentialsException("Invalid Credentials");
			}
		}
		filterChain.doFilter(request, response);
		
	}
	

	protected boolean shouldNotFilter(HttpServletRequest req) throws ServletException{
		return req.getServletPath().equals("/api/signin");
	}

}
