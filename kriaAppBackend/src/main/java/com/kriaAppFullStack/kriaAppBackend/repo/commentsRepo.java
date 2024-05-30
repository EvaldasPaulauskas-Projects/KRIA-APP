package com.kriaAppFullStack.kriaAppBackend.repo;

import com.kriaAppFullStack.kriaAppBackend.model.comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface commentsRepo extends JpaRepository<comments, Integer> {
    List<comments> findByUserId(Integer userId);
    List<comments> findByUsername(String username);
}