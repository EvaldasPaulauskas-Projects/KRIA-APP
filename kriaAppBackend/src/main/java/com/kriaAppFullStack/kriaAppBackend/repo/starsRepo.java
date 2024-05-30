package com.kriaAppFullStack.kriaAppBackend.repo;

import com.kriaAppFullStack.kriaAppBackend.model.favorites;
import com.kriaAppFullStack.kriaAppBackend.model.stars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface starsRepo extends JpaRepository<stars, Integer> {
    List<stars> findByUserId(Integer userId);
    List<stars> findByBookId(Integer bookId);
}
