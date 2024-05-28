package com.kriaAppFullStack.kriaAppBackend.service;

import com.kriaAppFullStack.kriaAppBackend.repo.appUsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class appUsersDetailsService implements UserDetailsService {

    @Autowired
    private appUsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
