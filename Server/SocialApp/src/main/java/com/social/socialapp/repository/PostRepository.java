package com.social.socialapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.social.socialapp.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

	@Query("SELECT p FROM Post p WHERE p.user.id = :userId")
	public List<Post> findByUserId(@Param("userId") Integer userId);

	@Query("SELECT p FROM Post p WHERE p.user.id IN :userIds ORDER BY p.createdAt DESC")
	public List<Post> findAllPostByUserIds(@Param("userIds") List<Integer> userIds);

	@Query("SELECT p FROM Post p WHERE p.id IN :postIds ORDER BY p.createdAt DESC")
	public List<Post> findAllPostByIds(@Param("postIds") List<Integer> postIds);
	
	@Query("SELECT p FROM Post p WHERE p.id = :postId")
	public Optional<Post> findById(@Param("postId") Integer postId);
	
	
}
