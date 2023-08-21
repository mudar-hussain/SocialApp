package com.social.socialapp.entities.Deprecated;

import java.util.HashSet;
import java.util.Set;

import com.social.socialapp.dto.UserDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Deprecated
//@Entity
@Table(name="Users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String username;
	private String name;
	private String email;
	private String mobile;
	private String website;
	private String bio;
	private String gender;
	private String profileImage;
	
	private String password;
	
	// Features
	@Embedded
	@ElementCollection
	private Set<UserDto> followers = new HashSet<>();

	@Embedded
	@ElementCollection
	private Set<UserDto> following = new HashSet<>();

	
	//Other Entities
	
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Story> stories = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();
	
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
////	@JoinTable(name="stories", joinColumns=@JoinColumn(name="stories_id"))	
//	private List<Story> stories = new ArrayList<>();
	

	@ManyToMany
	@JoinTable(name="user_saved_posts", 
			joinColumns = @JoinColumn(name="user_id"),
			inverseJoinColumns = @JoinColumn(name="post_id"))
	private Set<Post> savedPosts = new HashSet<>();
	
	

	
}
