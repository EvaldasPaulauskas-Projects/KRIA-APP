package com.kriaAppFullStack.kriaAppBackend.controller;

import com.kriaAppFullStack.kriaAppBackend.model.stars;
import com.kriaAppFullStack.kriaAppBackend.service.starsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stars")
public class starsController {

    @Autowired
    private starsService starsService;

    // get all star ratings
    @GetMapping
    public ResponseEntity<List<stars>> getAllStars() {
        List<stars> allStars = starsService.getAllStars();
        return ResponseEntity.ok(allStars);
    }

    // add a star rating
    @PostMapping("/add")
    public ResponseEntity<stars> addStarRating(@RequestBody stars newStarRating) {
        stars addedStarRating = starsService.addStarRating(newStarRating);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedStarRating);
    }

    // get all star ratings by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<stars>> getStarRatingsByUserId(@PathVariable("userId") Integer userId) {
        List<stars> starRatings = starsService.getStarRatingsByUserId(userId);
        return ResponseEntity.ok(starRatings);
    }

    // get all star ratings by bookId
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<stars>> getStarRatingsByBookId(@PathVariable("bookId") Integer bookId) {
        List<stars> starRatings = starsService.getStarRatingsByBookId(bookId);
        return ResponseEntity.ok(starRatings);
    }

    // edit the star rating by its id
    @PutMapping("/{id}")
    public ResponseEntity<stars> updateStarRating(@PathVariable("id") Integer id, @RequestBody stars updatedStarRating) {
        stars updatedRating = starsService.updateStarRating(id, updatedStarRating);
        return updatedRating != null ? ResponseEntity.ok(updatedRating) : ResponseEntity.notFound().build();
    }

    // delete the star rating by its id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStarRatingById(@PathVariable("id") Integer id) {
        starsService.deleteStarRatingById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Favorite with ID " + id + " has been deleted.");
    }
}