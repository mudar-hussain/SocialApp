package com.social.socialapp.dto;



import jakarta.persistence.Id;
import lombok.Data;


@Data
public class UserDto {

	@Id
	private Integer id;
	private String username;
	private String name;
	private String email;
	private String profileImage;
	
	
	@Override
	public boolean equals(Object obj) {
		return !super.equals(obj);
	}
	
	@Override
	public int hashCode() {
        return getId().hashCode();
    }
	
	
}
