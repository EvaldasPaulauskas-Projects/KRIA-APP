package com.kriaAppFullStack.kriaAppBackend.service;

import com.kriaAppFullStack.kriaAppBackend.exception.ResourceNotFoundException;
import com.kriaAppFullStack.kriaAppBackend.model.favorites;
import com.kriaAppFullStack.kriaAppBackend.repo.favoritesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class favoritesService {

    @Autowired
    private favoritesRepo favoritesRepository;

    public favorites addFavorite(Integer userId, Integer bookId, String isFavorite) {
        favorites favorite = new favorites();
        favorite.setUserId(userId);
        favorite.setBookId(bookId);
        favorite.setIsFavorite(isFavorite);
        return favoritesRepository.save(favorite);
    }

    public void deleteFavorite(Integer id) {
        // Retrieve the favorite item by its ID
        Optional<favorites> existingFavorite = favoritesRepository.findById(id);

        // Check if the favorite exists, otherwise throw an exception
        favorites favorite = existingFavorite.orElseThrow(() -> new ResourceNotFoundException("Favorite not found with id " + id));

        // Delete the favorite
        favoritesRepository.delete(favorite);
    }

    public List<favorites> getAllFavorites() {
        return favoritesRepository.findAll();
    }

    public List<favorites> getFavoritesByUserId(Integer userId) {
        List<favorites> favorites = favoritesRepository.findByUserId(userId);
        if (favorites.isEmpty()) {
            throw new ResourceNotFoundException("Favorites not found for user with ID: " + userId);
        }
        return favorites;
    }

    public List<favorites> getFavoritesByBookId(Integer bookId) {
        List<favorites> favorites = favoritesRepository.findByBookId(bookId);
        if (favorites.isEmpty()) {
            throw new ResourceNotFoundException("Favorites not found for book with ID: " + bookId);
        }
        return favorites;
    }
}