package com.kriaAppFullStack.kriaAppBackend.repo;

import com.kriaAppFullStack.kriaAppBackend.model.books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface booksRepo extends JpaRepository<books, Integer> {
    Optional<books> findByName(String name);
}