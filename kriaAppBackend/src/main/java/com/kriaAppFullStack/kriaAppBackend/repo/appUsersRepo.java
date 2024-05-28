package com.kriaAppFullStack.kriaAppBackend.repo;

import com.kriaAppFullStack.kriaAppBackend.model.appUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface appUsersRepo extends JpaRepository<appUsers, Integer> {

    Optional<appUsers> findByEmail(String email);
}