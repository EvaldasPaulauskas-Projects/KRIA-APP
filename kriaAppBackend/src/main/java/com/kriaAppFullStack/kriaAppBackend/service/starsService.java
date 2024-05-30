package com.kriaAppFullStack.kriaAppBackend.service;

import com.kriaAppFullStack.kriaAppBackend.exception.ResourceNotFoundException;
import com.kriaAppFullStack.kriaAppBackend.model.favorites;
import com.kriaAppFullStack.kriaAppBackend.model.stars;
import com.kriaAppFullStack.kriaAppBackend.repo.starsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class starsService {

    @Autowired
    private starsRepo starsRepo;

    public List<stars> getAllStars(){
        return starsRepo.findAll();
    }

    public stars addStarRating(stars newStarRating) {
        return starsRepo.save(newStarRating);
    }

    public List<stars> getStarRatingsByUserId(Integer userId) {
        List<stars> starRatings = starsRepo.findByUserId(userId);
        if (!starRatings.isEmpty()) {
            return starRatings;
        } else {
            throw new ResourceNotFoundException("Star ratings for user with ID " + userId + " not found");
        }
    }

    public List<stars> getStarRatingsByBookId(Integer bookId) {
        List<stars> starRatings = starsRepo.findByBookId(bookId);
        if (!starRatings.isEmpty()) {
            return starRatings;
        } else {
            throw new ResourceNotFoundException("Star ratings for book with ID " + bookId + " not found");
        }
    }

    public stars updateStarRating(Integer id, stars updatedStarRating) {
        return starsRepo.findById(id)
                .map(star -> {
                    updatedStarRating.setId(id);
                    return starsRepo.save(updatedStarRating);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Star rating with ID " + id + " not found"));
    }

    public void deleteStarRatingById(Integer id) {
        // Retrieve the favorite item by its ID
        Optional<stars> existingStars = starsRepo.findById(id);

        // Check if the starRating exists, otherwise throw an exception
        stars starRating = existingStars.orElseThrow(() -> new ResourceNotFoundException("Star rating with ID " + id + " not found"));

        // Delete the favorite
        starsRepo.delete(starRating);
    }
}
