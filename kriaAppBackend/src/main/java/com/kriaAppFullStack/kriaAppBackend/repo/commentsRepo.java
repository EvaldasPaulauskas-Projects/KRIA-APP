package com.kriaAppFullStack.kriaAppBackend.repo;

import com.kriaAppFullStack.kriaAppBackend.model.comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface commentsRepo extends JpaRepository<comment, Integer> {
    List<comment> findByUserId(Integer userId);
    List<comment> findByUsername(String username);
}