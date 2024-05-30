package com.kriaAppFullStack.kriaAppBackend.repo;

import com.kriaAppFullStack.kriaAppBackend.model.favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface favoritesRepo extends JpaRepository<favorites, Integer> {
    List<favorites> findByUserId(Integer userId);
    List<favorites> findByBookId(Integer bookId);
}