package com.social.socialapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.social.socialapp.repository.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<com.social.socialapp.entities.User> optUser = userRepository.findByEmail(username);
		
		if(optUser.isEmpty()) {
			throw new BadCredentialsException("User not found with username: " + username);
		}
		
		com.social.socialapp.entities.User user = optUser.get();
//		
		System.out.println("Username in UserDetailsService: " + user.getEmail());
//		
//		List<GrantedAuthority> authorities = new ArrayList<>();
//		authorities.add(new SimpleGrantedAuthority("USER_ROLE"));
//		
//		
//		
//		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
		
		UserDetails userDetails = User.withUsername(user.getEmail()).password(user.getPassword()).authorities("USER").build();
        return userDetails;
		
	}

}