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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Deprecated
//@Entity
@Table(name="Comments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String content;
	private LocalDateTime createdAt;
	
	
	@ManyToOne
	@JoinColumn(name="post_id")
	private Post post;
	

//	@Embedded
//	@AttributeOverrides(value = { 
//			@AttributeOverride(name="id", column=@Column(name="user_id")), 
//			@AttributeOverride(name="email", column=@Column(name="user_email"))
//	})
//	private UserDto user;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserDto user;
	
	
//	@Embedded
//	@ElementCollection(fetch = FetchType.LAZY)
//	@JoinTable(name="likedByUsers", joinColumns=@JoinColumn(name="user_id"))
//	private Set<UserDto> likedByUsers = new HashSet<>();
	
	@ManyToMany
	@JoinTable(name="comment_likes",
			joinColumns = @JoinColumn(name = "comment_id"),
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
