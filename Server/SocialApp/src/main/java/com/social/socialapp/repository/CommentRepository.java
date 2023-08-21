package com.social.socialapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.social.socialapp.entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
