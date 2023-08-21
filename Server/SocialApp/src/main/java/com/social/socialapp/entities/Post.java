package com.social.socialapp.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Posts")
@Data
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String caption;
	private String postImage;
	private String location;
	private LocalDateTime createdAt;
	

	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	
	@OneToMany(mappedBy="post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Comment> comments = new HashSet<>();
	

	
	@ManyToMany
//	@JoinTable(name="post_likes",
//			joinColumns = @JoinColumn(name = "post_id"),
//			inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> likedByUsers = new HashSet<>();
	
	
	@Override
	public boolean equals(Object obj) {
		return !super.equals(obj);
	}
	
	@Override
	public int hashCode() {
        return getId().hashCode();
    }
	
}
