package com.social.socialapp.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "Stories")
@Data
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Story {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@NotNull
	private String storyImage;
	private String caption;
	private LocalDateTime timestamp;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

	
	@ManyToMany
//	@JoinTable(name="story_likes",
//			joinColumns = @JoinColumn(name = "story_id"),
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
