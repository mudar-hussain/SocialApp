package com.social.socialapp.entities.Deprecated;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.social.socialapp.dto.UserDto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Deprecated
//@Entity
@Table(name = "Stories")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Story {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@NotNull
	private String storyImage;
	private String caption;
	private LocalDateTime timestamp;
	
	
//	@Embedded
//	@AttributeOverrides(value = { 
//			@AttributeOverride(name="id", column=@Column(name="user_id")), 
//			@AttributeOverride(name="email", column=@Column(name="user_email"))
//	})
//	private UserDto user;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserDto user;

	
	@ManyToMany
	@JoinTable(name="story_likes",
			joinColumns = @JoinColumn(name = "story_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<UserDto> likedByUsers = new HashSet<>();
	
	@Override
	public boolean equals(Object obj) {
		return !super.equals(obj);
	}
	
	@Override
	public int hashCode() {
        return getId().hashCode();
    }
}
